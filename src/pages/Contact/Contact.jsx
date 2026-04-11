import { useState } from 'react'
import { motion } from 'framer-motion'
import './Contact.css'

const CONTACT_FORM_ID = 'mlggdeda'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [newsletterData, setNewsletterData] = useState({
        firstName: '',
        email: ''
    })
    const [formStatus, setFormStatus] = useState({ type: '', message: '' })
    const [newsletterStatus, setNewsletterStatus] = useState({ type: '', message: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubscribing, setIsSubscribing] = useState(false)
    const handleFormChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const checkDailyLimit = () => {
        const today = new Date().toDateString()
        const stored = localStorage.getItem('contactFormSubmissions')
        if (stored) {
            const data = JSON.parse(stored)
            if (data.date === today) {
                return data.count >= 3
            }
        }
        return false
    }

    const incrementSubmissionCount = () => {
        const today = new Date().toDateString()
        const stored = localStorage.getItem('contactFormSubmissions')
        let newData = { date: today, count: 1 }
        if (stored) {
            const data = JSON.parse(stored)
            if (data.date === today) {
                newData = { date: today, count: data.count + 1 }
            }
        }
        localStorage.setItem('contactFormSubmissions', JSON.stringify(newData))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()



        if (checkDailyLimit()) {
            setFormStatus({ type: 'error', message: 'You reached your daily limit of messages!' })
            return
        }

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
                incrementSubmissionCount()
                setFormStatus({ type: 'success', message: 'Thank you for your message! We\'ll be in touch soon!' })
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

    const isAlreadySubscribed = (email) => {
        const stored = localStorage.getItem('subscribedEmails')
        if (stored) {
            const emails = JSON.parse(stored)
            return emails.includes(email.toLowerCase())
        }
        return false
    }

    const addToSubscribedList = (email) => {
        const stored = localStorage.getItem('subscribedEmails')
        let emails = stored ? JSON.parse(stored) : []
        emails.push(email.toLowerCase())
        localStorage.setItem('subscribedEmails', JSON.stringify(emails))
    }

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault()

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(newsletterData.email)) {
            setNewsletterStatus({ type: 'error', message: 'Please enter a valid email address (e.g., name@example.com)' })
            return
        }

        if (isAlreadySubscribed(newsletterData.email)) {
            setNewsletterStatus({ type: 'error', message: 'You\'re already subscribed! Check your inbox for updates.' })
            return
        }

        setIsSubscribing(true)
        setNewsletterStatus({ type: '', message: '' })

        try {
            const formData = new FormData()
            formData.append('FIRSTNAME', newsletterData.firstName)
            formData.append('EMAIL', newsletterData.email)
            formData.append('email_address_check', '')
            formData.append('locale', 'en')

            const response = await fetch('https://6e5fcb15.sibforms.com/serve/MUIFAPvHfL-EoMJF5FdSc0DduYzM3u9l9IQcXrgraV7FqGq0NZ2Wqi1Rs9njXfVJNGjLfIqoSw0bsK8nh8nTqL_9foaT8itTm2-yjtW0e9Rn4g3EC7K0wwfgpcoKv3sCpkQ6UBGF879_g_Pwq5v4w33pD20dr_Hx0wfm-VRDIz8TEImAtm9Crsb1J7ElinGPXLe8XJ9eT2b5vFGm4w==', {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            })



            addToSubscribedList(newsletterData.email)
            setNewsletterStatus({ type: 'success', message: 'Welcome to the family! Check your email to confirm :)' })
            setNewsletterData({ firstName: '', email: '' })
        } catch (error) {
            setNewsletterStatus({ type: 'error', message: 'Oops! Something went wrong. Please try again.' })
        } finally {
            setIsSubscribing(false)
        }
    }

    return (
        <div className="contact">
            <section className="contact-hero">
                <div className="contact-hero__background">
                    <img src="/photos/tali-pics78.webp" alt="Tali portrait" className="contact-hero__image" />
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
                                type="text"
                                placeholder="Your Name (optional)"
                                value={newsletterData.firstName}
                                onChange={(e) => setNewsletterData(prev => ({ ...prev, firstName: e.target.value }))}
                            />
                            <div className="newsletter__email-field">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={newsletterData.email}
                                    onChange={(e) => setNewsletterData(prev => ({ ...prev, email: e.target.value }))}
                                    required
                                />
                                <span className="newsletter__required">*</span>
                            </div>
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
