import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/hooks/useTheme'
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

export default function App() {
    return (
        <ThemeProvider>
            <Router>
                <Preloader />
                <ScrollToTop />
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/music" element={<Music />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/collaborations" element={<Collaborations />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/birthday" element={<Birthday />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
                <BackToTop />
            </Router>
        </ThemeProvider>
    )
}
