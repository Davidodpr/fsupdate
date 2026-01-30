import { TFunction } from 'i18next'
import { ActivityEnum } from '@/common/types/activity'

const getShowcleaningQuestionAndAnswer = (t: TFunction) => {
  const questionsAndAnswers = [
    {
      question: t('FAQ.SHOWCLEANING.whyOrder'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.SHOWCLEANING.whyOrderAnswer'),
        },
      ],
    },
    {
      question: t('FAQ.SHOWCLEANING.whatIsIncluded'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.SHOWCLEANING.whatIsIncludedAnswer'),
        },
        {
          type: 'link',
          value: {
            url: t('FAQ.SHOWCLEANING.whatIsIncludedAnswer_url'),
            text: t('FAQ.SHOWCLEANING.whatIsIncludedAnswer_url_text'),
          },
        },
      ],
    },
    {
      question: t('FAQ.SHOWCLEANING.whatHappensAfterOrder'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.SHOWCLEANING.whatHappensAfterOrderAnswer'),
        },
      ],
    },
  ]
  return questionsAndAnswers
}

const getMovcleanQuestionAndAnswer = (t: TFunction) => {
  const questionsAndAnswers = [
    {
      question: t('FAQ.MOVECLEAN.whyOrder'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.MOVECLEAN.whyOrderAnswer'),
        },
        {
          type: 'text',
          value: t('FAQ.MOVECLEAN.whyOrderAnswerText2'),
        },
        {
          type: 'link',
          value: {
            url: t('FAQ.MOVECLEAN.whyOrderAnswer_url'),
            text: t('FAQ.MOVECLEAN.whyOrderAnswer_url_text'),
          },
        },
      ],
    },
    {
      question: t('FAQ.MOVECLEAN.whatIsIncluded'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.MOVECLEAN.whatIsIncludedAnswer'),
        },
        {
          type: 'link',
          value: {
            url: t('FAQ.MOVECLEAN.whatIsIncludedAnswer_url'),
            text: t('FAQ.MOVECLEAN.whatIsIncludedAnswer_url_text'),
          },
        },
      ],
    },
    {
      question: t('FAQ.MOVECLEAN.whatHappensAfterOrder'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.MOVECLEAN.whatHappensAfterOrderAnswer'),
        },
      ],
    },
  ]
  return questionsAndAnswers
}

const getMovhelpQuestionAndAnswer = (t: TFunction) => {
  const questionsAndAnswers = [
    {
      question: t('FAQ.MOVEHELP.whyOrder'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.MOVEHELP.whyOrderAnswer'),
        },
        {
          type: 'text',
          value: t('FAQ.MOVEHELP.whyOrderAnswerText2'),
        },
        {
          type: 'link',
          value: {
            url: t('FAQ.MOVEHELP.whyOrderAnswer_url'),
            text: t('FAQ.MOVEHELP.whyOrderAnswer_url_text'),
          },
        },
      ],
    },
    {
      question: t('FAQ.MOVEHELP.whatIsIncluded'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.MOVEHELP.whatIsIncludedAnswer'),
        },
        {
          type: 'bullets',
          value: [
            t('FAQ.MOVEHELP.whatIsIncludedAnswer_2'),
            t('FAQ.MOVEHELP.whatIsIncludedAnswer_3'),
            t('FAQ.MOVEHELP.whatIsIncludedAnswer_4'),
            t('FAQ.MOVEHELP.whatIsIncludedAnswer_5'),
          ],
        },
        {
          type: 'text',
          value: t('FAQ.MOVEHELP.whatIsIncludedAnswer_6'),
        },
      ],
    },
    {
      question: t('FAQ.MOVEHELP.whatHappensAfterOrder'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.MOVEHELP.whatHappensAfterOrderAnswer'),
        },
      ],
    },
  ]
  return questionsAndAnswers
}

const getAddresschangeQuestionAndAnswer = (t: TFunction) => {
  const questionsAndAnswers = [
    {
      question: t('FAQ.ADDRESSCHANGE.whyOrder'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.ADDRESSCHANGE.whyOrderAnswer'),
        },
        {
          type: 'text',
          value: t('FAQ.ADDRESSCHANGE.whyOrderAnswerText_2'),
        },
        {
          type: 'bullets',
          value: [t('FAQ.ADDRESSCHANGE.whyOrderAnswerText_3'), t('FAQ.ADDRESSCHANGE.whyOrderAnswerText_4')],
        },
        {
          type: 'link',
          value: {
            url: t('FAQ.ADDRESSCHANGE.whyOrderAnswer_url'),
            text: t('FAQ.ADDRESSCHANGE.whyOrderAnswer_url_text'),
          },
        },
      ],
    },
    {
      question: t('FAQ.ADDRESSCHANGE.whatIsIncluded'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.ADDRESSCHANGE.whatIsIncludedAnswer'),
        },
        {
          type: 'text',
          value: t('FAQ.ADDRESSCHANGE.whatIsIncludedAnswer_2'),
        },
      ],
    },
    {
      question: t('FAQ.ADDRESSCHANGE.whatHappensAfterOrder'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.ADDRESSCHANGE.whatHappensAfterOrderAnswer'),
        },
      ],
    },
  ]
  return questionsAndAnswers
}

