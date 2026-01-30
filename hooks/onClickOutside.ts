import { EventHandler, RefObject, SyntheticEvent, useEffect } from 'react'

// Hook recipe from: https://usehooks.com/useOnClickOutside/
// eslint-disable-next-line max-params
export default function useOnClickOutside(ref: RefObject<HTMLElement | null>, openerRef: RefObject<HTMLElement | null>, handler: EventHandler<SyntheticEvent<Element, Event>>) {
  useEffect(
    () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const listener = (event: any) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target) || !openerRef.current || openerRef.current.contains(event.target)) {
          return
        }

        handler(event)
      }
      if (ref && ref.current) {
        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)
      }

      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler],
  )
}
