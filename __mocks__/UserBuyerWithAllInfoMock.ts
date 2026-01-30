export const userBuyerWithAllInfoMock = {
  currentMove: {
    id: 'b6423fbc-1872-4be8-b8b2-be5194e70846',
    fromAddress: {
      street: 'Karlavägen 25',
      apartmentNumber: null,
      zip: '11431',
      city: 'Stockholm',
    },
    toAddress: {
      street: 'Karlavägen 19',
      apartmentNumber: null,
      zip: '11366',
      city: 'STOCKHOLM',
    },
    movingDate: null,
    residenceType: 'apartment',
    residenceSize: 192,
    fromResidenceSize: 80,
    apartmentType: null,
    wizardDone: false,
    power: {
      state: 'not_started',
    },
    insurance: {
      state: 'not_started',
    },
    internet: {
      state: 'not_started',
    },
    addresschange: {
      state: 'not_started',
    },
    movehelp: {
      state: 'not_started',
    },
    moveclean: {
      state: 'not_started',
    },
    movehelpCombined: {
      state: 'not_started',
    },
    moveDiy: {
      state: 'not_started',
    },
    diy: {
      state: 'not_started',
    },
    createdAt: '2023-08-25T08:31:07.535Z',
    updatedAt: '2023-08-25T08:31:07.544Z',
    addressStatus: 'empty',
  },
  profile: {
    id: '229e865d-45fa-47ef-b9c9-2199c92fcca5',
    pno: '194006159752',
    firstName: 'Köppe',
    lastName: 'Köparsson',
    fullName: 'Köppe Köparsson',
    meta: {
      onboardingChannel: 'email',
    },
    createdAt: '2023-08-21T00:00:00.000Z',
    updatedAt: '2023-08-21T00:00:00.000Z',
    intercomHash: 'a9b094f96fdfcef51b8d3898d2589e95052248bb89c8493a0935ba8ba0f9b607',
    leadDetails: {
      id: '0be997c6-9b14-4c50-90ee-7ba99e503e8e',
      brokerOfficeId: null,
      brokerOfficePersonName: 'Micke Mäklarsson',
      sourceSystem: 'fastighetsbyran',
      pno: '194006159752',
      type: 'buyer',
    },
  },
  contact: {
    email: 'test@test.se',
    emailVerified: false,
    phone: '+46707554433',
  },
  domesticServicesBalance: {
    data: null,
    isBankIdLoading: false,
  },
  currentMoveLoading: false,
  hasFetchedData: true,
}

export const userBuyerMissingContactInfoMock = { ...userBuyerWithAllInfoMock, contact: { email: null, emailVerified: false, phone: null } }