const getPowerQuestionAndAnswer = (t: TFunction) => {
  const questionsAndAnswers = [
    {
      question: t('FAQ.POWER.whyOrder'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.POWER.whyOrderAnswer'),
        },
        {
          type: 'text',
          value: t('FAQ.POWER.whyOrderAnswerText_2'),
        },
        {
          type: 'link',
          value: {
            url: t('FAQ.POWER.whyOrderAnswer_url'),
            text: t('FAQ.POWER.whyOrderAnswer_url_text'),
          },
        },
      ],
    },
    {
      question: t('FAQ.POWER.whatIsIncluded'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.POWER.whatIsIncludedAnswer'),
        },
        {
          type: 'text',
          value: t('FAQ.POWER.whatIsIncludedAnswer_2'),
        },
      ],
    },
    {
      question: t('FAQ.POWER.whatHappensAfterOrder'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.POWER.whatHappensAfterOrderAnswer'),
        },
        {
          type: 'bullets',
          value: [t('FAQ.POWER.whatHappensAfterOrderAnswer_2'), t('FAQ.POWER.whatHappensAfterOrderAnswer_3')],
        },
        {
          type: 'text',
          value: t('FAQ.POWER.whatHappensAfterOrderAnswer_4'),
        },
        {
          type: 'text',
          value: t('FAQ.POWER.whatHappensAfterOrderAnswer_5'),
        },
      ],
    },
  ]
  return questionsAndAnswers
}

const getInternetQuestionAndAnswer = (t: TFunction) => {
  const questionsAndAnswers = [
    {
      question: t('FAQ.INTERNET.whyOrder'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.INTERNET.whyOrderAnswer'),
        },
        {
          type: 'text',
          value: t('FAQ.INTERNET.whyOrderAnswerText_2'),
        },
        {
          type: 'link',
          value: {
            url: t('FAQ.INTERNET.whyOrderAnswer_url'),
            text: t('FAQ.INTERNET.whyOrderAnswer_url_text'),
          },
        },
      ],
    },
    {
      question: t('FAQ.INTERNET.whatIsIncluded'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.INTERNET.whatIsIncludedAnswer'),
        },
        {
          type: 'text',
          value: t('FAQ.INTERNET.whatIsIncludedAnswer_2'),
        },
        {
          type: 'link',
          value: {
            url: t('FAQ.INTERNET.whatIsIncludedAnswer_url'),
            text: t('FAQ.INTERNET.whatIsIncludedAnswer_url_text'),
          },
        },
      ],
    },
    {
      question: t('FAQ.INTERNET.whatHappensAfterOrder'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.INTERNET.whatHappensAfterOrderAnswer'),
        },
        {
          type: 'text',
          value: t('FAQ.INTERNET.whatHappensAfterOrderAnswer_2'),
        },
      ],
    },
  ]
  return questionsAndAnswers
}

const getHomeAlarmQuestionAndAnswer = (t: TFunction) => {
  const questionsAndAnswers = [
    {
      question: t('FAQ.HOMEALARM.whyOrder'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.HOMEALARM.whyOrderAnswer'),
        },
        {
          type: 'text',
          value: t('FAQ.HOMEALARM.whyOrderAnswerText_2'),
        },
        {
          type: 'text',
          value: t('FAQ.HOMEALARM.whyOrderAnswerText_3'),
        },
      ],
    },
    {
      question: t('FAQ.HOMEALARM.whatIsIncluded'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.HOMEALARM.whatIsIncludedAnswer'),
        },
        {
          type: 'text',
          value: t('FAQ.HOMEALARM.whatIsIncludedAnswer_2'),
        },
        {
          type: 'bullets',
          value: [
            t('FAQ.HOMEALARM.whatIsIncludedAnswer_3'),
            t('FAQ.HOMEALARM.whatIsIncludedAnswer_4'),
            t('FAQ.HOMEALARM.whatIsIncludedAnswer_5'),
            t('FAQ.HOMEALARM.whatIsIncludedAnswer_6'),
          ],
        },
      ],
    },
  ]
  return questionsAndAnswers
}

