import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import './Hushare.css'

const LOGO = '/photos/hushare-logo-primary.png'

const albums = [
    {
        name: 'Tali × Fans',
        tag: 'Fan Moments',
        desc: 'Got a photo with Tali? This is your album. Share your favorite fan moments from shows, meet & greets, and everywhere in between.',
        url: 'https://hushare.space/talixfans',
    },
    {
        name: 'RED HAVEN',
        tag: 'Concert Photography',
        desc: 'The best shots from the RED HAVEN EP release show at Rockhal. If you were there and captured something special — this is its home.',
        url: 'https://hushare.space/redhavenepreleaseshow',
    },
    {
        name: 'Peak Frames',
        tag: 'Best Shots',
        desc: 'The sharpest, most stunning frames of Tali — captured by fans. If you got the shot, this is where it belongs.',
        url: 'https://hushare.space/tpeakframes',
    },
    {
        name: 'Fan Work',
        tag: 'Fan Art',
        desc: 'Bracelets, drawings, paintings, custom art — all the creative work fans have made for Tali lives here.',
        url: 'https://hushare.space/tfromthefans',
    },
]

function HusharePreloader({ onDone }) {
    const [animating, setAnimating] = useState(false)
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        document.body.classList.add('preloader-active')
        const t1 = setTimeout(() => setAnimating(true), 50)
        const t2 = setTimeout(() => {
            document.body.classList.remove('preloader-active')
            setVisible(false)
        }, 2500)
        const t3 = setTimeout(onDone, 3000)
        return () => {
            clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
            document.body.classList.remove('preloader-active')
        }
    }, [onDone])

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="hushare-preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                    <div className="hushare-preloader__content">
                        <motion.span
                            className="hushare-preloader__tali"
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: animating ? 1 : 0, x: animating ? 0 : -40 }}
                            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
                        >
                            Tali Golergant
                        </motion.span>
                        <motion.span
                            className="hushare-preloader__x"
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={{ opacity: animating ? 1 : 0, scale: animating ? 1 : 0.4 }}
                            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
                        >
                            ×
                        </motion.span>
                        <motion.img
                            src={LOGO}
                            alt="Hushare"
                            className="hushare-preloader__logo"
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: animating ? 1 : 0, x: animating ? 0 : 40 }}
                            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.7 }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default function HushareCollab() {
    const location = useLocation()
    const fromInternal = location.state?.fromInternal === true
    const [preloaderDone, setPreloaderDone] = useState(!fromInternal)

    return (
        <div className="hushare-page">
            <Helmet>
                <title>Tali Golergant × Hushare</title>
                <meta name="description" content="Tali Golergant and Hushare — fans now have access to 4 official photo albums. Submit your best shots and get featured on the website." />
                <link rel="canonical" href="https://taligolergant.org/hushare-collab" />
                <meta property="og:title" content="Tali Golergant × Hushare" />
                <meta property="og:description" content="Tali Golergant and Hushare — fans now have access to 4 official photo albums." />
                <meta property="og:url" content="https://taligolergant.org/hushare-collab" />
            </Helmet>

            {!preloaderDone && <HusharePreloader onDone={() => setPreloaderDone(true)} />}

            <motion.div
                className="hushare-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: preloaderDone ? 1 : 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Hero */}
                <section className="hushare-hero">
                    <div className="hushare-hero__bg" />
                    <div className="container hushare-hero__inner">
                        <motion.img
                            src="/collab_pic.png"
                            alt="Tali Golergant × Hushare"
                            className="hushare-hero__collab-img"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: preloaderDone ? 1 : 0, y: preloaderDone ? 0 : 30 }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                        />
                        <motion.p
                            className="hushare-hero__sub"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: preloaderDone ? 1 : 0 }}
                            transition={{ duration: 0.7, delay: 0.35 }}
                        >
                            Where fans share their best shots.
                        </motion.p>
                    </div>
                </section>

                {/* Albums */}
                <section className="hushare-albums section">
                    <div className="container">
                        <motion.div
                            className="hushare-albums__header"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="hushare-albums__heading">Join the Community</h2>
                            <p className="hushare-albums__intro">
                                Tali and Hushare have opened 4 official fan albums. Upload your shots directly on Hushare — the best ones get hand-picked and featured right here on this page.
                            </p>
                        </motion.div>

                        <div className="hushare-albums__grid">
                            {albums.map((album, i) => (
                                <motion.a
                                    key={album.name}
                                    href={album.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hushare-album-card"
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                >
                                    <span className="hushare-album-card__tag">{album.tag}</span>
                                    <h3 className="hushare-album-card__name">{album.name}</h3>
                                    <p className="hushare-album-card__desc">{album.desc}</p>
                                    <span className="hushare-album-card__cta">Submit your shots →</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Gallery */}
                <section className="hushare-gallery section">
                    <div className="container">
                        <motion.h2
                            className="hushare-section__heading"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            Gallery
                        </motion.h2>
                        <div className="hushare-gallery__grid">
                            <motion.div
                                className="hushare-gallery__video-wrap"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <video
                                    src="/photos/dcba-vid-1.mp4"
                                    controls
                                    playsInline
                                    preload="metadata"
                                    className="hushare-gallery__video"
                                />
                            </motion.div>
                            <motion.div
                                className="hushare-gallery__photos"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.15 }}
                            >
                                <img src="/photos/tali-red-haven-pic-1.jpg" alt="Red Haven" className="hushare-gallery__photo" />
                                <img src="/photos/tali-red-haven-pic-2.jpg" alt="Red Haven" className="hushare-gallery__photo" />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Moments */}
                <section className="hushare-moments section">
                    <div className="container">
                        <motion.h2
                            className="hushare-section__heading"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            Moments
                        </motion.h2>
                        <div className="hushare-moments__grid">
                            <motion.img
                                src="/photos/tali-red-haven-pic-3.jpg"
                                alt="Moment"
                                className="hushare-moments__photo"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            />
                            <motion.img
                                src="/photos/tali-red-haven-pic-4.jpg"
                                alt="Moment"
                                className="hushare-moments__photo"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.15 }}
                            />
                        </div>
                    </div>
                </section>
            </motion.div>
        </div>
    )
}
