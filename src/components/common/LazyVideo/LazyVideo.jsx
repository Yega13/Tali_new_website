import { useState, useRef, useEffect } from 'react'
import './LazyVideo.css'

export default function LazyVideo({
    src,
    title,
    thumbnail,
    className = ''
}) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isInView, setIsInView] = useState(false)
    const containerRef = useRef(null)

    const getYouTubeId = (url) => {
        const match = url.match(/embed\/([^?]+)/)
        return match ? match[1] : null
    }

    const videoId = getYouTubeId(src)
    const thumbnailUrl = thumbnail || (videoId
        ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        : null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true)
                    observer.disconnect()
                }
            },
            { rootMargin: '100px', threshold: 0.1 }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const handleClick = () => {
        setIsLoaded(true)
    }

    return (
        <div
            ref={containerRef}
            className={`lazy-video ${className}`}
            onClick={!isLoaded ? handleClick : undefined}
        >
            {!isLoaded ? (
                <>
                    {isInView && thumbnailUrl && (
                        <img
                            src={thumbnailUrl}
                            alt={title}
                            className="lazy-video__thumbnail"
                            loading="lazy"
                        />
                    )}
                    <button className="lazy-video__play" aria-label={`Play ${title}`}>
                        <svg viewBox="0 0 68 48" width="68" height="48">
                            <path
                                className="lazy-video__play-bg"
                                d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                                fill="#212121"
                                fillOpacity="0.8"
                            />
                            <path d="M 45,24 27,14 27,34" fill="#fff" />
                        </svg>
                    </button>
                </>
            ) : (
                <iframe
                    src={`${src}?autoplay=1`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="lazy-video__iframe"
                />
            )}
        </div>
    )
}
