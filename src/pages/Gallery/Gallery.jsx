import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsDesktop } from '@/hooks/useMediaQuery'
import LazyImage from '@/components/common/LazyImage'
import './Gallery.css'

// Mixed media arrays (photos + videos merged)
// WANDER section
const wanderMedia = [
    { src: '/photos/Tali pics(25) Dear Parents.webp', alt: 'Dear Parents - Photoshoot in Paris', type: 'image' },
    { src: '/photos/Tali pics(26) Dear Parents Tongue.webp', alt: 'Dear Parents - Photoshoot in Paris', type: 'image' },
    { src: '/photos/Tali from facebook 8.webp', type: 'image' },
    { src: '/photos/Tali pics(27) Dear Parents necklace.webp', alt: 'Dear Parents necklace', type: 'image' },
    { src: '/photos/Tali vids(20).mp4', alt: 'Blue Turns To Grey - Studio', type: 'video' },
    { src: '/photos/Tali pics(51).webp', alt: 'WANDER', type: 'image' },
    { src: '/photos/Tali pics(23) Wander.webp', alt: 'Wander Photoshoot', type: 'image' },
    { src: '/photos/Tali wander vid.mp4', type: 'video' },
    { src: '/photos/Tali vids(21).mp4', alt: 'Sticker ;)', type: 'video' },
    { src: '/photos/Tali pics(85).webp', type: 'image' }
]

// Eurovision 2024 section
const eurovisionMedia = [
    { src: '/photos/Tali pics(98).webp', alt: 'Eurovision 2024 - Malmo', type: 'image' },
    { src: '/photos/Tali pics(42) Eurovision.webp', alt: 'Tali Eurovision moment', type: 'image' },
    { src: '/photos/Tali pics(97).webp', alt: 'Tali portrait', type: 'image' },
    { src: '/photos/Talis vids(19).mp4', alt: 'Tali Eurovision video', type: 'video' },
    { src: '/photos/Tali pics(14) Eurovision Heart.webp', alt: 'Tali Eurovision heart', type: 'image' },
    { src: '/photos/Tali pics(80).webp', alt: 'Tali close-up', type: 'image' },
    { src: '/photos/Tali pics(13) Eurovision.webp', alt: 'Tali Eurovision pose', type: 'image' },
    { src: '/photos/Tali vids(32).mp4', alt: 'Tali Eurovision backstage', type: 'video' }
]

// In Focus section
const inFocusMedia = [
    { src: '/photos/Tali pics(68).webp', alt: 'Tali moment', type: 'image' },
    { src: '/photos/Tali pics(47) National selection.webp', alt: 'Tali - National selection', type: 'image' },
    { src: '/photos/Tali vids Style walking.mp4', alt: 'Tali - Style walk', type: 'video' },
    { src: '/photos/Tali pics(60) trounwiessel.webp', alt: 'Tali at Trounwiessel', type: 'image' },
    { src: '/photos/Tali pics(18).webp', alt: 'Tali candid', type: 'image' },
    { src: '/photos/Tali pics(12) Not included.webp', alt: 'Fans', type: 'image' },
    { src: '/photos/Tali pics(36) eurovision 2025 Not included.webp', alt: 'LSC 2025', type: 'image' },
    { src: '/photos/Tali pics(10).webp', alt: 'Tali essence', type: 'image' },
    { src: '/photos/Tali pics(52) Den atelier.webp', alt: 'Tali at Den Atelier', type: 'image' },
    { src: '/photos/Tali vids(16).mp4', alt: 'Luxembourg Philarmonie 2025', type: 'video' },
    { src: '/photos/Tali vids(17).mp4', alt: 'Trounwiessel show', type: 'video' },
    { src: '/photos/Tali vids(11).mp4', alt: 'Luxembourg Philarmonie 2024', type: 'video' },
    { src: '/photos/Tali pics(57) echterlicht.webp', alt: 'Tali at Echterliecht', type: 'image' },
    { src: '/photos/Tali pics(57).webp', alt: 'Tali portrait', type: 'image' },
    { src: '/photos/Tali pics(59).webp', alt: 'Tali candid', type: 'image' },
    { src: '/photos/Tali pics(55) dancing alone.webp', type: 'image' },
    { src: '/photos/Tali pics(104).webp', alt: 'Echterleicht backstage', type: 'image', objectPosition: '30% center' },
    { src: '/photos/Tali pics(82) baby.webp', alt: 'Tali baby photo', type: 'image' },
    { src: '/photos/Tali pics(83).webp', alt: 'Luxembourg Philarmonie 2025', type: 'image', objectPosition: 'top' },
    { src: '/photos/Tali pics(53) Echterleicht.webp', alt: 'Tali at Echterleicht', type: 'image' },
]

