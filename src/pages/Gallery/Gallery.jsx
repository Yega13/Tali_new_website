import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsDesktop } from '@/hooks/useMediaQuery'
import './Gallery.css'

// Mixed media arrays (photos + videos merged)
const wanderMedia = [
    { src: '/photos/Tali pics(51).jpg', alt: 'Tali - Wander portrait', type: 'image' },
    { src: '/photos/Tali wander vid.mp4', alt: 'Tali - Wander', type: 'video' },
    { src: '/photos/Tali pics(52) Den atelier.webp', alt: 'Tali at Den Atelier', type: 'image' },
    { src: '/photos/Tali pics(50).jpg', alt: 'Tali - candid moment', type: 'image' },
    { src: '/photos/Tali vids Style walking.mp4', alt: 'Tali - Style walk', type: 'video' },
    { src: '/photos/Tali pics(3).jpg', alt: 'Tali - natural light', type: 'image' },
    { src: '/photos/Tali pics(23) Wander.jpg', alt: 'Tali - Wander shoot', type: 'image' },
    { src: '/photos/Tali pics(49).jpg', alt: 'Tali portrait', type: 'image' }
]

const eurovisionMedia = [
    { src: '/photos/Tali pics(35) eurovision 2025.jpg', alt: 'Tali - Eurovision 2025', type: 'image' },
    { src: '/photos/Tali pics(38) Eurovision.webp', alt: 'Tali on Eurovision stage', type: 'image' },
    { src: '/photos/Tali pics(28).jpg', alt: 'Tali - backstage', type: 'image' },
    { src: '/photos/Tali pics(8).jpg', alt: 'Tali - rehearsal', type: 'image' },
    { src: '/photos/Tali pics(40) Eurovision.jpg', alt: 'Tali Eurovision performance', type: 'image' },
    { src: '/photos/Tali pics(41) Eurovision.jpg', alt: 'Tali Eurovision glow', type: 'image' },
    { src: '/photos/Tali pics(42) Eurovision.jpg', alt: 'Tali Eurovision moment', type: 'image' },
    { src: '/photos/Tali pics(13) Eurovision.jpg', alt: 'Tali Eurovision pose', type: 'image' }
]

const inFocusMedia = [
    { src: '/photos/Tali den atelier.jpeg', alt: 'Tali live at Den Atelier', type: 'image' },
    { src: '/photos/Tali vids(3).mp4', alt: 'Tali performance', type: 'video' },
    { src: '/photos/Tali pics(5).jpg', alt: 'Tali - powerful vocals', type: 'image' },
    { src: '/photos/Tali pics(72).jpg', alt: 'Tali - photoshoot', type: 'image' },
    { src: '/photos/Tali vids(5).mp4', alt: 'Tali live', type: 'video' },
    { src: '/photos/Tali pics(73).jpg', alt: 'Tali - editorial', type: 'image' },
    { src: '/photos/Tali pics(85).jpg', alt: 'Tali live with crowd', type: 'image' },
    { src: '/photos/Tali Style elevator.mp4', alt: 'Tali - elevator', type: 'video' },
    { src: '/photos/Tali pics(95).jpg', alt: 'Tali on stage', type: 'image' },
    { src: '/photos/Tali pics(97).jpg', alt: 'Tali portrait', type: 'image' },
    { src: '/photos/Tali pics(74).jpg', alt: 'Tali - style', type: 'image' },
    { src: '/photos/Tali pics(75).jpg', alt: 'Tali fashion', type: 'image' },
    { src: '/photos/Tali pics(79).jpg', alt: 'Tali artistic', type: 'image' },
    { src: '/photos/Tali pics(80).jpg', alt: 'Tali close-up', type: 'image' },
    { src: '/photos/Tali pics(81).jpg', alt: 'Tali gaze', type: 'image' },
    { src: '/photos/Tali pics(83).jpg', alt: 'Tali dramatic', type: 'image' },
    { src: '/photos/Tali pics(98).jpg', alt: 'Tali stunning', type: 'image' },
    { src: '/photos/Tali pics(99).jpg', alt: 'Tali radiant', type: 'image' }
]

// Moments section - B&W photos
const momentsImages = [
    { src: '/photos/Tali pics(103) - Black and white.jpg', alt: 'Tali - black and white' },
    { src: '/photos/Tali pics(60) trounwiessel- Black and white.jpg', alt: 'Tali at Trounwiessel' },
    { src: '/photos/Tali pics(68).jpg', alt: 'Tali moment' },
    { src: '/photos/Tali pics(69).jpg', alt: 'Tali candid' },
    { src: '/photos/Tali pics(70).jpg', alt: 'Tali reflection' },
    { src: '/photos/Tali from facebook 4.jpg', alt: 'Tali genuine' },
    { src: '/photos/Tali from facebook 8.jpg', alt: 'Tali soul' },
    { src: '/photos/Tali pics(10).jpg', alt: 'Tali essence' }
]

// Combine ALL media into one unified array for the lightbox
const allMedia = [
    ...wanderMedia,
    ...eurovisionMedia,
    ...inFocusMedia,
    ...momentsImages.map(img => ({ ...img, type: 'image' }))
]

// Calculate starting indices for each section
const wanderStartIndex = 0
const eurovisionStartIndex = wanderMedia.length
const inFocusStartIndex = wanderMedia.length + eurovisionMedia.length
const momentsStartIndex = wanderMedia.length + eurovisionMedia.length + inFocusMedia.length

