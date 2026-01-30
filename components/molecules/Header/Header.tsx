import { headerFrameVariants, headerWrapperVariants, headerTextVariants, type HeaderWrapperVariants, type HeaderTextVariants } from './Header.variants'

export type HeaderProps = HeaderWrapperVariants &
  HeaderTextVariants & {
    children: string | React.ReactNode
    withoutSpacingTop?: boolean
  }

export const Header = ({ children, withoutSpacingTop }: HeaderProps) => {
  return (
    <div className={headerFrameVariants()}>
      <div className={headerWrapperVariants({ withoutSpacingTop })}>
        <h1 className={headerTextVariants({ withoutSpacingTop })}>{children}</h1>
      </div>
    </div>
  )
}