// Moments section - pictures with humans
const momentsImages = [
    { src: '/photos/Tali pics(103).webp', alt: 'Tali moment' },
    { src: '/photos/Tali pics(69).webp', alt: 'Tali candid' },
    { src: '/photos/Tali from facebook 4.webp', alt: 'Tali genuine' },
    { src: '/photos/Tali pics(72).webp', alt: 'Tali photoshoot' },
    { src: '/photos/Tali pics(73).webp', alt: 'Tali editorial' },
    { src: '/photos/Tali pics(74).webp', alt: 'Tali style' }
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
    const scrollPositionRef = useRef(0)

    const openLightbox = (globalIndex) => {
        setLightboxIndex(globalIndex)
    }

    const closeLightbox = () => {
        setLightboxIndex(null)
    }

    // Block body scroll when lightbox is open - improved to prevent jumping
    useEffect(() => {
        if (lightboxIndex !== null) {
            // Save current scroll position
            scrollPositionRef.current = window.scrollY
            // Get scrollbar width to prevent layout shift
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
            // Lock scroll without position:fixed to avoid jumping
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = `${scrollbarWidth}px`
        } else {
            // Restore scroll
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
            // Restore scroll position immediately
            window.scrollTo(0, scrollPositionRef.current)
        }
        return () => {
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
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
                    {[
                        '/photos/Tali from facebook 4.webp',
                        '/photos/Tali pics(25) Dear Parents.webp',
                        '/photos/Tali pics(28).webp',
                        '/photos/Tali pics(32).webp',
                        '/photos/Tali pics(57) echterlicht.webp',
                        '/photos/Tali pics(80).webp',
                        '/photos/Tali pics(51).webp',
                        '/photos/Tali pics(16).webp',
                        '/photos/Tali pics(68).webp',
                        '/photos/Tali pics(18).webp',
                        '/photos/Tali pics(14) Eurovision Heart.webp',
                        // Loop
                        '/photos/Tali from facebook 4.webp',
                        '/photos/Tali pics(25) Dear Parents.webp',
                        '/photos/Tali pics(28).webp',
                        '/photos/Tali pics(32).webp',
                        '/photos/Tali pics(57) echterlicht.webp',
                        '/photos/Tali pics(80).webp',
                        '/photos/Tali pics(51).webp',
                        '/photos/Tali pics(16).webp',
                        '/photos/Tali pics(68).webp',
                        '/photos/Tali pics(18).webp',
                        '/photos/Tali pics(14) Eurovision Heart.webp',
                    ].map((src, i) => (
                        <img key={i} src={src} alt="Gallery" className="gallery-ticker__image" />
                    ))}
                </div>
            </div>

            {/* WANDER */}
            <section className="gallery-grid section">
                <div className="container">
                    <h2 className="section-title">WANDER</h2>
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
                                    <video src={media.src} autoPlay loop muted playsInline preload="auto" />
                                ) : (
                                    <LazyImage src={media.src} alt={media.alt} />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Eurovision 2024 */}
            <section className="gallery-grid section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <h2 className="section-title">Eurovision 2024</h2>
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
                                    <video src={media.src} autoPlay loop muted playsInline preload="auto" />
                                ) : (
                                    <LazyImage src={media.src} alt={media.alt} />
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
                                    <video src={media.src} autoPlay loop muted playsInline preload="auto" />
                                ) : (
                                    <LazyImage
                                        src={media.src}
                                        alt={media.alt}
                                        style={media.objectPosition ? { objectPosition: media.objectPosition } : undefined}
                                    />
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
                                <LazyImage src={image.src} alt={image.alt} />
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
                            {/* Spacer to balance caption for proper centering */}
                            {allMedia[lightboxIndex].alt && <div className="lightbox__spacer" />}
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
                                    alt={allMedia[lightboxIndex].alt || ''}
                                    className="lightbox__image"
                                />
                            )}
                            {allMedia[lightboxIndex].alt && (
                                <p className="lightbox__caption">{allMedia[lightboxIndex].alt}</p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
