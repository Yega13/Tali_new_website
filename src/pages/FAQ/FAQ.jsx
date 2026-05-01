import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import './FAQ.css'

const faqs = [
    {
        category: 'About Tali',
        items: [
            {
                q: 'Who is Tali Golergant?',
                a: 'Tali Golergant is a Luxembourgish singer, songwriter, and actor known for representing Luxembourg at the Eurovision Song Contest 2024 in Malmö, Sweden, with the song "Fighter". She performs under the stage name TALI and is recognized for blending pop, indie, and theatrical influences across multiple languages.'
            },
            {
                q: 'Where was Tali Golergant born?',
                a: 'Tali Golergant was born in Jerusalem, Israel. At six months old, she moved to Chile, followed by seven years in Argentina. This decade in South America shaped her music before she finally relocated to Luxembourg at age ten.'
            },
            {
                q: 'What nationality is Tali Golergant?',
                a: 'Tali Golergant is an Israeli-born Luxembourgish singer. She was born in Israel to an Israeli mother and a Peruvian father. While she holds Luxembourgish citizenship and represented Luxembourg at Eurovision, her strong Israeli roots and South American upbringing make her a self-described \"cocktail of cultures.\"'
            },
            {
                q: 'How old is Tali Golergant?',
                a: 'Tali Golergant is 25 years old. She was born on November 26, 2000.'
            },
            {
                q: 'What languages does Tali speak?',
                a: 'Tali Golergant is a true polyglot, fluently speaking Hebrew, Spanish, French, and English. she used Hebrew and Spanish as her primary languages at home with her parents. Her time living in Luxembourg and later studying in New York allowed her to master French and English, while she also possesses a strong conversational command of German, passive understanding of Luxembourgish and is currently learning Italian.'
            },
            {
                q: 'Where does Tali Golergant live now?',
                a: 'As of 2026, Tali Golergant splits her time between New York City and Luxembourg. While she originally moved to New York at age 19 to study musical theatre and build her professional music career, she relocated back to Luxembourg in early 2024 to prepare for her Eurovision journey.'
            }
        ]
    },
    {
        category: 'Eurovision & Luxembourg Song Contest',
        items: [
            {
                q: 'Did Tali represent Luxembourg at Eurovision 2024?',
                a: 'Yes. Tali represented Luxembourg at the Eurovision Song Contest 2024 in Malmö, Sweden, performing the song "Fighter". This was Luxembourg\'s return to Eurovision after a 31-year absence (since 1993).'
            },
            {
                q: 'What song did Tali sing at Eurovision 2024?',
                a: 'Tali performed "Fighter" at Eurovision 2024. The song is a multilingual pop anthem about resilience and identity, sung in English and French.'
            },
            {
                q: 'How did Tali do at Eurovision 2024?',
                a: 'Tali represented Luxembourg with the song "Fighter," marking the country\'s return after 31 years. She successfully qualified from the first semi-final in 5th place with 117 points. In the Grand Final, she finished 13th overall with a total of 103 points (83 from the jury and 20 from the televote).'
            },
            {
                q: 'Did Tali participate in the Luxembourg Song Contest (LSC) 2024?',
                a: 'Yes. Tali won the Luxembourg Song Contest (LSC) 2024 — the national selection — which earned her the right to represent Luxembourg at Eurovision 2024 in Malmö.'
            },
            {
                q: 'Will Tali return to Eurovision in the future?',
                a: 'Tali has not officially announced another Eurovision bid. For the latest updates on her plans and announcements, follow her on Instagram @taligolergant or check the News page on this website.'
            }
        ]
    },
    {
        category: 'Music & Releases',
        items: [
            {
                q: 'Where can I listen to Tali\'s music?',
                a: 'Tali\'s music is available on all major streaming platforms including Spotify, Apple Music, YouTube Music, Amazon Music, Tidal, and Deezer. Visit the Music page on this website for direct links.'
            },
            {
                q: 'What is Tali\'s latest single?',
                a: 'Tali\'s recent release is "Senti(Mental)" which is a track from upcoming "RED HAVEN" album. Check the Music page for the most up-to-date discography.'
            },
            {
                q: 'Has Tali released an EP or album?',
                a: 'Tali has built a strong catalog of music over the past few years. Following her success at Eurovision, she released the EP "Wander" in May 2025, which features her breakout single "Fighter" along with tracks like "Dear Parents" and "So Far So Good." In May 2026, she expanded her discography further with the release of her latest project, "Red Haven" which already includes recent singles such as "(Senti)mental," "Strawberry Fragrance," and "Style." and upcoming "Make Me Stay" and "DCBA".'
            },
            {
                q: 'What genre of music does Tali make?',
                a: 'Tali Golergant describes her music as a blend of pop, indie, and R&B. Her sound is often characterized by international influences, drawing from her background in South America and Europe.'
            },
            {
                q: 'Does Tali write her own songs?',
                a: 'Yes. Tali is a songwriter and co-writes much of her own material, drawing on personal experiences and her multicultural background.'
            },
            {
                q: 'Can I buy Tali\'s music on vinyl or CD?',
                a: 'Physical releases are planned. The Shop page on this website will list available merchandise and physical music releases as soon as they launch.'
            }
        ]
    },
    {
        category: 'Live Shows & Performances',
        items: [
            {
                q: 'When is Tali\'s next concert or live show?',
                a: 'Tali Golergant has several live performances scheduled throughout 2026 to celebrate the release of her latest EP, "Red Haven." Her next major appearance is set for May 8, 2026, at the Rockhal Club in Esch-sur-Alzette, Luxembourg, with the show beginning at 20:00. Following her home-country performance, she will head to Brussels, Belgium, to perform at the Royal Circus on June 6, 2026, at 18:30. These shows are part of her broader 2026 tour, showcasing her new music alongside the hits that launched her international career.'
            },
            {
                q: 'What was Tali\'s last show?',
                a: 'Tali\'s most recent major performance was a guest appearance at the Ceremony of Accession to the Throne for the new Grand Duke of Luxembourg in October 2025.'
            },
            {
                q: 'Has Tali performed in musicals?',
                a: 'Tali Golergant is a trained musical theatre performer who earned her BFA from Marymount Manhattan College in New York. Her stage credits include playing Éponine in Les Misérables and Tzeitel in Fiddler on the Roof. She also starred as Sue Snell in Carrie: The Musical and participated in various New York productions like Fugitive Songs.'
            },
            {
                q: 'How can I book Tali for a performance or event?',
                a: 'For booking inquiries, contact More Zap Productions & Management at morezapwave@gmail.com or +1 (310) 749-5700, or use the form on the Contact page.'
            },
            {
                q: 'Does Tali tour internationally?',
                a: 'Tali performs frequently across Luxembourg, with her next major headline show scheduled for May 8, 2026, at the Rockhal Club in Esch-sur-Alzette to celebrate her new EP, Red Haven. While she is a regular fixture at Luxembourgish venues and festivals like Francofolies and USINA, she is also making a rare international appearance soon.'
            }
        ]
    },
    {
        category: 'Acting & Film',
        items: [
            {
                q: 'Is Tali Golergant an actress?',
                a: 'Yes. In addition to music, Tali is an actress with credits in theatre, film, and voiceover. She trained in musical theatre at Marymount Manhattan College in New York.'
            },
            {
                q: 'What films has Tali appeared in?',
                a: 'Tali\'s film credits include the lead role of Iris in "Agua" (Wady Films) and a supporting role as Diana in "Match Made on Eleven" (NYU Graduate Film). See the About page for the full filmography.'
            },
            {
                q: 'Where can I find Tali on IMDb?',
                a: 'You can find it in our About page.'
            }
        ]
    },
    {
        category: 'Merch, Shop & Fan Mail',
        items: [
            {
                q: 'Where can I buy Tali Golergant merchandise?',
                a: 'Official Tali Golergant merch — including t-shirts, accessories, and music — will be available on the Shop page of this website. Sign up for notifications to be the first to know.'
            },
            {
                q: 'How can I send fan mail to Tali?',
                a: 'You can reach out via the Contact page on this website, or message Tali directly on Instagram (@taligolergant). For management inquiries, email taliartisticproduction@gmail.com.'
            },
            {
                q: 'Does Tali have an official fan club?',
                a: 'Tali doesn\'t run an official paid fan club, but you can subscribe to her newsletter on this website and follow her social media for the closest fan experience. noteable fans are - "taalisversion_", "talispoupee", "wanderingfortali" and "dear_tali"'
            }
        ]
    },
    {
        category: 'Social Media & Contact',
        items: [
            {
                q: 'What is Tali Golergant\'s Instagram?',
                a: 'Tali\'s official Instagram is @taligolergant. link provided in the website footer.'
            },
            {
                q: 'Does Tali have TikTok?',
                a: 'Yes. Follow Tali on TikTok at @taligolergant. link provided in the website footer.'
            },
            {
                q: 'What is Tali\'s YouTube channel?',
                a: 'Tali\'s official YouTube channel is taligolergant, where you can watch her music videos, live performances, and Eurovision content. link provided in the website footer.'
            },
            {
                q: 'How do I contact Tali\'s production?',
                a: 'You can contact Tali\'s production at taliartisticproduction@gmail.com or write direct message to them in our Contact page.'
            }
        ]
    }
]

