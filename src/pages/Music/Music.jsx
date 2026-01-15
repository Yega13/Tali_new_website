import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Music.css'

export default function Music() {
    const [showAllShows, setShowAllShows] = useState(false)
    const [currentTrack, setCurrentTrack] = useState(0)

    const spotifyTracks = [
        'https://open.spotify.com/embed/track/5kPrQcU2fJfpBUXAXGZZLq?utm_source=generator',
        'https://open.spotify.com/embed/track/1z3ulT9OvoGdGjwbIQGw1h?utm_source=generator',
        'https://open.spotify.com/embed/track/21AABHmjP1ObzTmgjcTxDM?utm_source=generator'
    ]

    const youtubeVideos = [
        { id: 'DJf04cdgk70', title: 'TALI – Fighter (Official Music Video)' },
        { id: 'ZwHoEwjopJE', title: 'dancing alone - (A Homemade Music Video)' },
        { id: 'IfKKZYN1P9A', title: 'Fighter (Live with the Luxembourg Philharmonic)' },
        { id: '9PXzLu2qY7M', title: '"lose you" - Official Music Video' },
        { id: 'AHdAxucqAJs', title: 'TALI - Blackbird (The Beatles cover)' }
    ]

    const allShows = [
        { date: '04/10/25', venue: 'Duke Coronation Luxembourg' },
        { date: '24/07/25', venue: 'Echterlive Festival' },
        { date: '06/06/25', venue: 'Francofolies Festival' },
        { date: '28/02/25', venue: 'Den Atelier' },
        { date: '25/01/25', venue: 'Rockhal - LSC Guest Artist' },
        { date: '12/10/24', venue: 'Fashion Week Luxembourg' },
        { date: '06/07/24', venue: 'Luxembourg Philharmonic' },
        { date: '06/02/24', venue: 'USINA Festival' },
        { date: '05/11/24', venue: 'Eurovision 2024' },
        { date: '04/13/24', venue: 'AFAS' },
        { date: '04/07/24', venue: 'HERE at Outernet' },
        { date: '09/09/23', venue: 'The Triad Theatre' },
        { date: '08/16/23', venue: '54 Below' },
        { date: '07/12/23', venue: 'Bowery Electric' },
        { date: '05/04/23', venue: 'The Bitter End' },
        { date: '03/05/23', venue: 'Mercury Lounge' },
        { date: '02/09/23', venue: 'Cutting Room' },
        { date: '12/17/21', venue: 'The Green Room' }
    ]

    const visibleShows = showAllShows ? allShows : allShows.slice(0, 6)

    return (
        <div className="music music-page">
            {/* Hero */}
            <section className="music-hero">
                <div className="music-hero__background">
                    <img
                        src="/photos/Tali den atelier.jpeg"
                        alt="Tali live performance"
                        className="music-hero__image"
                    />
                    <div className="music-hero__overlay" />
                </div>
                <div className="music-hero__content container">
                    <motion.h1
                        className="music-hero__title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Music
                    </motion.h1>
                </div>
            </section>

            {/* YouTube Videos */}
            <section className="music-videos section">
                <div className="container">
                    <h2 className="section-title">Music Videos</h2>
                    <div className="music-videos__grid">
                        {youtubeVideos.map((video, index) => (
                            <motion.a
                                key={index}
                                href={`https://youtu.be/${video.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="video-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="video-card__thumbnail">
                                    <img
                                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                                        alt={video.title}
                                    />
                                    <div className="video-card__play">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="video-card__title">{video.title}</h3>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Spotify Player - Swipe + Buttons */}
            <section className="spotify-section section">
                <div className="container">
                    <h2 className="section-title">Listen Now</h2>
                    <div className="spotify-wrapper">
                        <button
                            className="spotify-nav-btn spotify-nav-btn--prev"
                            onClick={() => {
                                const container = document.querySelector('.spotify-swipe')
                                if (container) container.scrollBy({ left: -280, behavior: 'smooth' })
                            }}
                            aria-label="Previous track"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                            </svg>
                        </button>

                        <div className="spotify-swipe">
                            {spotifyTracks.map((track, index) => (
                                <div key={index} className="spotify-swipe__item">
                                    <iframe
                                        style={{ borderRadius: '12px', overflow: 'hidden' }}
                                        src={track}
                                        width="100%"
                                        height="152"
                                        frameBorder="0"
                                        scrolling="no"
                                        allowFullScreen=""
                                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>

                        <button
                            className="spotify-nav-btn spotify-nav-btn--next"
                            onClick={() => {
                                const container = document.querySelector('.spotify-swipe')
                                if (container) container.scrollBy({ left: 280, behavior: 'smooth' })
                            }}
                            aria-label="Next track"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                            </svg>
                        </button>
                    </div>
                    <p className="spotify-carousel__indicator">Swipe for more</p>
                </div>
            </section>

            {/* Show History */}
            <section className="shows section">
                <div className="container">
                    <h2 className="section-title">Show History</h2>
                    <div className="shows__list">
                        <AnimatePresence mode="popLayout">
                            {visibleShows.map((show, index) => (
                                <motion.div
                                    key={`${show.date}-${show.venue}`}
                                    className={`show-item ${index >= 6 && !showAllShows ? 'show-item--blurred' : ''} ${index === 5 && !showAllShows ? 'show-item--half-blurred' : ''}`}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10, height: 0, marginBottom: 0 }}
                                    transition={{ duration: 0.2, delay: index * 0.02 }}
                                >
                                    <span className="show-item__date">{show.date}</span>
                                    <span className="show-item__venue">{show.venue}</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <motion.button
                        className="shows__toggle"
                        onClick={() => setShowAllShows(!showAllShows)}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>{showAllShows ? 'Show Less' : 'Show More'}</span>
                        <motion.svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            animate={{ rotate: showAllShows ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </motion.svg>
                    </motion.button>
                </div>
            </section>

            {/* GIF/Video Section */}
            <section className="gif-section section">
                <div className="container">
                    <div className="gif-section__content">
                        {/* Placeholder - replace src with actual GIF/video when available */}
                        <div className="gif-section__placeholder">
                            <span>GIF coming soon...</span>
                        </div>
                        {/* 
                        <video 
                            className="gif-section__video"
                            autoPlay 
                            loop 
                            muted 
                            playsInline
                            src="/videos/your-gif.mp4"
                        />
                        */}
                    </div>
                </div>
            </section>
        </div>
    )
}
