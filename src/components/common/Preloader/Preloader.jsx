import { motion, AnimatePresence } from 'framer-motion'
import { usePreloader } from '@/hooks/usePreloader'
import './Preloader.css'

export default function Preloader() {
    const { isLoading, isAnimating } = usePreloader(2500)

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                    <motion.div className="preloader__content">
                        <motion.span
                            className="preloader__text preloader__text--first"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{
                                opacity: isAnimating ? 1 : 0,
                                x: isAnimating ? 0 : 50
                            }}
                            transition={{
                                duration: 0.8,
                                ease: [0.25, 0.1, 0.25, 1],
                                delay: 0.2
                            }}
                        >
                            Tali
                        </motion.span>
                        <motion.span
                            className="preloader__text preloader__text--last"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{
                                opacity: isAnimating ? 1 : 0,
                                x: isAnimating ? 0 : 50
                            }}
                            transition={{
                                duration: 0.8,
                                ease: [0.25, 0.1, 0.25, 1],
                                delay: 0.4
                            }}
                        >
                            Golergant
                        </motion.span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
