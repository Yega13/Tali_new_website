import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import './About.css'

export default function About() {
    const { theme } = useTheme()

    return (
        <div className="about">
            {/* Bio Section - Picture Left, Text Right */}
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
                                src={theme === 'dark'
                                    ? '/photos/Tali pics(41) Eurovision.webp'
                                    : '/photos/Tali pics(38) Eurovision.webp'
                                }
                                alt="Tali - Eurovision portrait"
                                className="about-bio__image"
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
                                    Post-pandemic, she started gigging shows with her own music in NYC. Her debut single "Wander"
                                    caught the attention of listeners worldwide, leading to collaborations with renowned producers
                                    and songwriters. TALI's music is characterized by introspective lyrics, ethereal vocals, and
                                    a blend of electronic and acoustic elements.
                                </p>
                                <p>
                                    In 2025, TALI represented Luxembourg at the Eurovision Song Contest, bringing her unique
                                    sound to an international stage. Her performance captivated millions of viewers and
                                    established her as one of the most promising artists in European pop music.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Life Journey Section */}
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
                                image: '/photos/Tali pics(82) baby.jpg',
                                alt: 'Young Tali in Jerusalem',
                                text: 'Tali was born on November 26, 2000, in Jerusalem, Israel. Growing up in a musical family, it was only natural for her to devote her life to music. She began playing the piano and singing at the age of six.'
                            },
                            {
                                year: '2020',
                                image: '/photos/Tali pics(48) Bowery Electric.jpg',
                                alt: 'Tali at Bowery Electric NYC',
                                text: 'Moved to New York City to pursue her dreams in music and theater. Started performing at local venues and open mics, developing her unique sound and stage presence.'
                            },
                            {
                                year: '2023',
                                image: '/photos/Tali pics(50).jpg',
                                alt: 'Tali - debut era',
                                text: 'Released her debut singles and started building an international fanbase. Collaborated with various artists and producers, refining her signature sound.'
                            },
                            {
                                year: '2025',
                                image: '/photos/Tali pics(51).jpg',
                                alt: 'Tali - Eurovision 2025',
                                text: 'Selected to represent Luxembourg at Eurovision Song Contest 2025. Her performance received critical acclaim and introduced her music to millions of viewers worldwide.'
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

            {/* Acting Section - Moved before Professional Materials */}
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

                    {/* IMDB Link */}
                    <motion.div
                        className="acting-imdb"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <a
                            href="https://www.imdb.com/name/nm12387164/?ref_=ext_shr_lnk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="acting-imdb__link"
                        >
                            <div className="imdb-logo">IMDb</div>
                            <span>View on IMDB</span>
                        </a>
                    </motion.div>

                    {/* Eurovision - First */}
                    <motion.div
                        className="acting-category"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="acting-category__title">Eurovision</h3>
                        <div className="acting-videos__grid">
                            <div className="acting-video">
                                <iframe
                                    src="https://www.youtube.com/embed/TCWH3Nq5y9A"
                                    title="Eurovision Performance"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Acting Videos */}
                    <motion.div
                        className="acting-category"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="acting-category__title">Acting</h3>
                        <div className="acting-videos__grid">
                            <div className="acting-video">
                                <iframe
                                    src="https://www.youtube.com/embed/64rCT11eorY"
                                    title="Acting Reel 1"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Voice Videos */}
                    <motion.div
                        className="acting-category"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="acting-category__title">Voice</h3>
                        <div className="acting-videos__grid acting-videos__grid--multi">
                            <div className="acting-video">
                                <iframe
                                    src="https://www.youtube.com/embed/M3RUQWYNA8o"
                                    title="Voice Reel 1"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            <div className="acting-video">
                                <iframe
                                    src="https://www.youtube.com/embed/8yO6rqY7pFs"
                                    title="Voice Reel 2"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            <div className="acting-video">
                                <iframe
                                    src="https://www.youtube.com/embed/is7nUjHOAlw"
                                    title="Voice Reel 3"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Professional Materials - Moved after Acting */}
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
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
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
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                            </svg>
                            Download Headshot
                        </motion.button>
                    </div>

                    {/* Resume Info Blocks */}
                    <div className="resume-blocks">
                        <motion.div
                            className="resume-block"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="resume-block__title">Management</h3>
                            <p><strong>More Zap Productions & Management</strong></p>
                            <p><span className="resume-block__label">Contact:</span> morezapwave@gmail.com, +1 (310) 749-5700</p>
                        </motion.div>

                        <motion.div
                            className="resume-block"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <h3 className="resume-block__title">Theatre</h3>
                            <ul className="resume-block__list">
                                <li><strong>Carrie</strong> - Susan Snell, Carrie U/S - New England Theatreworks</li>
                                <li><strong>Les Miserables</strong> - Eponine - Luxembourg Theatre</li>
                                <li><strong>Fiddler on the Roof</strong> - Tzeitel - Luxembourg Theatre</li>
                                <li><strong>Fugitive Songs</strong> - (Alysha Umphress Track) - The Great Hall</li>
                                <li><strong>This Thing of Darkness</strong> - Kiara - Black Box Theatre</li>
                            </ul>
                        </motion.div>

                        <motion.div
                            className="resume-block"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="resume-block__title">Film/Media</h3>
                            <ul className="resume-block__list">
                                <li><strong>Agua</strong> - Lead (Iris) - Wady Films/Indie</li>
                                <li><strong>Match Made on Eleven</strong> - Supporting (Diana) - NYU Graduate Film/Short</li>
                            </ul>
                        </motion.div>

                        <motion.div
                            className="resume-block"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <h3 className="resume-block__title">VO/Jingles</h3>
                            <ul className="resume-block__list">
                                <li><strong>Melusina</strong> - Principal Singer - Film Fund Lux/Short</li>
                                <li><strong>Rosport Pommes</strong> - Principal Singer - Mayfex/Commercial</li>
                            </ul>
                        </motion.div>

                        <motion.div
                            className="resume-block"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            <h3 className="resume-block__title">Training</h3>
                            <p><strong>Marymount Manhattan College</strong> - BFA Musical Theatre</p>
                            <ul className="resume-block__list">
                                <li>Acting for Stage: Michael Mendez, Brandon Logan, Johanna Pinzler</li>
                                <li>Acting on Camera: Ann Hamilton</li>
                                <li>Vocal Technique: Elijah Caldwell</li>
                                <li>Vocal Repertoire/Coaching: Tyler Knauf</li>
                                <li>Dance: Kimberly Schafer, Tommy Scrivens, Kyle Pleasant</li>
                            </ul>
                        </motion.div>

                        <motion.div
                            className="resume-block"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            <h3 className="resume-block__title">Special Skills</h3>
                            <p><span className="resume-block__label">Languages:</span> Hebrew (fluent), Spanish (fluent), French (advanced), German (intermediate)</p>
                            <p><span className="resume-block__label">Musical:</span> Piano (advanced), Singer/Songwriter (Spotify: Tali Golergant), Teacher of piano and voice (6 years)</p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}
