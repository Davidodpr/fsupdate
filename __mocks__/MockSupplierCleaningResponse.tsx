import { MoveServiceSuppliers } from '@/common/api/price'
import { MoveServiceOrder } from '@/common/enums/MoveServicesEnum'

const mockSupplierCleaningResponse: MoveServiceSuppliers = {
  suppliers: [
    {
      name: 'samflyttstad_zon1',
      id: 'bdd341fd-9c7a-4214-b87e-b7878ce720cf',
      displayName: 'Sam Flytt & Städ',
      type: 'supplier',
      serviceTypes: [MoveServiceOrder.CLEANING, MoveServiceOrder.MOVING, MoveServiceOrder.PACKAGING, MoveServiceOrder.STORAGE],
      rating: '4.5',
      reviewCount: 100,
      imageUrl: '',
      prices: {
        hourly: {
          base: 340,
          holiday: 400,
        },
        fixed: [
          {
            residenceSize: 40,
            price: 2100,
          },
        ],
      },
      addons: {
        holiday: null,
        elevator: [],
      },
    },
  ],
}

export default mockSupplierCleaningResponse
