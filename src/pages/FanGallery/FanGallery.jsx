import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { supabase } from '../../lib/supabase'
import './FanGallery.css'

const HUSHARE_LOGO = '/photos/hushare-logo-primary.png'
const MAX_VISIBLE = 3

const ALBUM_DEFS = [
    {
        number: '01',
        name: 'Tali × Fans',
        desc: 'Fan moments with Tali — shows, meet & greets, and everywhere in between.',
        submitUrl: 'https://hushare.space/talixfans',
        albumId: 'e67cc306-08e6-4231-9289-dd5c8f93949e',
    },
    {
        number: '02',
        name: 'RED HAVEN',
        desc: 'The best shots from the RED HAVEN EP release show at Rockhal.',
        submitUrl: 'https://hushare.space/redhavenepreleaseshow',
        albumId: '1f66b462-e190-4eb8-8e78-2f21898e161e',
    },
    {
        number: '03',
        name: 'Peak Frames',
        desc: 'The sharpest, most stunning frames of Tali — captured by fans.',
        submitUrl: 'https://hushare.space/tpeakframes',
        albumId: '544a7e46-9f82-48fd-a82b-59b7fefe12d2',
    },
    {
        number: '04',
        name: 'Fan Work',
        desc: 'Friendship bracelets, hand-drawn portraits, painted lyrics, handwritten notes.',
        submitUrl: 'https://hushare.space/tfromthefans',
        albumId: 'f78fb970-6cb4-41f5-8ace-26ad9b329a52',
    },
]

const ALBUM_IDS = ALBUM_DEFS.map(a => a.albumId)

function thumbUrl(photo) {
    return photo.media_type === 'video' ? photo.poster_url : photo.url
}

export default function FanGallery() {
    const [photosByAlbum, setPhotosByAlbum] = useState({})

    async function fetchPhotos() {
        const { data, error } = await supabase
            .from('photos')
            .select('id, album_id, url, media_type, poster_url')
            .in('album_id', ALBUM_IDS)
            .order('created_at', { ascending: true })

        if (error) {
            console.error('[FanGallery] Supabase error:', error)
            return
        }
        if (!data) return

        const grouped = {}
        for (const photo of data) {
            if (!grouped[photo.album_id]) grouped[photo.album_id] = []
            grouped[photo.album_id].push(photo)
        }
        setPhotosByAlbum(grouped)
    }

    useEffect(() => {
        fetchPhotos()

        const channel = supabase
            .channel('fan-gallery-photos')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'photos' }, fetchPhotos)
            .subscribe()

        return () => supabase.removeChannel(channel)
    }, [])

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
                        {ALBUM_DEFS.map((album, i) => {
                            const photos = photosByAlbum[album.albumId] || []
                            const visible = photos.slice(0, MAX_VISIBLE)
                            const overflow = photos.length - MAX_VISIBLE

                            return (
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

                                    {photos.length === 0 ? (
                                        <div className="fan-gallery-card__empty">
                                            <span className="fan-gallery-card__empty-label">
                                                Waiting for submissions
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="fan-gallery-card__grid">
                                            {visible.map((photo, j) => {
                                                const isLast = j === MAX_VISIBLE - 1 && overflow > 0
                                                return (
                                                    <div
                                                        key={photo.id}
                                                        className={`fan-gallery-card__photo${isLast ? ' fan-gallery-card__photo--overflow' : ''}`}
                                                    >
                                                        <img src={thumbUrl(photo)} alt={album.name} loading="lazy" />
                                                        {isLast && (
                                                            <div className="fan-gallery-card__overflow-badge">
                                                                +{overflow}
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                </motion.div>
                            )
                        })}
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
