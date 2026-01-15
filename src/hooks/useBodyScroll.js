import { useEffect } from 'react'

/**
 * Hook to block body scroll when a modal/overlay is open
 * Preserves scroll position and restores it when closed
 * @param {boolean} isLocked - Whether to lock body scroll
 */
export function useBodyScroll(isLocked) {
    useEffect(() => {
        if (!isLocked) return

        const scrollY = window.scrollY
        document.body.style.position = 'fixed'
        document.body.style.top = `-${scrollY}px`
        document.body.style.left = '0'
        document.body.style.right = '0'
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.left = ''
            document.body.style.right = ''
            document.body.style.overflow = ''
            window.scrollTo(0, scrollY)
        }
    }, [isLocked])
}
