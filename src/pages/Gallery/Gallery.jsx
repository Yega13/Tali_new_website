import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsDesktop } from '@/hooks/useMediaQuery'
import LazyImage from '@/components/common/LazyImage'
import './Gallery.css'

// Mixed media arrays (photos + videos merged)
// WANDER section
const wanderMedia = [
    { src: '/photos/tali-pics25-dear-parents.jpg', alt: 'Dear Parents - Photoshoot in Paris', type: 'image' },
    { src: '/photos/tali-pics26-dear-parents-tongue.jpg', alt: 'Dear Parents - Photoshoot in Paris', type: 'image' },
    { src: '/photos/tali-from-facebook-8.jpg', type: 'image' },
    { src: '/photos/tali-pics27-dear-parents-necklace.jpg', alt: 'Dear Parents necklace', type: 'image' },
    { src: '/photos/tali-vids20.mp4', alt: 'Blue Turns To Grey - Studio', type: 'video' },
    { src: '/photos/tali-pics51.jpg', alt: 'WANDER', type: 'image' },
    { src: '/photos/tali-pics23-wander.jpg', alt: 'Wander Photoshoot', type: 'image' },
    { src: '/photos/tali-wander-vid.mp4', type: 'video' },
    { src: '/photos/tali-vids21.mp4', alt: 'Sticker ;)', type: 'video' },
    { src: '/photos/tali-pics85.jpg', type: 'image' },
    { src: '/photos/lemon lime.mp4', alt: 'Lemon Lime', type: 'video', desktopOnly: true }
]

// Eurovision 2024 section
const eurovisionMedia = [
    { src: '/photos/tali-pics98.jpg', alt: 'Eurovision 2024 - Malmo', type: 'image' },
    { src: '/photos/tali-pics42-eurovision.jpg', alt: 'Tali Eurovision moment', type: 'image' },
    { src: '/photos/tali-pics97.jpg', alt: 'Tali portrait', type: 'image' },
    { src: '/photos/talis-vids19.mp4', alt: 'Tali Eurovision video', type: 'video' },
    { src: '/photos/tali-pics14-eurovision-heart.jpg', alt: 'Tali Eurovision heart', type: 'image' },
    { src: '/photos/tali-pics80.jpg', alt: 'Tali close-up', type: 'image' },
    { src: '/photos/tali-pics13-eurovision.jpg', alt: 'Tali Eurovision pose', type: 'image' },
    { src: '/photos/tali-vids32.mp4', alt: 'Tali Eurovision backstage', type: 'video' }
]

// In Focus section
const inFocusMedia = [
    { src: '/photos/tali-pics68.jpg', alt: 'Tali moment', type: 'image' },
    { src: '/photos/tali-pics47-national-selection.jpg', alt: 'Tali - National selection', type: 'image' },
    { src: '/photos/tali-vids-style-walking.mp4', alt: 'Tali - Style walk', type: 'video' },
    { src: '/photos/tali-pics60-trounwiessel.jpg', alt: 'Tali at Trounwiessel', type: 'image' },
    { src: '/photos/tali-pics18.jpg', alt: 'Tali candid', type: 'image' },
    { src: '/photos/tali-pics12-not-included.jpg', alt: 'Fans', type: 'image' },
    { src: '/photos/tali-pics36-eurovision-2025-not-included.jpg', alt: 'LSC 2025', type: 'image' },
    { src: '/photos/tali-pics10.jpg', alt: 'Tali essence', type: 'image' },
    { src: '/photos/tali-pics52-den-atelier.webp', alt: 'Tali at Den Atelier', type: 'image' },
    { src: '/photos/tali-vids16.mp4', alt: 'Luxembourg Philarmonie 2025', type: 'video' },
    { src: '/photos/tali-vids17.mp4', alt: 'Trounwiessel show', type: 'video' },
    { src: '/photos/tali-vids11.mp4', alt: 'Luxembourg Philarmonie 2024', type: 'video' },
    { src: '/photos/tali-pics57-echterlicht.webp', alt: 'Tali at Echterliecht', type: 'image' },
    { src: '/photos/tali-pics57.jpg', alt: 'Tali portrait', type: 'image' },
    { src: '/photos/tali-pics59.jpg', alt: 'Tali candid', type: 'image' },
    { src: '/photos/tali-pics55-dancing-alone.webp', type: 'image' },
    { src: '/photos/tali-pics104.jpg', alt: 'Echterleicht backstage', type: 'image', objectPosition: '30% center' },
    { src: '/photos/tali-pics82-baby.jpg', alt: 'Tali baby photo', type: 'image' },
    { src: '/photos/tali-pics83.jpg', alt: 'Luxembourg Philarmonie 2025', type: 'image', objectPosition: 'top' },
    { src: '/photos/tali-pics53-echterleicht.webp', alt: 'Tali at Echterleicht', type: 'image' },
    { src: '/photos/tali-pics-rockhall.webp', alt: 'Tali at Rockhall', type: 'image' },
    // Desktop-only media
    { src: '/photos/tali-pics132.webp', alt: 'Tali portrait', type: 'image', desktopOnly: true },
    { src: '/photos/tali-style3.mp4', alt: 'Tali Style', type: 'video', desktopOnly: true },
]

