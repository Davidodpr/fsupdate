'use client'

import { createContext, useContext, useState, HTMLAttributes } from 'react'
import { useIntercom } from 'react-use-intercom'
import { isEqual } from 'lodash'
import { AddresschangeOrder } from 'types/orders'
import {
  skatteverketLogin,
  skatteverketStatus,
  skatteverketUserData,
  skatteverketSearchAddresses,
  skatteverketSearchAddress,
  skatteverketApertmentNumbers,
  skatteverketValidate,
  skatteverketChangeAddress,
  addresschangeCreateOrder,
} from '@/common/api/addresschange'
import { SkatteverketStatusEnum } from '@/common/enums/SkatteverketEnum'
import { extractChangeAddressSkatteverketProperties } from '@/common/helpers/findSkatteverketProperties'
import seperateStreetNumber from '@/common/helpers/seperateStreetNumber'
import { isValidZip } from '@/common/helpers/validators'

const defaultValue: AddresschangeContextType = {
  autoStartToken: '',
  availableApartmentNumbers: [],
  currentAddress: {
    additionalInfo: '',
    city: '',
    propertyDesignation: '',
    registrationDate: '',
    street: '',
    zip: '',
  },
  loginStatus: '',
  validation: {},
  qr: '',
  searchedAddresses: [{ streetName: '', streetNumber: '', zip: '', city: '', apartmentNumber: '' }],
  isAddressSameAsCurrent: false,
  contract: {
    moveDate: new Date(),
    isPermanent: true,
    validity: '',
    newAddress: {},
    propertyInformation: {
      propertyDesignation: '',
      propertyOwner: '',
    },
    peopleToMove: [],
    contactInformation: {
      phoneNumber: '',
      email: '',
    },
  },
  orderMetaData: { meta: {} },
  personsAtCurrentAddress: [],
  error: undefined,
  loginSkatteverket: () => null,
  getUserDataFromSkatteverket: () => null,
  getAddresses: () => null,
  validateAddress: () => null,
  setContract: () => null,
  changeAddress: () => null,
  setError: () => null,
}

export type AddresschangeContextType = {
  autoStartToken: string
  availableApartmentNumbers: Array<string>
  currentAddress: SkatteverketUserDataCurrentAddress
  loginStatus: string
  validation: Record<string, string | boolean>
  qr: string
  searchedAddresses: SkatteverketValidAddressResponse
  isAddressSameAsCurrent: boolean
  contract: SkatteverketContract
  personsAtCurrentAddress: Array<SkatteverketPersonToMove>
  orderMetaData: AddresschangeOrder
  error: SkatteverketError | undefined
  loginSkatteverket: (arg0: string) => void
  getUserDataFromSkatteverket: () => void
  getAddresses: (arg0: string) => void
  validateAddress: (arg0: SkatteverketValidAddressObject) => void
  setContract: (arg0: SkatteverketContract) => void
  changeAddress: (arg0: () => void) => void
  setError: (arg0: SkatteverketError | undefined) => void
}

type SkatteverketError = 'skatteverket_login_error' | 'skatteverket_address_error' | 'skatteverket_user_data_error' | 'skatteverket_address_post_error'

const AddresschangeContext = createContext<AddresschangeContextType>(defaultValue)

export type AddresschangeProviderProps = {
  context: React.Context<AddresschangeContextType>
} & HTMLAttributes<HTMLDivElement>

