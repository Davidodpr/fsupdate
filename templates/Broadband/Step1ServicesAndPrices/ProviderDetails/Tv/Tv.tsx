import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { useBroadbandProvider } from '@/common/context/broadband/broadbandProvider.provider'
import useResponsive from '@/common/hooks/useResponsive'
import Flex from '@/components/atoms/Flex'
import Text from '@/components/atoms/Text'
import Popup from '@/components/molecules/PopupNew'
import { tvChannelsVariants, tvChannelIconsWrapperVariants } from './Tv.variants'

export type TvProps = {
  tvDetails?: OfferAdditionalProduct
}

const Tv = ({ tvDetails }: TvProps) => {
  const { t } = useTranslation(['broadband', 'common'])
  const { channels, streamingServices } = useBroadbandProvider()
  const { isTabletPortraitOrGreater } = useResponsive()
  const tvLogos = channels && channels?.filter((channel) => channel?.availableInTvPackages?.included?.find((included) => included?.name === tvDetails?.name))
  const isLogosHd = tvLogos?.map((channel) => channel?.availableInTvPackages?.included?.find((included) => included?.name === tvDetails?.name)?.isHD)
  const numberOfSelectableChannels = tvDetails?.extraData?.selectableNrOfChannels
  const selectableChannelsLogos = channels && channels?.filter((channel) => channel?.availableInTvPackages?.selectable?.find((included) => included?.name === tvDetails?.name))
  const isSelectableChannelsLogosHd = tvLogos?.map((channel) => channel?.availableInTvPackages?.selectable?.find((included) => included?.name === tvDetails?.name)?.isHD)
  const streamingServicesLogos =
    streamingServices && streamingServices?.filter((channel) => channel?.availableInTvPackages?.included?.find((included) => included?.name === tvDetails?.name))

  const getPopupText = (channelName: string, channelDescription: string) => {
    return (
      <div>
        <Text variant="bodyBold" spacing="bottom" style={{ marginBottom: 8 }}>
          {channelName}
        </Text>
        <Text variant="body">{channelDescription}</Text>
      </div>
    )
  }

  return (
    <>
      <div className={tvChannelsVariants()}>
        {tvLogos && tvLogos.length > 0 ? (
          <div className={tvChannelIconsWrapperVariants()}>
            {tvLogos?.map((channel, index) => {
              return (
                <>
                  {isTabletPortraitOrGreater ? (
                    <Popup
                      text={
                        isLogosHd && channel?.hdDescription && channel?.hdDisplayName
                          ? getPopupText(channel?.hdDisplayName, channel?.hdDescription)
                          : getPopupText(channel?.displayName, channel?.description)
                      }
                    >
                      <Image
                        src={isLogosHd && channel?.hdLogo?.url?.length ? channel?.hdLogo?.url : channel?.logo?.url}
                        width={40}
                        height={40}
                        layout="intrinsic"
                        key={`${channel}${index}`}
                        alt={isLogosHd && channel?.hdDisplayName?.length ? channel?.hdDisplayName : channel?.displayName}
                      />
                    </Popup>
                  ) : (
                    <Image
                      src={isLogosHd && channel?.hdLogo?.url?.length ? channel?.hdLogo?.url : channel?.logo?.url}
                      width={40}
                      height={40}
                      layout="intrinsic"
                      key={`${channel}${index}`}
                      alt={isLogosHd && channel?.hdDisplayName?.length ? channel?.hdDisplayName : channel?.displayName}
                    />
                  )}
                </>
              )
            })}
          </div>
        ) : (
          <Flex direction="row" justifyContent="start" alignItems="center">
            <Text variant="body" spacing="less">
              {t('STEPTWO.tvChannelBundle')}
            </Text>
            <Text variant="bodyBold" spacing="less" style={{ marginLeft: 8 }}>
              {t('STEPTWO.tvChannelsIncluded')}
            </Text>
          </Flex>
        )}
        {numberOfSelectableChannels && numberOfSelectableChannels > 0 && selectableChannelsLogos?.length ? (
          <>
            <Text variant="body" spacing="top">
              {t('STEPTWO.selectableChannels', { channelLength: numberOfSelectableChannels.toString() })}
            </Text>
            <div className={tvChannelIconsWrapperVariants()}>
              {selectableChannelsLogos?.map((channel, index) => (
                <>
                  {isTabletPortraitOrGreater ? (
                    <Popup text={getPopupText(channel?.displayName, channel?.description)}>
                      <Image src={channel?.logo?.url} width={40} height={40} layout="intrinsic" key={`${channel}${index}`} alt={channel?.logo?.title} />
                    </Popup>
                  ) : (
                    <Image src={channel?.logo?.url} width={40} height={40} layout="intrinsic" key={`${channel}${index}`} alt={channel?.logo?.title} />
                  )}
                </>
              ))}
            </div>
          </>
        ) : null}
        {streamingServicesLogos && streamingServicesLogos?.length > 0 ? (
          <>
            <Text variant="body" spacing="top">
              {t('STEPTWO.streamingServicesIncluded')}
            </Text>
            <div className={tvChannelIconsWrapperVariants()}>
              {streamingServicesLogos?.map((channel, index) => (
                <>
                  {isTabletPortraitOrGreater ? (
                    <Popup
                      text={
                        isSelectableChannelsLogosHd && channel?.hdDescription && channel?.hdDisplayName
                          ? getPopupText(channel?.hdDisplayName, channel?.hdDescription)
                          : getPopupText(channel?.displayName, channel?.description)
                      }
                    >
                      <Image
                        src={isSelectableChannelsLogosHd && channel?.hdLogo?.url?.length ? channel?.hdLogo?.url : channel?.logo?.url}
                        width={40}
                        height={40}
                        layout="intrinsic"
                        key={`${channel}${index}`}
                        alt={isSelectableChannelsLogosHd && channel?.hdDisplayName?.length ? channel?.hdDisplayName : channel?.displayName}
                      />
                    </Popup>
                  ) : (
                    <Image
                      src={isSelectableChannelsLogosHd && channel?.hdLogo?.url?.length ? channel?.hdLogo?.url : channel?.logo?.url}
                      width={40}
                      height={40}
                      layout="intrinsic"
                      key={`${channel}${index}`}
                      alt={isSelectableChannelsLogosHd && channel?.hdDisplayName?.length ? channel?.hdDisplayName : channel?.displayName}
                    />
                  )}
                </>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  )
}

export default Tv
