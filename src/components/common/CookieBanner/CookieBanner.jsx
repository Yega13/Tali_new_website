import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './CookieBanner.css'

const STORAGE_KEY = 'tali_cookie_consent'

export default function CookieBanner() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            const timer = setTimeout(() => setVisible(true), 1200)
            return () => clearTimeout(timer)
        }
    }, [])

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
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 80, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                    role="dialog"
                    aria-label="Cookie consent"
                >
                    <p className="cookie-banner__text">
                        We use cookies for embedded content (Spotify, YouTube) and to analyse traffic.
                        By clicking <strong>Accept</strong> you consent to their use.{' '}
                    </p>
                    <div className="cookie-banner__actions">
                        <button className="cookie-banner__btn cookie-banner__btn--accept" onClick={accept}>
                            Accept All
                        </button>
                        <button className="cookie-banner__btn cookie-banner__btn--decline" onClick={decline}>
                            Decline
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
