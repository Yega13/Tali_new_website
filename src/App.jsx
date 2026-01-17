import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@/hooks/useTheme'
import { AnimatePresence, motion } from 'framer-motion'
import Preloader from '@/components/common/Preloader'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/common/ScrollToTop'
import BackToTop from '@/components/common/BackToTop'

// Pages
import Home from '@/pages/Home'
import About from '@/pages/About'
import Music from '@/pages/Music'
import Gallery from '@/pages/Gallery'
import News from '@/pages/News'
import Collaborations from '@/pages/Collaborations'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'
import Birthday from '@/pages/Birthday'
import Shop from '@/pages/Shop'

// Page transition wrapper - pure opacity appear
const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
}

// Valid routes for checking 404
const validRoutes = ['/', '/about', '/music', '/gallery', '/news', '/collaborations', '/contact', '/birthday', '/shop']

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
        <ThemeProvider>
            <Router>
                <AppContent />
            </Router>
        </ThemeProvider>
    )
}
