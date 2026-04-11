import { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsDesktop } from '@/hooks/useMediaQuery'
import LazyImage from '@/components/common/LazyImage'
import './Gallery.css'

// Mixed media arrays (photos + videos merged)
// WANDER section
const wanderMedia = [
    { src: '/photos/tali-pics25-dear-parents.webp', alt: 'Dear Parents - Photoshoot in Paris', type: 'image' },
    { src: '/photos/tali-pics26-dear-parents-tongue.webp', alt: 'Dear Parents - Photoshoot in Paris', type: 'image' },
    { src: '/photos/tali-from-facebook-8.webp', type: 'image' },
    { src: '/photos/tali-pics27-dear-parents-necklace.webp', alt: 'Dear Parents necklace', type: 'image' },
    { src: '/photos/tali-vids20.mp4', alt: 'Blue Turns To Grey - Studio', type: 'video' },
    { src: '/photos/tali-pics51.webp', alt: 'WANDER', type: 'image' },
    { src: '/photos/tali-pics23-wander.webp', alt: 'Wander Photoshoot', type: 'image' },
    { src: '/photos/tali-wander-vid.mp4', type: 'video' },
    { src: '/photos/tali-vids21.mp4', alt: 'Sticker ;)', type: 'video' },
    { src: '/photos/tali-pics85.webp', type: 'image' },
    // Desktop-only media
    { src: '/photos/Lemon lime vid.mp4', alt: 'Lemon Lime', type: 'video', desktopOnly: true },
]

// Eurovision 2024 section
const eurovisionMedia = [
    { src: '/photos/tali-pics98.webp', alt: 'Eurovision 2024 - Malmo, Sweden', type: 'image' },
    { src: '/photos/tali-pics42-eurovision.webp', alt: 'Backstage photoshoot', type: 'image' },
    { src: '/photos/tali-pics97.webp', alt: 'Show time', type: 'image' },
    { src: '/photos/talis-vids19.mp4', alt: 'Flag parade', type: 'video' },
    { src: '/photos/tali-pics14-eurovision-heart.webp', alt: 'Tali Eurovision Heart', type: 'image' },
    { src: '/photos/tali-pics80.webp', alt: 'Fighter - Backstage', type: 'image' },
    { src: '/photos/tali-pics13-eurovision.webp', type: 'image' },
    { src: '/photos/tali-vids32.mp4', alt: 'Eurovision Backstage', type: 'video' }
]

// In Focus section
const inFocusMedia = [
    // New 2026 shoots & clips
    { src: '/photos/tali%20picsnew%201.jpg', alt: 'New shoot 2026', type: 'image' },
    { src: '/photos/tali%20vidsnew1.mp4', alt: 'Backstage moments', type: 'video' },
    { src: '/photos/tali%20picsnew%202.jpg', alt: 'New shoot 2026', type: 'image' },
    { src: '/photos/tali%20vidsnew2.mp4', alt: 'Behind the scenes', type: 'video' },
    { src: '/photos/tali%20picsnew%205.jpg', alt: 'New shoot 2026', type: 'image' },
    { src: '/photos/tali%20vidsnew%203.mp4', alt: 'On the road', type: 'video' },
    { src: '/photos/tali%20picsnew%207.jpg', alt: 'New shoot 2026', type: 'image' },
    { src: '/photos/tali%20vidsnew%204.mp4', alt: 'Studio session', type: 'video' },
    { src: '/photos/tali%20picsnew%208.jpg', alt: 'New shoot 2026', type: 'image' },
    { src: '/photos/tali%20vidsnew%205.mp4', alt: 'Live moments', type: 'video' },
    { src: '/photos/tali%20vidsnew%206.mp4', alt: 'Backstage 2026', type: 'video' },
    { src: '/photos/tali-pics68.webp', alt: 'Den Atelier 2025', type: 'image' },
    { src: '/photos/tali-pics47-national-selection.webp', alt: 'LSC 2024 - National Selection', type: 'image' },
    { src: '/photos/tali-vids-style-walking.mp4', alt: 'Style - Jan 30...', type: 'video' },
    { src: '/photos/tali-pics60-trounwiessel.webp', alt: 'Trounwiessel', type: 'image' },
    { src: '/photos/tali-pics18.webp', alt: 'Echterlive 2025', type: 'image' },
    { src: '/photos/tali-pics12-not-included.webp', alt: 'Fans ;)', type: 'image' },
    { src: '/photos/tali-pics36-eurovision-2025-not-included.webp', alt: 'LSC 2025', type: 'image' },
    { src: '/photos/tali-pics10.webp', alt: 'Echterlive 2025', type: 'image' },
    { src: '/photos/tali-pics52-den-atelier.webp', alt: 'Den Atelier 2025', type: 'image' },
    { src: '/photos/tali-vids16.mp4', alt: 'Luxembourg Philarmonie 2025', type: 'video' },
    { src: '/photos/tali-vids17.mp4', alt: 'Trounwiessel show', type: 'video' },
    { src: '/photos/tali-vids11.mp4', alt: 'Luxembourg Philarmonie 2024', type: 'video' },
    { src: '/photos/tali-pics57-echterlicht.webp', alt: 'Echterlive 2025', type: 'image' },
    { src: '/photos/tali-pics57.webp', alt: 'Den Atleier 2025', type: 'image' },
    { src: '/photos/tali-pics59.webp', alt: 'Den Atelier 2025', type: 'image' },
    { src: '/photos/tali-pics55-dancing-alone.webp', alt: 'Dancing alone', type: 'image' },
    { src: '/photos/tali-pics104.webp', alt: 'Echterlive backstage', type: 'image', objectPosition: '30% center' },
    { src: '/photos/tali-pics82-baby.webp', type: 'image' },
    { src: '/photos/tali-pics83.webp', alt: 'Luxembourg Philarmonie 2025', type: 'image', objectPosition: 'top' },
    { src: '/photos/tali-pics53-echterleicht.webp', alt: 'Echterlive 2025', type: 'image' },
    { src: '/photos/tali-pics-rockhall.webp', alt: 'Tali at Rockhall', type: 'image' },
    // Desktop-only media
    { src: '/photos/tali-pics132.webp', alt: 'Come On!', type: 'image', desktopOnly: true },
    { src: '/photos/tali-style3.mp4', alt: 'Tali Style Jan 30!', type: 'video', desktopOnly: true },
]

