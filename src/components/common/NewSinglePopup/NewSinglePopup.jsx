import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './NewSinglePopup.css'

export default function NewSinglePopup({ onListenClick }) {
    const [isVisible, setIsVisible] = useState(false)
    const lastScrollY = useRef(0)
    const scrollThreshold = 100 // How far user must scroll before it fades

    useEffect(() => {
        // Show popup after initial delay
        const showTimer = setTimeout(() => {
            setIsVisible(true)
        }, 2500)

        const handleScroll = () => {
            const currentScrollY = window.scrollY

            // Scrolling down past threshold - hide
            if (currentScrollY > lastScrollY.current && currentScrollY > scrollThreshold) {
                setIsVisible(false)
            }
            // Scrolling up - show
            else if (currentScrollY < lastScrollY.current) {
                setIsVisible(true)
            }

            lastScrollY.current = currentScrollY
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            clearTimeout(showTimer)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="new-single-popup"
                    initial={{ opacity: 0, x: -100, y: 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20
                    }}
                >
                    <div className="new-single-popup__content">
                        <img
                            src="/photos/tali-picsnew-4-popup.webp"
                            alt="Senti(Mental) - New Single"
                            className="new-single-popup__cover"
                            width="400"
                            height="300"
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="new-single-popup__info">
                            <span className="new-single-popup__badge">NEW SINGLE</span>
                            <h3 className="new-single-popup__title">Senti(Mental)</h3>
                            <button
                                className="new-single-popup__btn"
                                onClick={onListenClick}
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                Listen Now
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
