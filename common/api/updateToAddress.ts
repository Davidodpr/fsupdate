import createFetchInstance from '../utils/api'

export const updateToAddress = async (toAddress?: ToAddressConnectedTypes, residenceSize?: string) => {
  const fetchInstance = createFetchInstance('PATCH')
  const residenceSizeParsed = residenceSize && parseFloat(residenceSize)

  if (toAddress) {
    // Construct the payload - apartmentNumber goes in toAddress, others at root
    const toAddressPayload = {
      toAddress: {
        street: toAddress?.street?.trim(),
        city: toAddress?.city,
        zip: toAddress?.zip,
        apartmentNumber: toAddress.apartmentNumber, // This stays in toAddress
      },
      residenceSize: residenceSizeParsed, // Root level
      residenceType: toAddress.residenceType, // Root level
      apartmentType: toAddress.apartmentType, // Root level
    }

    const newCurrentMove = await fetchInstance<CurrentMove>('/moves/current', {
      body: JSON.stringify(toAddressPayload),
    })
    return newCurrentMove
  } else if (residenceSizeParsed) {
    // Only update residence size if no toAddress provided
    const residenceSizeResponse = await fetchInstance<CurrentMove>('/moves/current', {
      body: JSON.stringify({ residenceSize: residenceSizeParsed }),
    })
    return residenceSizeResponse
  }
}
