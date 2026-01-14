import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Birthday.css'

function Confetti() {
    const [confetti, setConfetti] = useState([])

    useEffect(() => {
        const colors = ['#FF6B9D', '#FFE66D', '#4ECDC4', '#A855F7', '#FF6B6B', '#06D6A0']
        const newConfetti = []

        for (let i = 0; i < 50; i++) {
            newConfetti.push({
                id: i,
                x: Math.random() * 100,
                delay: Math.random() * 5,
                duration: 3 + Math.random() * 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: 8 + Math.random() * 8,
                rotate: Math.random() * 360
            })
        }

        setConfetti(newConfetti)
    }, [])

    return (
        <div className="confetti-container">
            {confetti.map(piece => (
                <motion.div
                    key={piece.id}
                    className="confetti-piece"
                    style={{
                        left: `${piece.x}%`,
                        backgroundColor: piece.color,
                        width: piece.size,
                        height: piece.size * 0.6
                    }}
                    initial={{ y: -20, rotate: piece.rotate, opacity: 1 }}
                    animate={{
                        y: '100vh',
                        rotate: piece.rotate + 720,
                        opacity: [1, 1, 0]
                    }}
                    transition={{
                        duration: piece.duration,
                        delay: piece.delay,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                />
            ))}
        </div>
    )
}

export default function Birthday() {
    return (
        <div className="birthday">
            <Confetti />

            <motion.div
                className="birthday__content"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1
                    className="birthday__title"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    🎂 Happy Birthday Tali! 🎉
                </motion.h1>

                <motion.p
                    className="birthday__message"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Wishing you all the best on your special day!
                    <br />
                    May your melodies continue to inspire millions around the world.
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <Link to="/news" className="btn birthday__btn">
                        ← Back to News
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    )
}
