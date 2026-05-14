import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import StyleModal, { PLATFORM_ICONS } from '@/components/common/StyleModal'
import './News.css'

const strawberryPlatforms = [
    { name: 'Spotify', url: 'https://open.spotify.com/track/4PtvZEksyIx8prenJvjhvk?si=f0ed0448cf27422d', icon: PLATFORM_ICONS.Spotify },
    { name: 'Apple Music', url: 'https://music.apple.com/us/album/strawberry-fragrance-single/1878009313', icon: PLATFORM_ICONS['Apple Music'] },
    { name: 'Amazon Music', url: 'https://music.amazon.com/albums/B0GNCPRW4P?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_Hnv1LGUlVwwFTErEaL9NI3yLM', icon: PLATFORM_ICONS['Amazon Music'] },
]


const redHavenPlatforms = [
    { name: 'Spotify', url: 'https://open.spotify.com/album/5v67Yp2zCFOJl9SIkTZhSi?si=NtNTXhxLTzWu1s5sg1pYhg', icon: PLATFORM_ICONS.Spotify },
    { name: 'Apple Music', url: 'https://music.apple.com/ke/album/red-haven-ep/1892889225', icon: PLATFORM_ICONS['Apple Music'] },
    { name: 'Amazon Music', url: 'https://music.amazon.com/albums/B0GWXQVQHS?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_AxmC0CElMKoEUjOeO3fDEFDE9', icon: PLATFORM_ICONS['Amazon Music'] },
    { name: 'YouTube', url: 'https://youtube.com/playlist?list=OLAK5uy_n2c_sA00thPkK0QrqmsgKK9M0Kp7R3X7w&si=TgWixxmzrbFRIw-M', icon: PLATFORM_ICONS.YouTube },
    { name: 'Deezer', url: 'https://link.deezer.com/s/33dFbB5nDKsGV2HhYuhKp', icon: PLATFORM_ICONS.Deezer },
]

const BELGIUM_TICKET_URL = 'https://apps.ticketmatic.com/widgets/rockhal/addtickets?event=11728&skinid=10000&contactid=&flow=basketwithcheckout&edit=yes&ticketinfo=name&returnurl=https%3A%2F%2Frockhal.lu&l=en&accesskey=4528f4e37549c2433e6bd4a7&signature=120e428d3a99d4b97af77a7c15c75cb451cf0f1f967bf24d27a963ff0bb98cb1&_ga=2.227268702.297391511.1775897965-281215746.1775897965&_gl=1*1wn81x9*_gcl_au*ODQ5MTkwNzUyLjE3NzU4OTc5NjU.*_ga*MjgxMjE1NzQ2LjE3NzU4OTc5NjU.*_ga_VFH9NGH6YZ*czE3NzU4OTc5NjQkbzEkZzAkdDE3NzU4OTc5NjQkajYwJGwwJGgw*_ga_0VEB3SQ6S6*czE3NzU4OTc5NjQkbzEkZzAkdDE3NzU4OTc5NjQkajYwJGwwJGgw#!/addtickets'

