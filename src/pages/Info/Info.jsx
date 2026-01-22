import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Info.css'

export default function Info() {
    return (
        <div className="info-page">
            {/* Back Button */}
            <Link to="/shop" className="info-page__back">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
                Back to Shop
            </Link>

            <div className="info-page__container">
                {/* Header */}
                <motion.header
                    className="info-page__header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="info-page__title">Website Information</h1>
                    <p className="info-page__subtitle">Everything you need to know about Tali Golergant's official website</p>
                </motion.header>

                {/* For Everyone Section */}
                <section className="info-section">
                    <h2 className="info-section__heading">For Everyone</h2>

                    {/* What is this website */}
                    <article className="info-card">
                        <h3 className="info-card__title">What is This Website?</h3>
                        <p className="info-card__text">
                            This is the official website of <strong>Tali Golergant</strong>, a singer, songwriter, and artist from Luxembourg.
                            The website serves as a central hub for fans and visitors to explore Tali's music, learn about her journey,
                            view photos and videos, read the latest news, and get in touch with her team.
                        </p>
                    </article>

                    {/* Page by Page Features */}
                    <article className="info-card">
                        <h3 className="info-card__title">Website Features (Page by Page)</h3>

                        <div className="info-feature">
                            <h4>Home Page</h4>
                            <ul>
                                <li>Beautiful hero section with Tali's portrait (changes with light/dark theme)</li>
                                <li>"Listen Now" button opens a music player modal with streaming options</li>
                                <li>Explore section with quick links to all main pages</li>
                                <li>Social media links (Instagram, TikTok, YouTube, Facebook)</li>
                            </ul>
                        </div>

                        <div className="info-feature">
                            <h4>About Page</h4>
                            <ul>
                                <li>Biography about Tali's background and musical journey</li>
                                <li>Life Journey timeline showing key moments from early years to 2025</li>
                                <li>Acting & Voice section with embedded YouTube videos (Eurovision, acting reels, live performances)</li>
                                <li>Professional Materials with downloadable resume</li>
                                <li>Resume blocks showing Management, Theatre, Film/Media, Training, and Special Skills</li>
                                <li>Link to Tali's IMDB profile</li>
                            </ul>
                        </div>

                        <div className="info-feature">
                            <h4>Music Page</h4>
                            <ul>
                                <li>Hero section featuring Tali's Den Atelier concert photo</li>
                                <li>Music Videos section with YouTube video thumbnails and play buttons</li>
                                <li>Spotify player carousel to listen to tracks directly</li>
                                <li>Show History listing all performances from 2021 to 2025 (Den Atelier, Eurovision, Rockhal, etc.)</li>
                                <li>Decorative photo stickers on the sides</li>
                                <li>Animated video section at the bottom</li>
                            </ul>
                        </div>

                        <div className="info-feature">
                            <h4>Gallery Page</h4>
                            <ul>
                                <li>Animated ticker header with scrolling photos</li>
                                <li>WANDER section - photos and videos from the WANDER EP era</li>
                                <li>Eurovision 2024 section - backstage and performance photos</li>
                                <li>In Focus section - concert and event photos from various shows</li>
                                <li>Moments section - black and white photos with people</li>
                                <li>Full-screen lightbox viewer with swipe navigation for mobile</li>
                                <li>Video playback support with controls</li>
                            </ul>
                        </div>

                        <div className="info-feature">
                            <h4>News Page</h4>
                            <ul>
                                <li>News cards featuring WANDER EP, Style single, Trounwiessel collaboration, Birthday message</li>
                                <li>Modal popup for WANDER with links to all streaming platforms (Spotify, Apple Music, YouTube, Deezer, TIDAL, Amazon)</li>
                                <li>Interviews & Videos section with 6 embedded YouTube interviews</li>
                                <li>Alternating left-right layout for interview cards</li>
                            </ul>
                        </div>

                        <div className="info-feature">
                            <h4>Collaborations Page</h4>
                            <ul>
                                <li>Numbered collaboration cards with artist details</li>
                                <li>BlueStripes - expandable section with songs (You Don't Really Know Me, Blue Bird, Come On!) and photo gallery</li>
                                <li>Lost in Pacific - Ocean collaboration with 4+ million Spotify streams</li>
                                <li>Max Bartos - Carry Me Home (2023)</li>
                                <li>Sarah Vera - Garden of Eden (2022)</li>
                                <li>Lightbox gallery for BlueStripes moments</li>
                            </ul>
                        </div>

                        <div className="info-feature">
                            <h4>Contact Page</h4>
                            <ul>
                                <li>Contact form with Name, Email, and Message fields</li>
                                <li>Messages sent via Formspree (limit: 5 per day)</li>
                                <li>Contact email: taliartistproductions@gmail.com</li>
                                <li>Location section with interactive Google Maps modal (Limpertsberg, Luxembourg)</li>
                                <li>Newsletter subscription section (powered by Brevo/Sendinblue)</li>
                            </ul>
                        </div>

                        <div className="info-feature">
                            <h4>Shop Page</h4>
                            <ul>
                                <li>Under Construction page with animated elements</li>
                                <li>Preview of upcoming merchandise: T-Shirts, Albums, Vinyl, Accessories</li>
                                <li>"Get Notified" button links to Contact page</li>
                            </ul>
                        </div>
                    </article>

                    {/* Speed & Performance */}
                    <article className="info-card">
                        <h3 className="info-card__title">Website Speed & Performance</h3>
                        <p className="info-card__text">The website is built with performance in mind:</p>
                        <ul className="info-card__list">
                            <li><strong>Fast Loading:</strong> Pages are lazy-loaded, meaning they only load when you visit them</li>
                            <li><strong>Optimized Images:</strong> All photos use WebP format for smaller file sizes</li>
                            <li><strong>Preloading:</strong> Critical images (hero) are preloaded for instant display</li>
                            <li><strong>Smooth Animations:</strong> Powered by Framer Motion for 60fps animations</li>
                            <li><strong>Code Splitting:</strong> JavaScript is split into chunks for faster initial load</li>
                            <li><strong>Minified Code:</strong> All code is compressed in production</li>
                        </ul>
                    </article>

                    {/* Newsletter */}
                    <article className="info-card">
                        <h3 className="info-card__title">Newsletter Information</h3>
                        <p className="info-card__text">
                            The newsletter keeps you updated on new music releases, upcoming shows, and exclusive content.
                            It's powered by <strong>Brevo (formerly Sendinblue)</strong>, a professional email marketing service.
                        </p>
                        <ul className="info-card__list">
                            <li>Subscribe on the Contact page</li>
                            <li>Receive a confirmation email after subscribing</li>
                            <li>Emails include updates on new songs, EPs, and concert announcements</li>
                            <li>Unsubscribe anytime via link in emails</li>
                        </ul>
                    </article>

                    {/* Contact Form */}
                    <article className="info-card">
                        <h3 className="info-card__title">Contact Form Information</h3>
                        <p className="info-card__text">
                            The contact form is for booking inquiries, fan messages, press requests, and general questions.
                            It's powered by <strong>Formspree</strong>, a reliable form handling service.
                        </p>
                        <ul className="info-card__list">
                            <li>Messages are delivered to Tali's team email</li>
                            <li>Daily limit: 5 messages per visitor (to prevent spam)</li>
                            <li>Response time varies based on inquiry type</li>
                            <li>For urgent matters, email directly: taliartistproductions@gmail.com</li>
                        </ul>
                    </article>

                    {/* Theme */}
                    <article className="info-card">
                        <h3 className="info-card__title">Light & Dark Theme</h3>
                        <p className="info-card__text">
                            The website supports both light and dark modes! Click the sun/moon icon in the header to switch.
                        </p>
                        <ul className="info-card__list">
                            <li><strong>Light Theme:</strong> Green accent color (#1B8754), white backgrounds</li>
                            <li><strong>Dark Theme:</strong> Gold accent color (#D4AF37), midnight backgrounds</li>
                            <li>Your preference is saved in your browser</li>
                            <li>Respects your system preference by default</li>
                        </ul>
                    </article>
                </section>

                {/* Divider */}
                <div className="info-divider">
                    <span>For Developers & Technical Users</span>
                </div>

                {/* For Developers Section */}
                <section className="info-section info-section--dev">
                    <h2 className="info-section__heading">Technical Documentation</h2>

                    {/* Tech Stack */}
                    <article className="info-card info-card--tech">
                        <h3 className="info-card__title">Technology Stack</h3>
                        <div className="info-tech-grid">
                            <div className="info-tech-item">
                                <strong>Framework</strong>
                                <span>React 18.3.1</span>
                            </div>
                            <div className="info-tech-item">
                                <strong>Build Tool</strong>
                                <span>Vite 5.4.0</span>
                            </div>
                            <div className="info-tech-item">
                                <strong>Routing</strong>
                                <span>React Router DOM 6.22.0</span>
                            </div>
                            <div className="info-tech-item">
                                <strong>Animation</strong>
                                <span>Framer Motion 11.0.0</span>
                            </div>
                            <div className="info-tech-item">
                                <strong>Image Processing</strong>
                                <span>Sharp 0.34.5</span>
                            </div>
                            <div className="info-tech-item">
                                <strong>Minification</strong>
                                <span>Terser 5.46.0</span>
                            </div>
                        </div>
                    </article>

                    {/* SEO & Meta Tags */}
                    <article className="info-card info-card--tech">
                        <h3 className="info-card__title">SEO & Meta Tags</h3>
                        <p className="info-card__text">Comprehensive meta tag implementation:</p>

                        <div className="info-code-block">
                            <h4>Primary Meta Tags</h4>
                            <ul>
                                <li><code>&lt;title&gt;</code> Tali Golergant - Official Website</li>
                                <li><code>&lt;meta name="description"&gt;</code> Singer, Songwriter, Artist from Luxembourg. Eurovision 2025 representative.</li>
                                <li><code>&lt;meta name="keywords"&gt;</code> Tali Golergant, Luxembourg singer, songwriter, Eurovision 2025, pop music, indie music</li>
                                <li><code>&lt;meta name="author"&gt;</code> Tali Golergant</li>
                                <li><code>&lt;meta name="robots"&gt;</code> index, follow</li>
                                <li><code>&lt;link rel="canonical"&gt;</code> https://taligolergant.up.railway.app</li>
                            </ul>
                        </div>

                        <div className="info-code-block">
                            <h4>Open Graph (Facebook/Social)</h4>
                            <ul>
                                <li><code>og:type</code> website</li>
                                <li><code>og:url</code> https://taligolergant.up.railway.app/</li>
                                <li><code>og:title</code> Tali Golergant - Official Website</li>
                                <li><code>og:description</code> Singer, Songwriter, and Artist from Luxembourg</li>
                                <li><code>og:image</code> /social-square.jpg (800x800)</li>
                                <li><code>og:site_name</code> Tali Golergant</li>
                                <li><code>og:locale</code> en_US</li>
                            </ul>
                        </div>

                        <div className="info-code-block">
                            <h4>Twitter Card</h4>
                            <ul>
                                <li><code>twitter:card</code> summary_large_image</li>
                                <li><code>twitter:url</code> https://taligolergant.up.railway.app/</li>
                                <li><code>twitter:title</code> Tali Golergant - Official Website</li>
                                <li><code>twitter:description</code> Singer, Songwriter, and Artist from Luxembourg</li>
                                <li><code>twitter:image</code> /social-square.jpg</li>
                            </ul>
                        </div>

                        <div className="info-code-block">
                            <h4>Schema.org (Google)</h4>
                            <ul>
                                <li><code>itemprop="name"</code> Tali Golergant - Official Website</li>
                                <li><code>itemprop="description"</code> Singer, Songwriter, and Artist from Luxembourg</li>
                                <li><code>itemprop="image"</code> /social-square.jpg</li>
                            </ul>
                        </div>
                    </article>

                    {/* UI/UX Design */}
                    <article className="info-card info-card--tech">
                        <h3 className="info-card__title">UI/UX Design System</h3>

                        <div className="info-code-block">
                            <h4>Typography</h4>
                            <ul>
                                <li><strong>Primary Font:</strong> Inter (sans-serif) - body text, navigation</li>
                                <li><strong>Display Font:</strong> Playfair Display (serif) - headings, titles</li>
                                <li><strong>Font Sizes:</strong> 12px to 72px (--text-xs to --text-7xl)</li>
                                <li><strong>Font Weights:</strong> 300 (light) to 700 (bold)</li>
                                <li><strong>Fallback Fonts:</strong> Custom @font-face with size-adjust to reduce CLS</li>
                            </ul>
                        </div>

                        <div className="info-code-block">
                            <h4>Color Palette</h4>
                            <ul>
                                <li><strong>Light Theme Primary:</strong> #1B8754 (Green)</li>
                                <li><strong>Light Theme Background:</strong> #FFFFFF / #F8F9FA</li>
                                <li><strong>Dark Theme Primary:</strong> #D4AF37 (Gold)</li>
                                <li><strong>Dark Theme Background:</strong> #121212 / #1A1A1A</li>
                                <li><strong>Theme Transition:</strong> 0.4s ease (smooth switching)</li>
                            </ul>
                        </div>

                        <div className="info-code-block">
                            <h4>Spacing System</h4>
                            <ul>
                                <li>4px increments: --space-1 (4px) to --space-32 (128px)</li>
                                <li>Consistent padding/margins across all components</li>
                            </ul>
                        </div>

                        <div className="info-code-block">
                            <h4>Responsive Breakpoints</h4>
                            <ul>
                                <li><strong>Mobile:</strong> 0-767px (base)</li>
                                <li><strong>Tablet:</strong> 768px+</li>
                                <li><strong>Desktop:</strong> 1024px+</li>
                                <li><strong>Large:</strong> 1280px+</li>
                                <li><strong>XL:</strong> 1536px+</li>
                                <li><strong>Big:</strong> 1700px+</li>
                                <li><strong>Huge:</strong> 1900px+</li>
                                <li><strong>Massive:</strong> 2100px+</li>
                            </ul>
                        </div>

                        <div className="info-code-block">
                            <h4>Animation & Motion</h4>
                            <ul>
                                <li>Page transitions: 0.5s fade in, 0.2s fade out</li>
                                <li>Scroll animations: whileInView with once: true</li>
                                <li>Button interactions: whileTap scale(0.95)</li>
                                <li>Scroll indicator: infinite bounce animation</li>
                            </ul>
                        </div>
                    </article>

                    {/* Infrastructure */}
                    <article className="info-card info-card--tech">
                        <h3 className="info-card__title">Infrastructure & Hosting</h3>
                        <ul className="info-card__list">
                            <li><strong>Hosting:</strong> Railway (https://taligolergant.up.railway.app)</li>
                            <li><strong>Build:</strong> Vite production build with Terser minification</li>
                            <li><strong>Target:</strong> ES2020 (modern browsers)</li>
                            <li><strong>Source Maps:</strong> Disabled in production</li>
                            <li><strong>Console:</strong> Removed in production (drop_console: true)</li>
                        </ul>

                        <div className="info-code-block">
                            <h4>Chunk Splitting Strategy</h4>
                            <ul>
                                <li><strong>react-vendor:</strong> React, React-DOM, React Router</li>
                                <li><strong>animation:</strong> Framer Motion</li>
                                <li><strong>Lazy-loaded:</strong> All pages except Home</li>
                            </ul>
                        </div>

                        <div className="info-code-block">
                            <h4>External Services</h4>
                            <ul>
                                <li><strong>Forms:</strong> Formspree (contact form)</li>
                                <li><strong>Newsletter:</strong> Brevo/Sendinblue</li>
                                <li><strong>Fonts:</strong> Google Fonts (Inter, Playfair Display)</li>
                                <li><strong>Analytics:</strong> Mailchimp tracking script</li>
                                <li><strong>Maps:</strong> Google Maps Embed API</li>
                            </ul>
                        </div>
                    </article>

                    {/* Image Formats */}
                    <article className="info-card info-card--tech">
                        <h3 className="info-card__title">Image & Media Formats</h3>

                        <div className="info-code-block">
                            <h4>Image Formats Used</h4>
                            <ul>
                                <li><strong>WebP:</strong> Primary format for all photos (80%+ smaller than JPEG)</li>
                                <li><strong>PNG:</strong> Some images with transparency</li>
                                <li><strong>JPEG:</strong> Social sharing images (og:image)</li>
                                <li><strong>ICO/PNG:</strong> Favicons (16x16, 32x32, 180x180)</li>
                            </ul>
                        </div>

                        <div className="info-code-block">
                            <h4>Video Formats</h4>
                            <ul>
                                <li><strong>MP4:</strong> All video content (H.264 codec)</li>
                                <li><strong>Attributes:</strong> autoPlay, loop, muted, playsInline for inline playback</li>
                            </ul>
                        </div>

                        <div className="info-code-block">
                            <h4>Image Loading Strategy</h4>
                            <ul>
                                <li><strong>Hero Images:</strong> loading="eager", fetchpriority="high"</li>
                                <li><strong>Gallery Images:</strong> LazyImage component with intersection observer</li>
                                <li><strong>Video Thumbnails:</strong> YouTube thumbnail API (hqdefault.jpg)</li>
                                <li><strong>Preload:</strong> Critical hero image in &lt;head&gt;</li>
                            </ul>
                        </div>
                    </article>

                    {/* Path Aliases */}
                    <article className="info-card info-card--tech">
                        <h3 className="info-card__title">Path Aliases (Vite)</h3>
                        <div className="info-code-block">
                            <ul>
                                <li><code>@</code> → ./src</li>
                                <li><code>@components</code> → ./src/components</li>
                                <li><code>@pages</code> → ./src/pages</li>
                                <li><code>@styles</code> → ./src/styles</li>
                                <li><code>@hooks</code> → ./src/hooks</li>
                                <li><code>@data</code> → ./src/data</li>
                                <li><code>@assets</code> → ./src/assets</li>
                                <li><code>@utils</code> → ./src/utils</li>
                            </ul>
                        </div>
                    </article>

                    {/* Browser Support */}
                    <article className="info-card info-card--tech">
                        <h3 className="info-card__title">Browser Support</h3>
                        <ul className="info-card__list">
                            <li><strong>Target:</strong> ES2020 compatible browsers</li>
                            <li><strong>Chrome:</strong> 80+</li>
                            <li><strong>Firefox:</strong> 74+</li>
                            <li><strong>Safari:</strong> 13.1+</li>
                            <li><strong>Edge:</strong> 80+</li>
                            <li><strong>Mobile:</strong> iOS Safari 13+, Chrome for Android 80+</li>
                        </ul>
                    </article>

                    {/* Z-Index Scale */}
                    <article className="info-card info-card--tech">
                        <h3 className="info-card__title">Z-Index Scale</h3>
                        <div className="info-code-block">
                            <ul>
                                <li><code>--z-dropdown:</code> 100</li>
                                <li><code>--z-sticky:</code> 200</li>
                                <li><code>--z-fixed:</code> 300</li>
                                <li><code>--z-modal-backdrop:</code> 400</li>
                                <li><code>--z-modal:</code> 500</li>
                                <li><code>--z-popover:</code> 600</li>
                                <li><code>--z-tooltip:</code> 700</li>
                                <li><code>--z-preloader:</code> 1000</li>
                            </ul>
                        </div>
                    </article>

                    {/* Accessibility */}
                    <article className="info-card info-card--tech">
                        <h3 className="info-card__title">Accessibility Features</h3>
                        <ul className="info-card__list">
                            <li>Semantic HTML structure (header, main, section, article, nav)</li>
                            <li>Proper heading hierarchy (h1-h6)</li>
                            <li>Alt text on all images</li>
                            <li>Aria labels on interactive elements</li>
                            <li>Keyboard navigation support</li>
                            <li>Color contrast following WCAG guidelines</li>
                            <li>Focus states on all interactive elements</li>
                            <li>visually-hidden class for screen reader text</li>
                        </ul>
                    </article>

                    {/* Preconnect & DNS Prefetch */}
                    <article className="info-card info-card--tech">
                        <h3 className="info-card__title">Performance Optimizations</h3>
                        <div className="info-code-block">
                            <h4>Preconnect (Early Connection)</h4>
                            <ul>
                                <li>fonts.googleapis.com</li>
                                <li>fonts.gstatic.com</li>
                                <li>www.youtube.com</li>
                                <li>i.ytimg.com</li>
                                <li>img.youtube.com</li>
                            </ul>
                        </div>

                        <div className="info-code-block">
                            <h4>DNS Prefetch</h4>
                            <ul>
                                <li>open.spotify.com</li>
                                <li>chimpstatic.com</li>
                            </ul>
                        </div>

                        <div className="info-code-block">
                            <h4>Preload</h4>
                            <ul>
                                <li>/photos/tali-style1.webp (Hero image)</li>
                            </ul>
                        </div>
                    </article>
                </section>

                {/* Footer */}
                <footer className="info-page__footer">
                    <p>Tali Golergant Official Website - Built with React + Vite</p>
                    <p>Last updated: January 2026</p>
                    <p>Made with love by friend from Armenia! ;D</p>
                </footer>
            </div>
        </div>
    )
}
