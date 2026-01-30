import { HTMLAttributes, createContext, useContext, useRef, useState } from 'react'
import { useDebounce } from 'react-use'
import { clearIntervalAsync, setIntervalAsync, SetIntervalAsyncTimer } from 'set-interval-async/dynamic'
import { getBredbandsvalTerms, getOffers, getTvChannels, signAndCreateBroadbandOrder, getStreamingServices } from '@/common/api/broadband'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import { ActivityEnum } from '@/common/types/activity'
import { useThemeContext } from '../theme/themeContext.provider'
import { useUserContext } from '../user/UserProvider'

const BREDBANDSVAL_RUNNING = 'running'
const BREDBANDSVAL_DONE = 'done'
const BREDBANDSVAL_FAILED = 'failed'

export type BroadbandProviderContextType = {
  fetchOffers: (params: BroadbandFilterOptions) => void
  offers: BroadbandOfferData[]
  progress: number
  setProgress: (currentPercent: number) => void
  updateFilterOptions: (updatedFilteringOptions: BroadbandFilterOptions) => void
  filteringBroadBandOptions: BroadbandFilterOptions
  responseStatus: string
  channels: TvChannelsData
  fetchTvChannels: () => void
  fetchStreamingServices: () => void
  streamingServices: TvChannelsData
  groupDeals: BroadbandOfferData[]
  chosenOffer: BroadbandOfferData | null
  setChosenOffer: (offer: BroadbandOfferData) => void
  broadbandOrder: BroadbandOrder
  saveOrder: (order: BroadbandOrder) => void
  selectedFlatNr: string
  setSelectedFlatNr: (flatNr: string) => void
  fetchBredbandsvalTerms: () => void
  bredbandsvalTerms: BroadbandProvidersTerms | null
  signBroadband: (emailAndPhone?: { email: string; phone: string }) => Promise<{ success: boolean }>
  orderComplete: boolean
  hasFetchedFixedOffers: boolean
  externalGroupDealProvider: string | undefined
  orderError: { message: string; statusCode: number } | null
  clearOrderError: () => void
}

const BroadbandProviderContext = createContext<BroadbandProviderContextType | undefined>(undefined)

