import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './NotFound.css'

export default function NotFound() {
    const [stage, setStage] = useState('initial') // initial, playing, finished
    const [volume, setVolume] = useState(50)
    const videoRef = useRef(null)

    // Force dark theme on 404 page
    useEffect(() => {
        const originalTheme = document.documentElement.getAttribute('data-theme')
        document.documentElement.setAttribute('data-theme', 'dark')

        return () => {
            // Restore original theme when leaving
            if (originalTheme) {
                document.documentElement.setAttribute('data-theme', originalTheme)
            }
        }
    }, [])

    const handleButtonClick = () => {
        if (stage === 'initial' || stage === 'finished') {
            setStage('playing')
            if (videoRef.current) {
                videoRef.current.currentTime = 0
                videoRef.current.play()
            }
        }
    }

    const handleVolumeChange = (newVolume) => {
        setVolume(newVolume)
        if (videoRef.current) {
            videoRef.current.volume = newVolume / 100
        }
    }

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleEnded = () => {
            setStage('finished')
        }

        video.addEventListener('ended', handleEnded)
        return () => video.removeEventListener('ended', handleEnded)
    }, [])

    return (
        <div className="not-found">
            {/* Volume Slider */}
            <div className="not-found__volume">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    className="not-found__slider"
                    onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                />
            </div>

            {/* Video Container */}
            <div className={`not-found__video-container ${stage === 'playing' ? 'not-found__video-container--playing' : ''}`}>
                <video
                    ref={videoRef}
                    className="not-found__video"
                    src="/photos/Tali vids(7) Legendar.mp4"
                    playsInline
                    muted={false}
                />

                <AnimatePresence>
                    {stage !== 'playing' && (
                        <motion.div
                            className="not-found__overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.button
                                className="not-found__watch-btn"
                                onClick={handleButtonClick}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                {stage === 'finished' ? 'Again?' : 'be careful :)'}
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* 404 Text */}
            <motion.div
                className="not-found__content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <h1 className="not-found__title">404</h1>
                <p className="not-found__subtitle">Page not found</p>
                <p className="not-found__message">We're incredibly sorry, try later !</p>
            </motion.div>
        </div>
    )
}
