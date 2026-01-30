import { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebounce } from 'react-use'
import { clsx } from 'clsx'
import Link from 'next/link'
import loadSuppliersOptions from '@/common/api/getInsuranceSuppliers'
import useResponsive from '@/common/hooks/useResponsive'
import Flex from '@/components/atoms/Flex'
import Text from '@/components/atoms/Text'
import Envelope from '@/public/images/Envelope_outline.svg'
import Globe from '@/public/images/Globe.svg'
import PhoneIcon from '@/public/images/Phone_outline.svg'
import QuestionMarkGray from '@/public/images/Question_gray.svg'
import { Autocomplete } from './CustomAutoComplete'
import { styledFlexContainerVariants, styledNoSupplierContainerVariants, styledLinkVariants, contactTextPartVariants, autocompleteStyledVariants } from './SupplierSection.variants'

export const SupplierSection = () => {
  const [allSuppliers, setAllSuppliers] = useState<InsuranceSupplier[] | []>([])
  const [val, setVal] = useState('')
  const [result, setResult] = useState<InsuranceSupplier[] | []>([])
  const [selectedSupplier, setSelectedSupplier] = useState<InsuranceSupplier>()
  const { isTabletPortraitOrGreater } = useResponsive()

  const { t } = useTranslation(['insurance', 'common'])

  useEffect(() => {
    const getSuppliers = async () => {
      const suppliers = await loadSuppliersOptions()
      if (suppliers?.length) {
        setAllSuppliers(suppliers)
        setResult(suppliers)
      }
    }
    if (!allSuppliers.length) getSuppliers()
  }, [allSuppliers])

  const onChange = useCallback(
    (value: string | undefined) => {
      setVal(value ?? '')
    },
    [setVal],
  )

  useDebounce(
    () => {
      if (!val?.length) return setResult(allSuppliers)
      const debouncedResult = allSuppliers.filter((x) => x.name.toUpperCase().startsWith(val.toUpperCase()))
      if (debouncedResult.length === 0) {
        setResult([])
        setSelectedSupplier(undefined)
      } else setResult(debouncedResult)
    },
    100,
    [val, allSuppliers],
  )

  const onSelect = useCallback(
    (value: string) => {
      const provider = allSuppliers.find((x) => x.name === value)
      if (provider?.name) setSelectedSupplier(provider)
    },
    [setSelectedSupplier, allSuppliers],
  )

  return (
    <>
      <Flex direction={isTabletPortraitOrGreater ? 'row' : 'column'} style={{ width: '100%', padding: '32px 0px' }}>
        <Flex direction="column" className={`${isTabletPortraitOrGreater ? 'w-[311px] pr-8' : 'w-full'}`}>
          <Text spacing="none" variant="bodyBold">
            {t('currentInsuranceCompany')}
          </Text>
          <Autocomplete
            className={autocompleteStyledVariants()}
            noLastLink
            onChange={onChange}
            items={result.map((loc) => ({ label: loc.name, value: loc.name }))}
            label={t('insuranceCompany')}
            onSelect={onSelect}
            value={val}
          />
        </Flex>
        {!!selectedSupplier?.id?.length && (
          <Flex className={styledFlexContainerVariants()} direction="column">
            <Text style={{ marginBottom: '12px' }} spacing="none" variant="bodyBold">
              {t('chooseAlternativ')}
            </Text>
            {!!t(`PROVIDERDETAILS.${selectedSupplier.name}.phone`)?.length && (
              <Flex style={{ padding: '4px 0' }} alignItems="center">
                <PhoneIcon style={{ marginRight: 5 }} />
                <Text spacing="none">{t('phoneCopy')}</Text>
                <Text className={contactTextPartVariants()} spacing="none" variant="bodyBold">
                  <Link className={styledLinkVariants()} href={`tel:${t(`PROVIDERDETAILS.${selectedSupplier.name}.phone`)}`}>
                    {t(`PROVIDERDETAILS.${selectedSupplier.name}.phone`)}
                  </Link>
                </Text>
              </Flex>
            )}
            {!!t(`PROVIDERDETAILS.${selectedSupplier.name}.email`)?.length && (
              <Flex style={{ padding: '4px 0' }} alignItems="center">
                <Envelope style={{ marginRight: 5 }} />
                <Text spacing="none">{t('emailCopy')}</Text>
                <Text className={contactTextPartVariants()} spacing="none" variant="bodyBold">
                  <Link className={styledLinkVariants()} href={`mailto:${t(`PROVIDERDETAILS.${selectedSupplier.name}.email`)}`}>
                    {t(`PROVIDERDETAILS.${selectedSupplier.name}.email`)}
                  </Link>
                </Text>
              </Flex>
            )}
            {!!t(`PROVIDERDETAILS.${selectedSupplier.name}.website`)?.length && (
              <Flex style={{ padding: '4px 0' }} alignItems="center">
                <Globe width={22} height={22} style={{ marginRight: 5 }} />
                <Text className={contactTextPartVariants()} spacing="none" variant="bodyBold">
                  <Link className={styledLinkVariants()} target="_blank" href={t(`PROVIDERDETAILS.${selectedSupplier.name}.website`)}>
                    {t(`PROVIDERDETAILS.${selectedSupplier.name}.websiteCopy`)}
                  </Link>
                </Text>
              </Flex>
            )}
          </Flex>
        )}
        {!selectedSupplier?.id?.length && !result.length && allSuppliers?.length > 0 && (
          <Flex className={styledNoSupplierContainerVariants()} justifyItems="center" alignItems="center">
            <div style={{ width: 32, height: 32 }}>
              <QuestionMarkGray width={32} height={32} />
            </div>
            <Text style={{ marginLeft: 12, width: '100%', color: 'var(--fs-colors-inactiveDark)' }} spacing="none">
              {t('noSupplier')}
            </Text>
          </Flex>
        )}
      </Flex>
    </>
  )
}

export default SupplierSection
