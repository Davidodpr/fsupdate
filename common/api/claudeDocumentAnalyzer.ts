import { DOCUMENT_ERROR_CODES, KNOWN_ERROR_CODES, DocumentErrorCode } from '@/constants/documentErrorCodes'
import { DocumentAnalyzeRequest, DocumentValidationResponse, DocumentValidationError, IncompleteSigner } from './documentTypes'

export type { DocumentAnalyzeRequest, DocumentValidationResponse, DocumentValidationError, IncompleteSigner }

// API Configuration
const API_CONFIG = {
  TIMEOUT: 30000,
  ENDPOINT: '/web/external/document/analyze-image',
} as const

// API Error Response Interface
export interface ApiErrorResponse {
  error?: string
  errorCode?: DocumentValidationError | string
  message?: string
  statusCode?: number
  incompleteSigners?: IncompleteSigner[]
  details?: {
    incompleteSigners?: IncompleteSigner[]
    sessionId?: string
    pagesReceived?: number
  }
}

// Custom error class for API errors
export class ApiError extends Error {
  errorCode?: DocumentValidationError | DocumentErrorCode | string
  incompleteSigners?: IncompleteSigner[]
  statusCode?: number

  constructor(message: string, errorCode?: DocumentValidationError | DocumentErrorCode | string, incompleteSigners?: IncompleteSigner[], statusCode?: number) {
    super(message)
    this.name = 'ApiError'
    this.errorCode = errorCode
    this.incompleteSigners = incompleteSigners
    this.statusCode = statusCode
  }
}

// Utility function to determine API base URL
const getBaseURL = (): string | undefined => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname

    // Local development environment with ngrok tunnel
    if (hostname.includes('ngrok')) {
      return process.env.NEXT_PUBLIC_NGROK_URL
    }
  }

  // Production/Staging environments
  return process.env.NEXT_PUBLIC_API_URL
}

// Convert base64 to blob
const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteCharacters = atob(base64)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: mimeType })
}

// Create FormData for API request
const createFormData = (imageData: string, filename: string, mimeType: string, additionalFields?: Record<string, string>): FormData => {
  const blob = base64ToBlob(imageData, mimeType)
  const formData = new FormData()
  formData.append('image', blob, filename)

  if (additionalFields) {
    Object.entries(additionalFields).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }

  return formData
}

// Parse API error response
const parseApiError = async (response: Response): Promise<ApiErrorResponse> => {
  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return await response.json()
  }
  return {}
}

// Handle API response errors
const handleApiError = async (response: Response, context?: string): Promise<never> => {
  const errorData = await parseApiError(response)

  // API Error details available in errorData

  // Extract incompleteSigners from either top level or details
  const incompleteSigners = errorData.incompleteSigners || errorData.details?.incompleteSigners

  // Check if we have a specific error code from the API
  if (errorData.errorCode) {
    throw new ApiError(errorData.message || errorData.error || errorData.errorCode, errorData.errorCode, incompleteSigners, response.status)
  }

  // Check if the message is actually an error code (like "CLAUDE_OVERLOADED")
  const isKnownErrorCode = (message: string): message is DocumentErrorCode => {
    return KNOWN_ERROR_CODES.includes(message as DocumentErrorCode)
  }

  if (errorData.message && isKnownErrorCode(errorData.message)) {
    throw new ApiError(
      ` (${response.status})`, // Descriptive message for debugging
      errorData.message, // Error code for translation
      incompleteSigners,
      response.status,
    )
  }

  // For other HTTP errors, throw with status code so the UI can handle with translations
  const contextMessage = context ? ` (${context})` : ''
  throw new ApiError(errorData.message || errorData.error || `HTTP ${response.status}${contextMessage}`, undefined, undefined, response.status)
}

// Generic fetch with error handling
const fetchWithErrorHandling = async <T>(url: string, options: RequestInit): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...options,
      signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
    })

    if (!response.ok) {
      await handleApiError(response)
    }

    return (await response.json()) as T
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError('TIMEOUT', DOCUMENT_ERROR_CODES.TIMEOUT, undefined, 0)
      }
      throw error
    }

    throw new Error(String(error))
  }
}

export interface MultiPageDocumentRequest {
  pages: DocumentAnalyzeRequest[]
  sessionId?: string
}

export interface MultiPageDocumentResponse {
  isValid: boolean
  errorCode?: DocumentValidationError | 'WAITING_FOR_MORE_PAGES'
  incompleteSigners?: IncompleteSigner[]
  sessionId?: string
  pagesReceived?: number
}

// Single page document analysis
export const analyzeDocument = async (imageData: DocumentAnalyzeRequest): Promise<DocumentValidationResponse> => {
  const baseURL = getBaseURL()

  if (!baseURL) {
    throw new Error('API_CONFIG_ERROR')
  }

  const formData = createFormData(imageData.image, imageData.filename || 'document.jpg', imageData.mimeType || 'image/jpeg')

  return fetchWithErrorHandling<DocumentValidationResponse>(`${baseURL}${API_CONFIG.ENDPOINT}`, {
    method: 'POST',
    body: formData,
  })
}

// Multi-page document analysis
export const analyzeMultiPageDocument = async (
  pages: DocumentAnalyzeRequest[],
  onProgress?: (pagesUploaded: number, totalPages: number) => void,
): Promise<DocumentValidationResponse> => {
  const baseURL = getBaseURL()

  if (!baseURL) {
    throw new Error('API_CONFIG_ERROR')
  }

  let sessionId: string | undefined

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]
    const pageNumber = i + 1

    const additionalFields: Record<string, string> = {
      pageNumber: pageNumber.toString(),
      totalPages: pages.length.toString(),
    }

    if (sessionId) {
      additionalFields.sessionId = sessionId
    }

    const formData = createFormData(page.image, page.filename || `document-page-${pageNumber}.jpg`, page.mimeType || 'image/jpeg', additionalFields)

    try {
      const response = await fetch(`${baseURL}${API_CONFIG.ENDPOINT}`, {
        method: 'POST',
        body: formData,
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
      })

      if (!response.ok) {
        await handleApiError(response, `page ${pageNumber}`)
      }

      const result = (await response.json()) as MultiPageDocumentResponse

      // Store session ID from first response
      if (!sessionId && result.sessionId) {
        sessionId = result.sessionId
      }

      // Call progress callback
      if (onProgress) {
        onProgress(pageNumber, pages.length)
      }

      // Return final result on last page
      if (pageNumber === pages.length && result.isValid !== undefined) {
        if ((result as MultiPageDocumentResponse).errorCode === 'WAITING_FOR_MORE_PAGES') {
          throw new ApiError('WAITING_FOR_MORE_PAGES', DOCUMENT_ERROR_CODES.WAITING_FOR_MORE_PAGES as DocumentValidationError)
        }
        return result as DocumentValidationResponse
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new ApiError('TIMEOUT', DOCUMENT_ERROR_CODES.TIMEOUT, undefined, 0)
        }
        throw error
      }

      throw new Error(String(error))
    }
  }

  throw new ApiError('NO_RESULT', DOCUMENT_ERROR_CODES.NO_RESULT)
}
