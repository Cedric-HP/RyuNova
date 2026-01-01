import { RefObject, useEffect, useState } from "react"

export const useWatchWidth= (observedEltRef: RefObject<HTMLDivElement | null>) => {

  const [width, setWidth] = useState<number>()

  useEffect(
    () => {
      if (!observedEltRef.current) {
        // we do not initialize the observer unless the ref has
        // been assigned
        return
      }

      // we also instantiate the resizeObserver and we pass
      // the event handler to the constructor
      const resizeObserver = new ResizeObserver(() => {
        if (!observedEltRef.current) {
          return
        }

        if (observedEltRef.current.offsetWidth !== width) {
          setWidth(observedEltRef.current.offsetWidth)
        }
      })

      // the code in useEffect will be executed when the component
      // has mounted, so we are certain observedDiv.current will contain
      // the div we want to observe
      resizeObserver.observe(observedEltRef.current)

      // if useEffect returns a function, it is called right before the
      // component unmounts, so it is the right place to stop observing
      // the div
      return function cleanup() {
        resizeObserver.disconnect()
      }
    },
    // only update the effect if the ref element changed
    [width, observedEltRef],
  )

  return {
    observedEltWidth: width || 0,
  }
}