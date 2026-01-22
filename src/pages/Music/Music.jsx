import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import './Music.css'

export default function Music() {
    const isDesktop = useMediaQuery('(min-width: 1024px)')
    const [showAllShows, setShowAllShows] = useState(false)
    const [currentTrack, setCurrentTrack] = useState(0)

    // ... (tracks)

    const spotifyTracks = [
        'https://open.spotify.com/embed/track/5kPrQcU2fJfpBUXAXGZZLq?utm_source=generator',
        'https://open.spotify.com/embed/track/1z3ulT9OvoGdGjwbIQGw1h?utm_source=generator',
        'https://open.spotify.com/embed/track/21AABHmjP1ObzTmgjcTxDM?utm_source=generator',
        'https://open.spotify.com/embed/track/3DOmXTWCfVjGit39RD0uic?utm_source=generator'
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

    const visibleShows = isDesktop ? allShows : (showAllShows ? allShows : allShows.slice(0, 6))

    // ... render ...


    return (
        <div className="music music-page">
            <section className="music-hero">
                <div className="music-hero__background">
                    <img
                        src="/photos/tali-den-atelier.webp"
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

            <section className="spotify-section section">
                <div className="container">
                    <h2 className="section-title">Listen Now</h2>
                    <div className="spotify-carousel">
                        <button
                            className="spotify-carousel__nav spotify-carousel__nav--prev"
                            onClick={() => setCurrentTrack(prev => prev === 0 ? spotifyTracks.length - 1 : prev - 1)}
                            aria-label="Previous track"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>

                        <div className="spotify-carousel__player">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentTrack}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="spotify-carousel__item"
                                >
                                    <iframe
                                        src={spotifyTracks[currentTrack]}
                                        width="100%"
                                        height="152"
                                        frameBorder="0"
                                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                        loading="lazy"
                                        title={`Spotify track ${currentTrack + 1}`}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <button
                            className="spotify-carousel__nav spotify-carousel__nav--next"
                            onClick={() => setCurrentTrack(prev => prev === spotifyTracks.length - 1 ? 0 : prev + 1)}
                            aria-label="Next track"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                    <p className="spotify-carousel__indicator">← Scroll for more →</p>
                </div>
            </section>

            <section className="shows section">
                <div className="shows__stickers shows__stickers--left">
                    <img src="/photos/tali-pics10.webp" alt="" className="shows__sticker shows__sticker--1" />
                    <img src="/photos/tali-pics40-eurovision.webp" alt="" className="shows__sticker shows__sticker--2" />
                    <img src="/photos/tali-pics49.webp" alt="" className="shows__sticker shows__sticker--3" />
                </div>

                <div className="shows__stickers shows__stickers--right">
                    <img src="/photos/tali-pics76.webp" alt="" className="shows__sticker shows__sticker--4" />
                    <img src="/photos/tali-pics75.webp" alt="" className="shows__sticker shows__sticker--5" />
                    <img src="/photos/tali-pics105.webp" alt="" className="shows__sticker shows__sticker--6" />
                </div>

                <div className="container">
                    <h2 className="section-title">Show History</h2>
                    <div className="shows__list">
                        {visibleShows.map((show, index) => (
                            <motion.div
                                key={`${show.date}-${show.venue}`}
                                className={`show-item ${!isDesktop && !showAllShows && index === 5 ? 'show-item--half-blurred' : ''}`}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.03 }}
                            >
                                <span className="show-item__date">{show.date}</span>
                                <span className="show-item__venue">{show.venue}</span>
                            </motion.div>
                        ))}
                    </div>

                    {!isDesktop && (
                        <button
                            className="shows__toggle"
                            onClick={() => setShowAllShows(!showAllShows)}
                        >
                            {showAllShows ? (
                                <>
                                    Show Less
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="18 15 12 9 6 15" />
                                    </svg>
                                </>
                            ) : (
                                <>
                                    Show More
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </>
                            )}
                        </button>
                    )}
                </div>
            </section>

            <section className="gif-section section">
                <div className="container">
                    <div className="gif-section__content">
                        <video
                            className="gif-section__video"
                            src="/photos/Tali vids(temp).mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}
