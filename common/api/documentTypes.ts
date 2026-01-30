export interface DocumentAnalyzeRequest {
  image: string // base64 encoded image
  filename?: string
  mimeType?: string
}

export interface Person {
  name: string | null
  personalNumber: string | null
  hasSignature: boolean
  signatureDate?: string | null
  signatureCity?: string | null
}

export interface Broker {
  name: string | null
  sourceCompany: string | null
}

export interface ExtractedDocumentData {
  buyers: Person[]
  sellers: Person[]
  broker: Broker | null
  isValidForProcessing?: boolean
}

export const DOCUMENT_VALIDATION_ERRORS = {
  NO_SIGNERS_FOUND: 'NO_SIGNERS_FOUND',
  NO_ONE_HAS_SIGNED: 'NO_ONE_HAS_SIGNED',
  INCOMPLETE_SIGNATURES: 'INCOMPLETE_SIGNATURES',
  NO_VALID_SIGNATURES: 'NO_VALID_SIGNATURES',
  DOCUMENT_ANALYSIS_FAILED: 'DOCUMENT_ANALYSIS_FAILED',
  NO_DATA_EXTRACTED: 'NO_DATA_EXTRACTED',
  FAILED_TO_EXTRACT_INFO: 'FAILED_TO_EXTRACT_INFO',
  FAILED_TO_PROCESS: 'FAILED_TO_PROCESS',
} as const

export type DocumentValidationError = (typeof DOCUMENT_VALIDATION_ERRORS)[keyof typeof DOCUMENT_VALIDATION_ERRORS]

export interface IncompleteSigner {
  name: string
  missingFields: ('city' | 'date')[]
}

export interface DocumentValidationResponse {
  isValid: boolean
  errorCode?: DocumentValidationError
  incompleteSigners?: IncompleteSigner[]
}
