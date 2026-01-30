import { RefObject } from 'react'

const scroll = (ref?: RefObject<HTMLElement>) => {
  ref?.current?.scrollIntoView({
    behavior: 'smooth',
  })
}

export default scroll
