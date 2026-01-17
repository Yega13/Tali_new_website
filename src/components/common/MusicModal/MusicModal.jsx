import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './MusicModal.css'

const musicPlatforms = [
    {
        name: 'Spotify',
        url: 'https://open.spotify.com/artist/6v6wot3YV1QnPry6mfrCLK?si=tWuCpbfFSVKPLLL6O0RCNA',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
        )
    },
    {
        name: 'Apple Music',
        url: 'https://music.apple.com/us/artist/tali/1496857510',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
            </svg>
        )
    },
    {
        name: 'YouTube',
        url: 'https://youtube.com/@talimusic-1?si=pjQ4B5j2KBwgcHDs',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        )
    },
    {
        name: 'SoundCloud',
        url: 'https://on.soundcloud.com/sGEjcm6CNQgWqBXab1',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.999 14.165c-.052 1.796-1.612 3.169-3.4 3.169h-8.18a.68.68 0 0 1-.675-.683V7.862a.747.747 0 0 1 .452-.724s.75-.513 2.333-.513a5.364 5.364 0 0 1 2.763.755 5.433 5.433 0 0 1 2.57 3.54c.282-.08.574-.121.868-.12.884 0 1.73.358 2.347.992s.948 1.49.922 2.373ZM10.721 8.421c.247 2.98.427 5.697 0 8.672a.264.264 0 0 1-.53 0c-.395-2.946-.22-5.718 0-8.672a.264.264 0 0 1 .53 0ZM9.072 9.448c.285 2.659.37 4.986-.006 7.655a.277.277 0 0 1-.55 0c-.331-2.63-.256-5.02 0-7.655a.277.277 0 0 1 .556 0Zm-1.663-.257c.27 2.726.39 5.171 0 7.904a.266.266 0 0 1-.532 0c-.38-2.69-.257-5.21 0-7.904a.266.266 0 0 1 .532 0Zm-1.647.77a26.108 26.108 0 0 1-.008 7.147.272.272 0 0 1-.542 0 27.955 27.955 0 0 1 0-7.147.275.275 0 0 1 .55 0Zm-1.67 1.769c.421 1.865.228 3.5-.029 5.388a.257.257 0 0 1-.514 0c-.21-1.858-.398-3.549 0-5.389a.272.272 0 0 1 .543 0Zm-1.655-.273c.388 1.897.26 3.508-.01 5.412-.026.28-.514.283-.54 0-.244-1.878-.347-3.54-.01-5.412a.283.283 0 0 1 .56 0Zm-1.668.911c.4 1.268.257 2.292-.026 3.572a.257.257 0 0 1-.514 0c-.241-1.262-.354-2.312-.023-3.572a.283.283 0 0 1 .563 0Z" />
            </svg>
        )
    },
    {
        name: 'Amazon',
        url: 'https://music.amazon.com/artists/B0849YYHL3/tali?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_KZV7uUEyhX5BdThXgoZzww6uK',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1a9 9 0 0 0-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2a7 7 0 1 1 14 0v2h-4v8h3c1.66 0 3-1.34 3-3v-7a9 9 0 0 0-9-9z" />
            </svg>
        )
    },
    {
        name: 'Deezer',
        url: 'https://link.deezer.com/s/3290mdoGGjYCbQSvSut4D',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.81 4.16v3.03H24V4.16h-5.19zM6.27 8.38v3.027h5.189V8.38h-5.19zm12.54 0v3.027H24V8.38h-5.19zM0 12.57v3.027h5.19V12.57H0zm6.27 0v3.027h5.189V12.57h-5.19zm6.27 0v3.027h5.19V12.57h-5.19zm6.27 0v3.027H24V12.57h-5.19zM0 16.76v3.027h5.19V16.76H0zm6.27 0v3.027h5.189V16.76h-5.19zm6.27 0v3.027h5.19V16.76h-5.19zm6.27 0v3.027H24V16.76h-5.19z" />
            </svg>
        )
    }
]

export default function MusicModal({ isOpen, onClose }) {
    const scrollPositionRef = useRef(0)

    // Block body scroll when modal is open - improved to prevent jumping
    useEffect(() => {
        if (isOpen) {
            scrollPositionRef.current = window.scrollY
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = `${scrollbarWidth}px`
            // Add escape key listener
            const handleEscape = (e) => {
                if (e.key === 'Escape') onClose()
            }
            document.addEventListener('keydown', handleEscape)
            return () => document.removeEventListener('keydown', handleEscape)
        } else {
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
            window.scrollTo(0, scrollPositionRef.current)
        }
    }, [isOpen, onClose])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="music-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    onClick={onClose}
                >
                    <motion.div
                        className="music-modal__content"
                        initial={{ opacity: 0, scale: 0.85, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="music-modal__close" onClick={onClose} aria-label="Close modal">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        <h2 className="music-modal__title">Listen to Tali</h2>
                        <p className="music-modal__subtitle">Choose your favorite platform</p>

                        <div className="music-modal__platforms">
                            {musicPlatforms.map((platform, index) => (
                                <motion.a
                                    key={platform.name}
                                    href={platform.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="music-modal__platform"
                                    style={{ '--platform-color': platform.color }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="music-modal__platform-icon">
                                        {platform.icon}
                                    </span>
                                    <span className="music-modal__platform-name">
                                        {platform.name}
                                    </span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
