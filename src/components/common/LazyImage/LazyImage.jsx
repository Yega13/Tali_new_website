import { useState } from 'react'
import './LazyImage.css'

export default function LazyImage({ src, alt, className = '', ...props }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasError, setHasError] = useState(false)

    return (
        <div className={`lazy-image ${className}`}>
            {!isLoaded && !hasError && (
                <div className="lazy-image__skeleton" />
            )}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                className={`lazy-image__img ${isLoaded ? 'lazy-image__img--loaded' : ''}`}
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
                {...props}
            />
        </div>
    )
}
