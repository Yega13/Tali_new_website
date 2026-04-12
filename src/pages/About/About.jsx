import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import LazyVideo from '@/components/common/LazyVideo'
import './About.css'

const resumeData = [
    {
        title: "Management",
        content: (
            <>
                <p><strong>More Zap Productions & Management</strong></p>
                <p><span className="resume-block__label">Contact:</span> morezapwave@gmail.com, +1 (310) 749-5700</p>
            </>
        )
    },
    {
        title: "Theatre",
        content: (
            <ul className="resume-block__list">
                <li><strong>Carrie</strong> - Susan Snell, Carrie U/S - New England Theatreworks</li>
                <li><strong>Les Miserables</strong> - Eponine - Luxembourg Theatre</li>
                <li><strong>Fiddler on the Roof</strong> - Tzeitel - Luxembourg Theatre</li>
                <li><strong>Fugitive Songs</strong> - (Alysha Umphress Track) - The Great Hall</li>
                <li><strong>This Thing of Darkness</strong> - Kiara - Black Box Theatre</li>
            </ul>
        )
    },
    {
        title: "Film/Media",
        content: (
            <ul className="resume-block__list">
                <li><strong>Agua</strong> - Lead (Iris) - Wady Films/Indie</li>
                <li><strong>Match Made on Eleven</strong> - Supporting (Diana) - NYU Graduate Film/Short</li>
            </ul>
        )
    },
    {
        title: "VO/Jingles",
        content: (
            <ul className="resume-block__list">
                <li><strong>Melusina</strong> - Principal Singer - Film Fund Lux/Short</li>
                <li><strong>Rosport Pommes</strong> - Principal Singer - Mayfex/Commercial</li>
            </ul>
        )
    },
    {
        title: "Training",
        content: (
            <>
                <p><strong>Marymount Manhattan College</strong> - BFA Musical Theatre</p>
                <ul className="resume-block__list">
                    <li>Acting for Stage: Michael Mendez, Brandon Logan, Johanna Pinzler</li>
                    <li>Acting on Camera: Ann Hamilton</li>
                    <li>Vocal Technique: Elijah Caldwell</li>
                    <li>Vocal Repertoire/Coaching: Tyler Knauf</li>
                    <li>Dance: Kimberly Schafer, Tommy Scrivens, Kyle Pleasant</li>
                </ul>
            </>
        )
    },
    {
        title: "Special Skills",
        content: (
            <>
                <p><span className="resume-block__label">Languages:</span> Hebrew (fluent), Spanish (fluent), French (advanced), German (intermediate)</p>
                <p><span className="resume-block__label">Musical:</span> Piano (advanced), Singer/Songwriter (Spotify: Tali Golergant), Teacher of piano and voice (6 years)</p>
            </>
        )
    }
]

