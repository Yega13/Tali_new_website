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
            document.body.classList.remove('preloader-active')
            return
        }

        // Lock body scroll during preloader using CSS class
        document.body.classList.add('preloader-active')

        // Mark as shown in session storage
        sessionStorage.setItem(PRELOADER_KEY, 'true')

        // Start fade out after duration
        const timer = setTimeout(() => {
            setIsAnimating(false)
            // Give time for exit animation
            setTimeout(() => {
                setIsLoading(false)
                // Unlock body scroll after preloader
                document.body.classList.remove('preloader-active')
            }, 500)
        }, duration)

        return () => {
            clearTimeout(timer)
            document.body.classList.remove('preloader-active')
        }
    }, [isLoading, duration])

    return { isLoading, isAnimating }
}
