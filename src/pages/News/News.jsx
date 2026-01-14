import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './News.css'

// Wander streaming platforms
const wanderPlatforms = [
    {
        name: 'Spotify',
        url: 'https://open.spotify.com/album/6x8LZr9QKEG7IP4eAcxEQf?si=tfRhV_53Q4Cl-P0oGCsY8Q',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
        )
    },
    {
        name: 'Apple Music',
        url: 'https://music.apple.com/tr/album/wander/1805217826',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
            </svg>
        )
    },
    {
        name: 'YouTube',
        url: 'https://youtube.com/playlist?list=OLAK5uy_ndlMcLDMBuxoM4kq4J99O4YOYk3ornBTg&si=6gLmKE58H2vc_xh0',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        )
    },
    {
        name: 'Deezer',
        url: 'https://link.deezer.com/s/32a7ozJuAnvzfZptmwnJW',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
        )
    },
    {
        name: 'TIDAL',
        url: 'https://tidal.com/album/426888627/u',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996 4.004 12l4.004-4.004L12.012 12l-4.004 4.004 4.004 4.004 4.004-4.004L12.012 12l4.004-4.004-4.004-4.004zM16.042 7.996l3.979-3.979L24 7.996l-3.979 3.979z" />
            </svg>
        )
    },
    {
        name: 'Amazon',
        url: 'https://music.amazon.com/albums/B0F2VDW7D2?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_WcpZ164jt8im29BlMFPFwnIFA',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
        )
    }
]

const newsItems = [
    {
        id: 'wander',
        image: '/photos/Tali pics(51).jpg',
        title: 'WANDER: A Journey of Self-Discovery',
        date: 'January 2025',
        excerpt: 'Tali\'s debut single "Wander" explores themes of finding yourself in unfamiliar places and embracing the unknown journey ahead.',
        linkText: 'Listen now →',
        hasModal: true
    },
    {
        id: 'style',
        image: '/photos/Tali Style(2).jpg',
        title: 'Style Drops: A Bold New Chapter',
        date: 'December 2024',
        excerpt: 'The electrifying new single "Style" showcases Tali\'s evolution as an artist with its infectious beats and empowering lyrics.',
        linkText: 'Pre-Save →',
        link: 'https://ffm.to/tstyle.OIS?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnBpY1-3QmiLZu9MWZ4Pb7qIebEPdfKnXOZCEORMSd3rz8U8s3QqhxaefCdgg_aem_P-ObV9XJPXYsGjx0KMgSeA',
        isExternal: true
    },
    {
        id: 'trounwiessel',
        image: '/photos/Trounwiessel 3.jpg',
        title: 'Trounwiessel: The Duke\'s Coronation',
        date: 'October 2024',
        excerpt: 'A historic collaboration celebrating Luxembourg\'s royal heritage through an enchanting musical tribute.',
        linkText: 'Read more →',
        link: 'https://monarchie.lu/en/trounwiessel-throne',
        secondaryLink: 'https://play.rtl.lu/shows/lb/trounwiessel/episodes/r/3430493',
        secondaryLinkText: 'Watch Full Show →',
        isExternal: true
    },
    {
        id: 'birthday',
        image: '/photos/Baby Tali (1).jpg',
        title: '🎂 Happy Birthday Tali!',
        date: 'November 2024',
        excerpt: 'Celebrating another year of music, creativity, and inspiration!',
        linkText: 'Read more →',
        link: '/birthday'
    }
]

const interviews = [
    { id: 'iBQ4K6-SN60', title: 'TALI - Fighter (Official Lyric Video)' },
    { id: '76D6qF5ILZE', title: 'TALI - Interview at Eurovision 2025' },
    { id: 'RbwsXErIMKo', title: 'TALI - Behind The Scenes' },
    { id: 'SSYzQQCq9aA', title: 'TALI - Live Performance Highlights' }
]

export default function News() {
    const [isWanderModalOpen, setIsWanderModalOpen] = useState(false)

    const handleCardClick = (item, e) => {
        if (item.hasModal) {
            e.preventDefault()
            setIsWanderModalOpen(true)
        }
    }

    return (
        <div className="news">
            {/* Hero */}
            <section className="news-hero">
                <div className="news-hero__background">
                    <img src="/photos/Tali pics(47) National selection.jpg" alt="News" className="news-hero__image" />
                    <div className="news-hero__overlay" />
                </div>
                <div className="news-hero__content container">
                    <motion.h1
                        className="news-hero__title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        News
                    </motion.h1>
                </div>
            </section>

            {/* News Items */}
            <section className="news-grid section">
                <div className="container">
                    <div className="news-grid__container">
                        {newsItems.map((item, index) => (
                            <motion.article
                                key={item.id}
                                className={`news-card ${item.isSpecial ? 'news-card--special' : ''}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="news-card__image">
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className="news-card__content">
                                    <span className="news-card__date">{item.date}</span>
                                    <h3 className="news-card__title">{item.title}</h3>
                                    <p className="news-card__excerpt">{item.excerpt}</p>

                                    <div className="news-card__links">
                                        {item.hasModal ? (
                                            <button
                                                className="news-card__link news-card__link--button"
                                                onClick={(e) => handleCardClick(item, e)}
                                            >
                                                {item.linkText}
                                            </button>
                                        ) : item.isExternal ? (
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="news-card__link"
                                            >
                                                {item.linkText}
                                            </a>
                                        ) : (
                                            <Link to={item.link} className="news-card__link">
                                                {item.linkText}
                                            </Link>
                                        )}

                                        {item.secondaryLink && (
                                            <a
                                                href={item.secondaryLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="news-card__link news-card__link--secondary"
                                            >
                                                {item.secondaryLinkText}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interviews */}
            <section className="interviews section">
                <div className="container">
                    <h2 className="interviews__title">Interviews</h2>
                    <div className="interviews__grid">
                        {interviews.map((interview, index) => (
                            <motion.a
                                key={index}
                                href={`https://youtu.be/${interview.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="interview-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="interview-card__thumbnail">
                                    <img
                                        src={`https://img.youtube.com/vi/${interview.id}/hqdefault.jpg`}
                                        alt={interview.title}
                                    />
                                    <div className="interview-card__play">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <h4 className="interview-card__title">{interview.title}</h4>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Wander Modal */}
            <AnimatePresence>
                {isWanderModalOpen && (
                    <motion.div
                        className="wander-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsWanderModalOpen(false)}
                    >
                        <motion.div
                            className="wander-modal__content"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="wander-modal__close"
                                onClick={() => setIsWanderModalOpen(false)}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>

                            <h2 className="wander-modal__title">Listen to Wander</h2>
                            <p className="wander-modal__subtitle">Choose your favorite platform</p>

                            <div className="wander-modal__platforms">
                                {wanderPlatforms.map((platform, index) => (
                                    <motion.a
                                        key={platform.name}
                                        href={platform.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="wander-modal__platform"
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                    >
                                        <span className="wander-modal__platform-icon">
                                            {platform.icon}
                                        </span>
                                        <span className="wander-modal__platform-name">
                                            {platform.name}
                                        </span>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
