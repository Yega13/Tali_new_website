import { useState, useEffect } from 'react'

const PRELOADER_KEY = 'tali-preloader-shown'

export function usePreloader(duration = 2500) {
    const [isLoading, setIsLoading] = useState(() => {
        // Check if preloader was already shown in this session
        const shown = sessionStorage.getItem(PRELOADER_KEY)
        return !shown
    })

    const [isAnimating, setIsAnimating] = useState(true)

    useEffect(() => {
        if (!isLoading) {
            setIsAnimating(false)
            return
        }

        // Mark as shown in session storage
        sessionStorage.setItem(PRELOADER_KEY, 'true')

        // Start fade out after duration
        const timer = setTimeout(() => {
            setIsAnimating(false)
            // Give time for exit animation
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
        }, duration)

        return () => clearTimeout(timer)
    }, [isLoading, duration])

    return { isLoading, isAnimating }
}
