import initTranslations from 'i18n'
import TranslationsProvider from 'providers/TranslationProvider'
import getI18nNamespaces from '@/appComponents/getI18nNamespaces'
import { ErrorPage } from '@/components/molecules/ErrorPage'
import { PageLayoutClient } from '@/layoutComponents/PageLayoutClient'
import StyledFlex from './_components/StyledLayoutFlex'
import TopNav from './_components/topNav/index'

export const dynamic = 'force-dynamic'

const i18nNamespaces = getI18nNamespaces('error')

export default async function NotFound() {
  const { resources } = await initTranslations('sv', i18nNamespaces)
  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={'sv'} resources={resources}>
      <StyledFlex>
        <TopNav isServerMobile={false} />
        <PageLayoutClient>
          {
            <div style={{ marginTop: '30px' }}>
              <ErrorPage withInternalSubs title={'generalErrorHeader'} subTitleOne={'generalErrorSubtitle'} subTitleTwo={'generalErrorSubtitleTwo'} />
            </div>
          }
        </PageLayoutClient>
      </StyledFlex>
    </TranslationsProvider>
  )
}
