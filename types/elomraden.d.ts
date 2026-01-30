export interface ElomradenAddressDTO {
  success?: number
  error?: ElomradenError
  displayName: string
  email: string
  phone: string
  linkUrl: string
}

export interface ElomradenInput {
  ip?: string
  gata?: string
  ort?: string
  postnummer?: number
  lat?: string
  long?: string
  omrade?: string
}

export interface ElomradenError {
  errorCode: number
  errorString: string
}

export interface ElomradenDistributor {
  elomrade: number
  natagare: string
  natomradeNamn: string
  natomradeBeteckning: string
  EdielID: number
  telefon: string
  epost: string
}

export interface ElomradenCoordinates {
  ort: string
  kommun: string
  elskatt: number
  elskattNamn: string
  latitud: number
  longitud: number
}

export interface ElomradenZipDTO {
  natomradePostnummer: {
    success: number
    error: ElomradenError
    item: ElomradenZipItem[]
  }
}

export interface ElomradenZipItem {
  input: ElomradenInput
  elnat: ElomradenDistributor
}

export interface ElomradenElectricityDistributorDTO {
  success: number
  error: ElomradenError
  input: ElomradenInput
  omrade: ElomradenElectricityDistributor
}

export interface ElomradenElectricityDistributor {
  namn: string
  snitt: string
  bolag: string
  bolagkod: number
  epost: string
  telefon: string
}