const newsItems = [
    {
        id: 'belgium',
        image: '/photos/tali%20picsnew%209.jpg',
        title: 'Tali in Belgium!',
        date: 'June 6, 2026',
        isoDate: '2026-06-06',
        excerpt: 'Tali is heading to Brussels! On June 6th she takes the stage in Bruxelles for a very special night — the official release of her brand new EP "RED HAVEN". Expect new songs, big energy, and a one-of-a-kind live experience. Don\'t miss it.',
        linkText: 'Buy Tickets →',
        link: BELGIUM_TICKET_URL,
        isExternal: true
    },
    {
        id: 'rockhal-release',
        image: '/photos/tali-red-haven-pic-7.jpg',
        imagePosition: 'center 35%',
        title: 'Rockhall "RED HAVEN" Release Show',
        date: 'May 8, 2026',
        isoDate: '2026-05-08',
        excerpt: 'On May 8th, Tali took over Rockhal for the official "RED HAVEN" EP release show — a sold-out night of brand new songs, fan favorites, and pure emotion on stage. The evening continued with an intimate meet \'n greet, where Tali got to thank her fans in person, share stories, sign EPs, and celebrate the release together. A night to remember.',
        linkText: 'Listen to RED HAVEN →',
        hasRedHavenModal: true
    },
    {
        id: 'strawberry-fields',
        image: '/photos/tali%20picsnew%206.jpg',
        title: 'Strawberry Fields',
        date: 'March 13, 2026',
        isoDate: '2026-03-13',
        excerpt: 'Tali\'s dreamy new single "Strawberry Fields" dropped on March 13th — a sweet, sun-soaked track that lingers like the scent of summer berries. Hit play and let yourself wander.',
        linkText: 'Listen Now →',
        hasStrawberryModal: true
    },
    {
        id: 'hushare-collab',
        image: '/photos/tali-red-haven-pic-2.jpg',
        imagePosition: 'top',
        title: 'Tali Golergant × Hushare',
        date: 'May 2026',
        isoDate: '2026-05-12',
        excerpt: 'Tali has officially partnered with Hushare — the Armenian creative photography community. Fans now have access to 4 shared albums — submit your best shots and get featured on the website.',
        linkText: 'Read More →',
        isInternal: true,
        isCollab: true,
        link: '/hushare-collab'
    }
]

const newsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': newsItems.map((item, i) => ({
        '@type': 'ListItem',
        'position': i + 1,
        'item': {
            '@type': 'NewsArticle',
            'headline': item.title,
            'datePublished': item.isoDate,
            'description': item.excerpt,
            'image': `https://taligolergant.org${item.image}`,
            'url': `https://taligolergant.org/news#${item.id}`,
            'author': { '@type': 'Person', 'name': 'Tali Golergant' },
            'publisher': { '@type': 'Person', 'name': 'Tali Golergant' }
        }
    }))
}

const interviews = [
    {
        id: 'XVMrprCnW1s',
        title: 'Bringing Luxembourg Back to Eurovision | 4Cee Sessions Podcast',
        description: 'A long-form conversation with Tali about returning Luxembourg to the Eurovision stage after 31 years, the journey from New York to Malmö, and the artistic identity behind "Fighter".'
    },
    {
        id: 'iBQ4K6-SN60',
        title: 'TALI at Eurovision 2024 | ELLE On The Go With GINTA',
        description: 'Dive into an inspiring episode of "ELLE On The Go" as Ginta meets TALI, Luxembourg\'s vibrant representative at Eurovision 2024.'
    },
    {
        id: '76D6qF5ILZE',
        title: 'Tali - Music, Creativity and Peruvian food - with special guest, Winnie Lee',
        description: 'With our special guests, Tali Golergant - Famous Luxembourg singer and Winnie Lee - a world renowned baker, we discussed about many things and secrets.After, Tali and I prepared her father\'s recipe for Peruvian ceviche and discussed her path to Eurovision before her band joined us for a kitchen jam session and lunch. An absolutely brilliant day with this fabulous musician!'
    },
    {
        id: 'JQrrdp_XQEg',
        title: 'Tali Luxembourg - Eurovision 2024 Turquoise Carpet Opening Ceremony',
        description: 'Tali walks the Eurovision 2024 Turquoise Carpet and gives us a quick interview. She says that like the "Fighter" in her song she understands struggle. As an artist in New York City, she has faced rejection but keeps persevering. '
    },
    {
        id: 'yPlvdeNH2PU',
        title: 'Eurovision 2024 Luxembourg: Tali interview',
        description: 'We had the pleasure of talking with Tali who represents Luxembourg in their comeback year, 2024, with her song Fighter. We talked about many rumours and many interesting facts about the song!'
    },
    {
        id: 'RbwsXErIMKo',
        title: 'TALI: From Hard Work to Eurovision - GËLLE FRO EP. 92',
        description: 'In this interview we talked about struggling of how to become a singer in New-York, what difficulties she met at her jouney, how was her first solo gig, about philosophy, our nature and many many more! if you want to dig a bit deeper and know all the answers, then watch the interview!'
    }
]

