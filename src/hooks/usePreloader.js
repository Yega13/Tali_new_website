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
            // Ensure body is scrollable when not loading
            document.body.style.overflow = ''
            return
        }

        // Lock body scroll during preloader
        document.body.style.overflow = 'hidden'

        // Mark as shown in session storage
        sessionStorage.setItem(PRELOADER_KEY, 'true')

        // Start fade out after duration
        const timer = setTimeout(() => {
            setIsAnimating(false)
            // Give time for exit animation
            setTimeout(() => {
                setIsLoading(false)
                // Unlock body scroll after preloader
                document.body.style.overflow = ''
            }, 500)
        }, duration)

        return () => {
            clearTimeout(timer)
            document.body.style.overflow = ''
        }
    }, [isLoading, duration])

    return { isLoading, isAnimating }
}
