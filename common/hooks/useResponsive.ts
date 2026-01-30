import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { BREAKPOINTS } from 'constants/responsive'
import useLayoutEffect from './useIsomorphicLayoutEffect'

function useResponsive() {
  const [isClient, setIsClient] = useState(false)

  const isMobileOrGreater = useMediaQuery({
    minWidth: BREAKPOINTS.xxs,
  })

  const isTabletPortraitOrGreater = useMediaQuery({
    minWidth: BREAKPOINTS.sm,
  })

  const isTabletLandscapeOrGreater = useMediaQuery({
    minWidth: BREAKPOINTS.md,
  })

  const isDesktopOrGreater = useMediaQuery({
    minWidth: BREAKPOINTS.lg,
  })
  const isDesktopOrGreaterXl = useMediaQuery({
    minWidth: BREAKPOINTS.xl,
  })
  const isDesktopOrGreaterXxl = useMediaQuery({
    minWidth: BREAKPOINTS.xxl,
  })

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') setIsClient(true)
  }, [])

  return {
    isMobileOrGreater: isClient ? isMobileOrGreater : false,
    isTabletPortraitOrGreater: isClient ? isTabletPortraitOrGreater : false,
    isTabletLandscapeOrGreater: isClient ? isTabletLandscapeOrGreater : false,
    isDesktopOrGreater: isClient ? isDesktopOrGreater : false,
    isDesktopOrGreaterXl: isClient ? isDesktopOrGreaterXl : false,
    isDesktopOrGreaterXxl: isClient ? isDesktopOrGreaterXxl : false,
    isClient,
  }
}

export default useResponsive