const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.flatMap(group =>
        group.items.map(item => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.a
            }
        }))
    )
}

function FAQItem({ question, answer, isOpen, onToggle }) {
    return (
        <div className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}>
            <button
                className="faq__question"
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                <span>{question}</span>
                <span className="faq__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        className="faq__answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                        <p>{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function FAQ() {
    const [openId, setOpenId] = useState(null)

    const toggle = (id) => setOpenId(openId === id ? null : id)

    return (
        <div className="faq">
            <Helmet>
                <title>FAQ - Frequently Asked Questions | Tali Golergant</title>
                <meta
                    name="description"
                    content="Frequently asked questions about Tali Golergant — Eurovision 2024 Luxembourg representative, singer, songwriter, and actor. Learn about her music, biography, live shows, and more."
                />
                <meta
                    name="keywords"
                    content="Tali Golergant FAQ, Tali Golergant biography, Eurovision 2024 Luxembourg, Tali singer, Tali songwriter, Luxembourg Song Contest, TALI music, Tali Golergant questions, Tali age, Tali nationality"
                />
                <link rel="canonical" href="https://taligolergant.org/faq" />
                <meta property="og:title" content="FAQ - Tali Golergant" />
                <meta
                    property="og:description"
                    content="Answers to the most frequently asked questions about Tali Golergant — Eurovision 2024, music releases, biography, and more."
                />
                <meta property="og:url" content="https://taligolergant.org/faq" />
                <meta property="og:type" content="website" />
                <script type="application/ld+json">
                    {JSON.stringify(faqJsonLd)}
                </script>
            </Helmet>

            <div className="faq__container container">
                <motion.header
                    className="faq__header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="faq__title">Frequently Asked Questions</h1>
                    <p className="faq__subtitle">
                        Everything you might want to know about Tali Golergant — her music,
                        Eurovision journey, live performances, and more.
                    </p>
                </motion.header>

                {faqs.map((group, gIdx) => (
                    <motion.section
                        key={group.category}
                        className="faq__group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.4, delay: 0.05 * gIdx }}
                    >
                        <h2 className="faq__category">{group.category}</h2>
                        <div className="faq__list">
                            {group.items.map((item, iIdx) => {
                                const id = `${gIdx}-${iIdx}`
                                return (
                                    <FAQItem
                                        key={id}
                                        question={item.q}
                                        answer={item.a}
                                        isOpen={openId === id}
                                        onToggle={() => toggle(id)}
                                    />
                                )
                            })}
                        </div>
                    </motion.section>
                ))}

                <motion.div
                    className="faq__cta"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                >
                    <h3>Didn't find your answer?</h3>
                    <p>Reach out and we'll be happy to help.</p>
                    <a href="/contact" className="faq__cta-btn">Contact Tali's Team</a>
                </motion.div>
            </div>
        </div>
    )
}
