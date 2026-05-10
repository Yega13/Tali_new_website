import { useState, useRef, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { useMediaQuery, useIsDesktop } from '@/hooks/useMediaQuery'
import './Music.css'

const musicJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    'name': 'Tali Golergant',
    'alternateName': 'TALI',
    'url': 'https://taligolergant.org/music',
    'genre': ['Pop', 'Indie Pop'],
    'image': 'https://taligolergant.org/social-square.jpg',
    'sameAs': [
        'https://open.spotify.com/artist/6FGONoPILQdWo7NUk1JQPA',
        'https://www.youtube.com/@taligolergant',
        'https://www.instagram.com/taligolergant'
    ],
    'album': [
        {
            '@type': 'MusicAlbum',
            'name': 'WANDER',
            'datePublished': '2025-05',
            'albumProductionType': 'https://schema.org/StudioAlbum',
            'numTracks': 4,
            'byArtist': { '@type': 'MusicGroup', 'name': 'Tali Golergant' }
        },
        {
            '@type': 'MusicAlbum',
            'name': 'RED HAVEN',
            'datePublished': '2026-06-06',
            'albumProductionType': 'https://schema.org/StudioAlbum',
            'numTracks': 5,
            'byArtist': { '@type': 'MusicGroup', 'name': 'Tali Golergant' }
        }
    ]
}

export default function Music() {
    const carouselRef = useRef(null);
    const playerRef = useRef(null);
    const [showAllShows, setShowAllShows] = useState(false)
    const [currentTrack, setCurrentTrack] = useState(0)
    const isMobile = useMediaQuery('(max-width: 479px)')
    const isDesktop = useIsDesktop()

    // Handle scroll to track current position (for mobile carousel)
    useEffect(() => {
        const player = playerRef.current;
        if (!player || !isMobile) return;

        const handleScroll = () => {
            const scrollLeft = player.scrollLeft;
            const itemWidth = player.offsetWidth;
            const newIndex = Math.round(scrollLeft / itemWidth);
            setCurrentTrack(newIndex);
        };

        player.addEventListener('scroll', handleScroll, { passive: true });
        return () => player.removeEventListener('scroll', handleScroll);
    }, [isMobile]);

    // Scroll to specific track when dot is clicked
    const scrollToTrack = (index) => {
        if (playerRef.current) {
            const itemWidth = playerRef.current.offsetWidth;
            playerRef.current.scrollTo({
                left: index * itemWidth,
                behavior: 'smooth'
            });
        }
    };

    const spotifyTracks = [
        'https://open.spotify.com/embed/track/07Z0tpscRSQOlCjRicammI?utm_source=generator',
        'https://open.spotify.com/embed/track/4ydGoM64MfkhXPBlLEq4K0?utm_source=generator',
        'https://open.spotify.com/embed/track/6RYzaNcj83Li7RyI6ZlQzc?utm_source=generator',
        'https://open.spotify.com/embed/track/1z3ulT9OvoGdGjwbIQGw1h?utm_source=generator' // Ocean (feat.)
    ]

    const youtubeVideos = [
        { id: 'uDhiaqPiMJ8', title: 'TALI - DCBA (Official Music Video)', isNew: true },
        { id: 'DJf04cdgk70', title: 'TALI – Fighter (Official Music Video)' },
        { id: 'ZwHoEwjopJE', title: 'dancing alone - (A Homemade Music Video)' },
        { id: 'IfKKZYN1P9A', title: 'Fighter (Live with the Luxembourg Philharmonic)' },
        { id: '9PXzLu2qY7M', title: '"lose you" - Official Music Video' },
        { id: 'AHdAxucqAJs', title: 'TALI - Blackbird (The Beatles cover)' }
    ]

    const allShows = [
        { date: '06/06/26', venue: 'Bruxelles - RED HAVEN Release Show', upcoming: true },
        { date: '08/05/26', venue: 'Rockhal "RED HAVEN" release show' },
        { date: '05/02/26', venue: 'Jewish Federation of Broward' },
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
            <Helmet>
                <title>Music - Tali Golergant</title>
                <meta name="description" content="Listen to Tali Golergant's music - singles, EPs, and music videos. Including WANDER EP, Style, Senti(mental), and more." />
                <link rel="canonical" href="https://taligolergant.org/music" />
                <meta property="og:title" content="Music - Tali Golergant" />
                <meta property="og:description" content="Listen to Tali Golergant's music - singles, EPs, and music videos. Including WANDER EP, Style, Senti(mental), and more." />
                <meta property="og:url" content="https://taligolergant.org/music" />
                <meta property="og:type" content="music.musician" />
                <meta name="twitter:title" content="Music - Tali Golergant" />
                <meta name="twitter:description" content="Listen to Tali Golergant's music - singles, EPs, and music videos. Including WANDER EP, Style, Senti(mental), and more." />
                <script type="application/ld+json">
                    {JSON.stringify(musicJsonLd)}
                </script>
            </Helmet>
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
                                className={`video-card ${video.upcoming ? 'video-card--upcoming' : ''} ${video.isNew ? 'video-card--new' : ''}`}
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
                                    {video.upcoming && <span className="video-card__upcoming-tag">Upcoming</span>}
                                    {video.isNew && <span className="video-card__new-tag">New</span>}
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
                    {/* Scrollable carousel */}
                    <div className="spotify-carousel" ref={carouselRef}>
                        {!isMobile && (
                            <button
                                className="spotify-carousel__nav spotify-carousel__nav--prev"
                                onClick={() => {
                                    if (playerRef.current) {
                                        const itemWidth = playerRef.current.offsetWidth;
                                        playerRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' })
                                    }
                                }}
                                aria-label="Previous tracks"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                        )}

                        <div className={`spotify-carousel__player ${isMobile ? 'spotify-carousel__player--mobile' : ''}`} ref={playerRef}>
                            {spotifyTracks.map((track, idx) => (
                                <div key={idx} className="spotify-carousel__item">
                                    <iframe
                                        src={track}
                                        width="100%"
                                        height="152"
                                        frameBorder="0"
                                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                        loading="lazy"
                                        title={`Spotify track ${idx + 1}`}
                                    />
                                </div>
                            ))}
                        </div>

                        {!isMobile && (
                            <button
                                className="spotify-carousel__nav spotify-carousel__nav--next"
                                onClick={() => {
                                    if (playerRef.current) {
                                        const itemWidth = playerRef.current.offsetWidth;
                                        playerRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' })
                                    }
                                }}
                                aria-label="Next tracks"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        )}
                    </div>

                    <p className="spotify-carousel__indicator">← Swipe for more →</p>
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
                                className={`show-item ${show.upcoming ? 'show-item--upcoming' : ''} ${!isDesktop && !showAllShows && index === 5 ? 'show-item--half-blurred' : ''}`}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.03 }}
                            >
                                <span className="show-item__date">{show.date}</span>
                                <span className="show-item__venue">
                                    {show.venue}
                                    {show.upcoming && <span className="show-item__upcoming-tag"> · Upcoming!</span>}
                                </span>
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
