import { Booking } from '@/types/booking'

export const mockBookings: Booking[] = [
  {
    id: '1',
    type: 'flytthjälp',
    status: 'confirmed',
    date: '2024-12-13',
    time: '14:00',
    fromAddress: {
      street: 'Vallvägen 4 A',
      city: 'Upplands Väsby',
    },
    toAddress: {
      street: 'Göran Perssons väg 13',
      city: 'Solna',
    },
    supplier: {
      id: 'onspot',
      name: 'Onspot Logistic AB',
      phone: '010-204 49 49',
      email: 'info@onspot.se',
    },
    price: {
      items: [
        { label: 'Grundpris flytthjälp (30 m³)', amount: 5500, isIncludedInRut: true },
        { label: 'Helgtillägg', amount: 450, isIncludedInRut: true },
        { label: 'Transportkostnad (ingår ej i RUT)', amount: 450, isIncludedInRut: false },
      ],
      subtotal: 6400,
      rutDeduction: 2975,
      rutPercentage: 50,
      total: 3425,
      currency: 'kr',
    },
    details: {
      volume: '30 m³',
    },
    serviceDescription: 'RUT-avdraget görs direkt av underleverantören och reducerar din faktiska kostnad med 50% av arbetet. Transportkostnaden (450 kr) är inte RUT-berättigad.',
    bookingNumber: 'FL-2024-001',
  },
  {
    id: '2',
    type: 'flyttstädning',
    status: 'confirmed',
    date: '2024-12-29',
    time: '09:00',
    address: {
      street: 'Vallvägen 4 A',
      city: 'Upplands Väsby',
    },
    supplier: {
      id: 'nordic',
      name: 'Ns Nordic Service AB',
      phone: '073-697 24 33',
    },
    price: {
      items: [
        { label: 'Flyttstädning (145 m²)', amount: 3900, isIncludedInRut: true },
        { label: 'Material ingår', amount: 0, isIncludedInRut: false },
      ],
      subtotal: 3900,
      rutDeduction: 1860,
      rutPercentage: 50,
      total: 2040,
      currency: 'kr',
    },
    details: {
      area: '145 m²',
      materialIncluded: true,
    },
    serviceDescription: 'RUT-avdraget görs direkt av underleverantören och reducerar din faktiska kostnad med 50% av arbetet. Material är inte RUT-berättigat.',
  },
  {
    id: '3',
    type: 'packhjälp',
    status: 'completed',
    date: '2024-11-10',
    time: '10:00',
    address: {
      street: 'Vallvägen 4 A',
      city: 'Upplands Väsby',
    },
    supplier: {
      id: 'moveit',
      name: 'Movelt Services AB',
      phone: '08-123 45 67',
    },
    price: {
      items: [
        { label: 'Packhjälp (8 timmar)', amount: 2400, isIncludedInRut: true },
        { label: 'Material - lådor, tejp, bubbelplast (ingår ej i RUT)', amount: 800, isIncludedInRut: false },
      ],
      subtotal: 3200,
      rutDeduction: 1200,
      rutPercentage: 50,
      total: 2000,
      currency: 'kr',
    },
    details: {
      duration: '8 timmar',
      materialIncluded: true,
      items: ['Hela hemmet', 'Material ingick'],
    },
    serviceDescription: 'RUT-avdraget görs direkt av underleverantören och reducerar din faktiska kostnad med 50% av arbetet. Material är inte RUT-berättigat.',
  },
  {
    id: '4',
    type: 'flyttstädning',
    status: 'completed',
    date: '2024-11-15',
    time: '08:00',
    address: {
      street: 'Göran Perssons väg 13',
      city: 'Solna',
    },
    supplier: {
      id: 'cleansmart',
      name: 'CleanSmart AB',
      phone: '070-555 12 34',
    },
    price: {
      items: [
        { label: 'Flyttstädning (89 m²)', amount: 2600, isIncludedInRut: true },
        { label: 'Material ingår', amount: 0, isIncludedInRut: false },
      ],
      subtotal: 2600,
      rutDeduction: 1300,
      rutPercentage: 50,
      total: 1300,
      currency: 'kr',
    },
    details: {
      area: '89 m²',
      materialIncluded: true,
    },
  },
  {
    id: '5',
    type: 'bredband',
    status: 'upcoming',
    date: '2024-12-20',
    time: '09:00-17:00',
    address: {
      street: 'Göran Perssons väg 13',
      city: 'Solna',
    },
    supplier: {
      id: 'telia',
      name: 'Telia',
      phone: '020-40 40 40',
    },
    price: {
      items: [
        { label: 'Installation', amount: 495, isIncludedInRut: false },
        { label: 'Bredband 100/100 Mbit/s (månadsavgift)', amount: 299, isIncludedInRut: false },
      ],
      subtotal: 794,
      total: 794,
      currency: 'kr',
    },
    details: {
      items: ['100/100 Mbit/s', 'Installation ingår', 'Ingen bindningstid'],
    },
  },
]
