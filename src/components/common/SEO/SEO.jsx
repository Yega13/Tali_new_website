import { useEffect } from 'react'

const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Tali Golergant",
    "alternateName": "TALI",
    "description": "Singer, songwriter, and actor from Luxembourg. Known for representing Luxembourg at Eurovision 2025.",
    "url": "https://taligolergant.com",
    "image": "https://taligolergant.com/photos/Tali OG pic.webp",
    "sameAs": [
        "https://www.instagram.com/taligolergant",
        "https://www.youtube.com/@taligolergant",
        "https://open.spotify.com/artist/6FGONoPILQdWo7NUk1JQPA",
        "https://www.imdb.com/name/nm12387164/"
    ],
    "jobTitle": ["Singer", "Songwriter", "Actor"],
    "birthDate": "2000-11-26",
    "birthPlace": {
        "@type": "Place",
        "name": "Jerusalem, Israel"
    },
    "nationality": "Luxembourgish",
    "knowsLanguage": ["English", "Hebrew", "Spanish", "French", "German"],
    "genre": ["Pop", "Indie", "Latin"],
    "award": "Luxembourg Eurovision Representative 2025",
    "performerIn": {
        "@type": "Event",
        "name": "Eurovision Song Contest 2025",
        "location": {
            "@type": "Place",
            "name": "Basel, Switzerland"
        }
    }
}

const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Tali Golergant - Official Website",
    "url": "https://taligolergant.com",
    "description": "Official website of Tali Golergant - Singer, Songwriter, and Artist from Luxembourg",
    "publisher": {
        "@type": "Person",
        "name": "Tali Golergant"
    }
}

export default function SEO() {
    useEffect(() => {
        const personScript = document.createElement('script')
        personScript.type = 'application/ld+json'
        personScript.id = 'person-structured-data'
        personScript.textContent = JSON.stringify(structuredData)

        const websiteScript = document.createElement('script')
        websiteScript.type = 'application/ld+json'
        websiteScript.id = 'website-structured-data'
        websiteScript.textContent = JSON.stringify(websiteData)

        const existingPerson = document.getElementById('person-structured-data')
        const existingWebsite = document.getElementById('website-structured-data')
        if (existingPerson) existingPerson.remove()
        if (existingWebsite) existingWebsite.remove()

        document.head.appendChild(personScript)
        document.head.appendChild(websiteScript)

        return () => {
            personScript.remove()
            websiteScript.remove()
        }
    }, [])

    return null
}