// Moments section - pictures with humans
const momentsImages = [
    { src: '/photos/tali-pics103.webp', alt: 'Echterlive 2025 Backstage' },
    { src: '/photos/tali-pics69.webp', alt: 'Eurovision 2024' },
    { src: '/photos/tali-from-facebook-4.webp' },
    { src: '/photos/tali-pics72.webp', alt: 'Den Atelier 2025' },
    { src: '/photos/tali-pics73.webp', alt: 'Dear Parents - catching the moment' },
    { src: '/photos/tali-pics74.webp' }
]

// Combine ALL media into one unified array for the lightbox
const allMedia = [
    ...wanderMedia,
    ...eurovisionMedia,
    ...inFocusMedia,
    ...momentsImages.map(img => ({ ...img, type: 'image' }))
]


export default function Gallery() {
    const [lightboxIndex, setLightboxIndex] = useState(null)
    const isDesktop = useIsDesktop()

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
    useLayoutEffect(() => {
        if (lightboxIndex !== null) {
            document.body.style.overflow = 'hidden'
            return () => { document.body.style.overflow = '' }
        }
    }, [lightboxIndex])

    // Keyboard navigation for lightbox
    useEffect(() => {
        if (lightboxIndex === null) return

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeLightbox()
            if (e.key === 'ArrowLeft') prevImage()
            if (e.key === 'ArrowRight') nextImage()
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
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

    return (
        <div className="gallery">
            {/* Ticker with Gallery Title and Images */}
            <div className="gallery-ticker">
                <div className="gallery-ticker__title">GALLERY</div>
                <div className="gallery-ticker__content">
                    {[
                        '/photos/tali-from-facebook-4.webp',
                        '/photos/tali-pics25-dear-parents.webp',
                        '/photos/tali-pics28.webp',
                        '/photos/tali-pics32.webp',
                        '/photos/tali-pics57-echterlicht.webp',
                        '/photos/tali-pics80.webp',
                        '/photos/tali-pics51.webp',
                        '/photos/tali-pics16.webp',
                        '/photos/tali-pics68.webp',
                        '/photos/tali-pics18.webp',
                        '/photos/tali-pics14-eurovision-heart.webp',
                        // Loop
                        '/photos/tali-from-facebook-4.webp',
                        '/photos/tali-pics25-dear-parents.webp',
                        '/photos/tali-pics28.webp',
                        '/photos/tali-pics32.webp',
                        '/photos/tali-pics57-echterlicht.webp',
                        '/photos/tali-pics80.webp',
                        '/photos/tali-pics51.webp',
                        '/photos/tali-pics16.webp',
                        '/photos/tali-pics68.webp',
                        '/photos/tali-pics18.webp',
                        '/photos/tali-pics14-eurovision-heart.webp',
                    ].map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt="Gallery"
                            className="gallery-ticker__image"
                            loading="eager"
                            decoding="async"
                            fetchPriority={i < 11 ? "high" : "low"}
                        />
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
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: '100px' }}
                                    transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.25), ease: 'easeOut' }}
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
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: '100px' }}
                                transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.25), ease: 'easeOut' }}
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
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: '100px' }}
                                    transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.25), ease: 'easeOut' }}
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
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: '100px' }}
                                transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.25), ease: 'easeOut' }}
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
                        <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); prevImage(); }} aria-label="Previous image">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); nextImage(); }} aria-label="Next image">
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
