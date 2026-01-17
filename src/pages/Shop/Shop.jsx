import { motion } from 'framer-motion'
import './Shop.css'

// SVG Icons for shop items
const TshirtIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
    </svg>
)

const MusicNoteIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
    </svg>
)

const VinylIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="12" r="6" />
    </svg>
)

const HatIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2H2v2z" />
        <path d="M5 16V8a7 7 0 0 1 14 0v8" />
    </svg>
)

const CraneIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10H3" />
        <path d="M21 6V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2" />
        <path d="M5 10v11" />
        <path d="M19 10v11" />
        <path d="M9 10v4" />
        <path d="M15 10v4" />
        <path d="M12 3v7" />
    </svg>
)

const ConeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L4 22h16L12 2z" />
        <path d="M6 18h12" />
        <path d="M8 14h8" />
        <path d="M10 10h4" />
    </svg>
)

const WarningIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
)

export default function Shop() {
    return (
        <div className="shop">
            <div className="shop__construction">
                {/* Animated tools */}
                <motion.div
                    className="shop__crane"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    🏗️
                </motion.div>

                <div className="shop__content">
                    <motion.div
                        className="shop__tape"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="shop__tape-text">⚠️ UNDER CONSTRUCTION ⚠️</span>
                    </motion.div>

                    <motion.h1
                        className="shop__title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Shop Coming Soon
                    </motion.h1>

                    <motion.p
                        className="shop__subtitle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Tali's team is working hard to bring you exclusive merch!
                    </motion.p>

                    <motion.div
                        className="shop__items"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <div className="shop__item shop__item--blurred">
                            <div className="shop__item-icon"><TshirtIcon /></div>
                            <span>T-Shirts</span>
                        </div>
                        <div className="shop__item shop__item--blurred">
                            <div className="shop__item-icon"><MusicNoteIcon /></div>
                            <span>Albums</span>
                        </div>
                        <div className="shop__item shop__item--blurred">
                            <div className="shop__item-icon"><VinylIcon /></div>
                            <span>Vinyl</span>
                        </div>
                        <div className="shop__item shop__item--blurred">
                            <div className="shop__item-icon"><HatIcon /></div>
                            <span>Accessories</span>
                        </div>
                    </motion.div>

                    <motion.div
                        className="shop__cta"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                    >
                        <p>Want to be the first to know?</p>
                        <a href="/contact" className="shop__notify-btn">
                            Get Notified
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </a>
                    </motion.div>
                </div>

                {/* Animated construction elements */}
                <motion.div
                    className="shop__cone shop__cone--left"
                    animate={{ rotate: [0, 3, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    🚧
                </motion.div>
                <motion.div
                    className="shop__cone shop__cone--right"
                    animate={{ rotate: [0, -3, 3, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                >
                    🚧
                </motion.div>
            </div>
        </div>
    )
}
