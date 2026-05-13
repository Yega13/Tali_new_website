import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import './FanGallery.css'

const HUSHARE_LOGO = '/photos/hushare-logo-primary.png'

const albums = [
    {
        number: '01',
        name: 'Tali × Fans',
        desc: 'Fan moments with Tali — shows, meet & greets, and everywhere in between.',
        submitUrl: 'https://hushare.space/talixfans',
        photos: [],
    },
    {
        number: '02',
        name: 'RED HAVEN',
        desc: 'The best shots from the RED HAVEN EP release show at Rockhal.',
        submitUrl: 'https://hushare.space/redhavenepreleaseshow',
        photos: [],
    },
    {
        number: '03',
        name: 'Peak Frames',
        desc: 'The sharpest, most stunning frames of Tali — captured by fans.',
        submitUrl: 'https://hushare.space/tpeakframes',
        photos: [],
    },
    {
        number: '04',
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
                        src="/photos/tali-pics69.webp"
                        alt="Tali Golergant"
                        className="fan-gallery-hero__image"
                    />
                    <div className="fan-gallery-hero__overlay" />
                </div>
                <div className="container fan-gallery-hero__content">
                    <motion.img
                        src={HUSHARE_LOGO}
                        alt="Hushare"
                        className="fan-gallery-hero__logo"
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    />
                    <motion.h1
                        className="fan-gallery-hero__title"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        Fan Gallery
                    </motion.h1>
                    <motion.p
                        className="fan-gallery-hero__sub"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.25 }}
                    >
                        The best submissions, hand-picked by the team.
                    </motion.p>
                </div>
            </section>

            {/* Status bar */}
            <motion.div
                className="fan-gallery-status"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <span className="fan-gallery-status__dot" />
                <span>Submissions are open — upload your photos on Hushare and get featured here before July 1st.</span>
            </motion.div>

            {/* Album cards */}
            <section className="fan-gallery-cards section">
                <div className="container">
                    <div className="fan-gallery-cards__grid">
                        {albums.map((album, i) => (
                            <motion.div
                                key={album.name}
                                className="fan-gallery-card"
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.55, delay: i * 0.07 }}
                            >
                                <div className="fan-gallery-card__top">
                                    <span className="fan-gallery-card__num">{album.number}</span>
                                    <a
                                        href={album.submitUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="fan-gallery-card__submit"
                                    >
                                        Submit →
                                    </a>
                                </div>
                                <h2 className="fan-gallery-card__name">{album.name}</h2>
                                <p className="fan-gallery-card__desc">{album.desc}</p>

                                {album.photos.length === 0 ? (
                                    <div className="fan-gallery-card__empty">
                                        <span className="fan-gallery-card__empty-label">
                                            Waiting for submissions
                                        </span>
                                    </div>
                                ) : (
                                    <div className="fan-gallery-card__grid">
                                        {album.photos.map((photo, j) => (
                                            <div key={j} className="fan-gallery-card__photo">
                                                <img src={photo.src} alt={photo.alt || album.name} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="container fan-gallery-back">
                <Link to="/hushare-collab" className="fan-gallery-back__link">
                    ← Back to the Challenge
                </Link>
            </div>
        </div>
    )
}
