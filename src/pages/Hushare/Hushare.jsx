import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import './Hushare.css'

const LOGO = '/photos/hushare-logo-primary.png'

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
                <meta name="description" content="Tali Golergant and Hushare — a creative collaboration between music and visual storytelling." />
                <link rel="canonical" href="https://taligolergant.org/hushare" />
                <meta property="og:title" content="Tali Golergant × Hushare" />
                <meta property="og:description" content="Tali Golergant and Hushare — a creative collaboration between music and visual storytelling." />
                <meta property="og:url" content="https://taligolergant.org/hushare" />
            </Helmet>

            {!preloaderDone && <HusharePreloader onDone={() => setPreloaderDone(true)} />}

            <motion.div
                className="hushare-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: preloaderDone ? 1 : 0 }}
                transition={{ duration: 0.6 }}
            >
                <section className="hushare-hero">
                    <div className="hushare-hero__bg" />
                    <div className="container hushare-hero__inner">
                        <motion.div
                            className="hushare-hero__lockup"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: preloaderDone ? 1 : 0, y: preloaderDone ? 0 : 30 }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                        >
                            <span className="hushare-hero__tali">Tali Golergant</span>
                            <span className="hushare-hero__x">×</span>
                            <img src={LOGO} alt="Hushare" className="hushare-hero__logo" />
                        </motion.div>
                        <motion.p
                            className="hushare-hero__sub"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: preloaderDone ? 1 : 0 }}
                            transition={{ duration: 0.7, delay: 0.35 }}
                        >
                            Music meets visual storytelling
                        </motion.p>
                    </div>
                </section>

                <section className="hushare-about section">
                    <div className="container hushare-about__grid">
                        <motion.div
                            className="hushare-about__text"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="hushare-about__heading">The Partnership</h2>
                            <p>
                                Tali Golergant and Hushare — the Armenian creative photography and visual community — have officially joined forces in a one-of-a-kind collaboration that crosses borders, languages, and art forms.
                            </p>
                            <p>
                                Hushare is a platform built around visual storytelling: photographers, artists, and creatives who share a common language regardless of where they&apos;re from. Their community breathes art in every frame.
                            </p>
                            <p>
                                Together, Tali and Hushare are bridging music and image — bringing exclusive photography, behind-the-scenes content, and joint creative projects to both communities. Two worlds, one shared passion for creating something real.
                            </p>
                            <p className="hushare-about__closing">
                                This is just the beginning.
                            </p>
                            <a
                                href="https://hushare.space"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary hushare-about__btn"
                            >
                                Visit Hushare →
                            </a>
                        </motion.div>

                        <motion.div
                            className="hushare-about__logo-side"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <img src={LOGO} alt="Hushare" className="hushare-about__logo-img" />
                        </motion.div>
                    </div>
                </section>
            </motion.div>
        </div>
    )
}
