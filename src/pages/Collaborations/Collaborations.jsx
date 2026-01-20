import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Collaborations.css'

// BlueStripes moments photos for the gallery
const bluestripesPhotos = [
    { src: '/photos/tali-pics111.jpg', alt: 'Subway', type: 'image' },
    { src: '/photos/tali-vids5.mp4', alt: 'Come On!', type: 'video' },
    { src: '/photos/tali-vids3.mp4', alt: 'New York', type: 'video' },
    { src: '/photos/tali-pics3.jpg', alt: 'Tali recording', type: 'image' },
    { src: '/photos/tali-pics5.jpg', alt: 'Filming', type: 'image' },
    { src: '/photos/tali-vids30.mp4', alt: 'Rehearsal', type: 'video' },
    { src: '/photos/tali-vids31.mp4', type: 'video' },
    { src: '/photos/Tali pics(140).jpg', alt: 'Rehearsal', type: 'image', objectPosition: 'right' }
]

const collaborations = [
    {
        id: 'bluestripes',
        name: 'BlueStripes',
        image: '/photos/tali-pics3.jpg',
        description: 'Tali collaborated with BlueStripes on their debut EP, bringing her unique vocal style to their alternative rock sound.',
        hasExpandableSongs: true,
        songs: [
            {
                title: "You Don't Really Know Me",
                image: '/photos/You don\'t really know me pic.jpg',
                description: 'A powerful ballad exploring themes of identity and perception, featuring Tali\'s soaring vocals over ethereal guitar melodies.'
            },
            {
                title: "Blue Bird",
                image: '/photos/blue-bird.jpg',
                description: 'An uplifting anthem about freedom and self-discovery, blending indie rock with folk influences.'
            },
            {
                title: "Come On!",
                image: '/photos/bluestrpies.jpg',
                description: 'An energetic, dance-ready track with infectious rhythms and empowering lyrics that celebrate living in the moment.'
            }
        ]
    },
    {
        id: 'lostinpacific',
        name: 'Lost in Pacific',
        image: '/photos/ocean-logo.jpg',
        description: 'An experimental electronic collaboration exploring atmospheric soundscapes and ethereal melodies.'
    },
    {
        id: 'sarahvera',
        name: 'Sarah Vera',
        image: '/photos/garden-of-eden.jpg',
        description: 'A beautiful acoustic collaboration with rising Luxembourg singer-songwriter Sarah Vera.'
    },
    {
        id: 'maxbartos',
        name: 'Max Bartos',
        image: '/photos/carry-me-home.jpg',
        description: 'Tali worked with renowned producer Max Bartos on several tracks, blending indie pop with electronic production.'
    }
]

