import { useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './StyleModal.css'

const SPOTIFY_ICON = (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
)

const APPLE_MUSIC_ICON = (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
)

const AMAZON_MUSIC_ICON = (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1a9 9 0 0 0-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2a7 7 0 1 1 14 0v2h-4v8h3c1.66 0 3-1.34 3-3v-7a9 9 0 0 0-9-9z" />
    </svg>
)

const YOUTUBE_ICON = (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
)

const DEEZER_ICON = (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.81 4.16h5.19v3.3h-5.19zM18.81 8.59h5.19v3.3h-5.19zM12.41 8.59h5.19v3.3h-5.19zM6.01 8.59h5.19v3.3H6.01zM18.81 13.02h5.19v3.3h-5.19zM12.41 13.02h5.19v3.3h-5.19zM6.01 13.02h5.19v3.3H6.01zM0 13.02h5.19v3.3H0zM18.81 17.45h5.19v3.3h-5.19zM12.41 17.45h5.19v3.3h-5.19zM6.01 17.45h5.19v3.3H6.01zM0 17.45h5.19v3.3H0z" />
    </svg>
)

export const PLATFORM_ICONS = {
    Spotify: SPOTIFY_ICON,
    'Apple Music': APPLE_MUSIC_ICON,
    'Amazon Music': AMAZON_MUSIC_ICON,
    YouTube: YOUTUBE_ICON,
    Deezer: DEEZER_ICON,
}

const stylePlatforms = [
    { name: 'Spotify', url: 'https://open.spotify.com/track/1wdZFH8dbdUXQxTmoAh9tu?si=XFFQHBZJTEKNPC73dT5vhA', icon: SPOTIFY_ICON },
    { name: 'Apple Music', url: 'https://music.apple.com/us/song/style/1861588094', icon: APPLE_MUSIC_ICON },
    { name: 'Amazon Music', url: 'https://music.amazon.com/albums/B0G76C8TSC?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_eTb0ZyVvrVMWngjwGtbGHdGHL', icon: AMAZON_MUSIC_ICON },
]

export default function StyleModal({
    isOpen,
    onClose,
    title = 'Style',
    artist = 'TALI',
    cover = '/photos/tali-style2.webp',
    platforms = stylePlatforms,
}) {
    useLayoutEffect(() => {
        if (isOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
            document.body.classList.add('modal-open')
            document.body.style.paddingRight = `${scrollbarWidth}px`
            const handleEscape = (e) => {
                if (e.key === 'Escape') onClose()
            }
            document.addEventListener('keydown', handleEscape)
            return () => {
                document.removeEventListener('keydown', handleEscape)
                document.body.classList.remove('modal-open')
                document.body.style.paddingRight = ''
            }
        }
    }, [isOpen, onClose])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="style-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    onClick={onClose}
                >
                    <motion.div
                        className="style-modal__content"
                        initial={{ opacity: 0, scale: 0.85, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="style-modal__close" onClick={onClose} aria-label="Close modal">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        <div className="style-modal__header">
                            <img
                                src={cover}
                                alt={`${title} - Single Cover`}
                                className="style-modal__cover"
                            />
                            <div className="style-modal__info">
                                <h2 className="style-modal__title">{title}</h2>
                                <p className="style-modal__artist">{artist}</p>
                            </div>
                        </div>

                        <p className="style-modal__subtitle">Listen on your favorite platform</p>

                        <div className="style-modal__platforms">
                            {platforms.map((platform, index) => (
                                <motion.a
                                    key={platform.name}
                                    href={platform.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="style-modal__platform"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="style-modal__platform-icon">
                                        {platform.icon}
                                    </span>
                                    <span className="style-modal__platform-name">
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
