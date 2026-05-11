import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePreloader } from '@/hooks/usePreloader'
import { useTheme } from '@/hooks/useTheme'
import './CookieBanner.css'

const STORAGE_KEY = 'tali_cookie_consent'

// Cookie icon — Iconoir (iconoir.com)
const CookieIcon = () => (
    <svg className="cookie-banner__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.8 13A10 10 0 1 1 11 2.2" />
        <path d="M19 2v4M21 4h-4" />
        <circle cx="9" cy="9.5" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="14.5" cy="8" r="1" fill="currentColor" stroke="none" />
        <circle cx="15.5" cy="13.5" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="9" cy="14.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="12.5" cy="11.5" r="1" fill="currentColor" stroke="none" />
    </svg>
)

export default function CookieBanner() {
    const { isLoading } = usePreloader(2500)
    const { theme } = useTheme()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (isLoading) return
        if (localStorage.getItem(STORAGE_KEY)) return
        const timer = setTimeout(() => setVisible(true), 1000)
        return () => clearTimeout(timer)
    }, [isLoading])

    const accept = () => {
        localStorage.setItem(STORAGE_KEY, 'accepted')
        setVisible(false)
    }

    const decline = () => {
        localStorage.setItem(STORAGE_KEY, 'declined')
        setVisible(false)
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className={`cookie-banner cookie-banner--${theme}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                    role="dialog"
                    aria-label="Cookie consent"
                >
                    <CookieIcon />
                    <p className="cookie-banner__text">
                        Quick heads up — cookies for Spotify, YouTube embeds and some basic traffic data. That&apos;s it.
                    </p>
                    <div className="cookie-banner__actions">
                        <button className="cookie-banner__btn cookie-banner__btn--accept" onClick={accept}>
                            Yeah, sure
                        </button>
                        <button className="cookie-banner__btn cookie-banner__btn--decline" onClick={decline}>
                            No, thanks
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