const getHomeCleaningQuestionAndAnswer = (t: TFunction) => {
  const questionsAndAnswers = [
    {
      question: t('FAQ.HOMECLEANING.whyOrder'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.HOMECLEANING.whyOrderAnswer'),
        },
        {
          type: 'text',
          value: t('FAQ.HOMECLEANING.whyOrderAnswerText_2'),
        },
        {
          type: 'link',
          value: {
            url: t('FAQ.INTERNET.whyOrderAnswer_url'),
            text: t('FAQ.INTERNET.whyOrderAnswer_url_text'),
          },
        },
      ],
    },
    {
      question: t('FAQ.HOMECLEANING.whatIsIncluded'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.HOMECLEANING.whatIsIncludedAnswer'),
        },
        {
          type: 'text',
          value: t('FAQ.HOMECLEANING.whatIsIncludedAnswer_2'),
        },
        {
          type: 'text',
          value: t('FAQ.HOMECLEANING.whatIsIncludedAnswer_3'),
        },
      ],
    },
    {
      question: t('FAQ.HOMECLEANING.whatHappensAfterOrder'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.HOMECLEANING.whatHappensAfterOrderAnswer'),
        },
        {
          type: 'link',
          value: {
            url: t('FAQ.INTERNET.whatHappensAfterOrder_url'),
            text: t('FAQ.INTERNET.whatHappensAfterOrder_url_text'),
          },
        },
      ],
    },
  ]
  return questionsAndAnswers
}

const getHomeFixQuestionAndAnswer = (t: TFunction) => {
  const questionsAndAnswers = [
    {
      question: t('FAQ.HOMEFIX.whyOrder'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.HOMEFIX.whyOrderAnswer'),
        },
        {
          type: 'text',
          value: t('FAQ.HOMEFIX.whyOrderAnswerText_2'),
        },
      ],
    },
    {
      question: t('FAQ.HOMEFIX.whatIsIncluded'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.HOMEFIX.whatIsIncludedAnswer'),
        },
        {
          type: 'text',
          value: t('FAQ.HOMEFIX.whatIsIncludedAnswer_2'),
        },
      ],
    },
    {
      question: t('FAQ.HOMEFIX.whatHappensAfterOrder'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.HOMEFIX.whatHappensAfterOrderAnswer'),
        },
        {
          type: 'text',
          value: t('FAQ.HOMEFIX.whatHappensAfterOrderAnswer_2'),
        },
        {
          type: 'text',
          value: t('FAQ.HOMEFIX.whatHappensAfterOrderAnswer_3'),
        },
        {
          type: 'text',
          value: t('FAQ.HOMEFIX.whatHappensAfterOrderAnswer_4'),
        },
      ],
    },
  ]
  return questionsAndAnswers
}

const getDefaultQuestionAndAnswer = (t: TFunction) => {
  const questionsAndAnswers = [
    {
      question: t('FAQ.DEFAULT.whyOrder'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.DEFAULT.whyOrderAnswer'),
        },
        {
          type: 'link',
          value: {
            url: t('FAQ.DEFAULT.whyOrderAnswer_url'),
            text: t('FAQ.DEFAULT.whyOrderAnswer_url_text'),
          },
        },
      ],
    },
    {
      question: t('FAQ.DEFAULT.whatIsIncluded'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.DEFAULT.whatIsIncludedAnswer'),
        },
        {
          type: 'text',
          value: t('FAQ.DEFAULT.whatIsIncludedAnswer_2'),
        },
        {
          type: 'text',
          value: t('FAQ.DEFAULT.whatIsIncludedAnswer_3'),
        },
      ],
    },
    {
      question: t('FAQ.DEFAULT.whatHappensAfterOrder'),
      answer: [
        {
          type: 'text',
          value: t('FAQ.DEFAULT.whatHappensAfterOrderAnswer'),
        },
        {
          type: 'text',
          value: t('FAQ.DEFAULT.whatHappensAfterOrderAnswer_2'),
        },
        {
          type: 'link',
          value: {
            url: t('FAQ.DEFAULT.whatHappensAfterOrder_url'),
            text: t('FAQ.DEFAULT.whatHappensAfterOrder_url_text'),
          },
        },
      ],
    },
  ]
  return questionsAndAnswers
}

export const getFaqForServices = (t: TFunction, service: (typeof ActivityEnum)[keyof typeof ActivityEnum] | 'default') => {
  switch (service) {
    case ActivityEnum.SHOWCLEANING:
      return getShowcleaningQuestionAndAnswer(t)
    case ActivityEnum.MOVECLEAN:
      return getMovcleanQuestionAndAnswer(t)
    case ActivityEnum.MOVEHELP:
      return getMovhelpQuestionAndAnswer(t)
    case ActivityEnum.ADDRESSCHANGE:
      return getAddresschangeQuestionAndAnswer(t)
    case ActivityEnum.POWER:
      return getPowerQuestionAndAnswer(t)
    case ActivityEnum.INTERNET:
      return getInternetQuestionAndAnswer(t)
    case ActivityEnum.HOMEALARM:
      return getHomeAlarmQuestionAndAnswer(t)
    case ActivityEnum.HOMECLEANING:
      return getHomeCleaningQuestionAndAnswer(t)
    case ActivityEnum.HOMEFIX:
      return getHomeFixQuestionAndAnswer(t)
    default:
      return getDefaultQuestionAndAnswer(t)
  }
}
