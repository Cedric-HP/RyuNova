import { RefObject, useEffect, useState } from "react"

export const useWatchHeight= (observedEltRef: RefObject<HTMLDivElement | null>) => {

  const [height, setHeight] = useState<number>()

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

        if (observedEltRef.current.offsetHeight !== height) {
          setHeight(observedEltRef.current.offsetHeight)
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
    [height, observedEltRef],
  )

  return {
    observedEltHeight: height || 0,
  }
}