export default function News() {
    const [isStrawberryModalOpen, setIsStrawberryModalOpen] = useState(false)
    const [isRedHavenModalOpen, setIsRedHavenModalOpen] = useState(false)

    const handleCardClick = (item, e) => {
        if (item.hasStrawberryModal) {
            e.preventDefault()
            setIsStrawberryModalOpen(true)
        }
        if (item.hasRedHavenModal) {
            e.preventDefault()
            setIsRedHavenModalOpen(true)
        }
    }

    return (
        <div className="news">
            <Helmet>
                <title>News - Tali Golergant</title>
                <meta name="description" content="Latest news from Tali Golergant - new releases, upcoming shows, and announcements." />
                <link rel="canonical" href="https://taligolergant.org/news" />
                <meta property="og:title" content="News - Tali Golergant" />
                <meta property="og:description" content="Latest news from Tali Golergant - new releases, upcoming shows, and announcements." />
                <meta property="og:url" content="https://taligolergant.org/news" />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="News - Tali Golergant" />
                <meta name="twitter:description" content="Latest news from Tali Golergant - new releases, upcoming shows, and announcements." />
                <script type="application/ld+json">
                    {JSON.stringify(newsJsonLd)}
                </script>
            </Helmet>
            <section className="news-hero">
                <div className="news-hero__background">
                    <img src="/photos/tali-pics47-national-selection.webp" alt="Tali - National Selection" className="news-hero__image" />
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

            <section className="news-grid section">
                <div className="container">
                    <div className="news-grid__container">
                        {newsItems.map((item, index) => (
                            <motion.article
                                key={item.id}
                                className={`news-card ${item.isSpecial ? 'news-card--special' : ''} ${item.isCollab ? 'news-card--collab' : ''}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="news-card__image">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
                                    />
                                    {item.isCollab && (
                                        <span className="news-card__new-tag">New</span>
                                    )}
                                </div>
                                <div className="news-card__content">
                                    <span className="news-card__date">{item.date}</span>
                                    <h3 className="news-card__title">{item.title}</h3>
                                    <p className="news-card__excerpt">{item.excerpt}</p>

                                    <div className="news-card__links">
                                        {item.hasStrawberryModal || item.hasSentimentalModal || item.hasRedHavenModal ? (
                                            <button
                                                className="news-card__link news-card__link--button"
                                                onClick={(e) => handleCardClick(item, e)}
                                            >
                                                {item.linkText}
                                            </button>
                                        ) : item.isInternal ? (
                                            <Link
                                                to={item.link}
                                                state={{ fromInternal: true }}
                                                className="news-card__link"
                                            >
                                                {item.linkText}
                                            </Link>
                                        ) : (
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="news-card__link"
                                            >
                                                {item.linkText}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="interviews section">
                <div className="container">
                    <h2 className="interviews__title">Interviews & Videos</h2>
                    <div className="interviews__list">
                        {interviews.map((interview, index) => (
                            <motion.div
                                key={index}
                                className={`interview-row ${index % 2 === 1 ? 'interview-row--reverse' : ''}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <a
                                    href={`https://youtu.be/${interview.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="interview-card"
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
                                </a>
                                <div className="interview-info">
                                    <h3 className="interview-info__title">{interview.title}</h3>
                                    <p className="interview-info__description">{interview.description}</p>
                                    <a
                                        href={`https://youtu.be/${interview.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="interview-info__link"
                                    >
                                        Watch Now →
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <StyleModal
                isOpen={isStrawberryModalOpen}
                onClose={() => setIsStrawberryModalOpen(false)}
                title="Strawberry Fields"
                cover="/photos/tali%20picsnew%206.jpg"
                platforms={strawberryPlatforms}
            />

            <StyleModal
                isOpen={isRedHavenModalOpen}
                onClose={() => setIsRedHavenModalOpen(false)}
                title="RED HAVEN"
                cover="/photos/tali%20picsnew%204.jpg"
                platforms={redHavenPlatforms}
            />
        </div>
    )
}
