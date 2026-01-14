import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import './ThemeToggle.css'

export default function ThemeToggle({ className = '' }) {
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <motion.button
            className={`theme-toggle ${className}`}
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            whileTap={{ scale: 0.9 }}
        >
            <motion.div
                className="theme-toggle__icon-wrapper"
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
                {/* Clean Vector Sun - The Final Version */}
                <motion.svg
                    className="theme-toggle__icon theme-toggle__icon--sun"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2" // Slightly bolder than standard 2 for better visibility
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={false}
                    animate={{
                        opacity: isDark ? 0 : 1,
                        scale: isDark ? 0.5 : 1
                    }}
                    transition={{ duration: 0.25 }}
                >
                    {/* Circle */}
                    <circle cx="12" cy="12" r="5" />

                    {/* 8 Rays - Simple, Clean, Symmetric */}
                    <path d="M12 1v2" />
                    <path d="M12 21v2" />
                    <path d="M4.22 4.22l1.42 1.42" />
                    <path d="M18.36 18.36l1.42 1.42" />
                    <path d="M1 12h2" />
                    <path d="M21 12h2" />
                    <path d="M4.22 19.78l1.42-1.42" />
                    <path d="M18.36 5.64l1.42-1.42" />
                </motion.svg>

                {/* Moon Icon */}
                <motion.svg
                    className="theme-toggle__icon theme-toggle__icon--moon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={false}
                    animate={{
                        opacity: isDark ? 1 : 0,
                        scale: isDark ? 1 : 0.5
                    }}
                    transition={{ duration: 0.25 }}
                >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </motion.svg>
            </motion.div>
        </motion.button>
    )
}
