import { SupplierDetail } from 'types/price'
import { MoveServiceOrder } from '@/common/enums/MoveServicesEnum'

export const MockServiceProviders: SupplierDetail[] = [
  {
    name: 'grabbarnaflytt_stockholm',
    id: 'e8e7a25d-2219-4897-ad77-c6dfe65a1135',
    displayName: 'Grabbarna Flytt',
    type: 'supplier',
    serviceTypes: [MoveServiceOrder.MOVING, MoveServiceOrder.CLEANING, MoveServiceOrder.STORAGE, MoveServiceOrder.PACKAGING],
    imageUrl: '',
    prices: {
      fixed: [
        {
          residenceSize: 50,
          price: 3750,
        },
      ],
    },
    addons: {
      holiday: 12,
      elevator: [
        {
          sqm: 30,
          none: 150,
          small: 100,
        },
        {
          sqm: 50,
          none: 200,
          small: 150,
        },
        {
          sqm: 90,
          none: 250,
          small: 200,
        },
      ],
    },
    rating: '4.9',
    reviewCount: 1065,
  },
  {
    name: 'starcycle',
    id: '84a62517-4881-4b33-ae31-8c07d7342bed',
    displayName: 'Starcycle',
    type: 'supplier',
    serviceTypes: [MoveServiceOrder.MOVING],
    imageUrl: '',
    prices: {
      fixed: [
        {
          residenceSize: 50,
          price: 8000,
        },
      ],
    },
    rating: '4.7',
    reviewCount: 345,
  },
]
