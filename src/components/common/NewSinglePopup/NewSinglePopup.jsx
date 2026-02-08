import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './NewSinglePopup.css'

export default function NewSinglePopup({ onListenClick }) {
    const [isVisible, setIsVisible] = useState(false)
    const [hasAnimatedIn, setHasAnimatedIn] = useState(false)
    const [isScrolledPastHero, setIsScrolledPastHero] = useState(false)
    const lastScrollY = useRef(0)

    useEffect(() => {
        // Show popup after initial delay with slide-in animation
        const showTimer = setTimeout(() => {
            setIsVisible(true)
            // Mark that initial slide-in has completed
            setTimeout(() => setHasAnimatedIn(true), 600)
        }, 2500)

        return () => clearTimeout(showTimer)
    }, [])

    // Mobile-only scroll detection
    useEffect(() => {
        const isMobile = window.innerWidth <= 479

        if (!isMobile) return

        const handleScroll = () => {
            // Get the explore section position
            const exploreSection = document.querySelector('.explore')
            if (!exploreSection) return

            const exploreSectionTop = exploreSection.getBoundingClientRect().top
            const threshold = window.innerHeight * 0.5 // Middle of screen

            // If explore section is in view (scrolled past hero)
            if (exploreSectionTop < threshold) {
                setIsScrolledPastHero(true)
            } else {
                setIsScrolledPastHero(false)
            }

            lastScrollY.current = window.scrollY
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Animation variants
    const slideInVariants = {
        hidden: { opacity: 0, x: -150 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 200,
                damping: 25
            }
        },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    }

    const fadeVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.3 }
        },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    }

    // Determine if should show
    const shouldShow = isVisible && !isScrolledPastHero

    return (
        <AnimatePresence>
            {shouldShow && (
                <motion.div
                    className="new-single-popup"
                    variants={hasAnimatedIn ? fadeVariants : slideInVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="new-single-popup__content">
                        <img
                            src="/photos/tali-style2.webp"
                            alt="Style - New Single"
                            className="new-single-popup__cover"
                        />
                        <div className="new-single-popup__info">
                            <span className="new-single-popup__badge">NEW SINGLE</span>
                            <h3 className="new-single-popup__title">"Style" is Out!</h3>
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
