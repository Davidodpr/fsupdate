import { useRef } from 'react'

export const useFocus = () => {
  const htmlElRef = useRef<HTMLDivElement>(null)
  const setFocus = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    htmlElRef.current && (htmlElRef.current as any).focus()
  }

  return { htmlElRef, setFocus }
}
