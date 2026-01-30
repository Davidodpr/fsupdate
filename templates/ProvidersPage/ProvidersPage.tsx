'use client'

import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAsync, useDebounce } from 'react-use'
import { clsx } from 'clsx'
import Link from 'next/link'
import { MoveServiceOrder } from '@/common/enums/MoveServicesEnum'
import createFetchInstance from '@/common/utils/api'
import Box from '@/components/atoms/Box'
import Flex from '@/components/atoms/Flex'
import H3 from '@/components/atoms/H3'
import Paper from '@/components/atoms/Paper'
import Popup from '@/components/atoms/Popup'
import QuestionMark from '@/public/images/Question_green.svg'
import { Autocomplete } from '@/templates/Insurance/CustomAutoComplete'
import { autocompleteStyledVariants, wrapperVariants, listItemVariants, infoVariants } from './ProvidersPage.variants'

type ServiceType = 'moving' | 'cleaning'

type Provider = {
  name: string
  displayName: string
  serviceTypes: ServiceType[]
}

type ProviderResponse = {
  address: string
  providers: Provider[]
}

type AreaResponse = {
  name: string
  countyCode: string
  code: string
}[]

export const ProvidersPage = () => {
  const fetchInstance = createFetchInstance('GET')
  const { t } = useTranslation(['provider', 'common'])

  const [municipalities, setMunicipalities] = useState<AreaResponse>([])
  const [result, setResult] = useState<AreaResponse>([])
  const [providers, setProviders] = useState<ProviderResponse | null>(null)

  const [val, setVal] = useState('')
  const [search, setSearch] = useState('')

  useAsync(async () => {
    const municipalitiesResponse = await fetchInstance<AreaResponse>('/public/service-providers/area/municipalities')
    setMunicipalities(municipalitiesResponse)
  }, [])

  const onChange = useCallback(
    (value: string | undefined) => {
      setVal(value || '')
    },
    [setVal],
  )

  useAsync(async () => {
    if (!search) {
      return
    }
    const municipalitiy = municipalities.find((x) => x.name === search)
    const response = await fetchInstance<ProviderResponse>(
      `/public/service-providers/`,
      {},
      {
        'types[]': [MoveServiceOrder.MOVING, MoveServiceOrder.CLEANING],
        countyCode: municipalitiy?.countyCode,
        municipalityCode: municipalitiy?.code,
      },
    )
    setProviders(response)
  }, [search, municipalities])
  useDebounce(
    () => {
      if (!val) return
      const debouncedResult = municipalities.filter((x) => x.name.toUpperCase().startsWith(val.toUpperCase())).slice(0, 5)
      setResult(debouncedResult)
    },
    100,
    [val, municipalities],
  )

  const onSelect = useCallback(
    (value: string) => {
      setSearch(value)
    },
    [setSearch],
  )

  return (
    <div className={wrapperVariants()}>
      <Paper className="p-4">
        <H3 textAlign="center">{t('PROVIDERS_PAGE.findProvider')}</H3>
        <Flex direction="column" alignItems="start" className="gap-2 sm:flex-row sm:items-center">
          <Flex className="flex-grow w-full">
            <Autocomplete
              className={autocompleteStyledVariants()}
              onChange={onChange}
              items={result.map((loc) => ({ label: loc.name, value: loc.name }))}
              label={t('PROVIDERS_PAGE.municipality')}
              onSelect={onSelect}
              value={val}
              noLastLink
              endIcon={
                <Popup text={t('PROVIDERS_PAGE.municipalityInfo')}>
                  <QuestionMark />
                </Popup>
              }
            />
          </Flex>
        </Flex>
        <div>
          {providers?.providers.map((provider, index) => {
            return (
              <Flex key={`${provider.name}-${index}`} className={listItemVariants()}>
                <Flex direction="column">
                  <Box className="font-bold text-[15px]">{provider.displayName}</Box>
                  <Box className="text-xs text-inactive-dark">
                    {provider?.serviceTypes?.includes(MoveServiceOrder.MOVING) && t('common:ACTIVITIES.movehelp')}
                    {provider?.serviceTypes?.includes(MoveServiceOrder.CLEANING) && provider?.serviceTypes?.includes('moving') && ', '}
                    {provider?.serviceTypes?.includes(MoveServiceOrder.CLEANING) && t('common:moveclean')}
                  </Box>
                </Flex>
              </Flex>
            )
          })}
        </div>
        {providers?.providers?.length === 0 && (
          <Box textAlign="center" className={clsx(infoVariants(), 'mt-8')}>
            {t('PROVIDERS_PAGE.noProvidersFound')}
          </Box>
        )}
        <Box textAlign="center" className="mt-8">
          <Link
            href={`mailto:${t('PROVIDERS_PAGE.suggestProviderEmail')}?subject=${t('PROVIDERS_PAGE.suggestProviderEmailSubject')}&body=${t('PROVIDERS_PAGE.emailBody')?.replace(
              /\n/g,
              '%0D%0A',
            )}`}
          >
            {t('PROVIDERS_PAGE.suggestProvider')}
          </Link>
        </Box>
      </Paper>
    </div>
  )
}