export default function Collaborations() {
    const [expandedCollab, setExpandedCollab] = useState(null)
    const [collapsingCollab, setCollapsingCollab] = useState(null)
    const [collapseHeight, setCollapseHeight] = useState(null)
    const [lightboxIndex, setLightboxIndex] = useState(null)
    const scrollPositionRef = useRef(0)
    const wasOpenRef = useRef(false)
    const cardRefs = useRef({})
    const expandedRef = useRef(null)

    // Preload images for expandable sections to prevent lag
    useEffect(() => {
        const imagesToPreload = [
            // Song images
            ...collaborations
                .filter(c => c.songs)
                .flatMap(c => c.songs.map(s => s.image)),
            // Moments images/videos
            ...bluestripesPhotos
                .filter(p => p.type !== 'video')
                .map(p => p.src)
        ]

        imagesToPreload.forEach(src => {
            const img = new Image()
            img.src = src
        })
    }, [])

    const toggleExpand = (id) => {
        if (expandedCollab === id) {
            // Collapsing - measure current height for animation
            const expandedEl = expandedRef.current
            const currentHeight = expandedEl ? expandedEl.scrollHeight : 0

            // Set height for CSS transition and start collapse
            setCollapseHeight(currentHeight)
            setExpandedCollab(null)
            setCollapsingCollab(id)

            // Trigger reflow, then animate to 0
            requestAnimationFrame(() => {
                setCollapseHeight(0)
            })

            // After animation completes, clean up
            setTimeout(() => {
                setCollapsingCollab(null)
                setCollapseHeight(null)
            }, 400)
        } else {
            setExpandedCollab(id)
        }
    }

    const openLightbox = (index) => {
        setLightboxIndex(index)
    }

    const closeLightbox = () => {
        setLightboxIndex(null)
    }

    const nextImage = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % bluestripesPhotos.length)
        }
    }

    const prevImage = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + bluestripesPhotos.length) % bluestripesPhotos.length)
        }
    }

    // Block body scroll when lightbox is open - using wasOpenRef pattern
    useEffect(() => {
        if (lightboxIndex !== null) {
            scrollPositionRef.current = window.scrollY
            wasOpenRef.current = true
            document.documentElement.style.overflow = 'hidden'
            document.body.style.overflow = 'hidden'
        } else if (wasOpenRef.current) {
            document.documentElement.style.overflow = ''
            document.body.style.overflow = ''
            requestAnimationFrame(() => {
                window.scrollTo(0, scrollPositionRef.current)
            })
            wasOpenRef.current = false
        }
        return () => {
            document.documentElement.style.overflow = ''
            document.body.style.overflow = ''
        }
    }, [lightboxIndex])

    return (
        <div className="collaborations">
            {/* Hero */}
            <section className="collab-hero">
                <div className="collab-hero__background">
                    <img src="/photos/tali-pics106.jpg" alt="Tali - collaborations" className="collab-hero__image" />
                    <div className="collab-hero__overlay" />
                </div>
                <div className="collab-hero__content container">
                    <motion.h1
                        className="collab-hero__title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Collaborations
                    </motion.h1>
                </div>
            </section>

            {/* Collaborations List */}
            <section className="collab-list section">
                <div className="container">
                    {collaborations.map((collab, index) => (
                        <motion.article
                            key={collab.id}
                            ref={el => cardRefs.current[collab.id] = el}
                            className="collab-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                        >
                            {/* Number Badge */}
                            <div className={`collab-card__number ${index % 2 === 1 ? 'collab-card__number--right' : ''}`}>
                                {String(index + 1).padStart(2, '0')}
                            </div>

                            {/* Title and Description */}
                            <div className="collab-card__content">
                                <h2 className="collab-card__name">{collab.name}</h2>
                                <p className="collab-card__description">{collab.description}</p>
                            </div>

                            {/* Image */}
                            <div className="collab-card__image">
                                <img src={collab.image} alt={collab.name} />
                            </div>

                            {/* Expandable Section (BlueStripes only) */}
                            {collab.hasExpandableSongs && (
                                <div className="collab-card__actions">
                                    <AnimatePresence mode="wait">
                                        {expandedCollab !== collab.id && (
                                            <motion.button
                                                key="show-more"
                                                className="collab-card__expand-btn"
                                                onClick={() => toggleExpand(collab.id)}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <span>Show More</span>
                                                <motion.svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    className="collab-card__expand-icon"
                                                    animate={{ y: [0, 3, 0] }}
                                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                                >
                                                    <polyline points="6 9 12 15 18 9" />
                                                </motion.svg>
                                            </motion.button>
                                        )}
                                    </AnimatePresence>

                                    {(expandedCollab === collab.id || collapsingCollab === collab.id) && (
                                        <div
                                            ref={expandedCollab === collab.id ? expandedRef : null}
                                            className="collab-expanded"
                                            style={collapsingCollab === collab.id ? {
                                                height: collapseHeight,
                                                overflow: 'hidden',
                                                transition: 'height 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.4s ease',
                                                opacity: collapseHeight === 0 ? 0 : 1
                                            } : undefined}
                                        >
                                                {/* Songs Section - Vertical Layout */}
                                                <div className="collab-songs-vertical">
                                                    {collab.songs.map((song, i) => (
                                                        <motion.div
                                                            key={i}
                                                            className="collab-song-vertical"
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: i * 0.1 }}
                                                        >
                                                            <div className="collab-song-vertical__image">
                                                                <img src={song.image} alt={song.title} />
                                                            </div>
                                                            <h4 className="collab-song-vertical__title">{song.title}</h4>
                                                            <p className="collab-song-vertical__description">{song.description}</p>
                                                        </motion.div>
                                                    ))}
                                                </div>

                                                {/* Moments Gallery Section */}
                                                <div className="collab-moments">
                                                    <h3 className="collab-moments__title">Moments</h3>
                                                    <div className="collab-moments__grid">
                                                        {bluestripesPhotos.map((photo, i) => (
                                                            <motion.div
                                                                key={i}
                                                                className="collab-moments__item"
                                                                initial={{ opacity: 0, scale: 0.9 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                transition={{ delay: i * 0.05 }}
                                                                onClick={() => openLightbox(i)}
                                                            >
                                                                {photo.type === 'video' ? (
                                                                    <video src={photo.src} autoPlay loop muted playsInline preload="auto" />
                                                                ) : (
                                                                    <img
                                                                        src={photo.src}
                                                                        alt={photo.alt}
                                                                        style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined}
                                                                    />
                                                                )}
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Show Less Button - Centered */}
                                                <div className="collab-expanded__show-less">
                                                    <button
                                                        className="collab-card__expand-btn"
                                                        onClick={() => toggleExpand(collab.id)}
                                                    >
                                                        <span>Show Less</span>
                                                        <motion.svg
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            className="collab-card__expand-icon"
                                                            animate={{ y: [0, -3, 0] }}
                                                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                                        >
                                                            <polyline points="6 15 12 9 18 15" />
                                                        </motion.svg>
                                                    </button>
                                                </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* Lightbox for Moments Gallery */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        className="collab-lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                    >
                        <div className="collab-lightbox__counter">
                            {lightboxIndex + 1} / {bluestripesPhotos.length}
                        </div>

                        <button className="collab-lightbox__nav collab-lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <button className="collab-lightbox__nav collab-lightbox__nav--next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>

                        <div className="collab-lightbox__content" onClick={(e) => e.stopPropagation()}>
                            {/* Spacer to balance caption for proper centering */}
                            {bluestripesPhotos[lightboxIndex].alt && <div className="collab-lightbox__spacer" />}
                            {bluestripesPhotos[lightboxIndex].type === 'video' ? (
                                <video
                                    key={lightboxIndex}
                                    src={bluestripesPhotos[lightboxIndex].src}
                                    className="collab-lightbox__image"
                                    controls
                                    autoPlay
                                    playsInline
                                />
                            ) : (
                                <img
                                    src={bluestripesPhotos[lightboxIndex].src}
                                    alt={bluestripesPhotos[lightboxIndex].alt || ''}
                                    className="collab-lightbox__image"
                                />
                            )}
                            {bluestripesPhotos[lightboxIndex].alt && (
                                <p className="collab-lightbox__caption">{bluestripesPhotos[lightboxIndex].alt}</p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
