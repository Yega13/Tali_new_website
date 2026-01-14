import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import MusicModal from '@/components/common/MusicModal'
import './Home.css'

export default function Home() {
    const [isMusicModalOpen, setIsMusicModalOpen] = useState(false)
    const { theme } = useTheme()

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero__background">
                    <img
                        src={theme === 'light'
                            ? '/photos/Tali Style(1).jpg'
                            : '/photos/Tali pics(35) eurovision 2025.jpg'
                        }
                        alt="Tali Golergant"
                        className="hero__image"
                        loading="eager"
                    />
                    <div className="hero__overlay" />
                </div>

                <div className="hero__content container">
                    <motion.div
                        className="hero__text"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <h1 className="hero__title">
                            <span className="hero__title-first">Tali</span>
                            <span className="hero__title-last">Golergant</span>
                        </h1>
                        <p className="hero__subtitle">Singer • Songwriter • Artist</p>

                        <div className="hero__cta">
                            <motion.button
                                className="btn btn-primary hero__btn"
                                onClick={() => setIsMusicModalOpen(true)}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="hero__btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                Listen Now
                            </motion.button>

                            <motion.div whileTap={{ scale: 0.95 }}>
                                <Link to="/about" className="btn btn-outline hero__btn">
                                    <svg className="hero__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                    About Tali
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="hero__scroll"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        <span className="hero__scroll-text">Swipe to explore</span>
                        <motion.svg
                            className="hero__scroll-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </motion.svg>
                    </motion.div>
                </div>
            </section>

            {/* Explore Section */}
            <section className="explore section">
                <div className="container">
                    <motion.h2
                        className="explore__title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                    >
                        Explore
                    </motion.h2>

                    <div className="explore__grid">
                        {[
                            {
                                to: '/music', label: 'Music', description: 'Listen to TALI\'s songs', icon: (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 18V5l12-2v13" />
                                        <circle cx="6" cy="18" r="3" />
                                        <circle cx="18" cy="16" r="3" />
                                    </svg>
                                )
                            },
                            {
                                to: '/gallery', label: 'Gallery', description: 'Photos & moments', icon: (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <polyline points="21 15 16 10 5 21" />
                                    </svg>
                                )
                            },
                            {
                                to: '/news', label: 'News', description: 'Latest updates, interviews & announcements', icon: (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                        <line x1="16" y1="13" x2="8" y2="13" />
                                        <line x1="16" y1="17" x2="8" y2="17" />
                                    </svg>
                                )
                            },
                            {
                                to: '/collaborations', label: 'Collaborations', description: 'Featured projects & creative partnerships', icon: (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                )
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={item.to}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link to={item.to} className="explore__card">
                                    <span className="explore__card-icon">{item.icon}</span>
                                    <span className="explore__card-label">{item.label}</span>
                                    <span className="explore__card-desc">{item.description}</span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Follow Section */}
            <section className="follow section">
                <div className="container">
                    <motion.h2
                        className="follow__title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                    >
                        Follow Tali
                    </motion.h2>

                    <motion.div
                        className="follow__socials"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                    >
                        <a href="https://instagram.com/taligolergant" target="_blank" rel="noopener noreferrer" className="follow__link">
                            <svg className="follow__icon" viewBox="0 0 24 24" fill="currentColor">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <span>Instagram</span>
                        </a>
                        <a href="https://tiktok.com/@taligolergant" target="_blank" rel="noopener noreferrer" className="follow__link">
                            <svg className="follow__icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                            </svg>
                            <span>TikTok</span>
                        </a>
                        <a href="https://youtube.com/@taligolergant" target="_blank" rel="noopener noreferrer" className="follow__link">
                            <svg className="follow__icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                            <span>YouTube</span>
                        </a>
                        <a href="https://facebook.com/taligolergant" target="_blank" rel="noopener noreferrer" className="follow__link">
                            <svg className="follow__icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            <span>Facebook</span>
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Music Modal */}
            <MusicModal
                isOpen={isMusicModalOpen}
                onClose={() => setIsMusicModalOpen(false)}
            />
        </div>
    )
}
