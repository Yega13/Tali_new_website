import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Collaborations.css'

// BlueStripes moments photos for the gallery
const bluestripesPhotos = [
    { src: '/photos/BlueStrpies.jpg', alt: 'Tali with BlueStripes' },
    { src: '/photos/Blue Bird.jpg', alt: 'Blue Bird cover' },
    { src: '/photos/Tali pics(3).jpg', alt: 'Tali recording' },
    { src: '/photos/Tali pics(50).jpg', alt: 'Studio session' },
    { src: '/photos/Tali pics(52) Den atelier.webp', alt: 'Live at Den Atelier' },
    { src: '/photos/Tali pics(57).jpg', alt: 'Band rehearsal' },
    { src: '/photos/Tali pics(59).jpg', alt: 'Band photo' }
]

const collaborations = [
    {
        id: 'bluestripes',
        name: 'BlueStripes',
        image: '/photos/Tali pics(3).jpg',
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
                image: '/photos/Blue Bird.jpg',
                description: 'An uplifting anthem about freedom and self-discovery, blending indie rock with folk influences.'
            },
            {
                title: "Come On!",
                image: '/photos/BlueStrpies.jpg',
                description: 'An energetic, dance-ready track with infectious rhythms and empowering lyrics that celebrate living in the moment.'
            }
        ]
    },
    {
        id: 'lostinpacific',
        name: 'Lost in Pacific',
        image: '/photos/Ocean logo.jpg',
        description: 'An experimental electronic collaboration exploring atmospheric soundscapes and ethereal melodies.'
    },
    {
        id: 'sarahvera',
        name: 'Sarah Vera',
        image: '/photos/Garden of Eden.jpg',
        description: 'A beautiful acoustic collaboration with rising Luxembourg singer-songwriter Sarah Vera.'
    },
    {
        id: 'maxbartos',
        name: 'Max Bartos',
        image: '/photos/Carry me home.jpg',
        description: 'Tali worked with renowned producer Max Bartos on several tracks, blending indie pop with electronic production.'
    }
]

export default function Collaborations() {
    const [expandedCollab, setExpandedCollab] = useState(null)
    const [lightboxIndex, setLightboxIndex] = useState(null)

    const toggleExpand = (id) => {
        setExpandedCollab(expandedCollab === id ? null : id)
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

    // Block body scroll when lightbox is open
    useEffect(() => {
        let savedScrollY = 0

        if (lightboxIndex !== null) {
            savedScrollY = window.scrollY
            document.body.style.position = 'fixed'
            document.body.style.top = `-${savedScrollY}px`
            document.body.style.left = '0'
            document.body.style.right = '0'
            document.body.style.overflow = 'hidden'
            document.body.dataset.scrollY = savedScrollY
        } else {
            const scrollY = document.body.dataset.scrollY
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.left = ''
            document.body.style.right = ''
            document.body.style.overflow = ''
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY))
                delete document.body.dataset.scrollY
            }
        }
        return () => {
            const scrollY = document.body.dataset.scrollY
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.left = ''
            document.body.style.right = ''
            document.body.style.overflow = ''
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY))
                delete document.body.dataset.scrollY
            }
        }
    }, [lightboxIndex])

    return (
        <div className="collaborations">
            {/* Hero */}
            <section className="collab-hero">
                <div className="collab-hero__background">
                    <img src="/photos/Tali pics(106).jpg" alt="Tali - collaborations" className="collab-hero__image" />
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

                                    <AnimatePresence>
                                        {expandedCollab === collab.id && (
                                            <motion.div
                                                className="collab-expanded"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
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
                                                                <img src={photo.src} alt={photo.alt} />
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
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
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
                            <img
                                src={bluestripesPhotos[lightboxIndex].src}
                                alt={bluestripesPhotos[lightboxIndex].alt}
                                className="collab-lightbox__image"
                            />
                            <p className="collab-lightbox__caption">{bluestripesPhotos[lightboxIndex].alt}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
