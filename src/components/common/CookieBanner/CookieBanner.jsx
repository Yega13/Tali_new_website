import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePreloader } from '@/hooks/usePreloader'
import './CookieBanner.css'

const STORAGE_KEY = 'tali_cookie_consent'

export default function CookieBanner() {
    const { isLoading } = usePreloader(2500)
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
                    className="cookie-banner"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                    role="dialog"
                    aria-label="Cookie consent"
                >
                    <span className="cookie-banner__icon">🍪</span>
                    <p className="cookie-banner__text">
                        Cookies keep the music playing — Spotify, YouTube &amp; a bit of analytics.
                    </p>
                    <div className="cookie-banner__actions">
                        <button className="cookie-banner__btn cookie-banner__btn--accept" onClick={accept}>
                            Sure!
                        </button>
                        <button className="cookie-banner__btn cookie-banner__btn--decline" onClick={decline}>
                            Nope
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