export const BroadbandProvider = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  const { refetchUser } = useUserContext()
  const [offers, setOffers] = useState<BroadbandOfferData[]>([])
  const [channels, setChannels] = useState<TvChannelsData>([])
  const [streamingServices, setStreamingServices] = useState<TvChannelsData>([])
  const [progress, setProgress] = useState<number>(0)
  const [responseStatus, setResponseStatus] = useState<string>('')
  const [groupDeals, setGroupDeals] = useState<BroadbandOfferData[]>([])
  const [externalGroupDealProvider, setExternalGroupDealProvider] = useState<string>()
  const [selectedFlatNr, setSelectedFlatNr] = useState<string>('')
  const [chosenOffer, setChosenOffer] = useState<BroadbandOfferData | null>(null)
  const [filteringBroadBandOptions, setFilteringBroadBandOptions] = useState<BroadbandFilterOptions>({
    speed: 0,
    sortBy: 'price',
    isRouter: false,
    types: ['dsl', 'coaxial', 'fiber'],
    selectedPackages: {},
  })
  const [broadbandOrder, setBroadbandOrder] = useState<BroadbandOrder>({
    offerId: '',
    userId: '',
    additionalProducts: [],
    cancelExistingContract: undefined,
    existingProvider: undefined,
    selectedFlatNr: null,
    startDate: '',
    endDate: '',
    groupDealChosen: undefined,
  })
  const [bredbandsvalTerms, setBredbandsvalTerms] = useState<BroadbandProvidersTerms | null>(null)
  const [orderComplete, setOrderComplete] = useState<boolean>(false)
  const [orderError, setOrderError] = useState<{ message: string; statusCode: number } | null>(null)
  const { theme } = useThemeContext()
  const intervalRef = useRef<SetIntervalAsyncTimer<[]> | undefined>(undefined)
  const [hasFetchedFixedOffers, setHasFetchedFixedOffers] = useState<boolean>(false)

  useDebounce(
    () => {
      fetchOffers(filteringBroadBandOptions)
      return () => intervalRef.current && clearIntervalAsync(intervalRef.current)
    },
    200,
    [filteringBroadBandOptions],
  )

  const saveOrder = (order: BroadbandOrder) => {
    setBroadbandOrder({ ...broadbandOrder, ...order })
  }

  const fetchOffers = async (params: BroadbandFilterOptions) => {
    //  { status, groupDeals, offers, progress, groupDealProvider }
    const response = await getOffers(params)
    if (response) {
      setOffers(response.offers)
      if (response.groupDeals) {
        setGroupDeals(response.groupDeals)

        if (response.groupDeals.length > 0 && response.offers.length === 0) {
          /**
           * In the case there's group deals on the chosen address but no offers
           * for fixed broadband we will do a new search and include BOTH types of broadband
           * offers instead to display something
           **/
          filteringBroadBandOptions.types?.push('mobile')
        }
      } else {
        setGroupDeals([])
      }
      if (response.externalGroupDealProvider) {
        setExternalGroupDealProvider(response.externalGroupDealProvider)
      } else {
        setExternalGroupDealProvider(undefined)
      }
      if (response.status === BREDBANDSVAL_DONE) {
        if (!params?.types?.includes('mobile')) {
          setHasFetchedFixedOffers(true)
        }
      }
      setProgress(response.progress)

      if (response.status === BREDBANDSVAL_RUNNING) {
        intervalRef.current = setIntervalAsync(async () => {
          try {
            const newRes = await getOffers(params)

            if (newRes.status === BREDBANDSVAL_DONE) {
              setOffers(newRes.offers)
              if (!params?.types?.includes('mobile')) {
                setHasFetchedFixedOffers(true)
              }
              if (newRes.groupDeals) {
                setGroupDeals(newRes.groupDeals)
                if (newRes.groupDeals.length > 0 && newRes.offers.length === 0) {
                  /**
                   * In the case there's group deals on the chosen address but no offers
                   * for fixed broadband we will do a new search and include BOTH types of broadband
                   * offers instead to display something
                   **/
                  filteringBroadBandOptions.types?.push('mobile')

                  const updatedOffers = await getOffers(filteringBroadBandOptions)
                  setOffers(updatedOffers.offers)
                }
              } else {
                setGroupDeals([])
              }
              if (newRes.externalGroupDealProvider) {
                setExternalGroupDealProvider(newRes.externalGroupDealProvider)
              } else {
                setExternalGroupDealProvider(undefined)
              }

              intervalRef.current && clearIntervalAsync(intervalRef.current)
            }
            setProgress(newRes.progress)
          } catch (e: unknown) {
            intervalRef.current && clearIntervalAsync(intervalRef.current)
            // only populate a value if failed which triggers the right error card
            setResponseStatus(BREDBANDSVAL_FAILED)
          }
        }, 3000)
      }
    }
  }

  const fetchTvChannels = async () => {
    const response = await getTvChannels()
    if (response.tvChannels) {
      setChannels(response.tvChannels)
    }
  }

  const fetchStreamingServices = async () => {
    const response = await getStreamingServices()
    if (response.streamingServices) {
      setStreamingServices(response.streamingServices)
    }
  }

  const updateFilterOptions = (updatedFilteringOptions: BroadbandFilterOptions) => {
    setFilteringBroadBandOptions({
      ...filteringBroadBandOptions,
      ...updatedFilteringOptions,
    })
  }

  const fetchBredbandsvalTerms = async () => {
    const response = await getBredbandsvalTerms()
    setBredbandsvalTerms(response.providers)
  }

  const signBroadband = async (emailAndPhone?: { phone: string; email: string }): Promise<{ success: boolean }> => {
    if (broadbandOrder && chosenOffer) {
      try {
        const mappedOrderData = {
          userId: broadbandOrder.userId,
          offerId: broadbandOrder.offerId,
          startDate: broadbandOrder.startDate,
          meta: {
            groupDealChosen: broadbandOrder.groupDealChosen,
            cancelExistingContract: broadbandOrder.cancelExistingContract,
            existingProvider: broadbandOrder.existingProvider,
            endDate: broadbandOrder.endDate || '',
          },
          additionalProducts: broadbandOrder.additionalProducts,
          emailAndPhone,
          selectedFlatNr: broadbandOrder.selectedFlatNr || selectedFlatNr,
          isFb: theme === ThemeEnum.FASTIGHETSBYRAN,
        }

        const response = await signAndCreateBroadbandOrder(mappedOrderData)

        if (emailAndPhone) {
          refetchUser()
        }

        if (response.status === ActivityEnum.STATUS_COMPLETED || response.status === ActivityEnum.STATUS_LOCKED) {
          setOrderComplete(true)
          return { success: true }
        } else {
          return { success: false }
        }
      } catch (error: any) {
        // Handle offer not available error
        setOrderError({
          message: error?.message || 'An error occurred',
          statusCode: error?.statusCode || 500,
        })
        return { success: false }
      }
    }
    return { success: false }
  }

  const clearOrderError = () => {
    setOrderError(null)
  }

  return (
    <BroadbandProviderContext.Provider
      value={{
        fetchOffers,
        offers,
        progress,
        setProgress,
        updateFilterOptions,
        filteringBroadBandOptions,
        responseStatus,
        channels,
        streamingServices,
        fetchTvChannels,
        fetchStreamingServices,
        groupDeals,
        chosenOffer,
        setChosenOffer,
        broadbandOrder,
        saveOrder,
        selectedFlatNr,
        setSelectedFlatNr,
        fetchBredbandsvalTerms,
        bredbandsvalTerms,
        signBroadband,
        orderComplete,
        hasFetchedFixedOffers,
        externalGroupDealProvider,
        orderError,
        clearOrderError,
      }}
    >
      {children}
    </BroadbandProviderContext.Provider>
  )
}

export const useBroadbandProvider = () => {
  const context = useContext(BroadbandProviderContext)
  if (context === undefined) {
    throw new Error('useBroadbandProvider must be used within an BroadbandProviderContext')
  }
  return context
}
