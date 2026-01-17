import './Skeleton.css'

export default function Skeleton({ width, height, borderRadius = '8px', className = '' }) {
    return (
        <div
            className={`skeleton ${className}`}
            style={{
                width: width || '100%',
                height: height || '200px',
                borderRadius
            }}
        />
    )
}

export function ImageSkeleton({ aspectRatio = '1/1', className = '' }) {
    return (
        <div
            className={`skeleton skeleton--image ${className}`}
            style={{ aspectRatio }}
        />
    )
}
