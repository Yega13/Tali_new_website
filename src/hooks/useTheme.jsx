import { useState, useEffect, createContext, useContext } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem('tali-theme')
        if (stored) return stored
        // Default to light theme for first-time visitors
        return 'light'
    })

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('tali-theme', theme)
    }, [theme])

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const handleChange = (e) => {
            const stored = localStorage.getItem('tali-theme')
            if (!stored) {
                setTheme(e.matches ? 'dark' : 'light')
            }
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    const toggleTheme = () => {
        const scrollY = window.scrollY
        const scrollX = window.scrollX

        const html = document.documentElement
        const originalScrollBehavior = html.style.scrollBehavior
        html.style.scrollBehavior = 'auto'

        const newTheme = theme === 'light' ? 'dark' : 'light'

        html.setAttribute('data-theme', newTheme)
        localStorage.setItem('tali-theme', newTheme)

        setTheme(newTheme)

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                window.scrollTo(scrollX, scrollY)
                html.style.scrollBehavior = originalScrollBehavior
            })
        })
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
