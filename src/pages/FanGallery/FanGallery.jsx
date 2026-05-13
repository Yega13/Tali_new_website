import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import './FanGallery.css'

const albums = [
    {
        name: 'Tali × Fans',
        desc: 'Fan moments with Tali — shows, meet & greets, and everywhere in between.',
        submitUrl: 'https://hushare.space/talixfans',
        photos: [],
    },
    {
        name: 'RED HAVEN',
        desc: 'The best shots from the RED HAVEN EP release show at Rockhal.',
        submitUrl: 'https://hushare.space/redhavenepreleaseshow',
        photos: [],
    },
    {
        name: 'Peak Frames',
        desc: 'The sharpest, most stunning frames of Tali — captured by fans.',
        submitUrl: 'https://hushare.space/tpeakframes',
        photos: [],
    },
    {
        name: 'Fan Work',
        desc: 'Friendship bracelets, hand-drawn portraits, painted lyrics, handwritten notes.',
        submitUrl: 'https://hushare.space/tfromthefans',
        photos: [],
    },
]

export default function FanGallery() {
    return (
        <div className="fan-gallery">
            <Helmet>
                <title>Fan Gallery — Tali × Hushare</title>
                <meta name="description" content="The best fan submissions from the Tali × Hushare photo challenge, featured by the team." />
                <link rel="canonical" href="https://taligolergant.org/fan-gallery" />
            </Helmet>

            {/* Hero */}
            <section className="fan-gallery-hero">
                <div className="fan-gallery-hero__background">
                    <img
                        src="/photos/tali-pics105.webp"
                        alt="Tali Golergant"
                        className="fan-gallery-hero__image"
                    />
                    <div className="fan-gallery-hero__overlay" />
                </div>
                <div className="container fan-gallery-hero__content">
                    <motion.h1
                        className="fan-gallery-hero__title"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        Fan Gallery
                    </motion.h1>
                    <motion.p
                        className="fan-gallery-hero__sub"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        The best submissions, hand-picked by the team.
                    </motion.p>
                </div>
            </section>

            {/* Albums */}
            <div className="fan-gallery-albums">
                {albums.map((album, i) => (
                    <motion.section
                        key={album.name}
                        className="fan-gallery-album section"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.05 }}
                    >
                        <div className="container">
                            <div className="fan-gallery-album__header">
                                <div>
                                    <h2 className="fan-gallery-album__name">{album.name}</h2>
                                    <p className="fan-gallery-album__desc">{album.desc}</p>
                                </div>
                                <a
                                    href={album.submitUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="fan-gallery-album__submit-btn"
                                >
                                    Submit →
                                </a>
                            </div>

                            {album.photos.length === 0 ? (
                                <div className="fan-gallery-album__empty">
                                    <div className="fan-gallery-album__empty-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <rect x="3" y="3" width="18" height="18" rx="3" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <path d="M21 15l-5-5L5 21" />
                                        </svg>
                                    </div>
                                    <p className="fan-gallery-album__empty-text">
                                        We&apos;re waiting for your pictures here.
                                    </p>
                                    <p className="fan-gallery-album__empty-sub">
                                        The best submissions will appear in this spot. Be the first.
                                    </p>
                                </div>
                            ) : (
                                <div className="fan-gallery-album__grid">
                                    {album.photos.map((photo, j) => (
                                        <div key={j} className="fan-gallery-album__photo">
                                            <img src={photo.src} alt={photo.alt || album.name} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.section>
                ))}
            </div>

            <div className="container fan-gallery-back">
                <Link to="/hushare-collab" className="fan-gallery-back__link">
                    ← Back to the Challenge
                </Link>
            </div>
        </div>
    )
}
