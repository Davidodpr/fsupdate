export const isValidZip = (zip: string) => zip && zip.trim().split(' ').join('').length === 5

export const isValidApartmentNumber = (apartmentNumber: string) => apartmentNumber && apartmentNumber.length === 4 && Number.isInteger(parseInt(apartmentNumber, 10))

export const hasEmptyValue = (values: Array<string | undefined>) => values.filter((value) => !value || value.trim().length === 0).length > 0