export default function About() {
    const { theme } = useTheme()

    return (
        <div className="about">
            <section className="about-bio section">
                <div className="container">
                    <div className="about-bio__layout">
                        <motion.div
                            className="about-bio__image-wrapper"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src="/photos/tali-pics38-eurovision.png"
                                alt="Tali - Eurovision portrait"
                                className={`about-bio__image about-bio__image--light ${theme === 'light' ? 'about-bio__image--active' : ''}`}
                            />
                            <img
                                src="/photos/tali-pics41-eurovision.webp"
                                alt="Tali - Eurovision portrait"
                                className={`about-bio__image about-bio__image--dark ${theme === 'dark' ? 'about-bio__image--active' : ''}`}
                            />
                        </motion.div>

                        <motion.div
                            className="about-bio__content"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="about-bio__title">About Tali</h2>
                            <div className="about-bio__text typing-animation">
                                <p>
                                    TALI is a singer/songwriter and actor from Luxembourg. She embodies a "cocktail of cultures"
                                    as a result of her life journey thus far across various corners of the globe. Influenced by
                                    artists like Billie Eilish, Lizzy McAlpine, and Lady Gaga, TALI blends pop, indie, and latin
                                    music together to create her own unique sound.
                                </p>
                                <p>
                                    After 2020, she started gigging shows with her own music in NYC. Her debut single is a part of
                                    her first EP "Lose You", the song is called "temporary". After that in 2024 TALI tried her luck
                                    in Luxembourg's national selection for Eurovision, and won with her song "Fighter". And that's
                                    how Luxembourg got back to Eurovision after 32 years. In Eurovision TALI achieved Grand Final
                                    and finished 13th.
                                </p>
                                <p>
                                    In January of 2025, TALI released first song of her new EP "WANDER", which was "Dear Parents".
                                    Shortly after that TALI had her first solo concert in famous Den Atelier, Luxembourg. Then in May,
                                    TALI released her second EP - "WANDER", which contains 7 songs and and one collaborations with Sean
                                    Biopick. Soon, TALI is realising her new song which is called "Style", we still have a lot to show! ;)
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="life-journey section">
                <div className="container">
                    <motion.h2
                        className="life-journey__title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Life Journey
                        <span className="life-journey__underline" />
                    </motion.h2>

                    <div className="life-journey__timeline">
                        {[
                            {
                                year: 'Early Years',
                                image: '/photos/tali-pics82-baby.webp',
                                alt: 'Young Tali',
                                text: 'Tali was born on November 26, 2000, in Jerusalem, Israel. Growing up in a musical family, it was only natural for her to devote her life to music. She began playing the piano and singing at the age of six.'
                            },
                            {
                                year: '2020',
                                image: '/photos/tali-pics48-bowery-electric.webp',
                                alt: 'Tali at Bowery Electric NYC',
                                text: 'Moved to New York City to pursue her dreams in music and theater. Started performing at local venues and open mics, developing her unique sound and stage presence.'
                            },
                            {
                                year: '2024',
                                image: '/photos/tali-pics50.webp',
                                alt: 'Tali - Eurovision 2024',
                                text: 'Selected to represent Luxembourg at Eurovision Song Contest 2024. Which was very important step in her career.Her performance introduced her music to millions of viewers worldwide.'
                            },
                            {
                                year: '2025',
                                image: '/photos/tali-pics51.webp',
                                alt: 'Tali WANDER',
                                text: 'In 2025 Tali finally released her second EP, had her first solo gig, which immediately went sold-out, and started to expand her community across the globe.'
                            },
                            {
                                year: '2026',
                                image: '/photos/tali%20picsnew%204.jpg',
                                alt: 'Tali RED HAVEN',
                                text: '2026 is shaping up to be a turning point — Tali is set to release her debut album "RED HAVEN", featuring singles like "Style", "Strawberry Fragrance", and "Senti(mental)". She also performed her first ever show outside of Luxembourg, taking the stage in Belgium.'
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={item.year}
                                className={`timeline-item ${index % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right'}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                            >
                                <span className="timeline-item__year">{item.year}</span>
                                <div className="timeline-item__content">
                                    <img src={item.image} alt={item.alt} className="timeline-item__image" />
                                    <p className="timeline-item__text">{item.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        className="life-journey__more"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        There will be more soon :D
                    </motion.p>
                </div>
            </section>

            <section className="acting-section section">
                <div className="container">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Acting & Voice
                    </motion.h2>

                    <div className="acting-imdb">
                        <a
                            href="https://www.imdb.com/name/nm12387164/?ref_=ext_shr_lnk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="acting-imdb__link"
                        >
                            <div className="imdb-logo">IMDb</div>
                            <span>View on IMDB</span>
                        </a>
                    </div>

                    {/* Videos without complex animations to ensure visibility on all screens */}
                    <div className="acting-category">
                        <h3 className="acting-category__title">Eurovision</h3>
                        <div className="acting-videos__grid">
                            <LazyVideo
                                src="https://www.youtube.com/embed/TCWH3Nq5y9A"
                                title="Eurovision Performance"
                                className="acting-video"
                            />
                        </div>
                    </div>

                    <div className="acting-category">
                        <h3 className="acting-category__title">Acting</h3>
                        <div className="acting-videos__grid">
                            <LazyVideo
                                src="https://www.youtube.com/embed/64rCT11eorY"
                                title="Acting Reel 1"
                                className="acting-video"
                            />
                        </div>
                    </div>

                    <div className="acting-category">
                        <h3 className="acting-category__title">Voice</h3>
                        <div className="acting-videos__grid acting-videos__grid--multi">
                            <LazyVideo
                                src="https://www.youtube.com/embed/M3RUQWYNA8o"
                                title="Voice Reel 1"
                                className="acting-video"
                            />
                            <LazyVideo
                                src="https://www.youtube.com/embed/8yO6rqY7pFs"
                                title="Voice Reel 2"
                                className="acting-video"
                            />
                        </div>
                    </div>

                    <div className="acting-category">
                        <h3 className="acting-category__title">Live</h3>
                        <div className="acting-videos__grid acting-videos__grid--multi">
                            <LazyVideo
                                src="https://www.youtube.com/embed/is7nUjHOAlw"
                                title="Live Performance 1"
                                className="acting-video"
                            />
                            <LazyVideo
                                src="https://www.youtube.com/embed/BVkFivF3OeY"
                                title="Live Performance 2"
                                className="acting-video"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="pro-materials section">
                <div className="container">
                    <motion.h2
                        className="pro-materials__title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Professional Materials
                    </motion.h2>

                    <div className="pro-materials__buttons">
                        <motion.a
                            href="/Theatre Resume 2026.pdf"
                            download
                            className="btn btn-primary"
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Download Resume
                        </motion.a>

                        <motion.button
                            className="btn btn-outline"
                            onClick={() => alert("We don't have your headshot yet! :(")}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                            </svg>
                            Download Headshot
                        </motion.button>
                    </div>

                    <div className="resume-blocks">
                        {resumeData.map((block, index) => (
                            <motion.div
                                key={block.title}
                                className="resume-block"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h3 className="resume-block__title">{block.title}</h3>
                                {block.content}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
