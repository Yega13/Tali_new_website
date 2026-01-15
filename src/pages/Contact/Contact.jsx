import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    const [isMapOpen, setIsMapOpen] = useState(false)

    const handleFormChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // Check if user exceeded daily contact form limit (5 per day)
    const checkDailyLimit = () => {
        const today = new Date().toDateString()
        const stored = localStorage.getItem('contactFormSubmissions')
        if (stored) {
            const data = JSON.parse(stored)
            if (data.date === today) {
                return data.count >= 5
            }
        }
        return false
    }

    // Increment contact form submission count
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

        // Check daily limit
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

    // Check if email is already subscribed
    const isAlreadySubscribed = (email) => {
        const stored = localStorage.getItem('subscribedEmails')
        if (stored) {
            const emails = JSON.parse(stored)
            return emails.includes(email.toLowerCase())
        }
        return false
    }

    // Add email to subscribed list
    const addToSubscribedList = (email) => {
        const stored = localStorage.getItem('subscribedEmails')
        let emails = stored ? JSON.parse(stored) : []
        emails.push(email.toLowerCase())
        localStorage.setItem('subscribedEmails', JSON.stringify(emails))
    }

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault()

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(newsletterEmail)) {
            setNewsletterStatus({ type: 'error', message: 'Please enter a valid email address (e.g., name@example.com)' })
            return
        }

        // Check if already subscribed
        if (isAlreadySubscribed(newsletterEmail)) {
            setNewsletterStatus({ type: 'error', message: 'This email is already subscribed to our Newsletter!' })
            return
        }

        setIsSubscribing(true)
        setNewsletterStatus({ type: '', message: '' })

        try {
            // Create hidden form and submit directly to Mailchimp
            const form = document.createElement('form')
            form.action = 'https://gmail.us6.list-manage.com/subscribe/post?u=cb988d7f10c01076fb4b5a6f6&id=91c7edfd70&f_id=007b9be0f0'
            form.method = 'POST'
            form.target = '_blank'

            const emailInput = document.createElement('input')
            emailInput.type = 'email'
            emailInput.name = 'EMAIL'
            emailInput.value = newsletterEmail
            form.appendChild(emailInput)

            // Honeypot field
            const honeypot = document.createElement('input')
            honeypot.type = 'text'
            honeypot.name = 'b_cb988d7f10c01076fb4b5a6f6_91c7edfd70'
            honeypot.value = ''
            honeypot.style.display = 'none'
            form.appendChild(honeypot)

            document.body.appendChild(form)
            form.submit()
            document.body.removeChild(form)

            // Track locally for duplicate check
            addToSubscribedList(newsletterEmail)
            setNewsletterStatus({ type: 'success', message: 'Welcome to the family! Check the new tab to confirm :)' })
            setNewsletterEmail('')
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
                    <img src="/photos/Tali pics(78).jpg" alt="Tali portrait" className="contact-hero__image" />
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

            {/* Location Section - Moved above Newsletter */}
            <section className="location-section section">
                <div className="container">
                    <motion.div
                        className="location__content"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="location__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                        </div>
                        <h2 className="location__title">Based in Luxembourg</h2>
                        <p className="location__text">Heart of Europe, performing worldwide</p>
                        <motion.button
                            className="btn btn-outline location__btn"
                            onClick={() => setIsMapOpen(true)}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                            View on Map
                        </motion.button>
                    </motion.div>
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
                                type="text"
                                placeholder="Enter your email"
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary" disabled={isSubscribing}>
                                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* Map Modal - Updated Design */}
            <AnimatePresence>
                {isMapOpen && (
                    <motion.div
                        className="map-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMapOpen(false)}
                    >
                        <motion.div
                            className="map-modal__content"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="map-modal__header">
                                <div className="map-modal__header-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                    </svg>
                                </div>
                                <h3 className="map-modal__title">Visit us in Limpetsberg, Luxembourg</h3>
                                <button className="map-modal__close" onClick={() => setIsMapOpen(false)}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                            <div className="map-modal__frame">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10360.48!2d6.1296!3d49.6167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47954f0b2b8a!2sLimpertsberg%2C%20Luxembourg!5e0!3m2!1sen!2s!4v1234567890"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Luxembourg Map"
                                />
                            </div>
                            <div className="map-modal__footer">
                                <div className="map-modal__info">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                        <rect x="3" y="3" width="18" height="18" rx="2" />
                                        <path d="M3 9h18" />
                                    </svg>
                                    <span>Public Transport Available</span>
                                </div>
                                <div className="map-modal__info">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                        <rect x="1" y="3" width="15" height="13" rx="2" />
                                        <path d="M16 8h3l3 3v5a2 2 0 0 1-2 2h-4" />
                                        <circle cx="5.5" cy="18.5" r="2.5" />
                                        <circle cx="18.5" cy="18.5" r="2.5" />
                                    </svg>
                                    <span>Parking Nearby</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
