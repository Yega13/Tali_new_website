import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Footer.css'

const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/music', label: 'Music' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/news', label: 'News' },
    { to: '/collaborations', label: 'Collaborations' },
    { to: '/contact', label: 'Contact' }
]

const socialLinks = [
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/taligolergant?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
        )
    },
    {
        name: 'TikTok',
        url: 'https://www.tiktok.com/@taligolergant?is_from_webapp=1&sender_device=pc',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
        )
    },
    {
        name: 'YouTube',
        url: 'https://youtube.com/@talimusic-1?si=pjQ4B5j2KBwgcHDs',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        )
    },
    {
        name: 'Facebook',
        url: 'https://www.facebook.com/taligolergantmusic',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        )
    },
    {
        name: 'Spotify',
        url: 'https://open.spotify.com/artist/6v6wot3YV1QnPry6mfrCLK?si=tWuCpbfFSVKPLLL6O0RCNA',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
        )
    }
]

export default function Footer() {
    const currentYear = new Date().getFullYear()
    const location = useLocation()

    // Filter out current page from quick links
    const filteredLinks = quickLinks.filter(link => link.to !== location.pathname)

    return (
        <footer className="footer">
            <div className="footer__container container">
                <div className="footer__content">
                    {/* Brand */}
                    <div className="footer__brand">
                        <Link to="/" className="footer__logo">
                            <span className="footer__logo-text">Tali Golergant</span>
                        </Link>
                        <p className="footer__tagline">
                            Singer • Songwriter • Artist
                        </p>
                    </div>

                    {/* Quick Links - hidden on mobile */}
                    <nav className="footer__nav footer__nav--desktop-only">
                        <h4 className="footer__nav-title">Quick Links</h4>
                        <ul className="footer__nav-list">
                            {filteredLinks.map(link => (
                                <li key={link.to}>
                                    <Link to={link.to} className="footer__nav-link">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Social Links */}
                    <div className="footer__social">
                        <h4 className="footer__nav-title">Follow Tali</h4>
                        <div className="footer__social-links">
                            {socialLinks.map(social => (
                                <motion.a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer__social-link"
                                    aria-label={`Follow on ${social.name}`}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p className="footer__copyright">
                        © {currentYear} Tali Golergant. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
