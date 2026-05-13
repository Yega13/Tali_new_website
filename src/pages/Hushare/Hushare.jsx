import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import './Hushare.css'

const LOGO = '/photos/hushare-logo-primary.png'

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

    return (
        <div className="hushare-page">
            <Helmet>
                <title>Tali Golergant × Hushare — Fan Challenge</title>
                <meta name="description" content="Tali Golergant and Hushare — fans now have access to 4 official photo albums. Submit your best shots and get featured on the website. Challenge ends July 1, 2026." />
                <link rel="canonical" href="https://taligolergant.org/hushare-collab" />
                <meta property="og:title" content="Tali Golergant × Hushare — Fan Challenge" />
                <meta property="og:description" content="Tali Golergant and Hushare — fans now have access to 4 official photo albums. Submit your best shots and get featured." />
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
                    <div className="hushare-hero__inner">
                        <motion.div
                            className="hushare-hero__img-wrap"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: preloaderDone ? 1 : 0, y: preloaderDone ? 0 : 30 }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                        >
                            <img
                                src="/photos/tali-pics105.webp"
                                alt="Tali Golergant"
                                className="hushare-hero__collab-img"
                            />
                            <div className="hushare-hero__img-badge">
                                <img src="/photos/hushare-logo-primary.png" alt="Hushare" className="hushare-hero__badge-logo" />
                            </div>
                        </motion.div>
                        <motion.div
                            className="hushare-hero__sub-row"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: preloaderDone ? 1 : 0 }}
                            transition={{ duration: 0.7, delay: 0.35 }}
                        >
                            <img
                                src="/photos/tali-pics68.webp"
                                alt=""
                                className="hushare-hero__sticker hushare-hero__sticker--left"
                            />
                            <p className="hushare-hero__sub">Where fans share their best shots.</p>
                            <img
                                src="/photos/tali-red-haven-pic-4.jpg"
                                alt=""
                                className="hushare-hero__sticker hushare-hero__sticker--right"
                            />
                        </motion.div>
                    </div>
                </section>

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
                            <div className="hushare-challenge__deadline">
                                Challenge ends <strong>July 1, 2026</strong>
                            </div>
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
            </motion.div>
        </div>
    )
}
