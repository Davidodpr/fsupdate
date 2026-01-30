declare type BredbandsvalTvChannelsResponse = {
  tvChannels: TvChannelsData
}

declare type BredbandsvalStreamingServicesResponse = {
  streamingServices: TvChannelsData
}

type TvLogo = {
  aspectRatio: number
  contentType: string
  fileName: string
  height: number
  id: string
  size: number
  title: string
  url: string
  width: number
}

type Included = {
  companyId: string
  id: string
  includedChannelsCount: number
  isHD: boolean
  name: string
}

declare type TvChannelsData = {
  id: string
  alias: string[]
  displayName: string
  hdDisplayName: string | null
  logo: TvLogo
  hdLogo: TvLogo | null
  name: string
  description: string
  parentChannelId: string | null
  hdDescription: string | null
  availableInTvPackages: {
    included: Included[]
    selectable: Included[]
  }
}[]

declare type StreamingServicesData = {
  id: string
  alias: string[]
  displayName: string
  logo: TvLogo
  name: string
  description: string
  parentChannelId: string | null
  availableInTvPackages: {
    included: Included[]
    selectable: Included[]
  }
}[]

declare type Provider = {
  name: 'tre' | 'telenor' | 'comhem' | 'tele2' | 'allente' | 'viasat' | 'boxer' | 'bredband2'
}
