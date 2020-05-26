import { useState, useEffect } from "react"

// from https://usehooks.com/useWindowSize/
export default function useWindowSize() {
    const isClient = process.browser

    const getSize = () =>
        isClient
            ? {
                  width: window.innerWidth,
                  height: window.innerHeight,
              }
            : {}

    const [windowSize, setWindowSize] = useState(getSize)

    useEffect(() => {
        if (!isClient) return false

        // debounce to fire at max every 100ms to avoid layout thrashing
        let waited = true
        const handleResize = () => {
            if (waited) {
                waited = false
                setWindowSize(getSize())
                setTimeout(() => (waited = true), 100)
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, []) // Empty array ensures that effect is only run on mount and unmount

    return windowSize
}
