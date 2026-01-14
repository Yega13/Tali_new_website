import { useState, useEffect } from 'react'

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia(query).matches
        }
        return false
    })

    useEffect(() => {
        const mediaQuery = window.matchMedia(query)

        const handleChange = (e) => {
            setMatches(e.matches)
        }

        // Set initial value
        setMatches(mediaQuery.matches)

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [query])

    return matches
}

// Predefined breakpoints
export function useIsMobile() {
    return useMediaQuery('(max-width: 1023px)')
}

export function useIsTablet() {
    return useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
}

export function useIsDesktop() {
    return useMediaQuery('(min-width: 1024px)')
}

// Check if device supports hover (desktop with mouse)
export function useCanHover() {
    return useMediaQuery('(hover: hover) and (pointer: fine)')
}
