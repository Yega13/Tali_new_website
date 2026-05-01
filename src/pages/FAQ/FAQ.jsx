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
                a: 'Tali Golergant was born on November 26, 2000, in Jerusalem, Israel. She moved to Luxembourg at a young age and grew up there, which is why she represents Luxembourg internationally.'
            },
            {
                q: 'What nationality is Tali Golergant?',
                a: 'Tali holds Luxembourgish nationality and represents Luxembourg as an artist. She has roots in Israel and was raised in Luxembourg.'
            },
            {
                q: 'How old is Tali Golergant?',
                a: 'Tali was born on November 26, 2000. You can calculate her current age based on today\'s date.'
            },
            {
                q: 'What languages does Tali speak?',
                a: 'Tali speaks and performs in English, Hebrew, Spanish, French, and German, which gives her a unique multilingual presence in the European music scene.'
            },
            {
                q: 'Where does Tali Golergant live now?',
                a: 'Tali is based between Luxembourg and the United States, where she trained in musical theatre at Marymount Manhattan College in New York City.'
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
                a: 'Tali qualified for the Eurovision 2024 Grand Final and represented Luxembourg with "Fighter", marking the country\'s first Eurovision final appearance in over three decades.'
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
                a: 'Tali\'s recent releases include "Style" and tracks from her WANDER EP. Check the Music page for the most up-to-date discography.'
            },
            {
                q: 'Has Tali released an EP or album?',
                a: 'Yes. Tali released the WANDER EP, showcasing her songwriting across multiple languages and styles. Full tracklists and links are on the Music page.'
            },
            {
                q: 'What genre of music does Tali make?',
                a: 'Tali\'s music blends pop, indie pop, and singer-songwriter influences with theatrical and folk elements. Her multilingual lyrics and emotional vocal delivery are signature features.'
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
                a: 'Upcoming concerts, festival appearances, and live shows are announced on the News page and on Tali\'s Instagram (@taligolergant). For booking inquiries, visit the Contact page.'
            },
            {
                q: 'What was Tali\'s last show?',
                a: 'Tali regularly performs at festivals, theatres, and Eurovision-related events across Europe. The most recent appearances are listed on the News page on this website.'
            },
            {
                q: 'Has Tali performed in musicals?',
                a: 'Yes. Tali has stage credits including Eponine in Les Misérables, Tzeitel in Fiddler on the Roof, and Susan Snell (Carrie understudy) in Carrie at New England Theatreworks. Her full theatre resume is on the About page.'
            },
            {
                q: 'How can I book Tali for a performance or event?',
                a: 'For booking inquiries, contact More Zap Productions & Management at morezapwave@gmail.com or +1 (310) 749-5700, or use the form on the Contact page.'
            },
            {
                q: 'Does Tali tour internationally?',
                a: 'Yes. Tali performs across Europe, Israel, and the United States. Tour announcements appear on the News page and on her social media.'
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
                a: 'Tali\'s IMDb page is at imdb.com/name/nm12387164/. It lists her acting and performance credits.'
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
                a: 'You can reach out via the Contact page on this website, or message Tali directly on Instagram (@taligolergant). For management inquiries, email morezapwave@gmail.com.'
            },
            {
                q: 'Does Tali have an official fan club?',
                a: 'Tali doesn\'t run an official paid fan club, but you can subscribe to her newsletter on this website and follow her social media for the closest fan experience.'
            }
        ]
    },
    {
        category: 'Social Media & Contact',
        items: [
            {
                q: 'What is Tali Golergant\'s Instagram?',
                a: 'Tali\'s official Instagram is @taligolergant: instagram.com/taligolergant.'
            },
            {
                q: 'Does Tali have TikTok?',
                a: 'Yes. Follow Tali on TikTok at @taligolergant: tiktok.com/@taligolergant.'
            },
            {
                q: 'What is Tali\'s YouTube channel?',
                a: 'Tali\'s official YouTube channel is youtube.com/@taligolergant, where you can watch her music videos, live performances, and Eurovision content.'
            },
            {
                q: 'How do I contact Tali\'s management?',
                a: 'Tali is managed by More Zap Productions & Management. Contact them at morezapwave@gmail.com or +1 (310) 749-5700.'
            },
            {
                q: 'Is this the official Tali Golergant website?',
                a: 'Yes. taligolergant.org is the official website of Tali Golergant. Beware of unofficial fan sites or social profiles that claim to be Tali — always check for verification on her main social channels.'
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