export default function Gallery() {
    const [lightboxIndex, setLightboxIndex] = useState(null)
    const isDesktop = useIsDesktop()

    const openLightbox = (globalIndex) => {
        setLightboxIndex(globalIndex)
    }

    const closeLightbox = () => {
        setLightboxIndex(null)
    }

    // Block body scroll when lightbox is open - robust implementation
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

    const nextImage = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % allMedia.length)
        }
    }

    const prevImage = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + allMedia.length) % allMedia.length)
        }
    }

    // Swipe handling for mobile
    const [touchStartX, setTouchStartX] = useState(0)

    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX)
    }

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX
        const diff = touchStartX - touchEndX
        if (Math.abs(diff) > 50) { // minimum swipe distance
            if (diff > 0) {
                nextImage() // swipe left = next
            } else {
                prevImage() // swipe right = prev
            }
        }
    }

    // Video click to pause/play
    const handleVideoClick = (e) => {
        e.stopPropagation()
        if (e.target.paused) {
            e.target.play()
        } else {
            e.target.pause()
        }
    }

    return (
        <div className="gallery">
            {/* Ticker with Gallery Title and Images */}
            <div className="gallery-ticker">
                <div className="gallery-ticker__title">GALLERY</div>
                <div className="gallery-ticker__content">
                    {[...wanderMedia.filter(m => m.type === 'image'), ...wanderMedia.filter(m => m.type === 'image')].map((media, i) => (
                        <img key={i} src={media.src} alt={media.alt} className="gallery-ticker__image" />
                    ))}
                </div>
            </div>

            {/* WANDER */}
            <section className="gallery-grid section">
                <div className="container">
                    <h2 className="section-title">Gallery</h2>
                    <div className={`gallery-grid__container ${isDesktop ? 'gallery-grid__container--masonry' : ''}`}>
                        {wanderMedia.map((media, index) => (
                            <motion.div
                                key={index}
                                className="gallery-item"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => openLightbox(wanderStartIndex + index)}
                            >
                                {media.type === 'video' ? (
                                    <video src={media.src} autoPlay loop muted playsInline />
                                ) : (
                                    <img src={media.src} alt={media.alt} loading="lazy" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Eurovision 2025 */}
            <section className="gallery-grid section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <h2 className="section-title">Eurovision 2025</h2>
                    <div className={`gallery-grid__container ${isDesktop ? 'gallery-grid__container--masonry' : ''}`}>
                        {eurovisionMedia.map((media, index) => (
                            <motion.div
                                key={index}
                                className="gallery-item"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => openLightbox(eurovisionStartIndex + index)}
                            >
                                {media.type === 'video' ? (
                                    <video src={media.src} autoPlay loop muted playsInline />
                                ) : (
                                    <img src={media.src} alt={media.alt} loading="lazy" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* In Focus */}
            <section className="gallery-grid section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <h2 className="section-title">In Focus</h2>
                    <div className={`gallery-grid__container ${isDesktop ? 'gallery-grid__container--masonry' : ''}`}>
                        {inFocusMedia.map((media, index) => (
                            <motion.div
                                key={index}
                                className="gallery-item"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => openLightbox(inFocusStartIndex + index)}
                            >
                                {media.type === 'video' ? (
                                    <video src={media.src} autoPlay loop muted playsInline />
                                ) : (
                                    <img src={media.src} alt={media.alt} loading="lazy" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Moments - B&W */}
            <section className="gallery-grid section gallery-moments" style={{ paddingTop: 0 }}>
                <div className="container">
                    <h2 className="section-title">Moments</h2>
                    <div className={`gallery-grid__container ${isDesktop ? 'gallery-grid__container--masonry' : ''}`}>
                        {momentsImages.map((image, index) => (
                            <motion.div
                                key={index}
                                className="gallery-item gallery-item--bw"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => openLightbox(momentsStartIndex + index)}
                            >
                                <img src={image.src} alt={image.alt} loading="lazy" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Lightbox */}
            <AnimatePresence mode="wait">
                {lightboxIndex !== null && (
                    <motion.div
                        className="lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                    >
                        {/* Photo counter instead of X */}
                        <div className="lightbox__counter">
                            {lightboxIndex + 1} / {allMedia.length}
                        </div>

                        {/* Navigation buttons */}
                        <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>

                        {/* Media container with caption */}
                        <div
                            className="lightbox__content"
                            onClick={(e) => e.stopPropagation()}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            {allMedia[lightboxIndex].type === 'video' || allMedia[lightboxIndex].src.endsWith('.mp4') ? (
                                <div className="lightbox__video-wrapper">
                                    <video
                                        key={lightboxIndex}
                                        id="lightbox-video"
                                        src={allMedia[lightboxIndex].src}
                                        className="lightbox__image"
                                        autoPlay
                                        playsInline
                                        controls
                                    />
                                    <div
                                        className="lightbox__video-overlay"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const video = document.getElementById('lightbox-video');
                                            if (video) {
                                                if (video.paused) {
                                                    video.play();
                                                } else {
                                                    video.pause();
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            ) : (
                                <img
                                    key={lightboxIndex}
                                    src={allMedia[lightboxIndex].src}
                                    alt={allMedia[lightboxIndex].alt}
                                    className="lightbox__image"
                                />
                            )}
                            <p className="lightbox__caption">{allMedia[lightboxIndex].alt}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