export const AddresschangeProvider = ({ children }: AddresschangeProviderProps) => {
  const [loginStatusTag, setLoginStatusTag] = useState<string>('')
  const [loginStatusCookie, setLoginStatusCookie] = useState<Record<string, string>>({})
  const [loginQRCode, setLoginQRCode] = useState<string>('')
  const [autoStartToken, setAutoStartToken] = useState<string>('')
  const [error, setError] = useState<SkatteverketError>()
  const [currentAddress, setCurrentAddress] = useState<SkatteverketUserDataCurrentAddress>({
    additionalInfo: '',
    city: '',
    propertyDesignation: '',
    registrationDate: '',
    street: '',
    zip: '',
  })
  const [contract, setContract] = useState<SkatteverketContract>({
    moveDate: new Date(),
    isPermanent: true,
    validity: '',
    newAddress: {},
    propertyInformation: {
      propertyDesignation: '',
      propertyOwner: '',
    },
    peopleToMove: [],
    contactInformation: {
      phoneNumber: '',
      email: '',
    },
  })
  const [validation, setValidation] = useState<Record<string, string | boolean>>({})
  const [searchedAddresses, setSearchedAddresses] = useState<SkatteverketValidAddressResponse>([{ streetName: '', streetNumber: '', zip: '', city: '', apartmentNumber: '' }])
  const [availableApartmentNumbers, setAvailableApartmentNumbers] = useState<Array<string>>([])
  const [isAddressSameAsCurrent, setIsAddressSameAsCurrent] = useState<boolean>(false)
  const [personsAtCurrentAddress, setPersonsAtCurrentAddress] = useState<Array<SkatteverketPersonToMove>>([])
  const [orderMetaData, setOrderMetaData] = useState<AddresschangeOrder>({ meta: {} })
  const { trackEvent } = useIntercom()

  const getSkatteverketLoginStatus = async () => {
    let timer: string | number | NodeJS.Timeout | undefined
    let finished = false
    let attempts = 0
    const MAX_ATTEMPTS = 3
    let finishedLogin = false

    timer = setTimeout(async function pollSkatteverketStatus() {
      try {
        const response = await skatteverketStatus()
        if (response) {
          setLoginStatusTag(response.status.tag)
          setLoginStatusCookie(response.status.cookie)
          setLoginQRCode(response.status.qr)
          setAutoStartToken(response.status.autoStartToken)
        }

        if (response.status.tag === SkatteverketStatusEnum.COMPLETED) {
          if (response.status.cookie) {
            finishedLogin = true
            window.localStorage.setItem(SkatteverketStatusEnum.TOKEN, JSON.stringify({ [loginStatusCookie.name]: loginStatusCookie.value }))
          }
          await getUserDataFromSkatteverket()
          finished = true
        }

        if (response.status.tag === SkatteverketStatusEnum.EMPTY || response.status.tag === SkatteverketStatusEnum.CANCELLED) {
          finishedLogin = true
          finished = true
        }

        /**
         * Recursion makes setTimeout behave as setInterval but as we don't wait for response, its faster.
         * Unfortunately we create a new setTimeoutID for each recursion which makes its impossible to clear
         * the latest ID, only the previous. Therefore we also set a flag manually stop new calls.
         */
        clearTimeout(timer)

        if (!finished && attempts < MAX_ATTEMPTS) {
          if (finishedLogin) attempts++
          timer = setTimeout(pollSkatteverketStatus, 1000)
        }
      } catch (e: unknown) {
        clearTimeout(timer)
        setError('skatteverket_login_error')
      }
    }, 2000)
  }

  const loginSkatteverket = async (ssn: string) => {
    try {
      await skatteverketLogin(ssn)
      await getSkatteverketLoginStatus()
    } catch (e: unknown) {
      setError('skatteverket_login_error')
    }
  }

  const getUserDataFromSkatteverket = async () => {
    try {
      const res = await skatteverketUserData()
      const { address, relations, user } = res as unknown as SkatteverketUserDataResponse
      setCurrentAddress(address as unknown as SkatteverketUserDataCurrentAddress)
      setPersonsAtCurrentAddress([...relations, user])
    } catch (e: unknown) {
      setError('skatteverket_address_error')
      setError('skatteverket_user_data_error')
    }
  }

  const findAddressIdByAddress = async (address: SkatteverketValidAddressObject) => {
    try {
      let correctStreetName, correctStreetNumber
      if (address?.street) {
        const { street, streetNumber } = seperateStreetNumber(address?.street)
        correctStreetName = street
        correctStreetNumber = streetNumber
      }
      const res = await skatteverketSearchAddress({
        ...address,
        city: address.city?.trim(),
        streetName: correctStreetName?.trim() ?? address?.streetName?.trim(),
        streetNumber: correctStreetNumber?.trim() ?? address?.streetNumber?.trim(),
      })
      /*
       * API return array of results, if not sending in unique information. Since we are
       * sending enough information to only get one result we take the first. When confident
       * about this we should just return one object from API and remove [0] here.
       */
      return res?.[0]?.id
    } catch (e: unknown) {
      setError('skatteverket_address_error')
    }
  }

  const setValidApartmentNumbers = async (address: SkatteverketValidAddressObject) => {
    try {
      const addressId = await findAddressIdByAddress(address)
      if (addressId) {
        const res = await skatteverketApertmentNumbers(addressId)
        setAvailableApartmentNumbers(res)
      } else {
        setValidation({ info: 'NO_ADDRESSES_FOUND', valid: false })
        setAvailableApartmentNumbers([])
      }
    } catch (e: unknown) {
      setError('skatteverket_address_error')
    }
  }

  const getAddresses = async (address: string) => {
    try {
      if (address?.length < 3) {
        setSearchedAddresses([])
      } else {
        const res = await skatteverketSearchAddresses(address)
        setSearchedAddresses(res as unknown as SkatteverketValidAddressResponse)
      }
    } catch (e: unknown) {
      setError('skatteverket_address_error')
    }
  }

  const isAddressesIdentical = async () => {
    const from = {
      street: currentAddress?.street?.toLowerCase(),
      zip: currentAddress?.zip,
      city: currentAddress?.city?.toLowerCase(),
      /*
       * If user lives in house she/he won't have apartmentnumber so then we won't include it in comparison
       * We have only seen apartmentnumber or nothing in this field so we're assuming we only ever get apartment-
       * number here. However based on the name this could contain something else.
       */
      ...(currentAddress?.additionalInfo && { apartmentNumber: currentAddress?.additionalInfo?.replace(/lgh/gi, '').trim() }),
    }

    const { newAddress } = contract

    const to = {
      street: `${newAddress?.streetName?.toLowerCase()} ${newAddress?.streetNumber}`,
      zip: newAddress?.zip,
      city: newAddress?.city?.toLowerCase(),
      ...(newAddress?.apartmentNumber && { apartmentNumber: newAddress?.apartmentNumber }),
    }
    setIsAddressSameAsCurrent(isEqual(from, to))
  }

  const validateAddress = async (address: SkatteverketValidAddressObject) => {
    try {
      let correctStreetName, correctStreetNumber
      if (address?.street || address?.streetName) {
        const { street, streetNumber } = seperateStreetNumber(address?.street || address?.streetName || '')
        correctStreetName = street
        correctStreetNumber = streetNumber
      }
      /*
       * Will return object with boolean if address is valid and additional info.
       * Info could be "LAGENHETER_FINNS", "ADRESS_EJ_UNIK", "OK", "EJ_MATCH_FINNS_ANDRA" etc.
       * We don't really have a clear idea of what they mean and how to use them.
       */
      if (address?.zip && isValidZip(address?.zip.toString()) && (correctStreetName || address?.streetName) && (correctStreetNumber || address?.streetNumber) && address?.city) {
        const res = await skatteverketValidate({
          ...address,
          city: address.city?.trim(),
          streetName: correctStreetName?.trim() ?? address?.streetName?.trim(),
          streetNumber: correctStreetNumber?.trim() ?? address?.streetNumber?.trim(),
        })
        setValidation(res)
        setValidApartmentNumbers(address)
        isAddressesIdentical()
        setError(undefined)
      } else {
        setValidation({ info: 'NO_ADDRESSES_FOUND', valid: false })
        setAvailableApartmentNumbers([])
      }
    } catch (e: unknown) {
      setError('skatteverket_address_error')
    }
  }

  const changeAddress = async (callback: () => void) => {
    try {
      const response: { errors?: Array<string> } = await skatteverketChangeAddress(contract)
      const errors = response.errors || []

      const { kvittensnummer, samtyckeHarInitierats, inflyttningsdatum } = extractChangeAddressSkatteverketProperties(response)

      if (errors.length > 0) {
        trackEvent('address_change_submit_failed')
        setError('skatteverket_address_post_error')
      } else {
        const orderData = {
          meta: {
            moveDate: inflyttningsdatum ?? contract.moveDate,
            // Remove Skatteverket LGH prefix from apartment number to match our db format
            newAddress: { ...contract.newAddress, apartmentNumber: contract.newAddress?.apartmentNumber?.replace(/lgh/gi, '').trim() },
            receiptNumber: kvittensnummer,
            isConsentNeeded: samtyckeHarInitierats,
          },
        }
        setOrderMetaData(orderData)
        await addresschangeCreateOrder(orderData)
        trackEvent('address_change_submit')
        if (callback) callback()
      }
    } catch (e: unknown) {
      setError('skatteverket_address_post_error')
    }
  }

  const contextValue: AddresschangeContextType = {
    autoStartToken,
    availableApartmentNumbers,
    currentAddress,
    loginStatus: loginStatusTag,
    validation,
    qr: loginQRCode,
    searchedAddresses,
    isAddressSameAsCurrent,
    contract,
    personsAtCurrentAddress,
    orderMetaData,
    error,
    loginSkatteverket,
    getUserDataFromSkatteverket,
    getAddresses,
    validateAddress,
    setContract,
    changeAddress,
    setError,
  }
  return <AddresschangeContext.Provider value={contextValue}>{children}</AddresschangeContext.Provider>
}

export const CreateAddresschangeContext = () => {
  return createContext<AddresschangeContextType>(defaultValue)
}

export const useAddresschangeContext = () => useContext(AddresschangeContext)
