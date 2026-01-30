import React from 'react'
import Image from 'next/image'
import { headerContainerVariants, logoWrapperVariants, logoImageVariants, logoSeparatorVariants, dividerLineVariants } from './LogoHeader.variants'

interface LogoHeaderProps {
  logoSrc: string
  logoAlt: string
  secondaryLogoSrc?: string
  secondaryLogoAlt?: string
  showDivider?: boolean
  logoHeight?: string
}

export const LogoHeader: React.FC<LogoHeaderProps> = ({ logoSrc, logoAlt, secondaryLogoSrc, secondaryLogoAlt, showDivider = true, logoHeight = '32px' }) => {
  // Parse the height to get numeric value for Next Image
  const heightValue = parseInt(logoHeight.replace(/[^0-9]/g, ''), 10) || 32

  return (
    <div className={headerContainerVariants()}>
      <div className={logoWrapperVariants()}>
        <div style={{ height: logoHeight, position: 'relative', display: 'inline-block' }}>
          <Image
            className={logoImageVariants({ type: 'primary' })}
            src={logoSrc}
            alt={logoAlt}
            height={heightValue}
            width={heightValue * 5} // Set a reasonable max width, actual width controlled by CSS
            style={{
              height: logoHeight,
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
        {secondaryLogoSrc && (
          <>
            <span className={logoSeparatorVariants()}>×</span>
            <div style={{ height: logoHeight, position: 'relative', display: 'inline-block' }}>
              <Image
                className={logoImageVariants({ type: 'secondary' })}
                src={secondaryLogoSrc}
                alt={secondaryLogoAlt || 'Secondary logo'}
                height={heightValue}
                width={heightValue * 5} // Set a reasonable max width, actual width controlled by CSS
                style={{
                  height: logoHeight,
                  width: 'auto',
                  objectFit: 'contain'
                }}
              />
            </div>
          </>
        )}
      </div>
      {showDivider && <div className={dividerLineVariants()} />}
    </div>
  )
}

export default LogoHeader
