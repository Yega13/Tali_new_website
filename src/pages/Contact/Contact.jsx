import { useState } from 'react'
import { motion } from 'framer-motion'
import './Contact.css'

// Formspree form IDs
const CONTACT_FORM_ID = 'mlggdeda'
const NEWSLETTER_FORM_ID = 'mzddzbzw'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [newsletterEmail, setNewsletterEmail] = useState('')
    const [formStatus, setFormStatus] = useState({ type: '', message: '' })
    const [newsletterStatus, setNewsletterStatus] = useState({ type: '', message: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubscribing, setIsSubscribing] = useState(false)

    const handleFormChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setFormStatus({ type: '', message: '' })

        try {
            const response = await fetch(`https://formspree.io/f/${CONTACT_FORM_ID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setFormStatus({ type: 'success', message: 'Thank you for your message! We\'ll get back to you soon.' })
                setFormData({ name: '', email: '', message: '' })
            } else {
                throw new Error('Form submission failed')
            }
        } catch (error) {
            setFormStatus({ type: 'error', message: 'Oops! Something went wrong. Please try again.' })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault()
        setIsSubscribing(true)
        setNewsletterStatus({ type: '', message: '' })

        try {
            const response = await fetch(`https://formspree.io/f/${NEWSLETTER_FORM_ID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email: newsletterEmail })
            })

            if (response.ok) {
                setNewsletterStatus({ type: 'success', message: 'Thanks for subscribing! 🎉' })
                setNewsletterEmail('')
            } else {
                throw new Error('Subscription failed')
            }
        } catch (error) {
            setNewsletterStatus({ type: 'error', message: 'Oops! Something went wrong. Please try again.' })
        } finally {
            setIsSubscribing(false)
        }
    }

    return (
        <div className="contact">
            {/* Hero */}
            <section className="contact-hero">
                <div className="contact-hero__background">
                    <img src="/photos/Tali pics(78).jpg" alt="Contact" className="contact-hero__image" />
                    <div className="contact-hero__overlay" />
                </div>
                <div className="contact-hero__content container">
                    <motion.h1
                        className="contact-hero__title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Contact
                    </motion.h1>
                </div>
            </section>

            {/* Contact Form */}
            <section className="contact-form-section section">
                <div className="container">
                    <div className="contact-grid">
                        <motion.div
                            className="contact-info"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="contact-info__title">Get in Touch</h2>
                            <p className="contact-info__text">
                                For booking inquiries or just to say hello,
                                fill out the form and we'll get back to you as soon as possible.
                            </p>
                            <div className="contact-info__details">
                                <div className="contact-info__item">
                                    <strong>Email:</strong>
                                    <span>taliartistproductions@gmail.com</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.form
                            className="contact-form"
                            onSubmit={handleFormSubmit}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>

                            {formStatus.message && (
                                <div className={`form-status form-status--${formStatus.type}`}>
                                    {formStatus.message}
                                </div>
                            )}

                            <motion.button
                                type="submit"
                                className="btn btn-primary contact-form__submit"
                                whileTap={{ scale: 0.95 }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </motion.button>
                        </motion.form>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="newsletter section">
                <div className="container">
                    <motion.div
                        className="newsletter__content"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <svg className="newsletter__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="M22 6L12 13L2 6" />
                        </svg>
                        <h2 className="newsletter__title">Stay Updated</h2>
                        <p className="newsletter__text">
                            Subscribe to the newsletter to receive updates on new music, shows, and exclusive content.
                        </p>

                        {newsletterStatus.message && (
                            <div className={`form-status form-status--${newsletterStatus.type}`}>
                                {newsletterStatus.message}
                            </div>
                        )}

                        <form className="newsletter__form" onSubmit={handleNewsletterSubmit}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="btn btn-primary" disabled={isSubscribing}>
                                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