// Moments section - pictures with humans
const momentsImages = [
    { src: '/photos/tali-pics103.jpg', alt: 'Tali moment' },
    { src: '/photos/tali-pics69.jpg', alt: 'Tali candid' },
    { src: '/photos/tali-from-facebook-4.jpg', alt: 'Tali genuine' },
    { src: '/photos/tali-pics72.jpg', alt: 'Tali photoshoot' },
    { src: '/photos/tali-pics73.jpg', alt: 'Tali editorial' },
    { src: '/photos/tali-pics74.jpg', alt: 'Tali style' }
]

// Combine ALL media into one unified array for the lightbox
const allMedia = [
    ...wanderMedia,
    ...eurovisionMedia,
    ...inFocusMedia,
    ...momentsImages.map(img => ({ ...img, type: 'image' }))
]

// Indices are no longer needed for direct object lookup
/*
const wanderStartIndex = 0
const eurovisionStartIndex = wanderMedia.length
const inFocusStartIndex = wanderMedia.length + eurovisionMedia.length
const momentsStartIndex = wanderMedia.length + eurovisionMedia.length + inFocusMedia.length
*/

export default function Gallery() {
    const [lightboxIndex, setLightboxIndex] = useState(null)
    const isDesktop = useIsDesktop()
    const scrollPositionRef = useRef(0)
    const wasOpenRef = useRef(false)

    // Filter media for lightbox based on device
    const filteredMedia = useMemo(() => {
        return allMedia.filter(media => isDesktop || !media.desktopOnly)
    }, [isDesktop])

    const openLightbox = (media) => {
        const index = filteredMedia.findIndex(m => m.src === media.src)
        if (index !== -1) {
            setLightboxIndex(index)
        }
    }

    const closeLightbox = () => {
        setLightboxIndex(null)
    }

    // Block body scroll when lightbox is open
    useEffect(() => {
        if (lightboxIndex !== null) {
            // Save current scroll position BEFORE any changes
            scrollPositionRef.current = window.scrollY
            wasOpenRef.current = true

            // Simply hide overflow - don't use fixed positioning
            document.documentElement.style.overflow = 'hidden'
            document.body.style.overflow = 'hidden'
        } else if (wasOpenRef.current) {
            // Restore overflow
            document.documentElement.style.overflow = ''
            document.body.style.overflow = ''

            // Restore scroll position in next frame to ensure DOM is ready
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

    const nextImage = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % filteredMedia.length)
        }
    }

    const prevImage = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + filteredMedia.length) % filteredMedia.length)
        }
    }

    // Carousel swipe handling
    const [isDragging, setIsDragging] = useState(false)
    const [dragOffset, setDragOffset] = useState(0)
    const touchStartRef = useRef({ x: 0, time: 0 })
    const swipeThreshold = 50 // pixels to trigger swipe
    const swipeVelocityThreshold = 0.3 // pixels per ms for quick swipe

    const handleSwipeStart = (e) => {
        const touch = e.touches ? e.touches[0] : e
        touchStartRef.current = {
            x: touch.clientX,
            time: Date.now()
        }
        setIsDragging(true)
        setDragOffset(0)
    }

    const handleSwipeMove = (e) => {
        if (!isDragging) return
        const touch = e.touches ? e.touches[0] : e
        const diff = touch.clientX - touchStartRef.current.x
        setDragOffset(diff)
    }

    const handleSwipeEnd = () => {
        if (!isDragging) return
        setIsDragging(false)

        const velocity = Math.abs(dragOffset) / (Date.now() - touchStartRef.current.time)
        const isQuickSwipe = velocity > swipeVelocityThreshold
        const isPastThreshold = Math.abs(dragOffset) > swipeThreshold

        if ((isQuickSwipe || isPastThreshold) && dragOffset !== 0) {
            if (dragOffset < 0) {
                nextImage()
            } else {
                prevImage()
            }
        }

        setDragOffset(0)
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
                        '/photos/tali-from-facebook-4.jpg',
                        '/photos/tali-pics25-dear-parents.jpg',
                        '/photos/tali-pics28.jpg',
                        '/photos/tali-pics32.jpg',
                        '/photos/tali-pics57-echterlicht.webp',
                        '/photos/tali-pics80.jpg',
                        '/photos/tali-pics51.jpg',
                        '/photos/tali-pics16.jpg',
                        '/photos/tali-pics68.jpg',
                        '/photos/tali-pics18.jpg',
                        '/photos/tali-pics14-eurovision-heart.jpg',
                        // Loop
                        '/photos/tali-from-facebook-4.jpg',
                        '/photos/tali-pics25-dear-parents.jpg',
                        '/photos/tali-pics28.jpg',
                        '/photos/tali-pics32.jpg',
                        '/photos/tali-pics57-echterlicht.webp',
                        '/photos/tali-pics80.jpg',
                        '/photos/tali-pics51.jpg',
                        '/photos/tali-pics16.jpg',
                        '/photos/tali-pics68.jpg',
                        '/photos/tali-pics18.jpg',
                        '/photos/tali-pics14-eurovision-heart.jpg',
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
                        {wanderMedia.map((media, index) => {
                            // Skip desktop-only items on mobile
                            if (media.desktopOnly && !isDesktop) return null
                            return (
                                <motion.div
                                    key={index}
                                    className="gallery-item"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => openLightbox(media)}
                                >
                                    {media.type === 'video' ? (
                                        <video src={media.src} autoPlay loop muted playsInline preload="auto" />
                                    ) : (
                                        <LazyImage src={media.src} alt={media.alt} />
                                    )}
                                </motion.div>
                            )
                        })}
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
                                onClick={() => openLightbox(media)}
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
                        {inFocusMedia.map((media, index) => {
                            // Skip desktop-only items on mobile
                            if (media.desktopOnly && !isDesktop) return null
                            return (
                                <motion.div
                                    key={index}
                                    className="gallery-item"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => openLightbox(media)}
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
                            )
                        })}
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
                                onClick={() => openLightbox(image)}
                            >
                                <LazyImage src={image.src} alt={image.alt} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        className="lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                    >
                        {/* Photo counter */}
                        <div className="lightbox__counter">
                            {lightboxIndex + 1} / {filteredMedia.length}
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

                        {/* Carousel strip with prev/current/next - all visible during drag */}
                        <div
                            className="lightbox__carousel"
                            onTouchStart={handleSwipeStart}
                            onTouchMove={handleSwipeMove}
                            onTouchEnd={handleSwipeEnd}
                            onMouseDown={handleSwipeStart}
                            onMouseMove={isDragging ? handleSwipeMove : undefined}
                            onMouseUp={handleSwipeEnd}
                            onMouseLeave={isDragging ? handleSwipeEnd : undefined}
                        >
                            <div
                                className="lightbox__strip"
                                style={{
                                    transform: `translateX(calc(-33.333% + ${dragOffset}px))`,
                                    transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                                }}
                            >
                                {/* Previous image */}
                                <div className="lightbox__slide">
                                    {(() => {
                                        const prevIdx = (lightboxIndex - 1 + filteredMedia.length) % filteredMedia.length
                                        const prevItem = filteredMedia[prevIdx]
                                        return prevItem.type === 'video' || prevItem.src.endsWith('.mp4') ? (
                                            <video src={prevItem.src} className="lightbox__image" muted playsInline />
                                        ) : (
                                            <img src={prevItem.src} alt={prevItem.alt || ''} className="lightbox__image" draggable={false} />
                                        )
                                    })()}
                                </div>

                                {/* Current image */}
                                <div className="lightbox__slide lightbox__slide--current">
                                    {filteredMedia[lightboxIndex].alt && <div className="lightbox__spacer" />}
                                    {filteredMedia[lightboxIndex].type === 'video' || filteredMedia[lightboxIndex].src.endsWith('.mp4') ? (
                                        <div className="lightbox__video-wrapper" onClick={(e) => e.stopPropagation()}>
                                            <video
                                                id="lightbox-video"
                                                src={filteredMedia[lightboxIndex].src}
                                                className="lightbox__image"
                                                autoPlay
                                                playsInline
                                                controls
                                            />
                                        </div>
                                    ) : (
                                        <img
                                            src={filteredMedia[lightboxIndex].src}
                                            alt={filteredMedia[lightboxIndex].alt || ''}
                                            className="lightbox__image"
                                            draggable={false}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    )}
                                    {filteredMedia[lightboxIndex].alt && (
                                        <p className="lightbox__caption" onClick={(e) => e.stopPropagation()}>{filteredMedia[lightboxIndex].alt}</p>
                                    )}
                                </div>

                                {/* Next image */}
                                <div className="lightbox__slide">
                                    {(() => {
                                        const nextIdx = (lightboxIndex + 1) % filteredMedia.length
                                        const nextItem = filteredMedia[nextIdx]
                                        return nextItem.type === 'video' || nextItem.src.endsWith('.mp4') ? (
                                            <video src={nextItem.src} className="lightbox__image" muted playsInline />
                                        ) : (
                                            <img src={nextItem.src} alt={nextItem.alt || ''} className="lightbox__image" draggable={false} />
                                        )
                                    })()}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
