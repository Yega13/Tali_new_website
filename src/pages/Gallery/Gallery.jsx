import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsDesktop } from '@/hooks/useMediaQuery'
import './Gallery.css'

const wanderImages = [
    { src: '/photos/Tali pics(51).jpg', alt: 'Wander 1' },
    { src: '/photos/Tali pics(52).jpg', alt: 'Wander 2' },
    { src: '/photos/Tali pics(50).jpg', alt: 'Wander 3' },
    { src: '/photos/Tali pics(3).jpg', alt: 'Wander 4' }
]

const eurovisionImages = [
    { src: '/photos/Tali pics(35) eurovision 2025.jpg', alt: 'Eurovision 2025' },
    { src: '/photos/Tali pics(38) Eurovision.webp', alt: 'Eurovision 1' },
    { src: '/photos/Tali pics(28).jpg', alt: 'Eurovision 2' },
    { src: '/photos/Tali pics(8).jpg', alt: 'Eurovision 3' }
]

const inFocusImages = [
    { src: '/photos/Tali den atelier.jpeg', alt: 'Den Atelier' },
    { src: '/photos/Tali pics(5).jpg', alt: 'Performance' },
    { src: '/photos/Tali pics(72).jpg', alt: 'Photo Shoot' },
    { src: '/photos/Tali pics(73).jpg', alt: 'Style' },
    { src: '/photos/Tali pics(85).jpg', alt: 'Live' },
    { src: '/photos/Tali pics(95).jpg', alt: 'Performance' },
    { src: '/photos/Tali pics(97).jpg', alt: 'Photo' },
    { src: '/photos/Tali pics(103) - Black and white.jpg', alt: 'Black and White 1' },
    { src: '/photos/Tali pics(60) trounwiessel- Black and white.jpg', alt: 'Black and White 2' }
]

export default function Gallery() {
    const [lightboxIndex, setLightboxIndex] = useState(null)
    const [currentImageSet, setCurrentImageSet] = useState([])
    const isDesktop = useIsDesktop()

    const openLightbox = (index, imageSet) => {
        setCurrentImageSet(imageSet)
        setLightboxIndex(index)
    }

    const closeLightbox = () => {
        setLightboxIndex(null)
        setCurrentImageSet([])
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
            setLightboxIndex((lightboxIndex + 1) % currentImageSet.length)
        }
    }

    const prevImage = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + currentImageSet.length) % currentImageSet.length)
        }
    }

    return (
        <div className="gallery">
            {/* Ticker with Gallery Title and Images */}
            <div className="gallery-ticker">
                <div className="gallery-ticker__title">GALLERY</div>
                <div className="gallery-ticker__content">
                    {[...wanderImages, ...wanderImages].map((image, i) => (
                        <img key={i} src={image.src} alt={image.alt} className="gallery-ticker__image" />
                    ))}
                </div>
            </div>

            {/* WANDER */}
            <section className="gallery-grid section">
                <div className="container">
                    <h2 className="section-title">Gallery</h2>
                    <div className={`gallery-grid__container ${isDesktop ? 'gallery-grid__container--masonry' : ''}`}>
                        {wanderImages.map((image, index) => (
                            <motion.div
                                key={index}
                                className="gallery-item"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => openLightbox(index, wanderImages)}
                            >
                                <img src={image.src} alt={image.alt} loading="lazy" />
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
                        {eurovisionImages.map((image, index) => (
                            <motion.div
                                key={index}
                                className="gallery-item"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => openLightbox(index, eurovisionImages)}
                            >
                                <img src={image.src} alt={image.alt} loading="lazy" />
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
                        {inFocusImages.map((image, index) => (
                            <motion.div
                                key={index}
                                className="gallery-item"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => openLightbox(index, inFocusImages)}
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
                            {lightboxIndex + 1} / {currentImageSet.length}
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

                        {/* Image container with caption */}
                        <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
                            <img
                                key={lightboxIndex}
                                src={currentImageSet[lightboxIndex].src}
                                alt={currentImageSet[lightboxIndex].alt}
                                className="lightbox__image"
                            />
                            <p className="lightbox__caption">{currentImageSet[lightboxIndex].alt}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
