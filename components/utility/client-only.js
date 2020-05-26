import { useState, useEffect } from "react"

// from https://joshwcomeau.com/react/the-perils-of-rehydration/
export default function ClientOnly({ children, ...delegated }) {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    if (!hasMounted) return null

    return <div {...delegated}>{children}</div>
}
