import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import './Hushare.css'

const LOGO = '/photos/hushare-logo-primary.png'
const CHALLENGE_END = new Date('2026-07-01T00:00:00')

const albums = [
    {
        number: '01',
        name: 'Tali × Fans',
        desc: 'Got a photo with Tali? This is your album. Fan moments from shows, meet & greets, and everywhere in between.',
        url: 'https://hushare.space/talixfans',
    },
    {
        number: '02',
        name: 'RED HAVEN',
        desc: 'The best shots from the RED HAVEN EP release show at Rockhal. If you were there and captured something special — this is its home.',
        url: 'https://hushare.space/redhavenepreleaseshow',
    },
    {
        number: '03',
        name: 'Peak Frames',
        desc: 'The sharpest, most stunning frames of Tali captured by fans. If you got the shot, this is where it belongs.',
        url: 'https://hushare.space/tpeakframes',
    },
    {
        number: '04',
        name: 'Fan Work',
        desc: 'Friendship bracelets, hand-drawn portraits, painted lyrics, handwritten notes — every piece of fan creativity made for Tali finds its rightful place here.',
        url: 'https://hushare.space/tfromthefans',
    },
]

function getTimeLeft() {
    const diff = CHALLENGE_END - new Date()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    }
}

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
    const isReload = typeof performance !== 'undefined' &&
        performance.getEntriesByType('navigation')[0]?.type === 'reload'
    const [preloaderDone, setPreloaderDone] = useState(isReload)
    const [timeLeft, setTimeLeft] = useState(getTimeLeft)

    useEffect(() => {
        const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
        return () => clearInterval(id)
    }, [])

    const handlePreloaderDone = useCallback(() => setPreloaderDone(true), [])

    const pad = n => String(n).padStart(2, '0')

    return (
        <div className="hushare-page">
            <Helmet>
                <title>Tali Golergant × Hushare — Fan Challenge</title>
                <meta name="description" content="Tali Golergant and Hushare — fans now have access to 4 official photo albums. Submit your best shots and get featured on the website. Challenge ends July 1, 2026." />
                <link rel="canonical" href="https://taligolergant.org/hushare-collab" />
                <meta property="og:title" content="Tali Golergant × Hushare — Fan Challenge" />
                <meta property="og:description" content="Submit your best shots and get featured on Tali's website. Challenge ends July 1, 2026." />
                <meta property="og:url" content="https://taligolergant.org/hushare-collab" />
            </Helmet>

            {!preloaderDone && <HusharePreloader onDone={handlePreloaderDone} />}

            <motion.div
                className="hushare-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: preloaderDone ? 1 : 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Hero — full-width background photo */}
                <section className="hushare-hero">
                    <div className="hushare-hero__background">
                        <img
                            src="/photos/tali-pics105.webp"
                            alt="Tali Golergant"
                            className="hushare-hero__image"
                        />
                        <div className="hushare-hero__overlay" />
                    </div>
                    <div className="container hushare-hero__content">
                        <motion.img
                            src={LOGO}
                            alt="Hushare"
                            className="hushare-hero__hushare-logo"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: preloaderDone ? 1 : 0, y: preloaderDone ? 0 : -20 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        />
                        <motion.h1
                            className="hushare-hero__title"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: preloaderDone ? 1 : 0, y: preloaderDone ? 0 : 24 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            Tali Golergant × Hushare
                        </motion.h1>
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

                {/* Countdown */}
                <motion.section
                    className="hushare-countdown-section"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Sticker left — anchored to countdown top, rises into hero */}
                    <motion.div
                        className="hushare-sticker hushare-sticker--left"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        <img src="/photos/tali-red-haven-pic-9.jpg" alt="" aria-hidden="true" />
                    </motion.div>

                    {/* Sticker right — anchored to countdown top, rises into hero */}
                    <motion.div
                        className="hushare-sticker hushare-sticker--right"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <img src="/photos/tali-red-haven-pic-10.jpg" alt="" aria-hidden="true" />
                    </motion.div>

                    <p className="hushare-countdown__label-top">Challenge closes in</p>
                    <div className="hushare-countdown">
                        {[
                            { value: timeLeft.days, label: 'Days' },
                            { value: timeLeft.hours, label: 'Hours' },
                            { value: timeLeft.minutes, label: 'Min' },
                            { value: timeLeft.seconds, label: 'Sec' },
                        ].map(({ value, label }, i) => (
                            <div key={label} className="hushare-countdown__unit">
                                {i > 0 && <span className="hushare-countdown__sep">:</span>}
                                <div className="hushare-countdown__block">
                                    <span className="hushare-countdown__number">{pad(value)}</span>
                                    <span className="hushare-countdown__unit-label">{label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Challenge */}
                <section className="hushare-challenge section">
                    <div className="container">
                        <motion.div
                            className="hushare-challenge__header"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="hushare-challenge__eyebrow">Tali × Hushare</span>
                            <h2 className="hushare-challenge__heading">Participate in the Fan Photo Challenge</h2>
                            <p className="hushare-challenge__intro">
                                Tali and Hushare have opened 4 official fan albums on Hushare. Upload your photos directly — the best shots get hand-picked by the team and featured right here on this page. Four albums, four stories. Pick yours, and show us your part of the story.
                            </p>
                        </motion.div>

                        <div className="hushare-albums__list">
                            {albums.map((album, i) => (
                                <motion.a
                                    key={album.name}
                                    href={album.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hushare-album-row"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                >
                                    <span className="hushare-album-row__number">{album.number}</span>
                                    <div className="hushare-album-row__body">
                                        <h3 className="hushare-album-row__name">{album.name}</h3>
                                        <p className="hushare-album-row__desc">{album.desc}</p>
                                    </div>
                                    <span className="hushare-album-row__cta">Join Album →</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </section>
                {/* Fan Gallery teaser */}
                <motion.section
                    className="hushare-gallery-teaser"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="container">
                        <div className="hushare-gallery-teaser__inner">
                            <p className="hushare-gallery-teaser__eyebrow">Featured Submissions</p>
                            <h2 className="hushare-gallery-teaser__heading">
                                The best shots — hand-picked and featured here.
                            </h2>
                            <p className="hushare-gallery-teaser__desc">
                                Submit yours on Hushare before July 1st and get featured on this page.
                            </p>
                            <Link to="/fan-gallery" className="hushare-gallery-teaser__btn">
                                <span>View Gallery</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </motion.section>

            </motion.div>
        </div>
    )
}
