declare module '@thegrizzlylabs/web-geniusscan-sdk' {
  export interface ScanConfiguration {
    multiPage?: boolean
    defaultFilter?: string
    availableFilters?: string[]
    jpegQuality?: number
    postProcessingActions?: string[]
    foregroundColor?: string
    backgroundColor?: string
    highlightColor?: string
    language?: string
  }

  export function setLicenseKey(key: string): Promise<void>
  export function scanDocument(config?: ScanConfiguration): Promise<Blob[]>
}
