import { SupplierServiceTypes } from '@/constants/order'

export const MovehelpQuotationMock = {
  messageKey: undefined,
  suppliers: [
    {
      id: 'e8e7a25d-2219-4897-ad77-c6dfe65a1135',
      name: 'grabbarnaflytt_stockholm',
      displayName: 'Grabbarna Flytt',
      type: 'movehelp',
      serviceTypes: ['moving', 'cleaning', 'storage', 'packaging'] as SupplierServiceTypes[],
      fortnoxSupplierNumber: null,
      rating: '4.8',
      reviewCount: 1169,
      imageUrl: 'https://ik.imagekit.io/flyttsmart/Suppliers/Movehelp_and_cleaning/grabbarnaflytt_stockholm_dy1XPTTyy.avif?updatedAt=1682665946926',
      price: {
        fixed: [
          {
            residenceSize: 10,
            price: 4300,
            quotationHolidayPrice: 4600,
          },
        ],
      },
      quotationInfo: {
        validUntil: '2023-11-25T00:00:00.000Z',
        comment: 'Grabbarna flytt är otroligt bra. Jag har snackat med dem och de hjälper dig gärna. Priset inkluderar allt vi snackade om såsom pianot.',
        seller: {
          image: 'https://ik.imagekit.io/flyttsmart/Users/hannes_u4t4N4rVv.png?updatedAt=1695031786988',
        },
      },
    },
  ],
}
