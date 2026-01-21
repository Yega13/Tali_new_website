import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@/hooks/useTheme'
import { AnimatePresence, motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import Preloader from '@/components/common/Preloader'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/common/ScrollToTop'
import BackToTop from '@/components/common/BackToTop'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import SEO from '@/components/common/SEO'

import Home from '@/pages/Home'
const About = lazy(() => import('@/pages/About'))
const Music = lazy(() => import('@/pages/Music'))
const Gallery = lazy(() => import('@/pages/Gallery'))
const News = lazy(() => import('@/pages/News'))
const Collaborations = lazy(() => import('@/pages/Collaborations'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const Birthday = lazy(() => import('@/pages/Birthday'))
const Shop = lazy(() => import('@/pages/Shop'))

const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
}

const validRoutes = ['/', '/about', '/music', '/gallery', '/news', '/collaborations', '/contact', '/birthday', '/shop']

function PageLoader() {
    return (
        <div style={{
            minHeight: '50vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                width: '40px',
                height: '40px',
                border: '3px solid var(--color-border-light)',
                borderTopColor: 'var(--color-primary)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }} />
        </div>
    )
}

function AnimatedRoutes() {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <Suspense fallback={<PageLoader />}>
                    <Routes location={location}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/music" element={<Music />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/collaborations" element={<Collaborations />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/birthday" element={<Birthday />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </motion.div>
        </AnimatePresence>
    )
}

function AppContent() {
    const location = useLocation()
    const is404 = !validRoutes.includes(location.pathname)

    return (
        <>
            <Preloader />
            <ScrollToTop />
            <SEO />
            {!is404 && <Header />}
            <main>
                <AnimatedRoutes />
            </main>
            {!is404 && <Footer />}
            {!is404 && <BackToTop />}
        </>
    )
}

export default function App() {
    return (
        <ErrorBoundary>
            <ThemeProvider>
                <Router>
                    <AppContent />
                </Router>
            </ThemeProvider>
        </ErrorBoundary>
    )
}
