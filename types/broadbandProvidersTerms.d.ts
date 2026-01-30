declare type BredbandsvalTermsResponse = {
  generalTerms: string | null
  integrityPolicy: string | null
  providers: BroadbandProvidersTerms
}

declare type BroadbandProvidersTerms = {
  [key in Provider]: {
    integrityPolicy: {
      url: string
      display: string
    }
    terms: {
      url: string
      display: string
    }[]
  }
}

declare type Provider =
  | 'allente'
  | 'bitcom'
  | 'boxer'
  | 'bredband2'
  | 'bredbandsson'
  | 'chili'
  | 'comviq'
  | 'daladatorer'
  | 'fibio'
  | 'folke'
  | 'halebop'
  | 'hallon'
  | 'netatonce'
  | 'nwtmedia'
  | 'ownit'
  | 'tele2'
  | 'telenor'
  | 'telia'
  | 'tre'
  | 'vkmedia'
