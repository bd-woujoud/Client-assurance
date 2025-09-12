// components/SEO.jsx
import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({
    title = "Comparateur Assurance Maladie Suisse 2025 - Économisez jusqu'à 40%",
    description = "Comparez gratuitement les meilleures assurances maladie suisse en 2 minutes. Plus de 50'000 familles ont économisé jusqu'à 1680 CHF/an.",
    keywords = "assurance maladie suisse, comparateur assurance, prime assurance, CSS, Swica, Helsana, Concordia",
    canonical = "https://assurancemax.ch",
    ogImage = "https://assurancemax.ch/images/og-comparateur-suisse.jpg",
    structuredData = null,
    page = "homepage" // homepage, quiz, results
}) => {

    // Données structurées par défaut
    const defaultStructuredData = {
        "@context": "https://schema.org",
        "@type": "FinancialService",
        "name": "AssuranceMax.ch",
        "description": description,
        "url": canonical,
        "areaServed": {
            "@type": "Country",
            "name": "Switzerland"
        },
        "serviceType": "Comparaison d'assurance maladie",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "2847"
        }
    };

    // Données structurées spécifiques selon la page
    const getPageSpecificStructuredData = () => {
        switch (page) {
            case 'quiz':
                return {
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": "Quiz Comparateur Assurance Maladie Suisse",
                    "applicationCategory": "FinanceApplication",
                    "operatingSystem": "Web",
                    "description": "Quiz interactif pour comparer les assurances maladie suisses",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "CHF",
                        "description": "Service gratuit de comparaison"
                    }
                };

            case 'results':
                return {
                    "@context": "https://schema.org",
                    "@type": "SearchResultsPage",
                    "name": "Résultats Comparaison Assurance Maladie",
                    "description": "Résultats personnalisés de comparaison d'assurance maladie en Suisse",
                    "mainEntity": {
                        "@type": "ItemList",
                        "itemListElement": [
                            {
                                "@type": "InsuranceAgency",
                                "name": "CSS Assurance"
                            },
                            {
                                "@type": "InsuranceAgency",
                                "name": "Swica"
                            },
                            {
                                "@type": "InsuranceAgency",
                                "name": "Helsana"
                            }
                        ]
                    }
                };

            default:
                return structuredData || defaultStructuredData;
        }
    };

    // Génération du titre complet
    const fullTitle = title.includes('AssuranceMax.ch')
        ? title
        : `${title} | AssuranceMax.ch`;

    return (
        <Helmet>
            {/* Titre de la page */}
            <title>{fullTitle}</title>

            {/* Métadonnées de base */}
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={canonical} />

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={canonical} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="AssuranceMax.ch" />
            <meta property="og:locale" content="fr_CH" />

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Données structurées */}
            <script type="application/ld+json">
                {JSON.stringify(getPageSpecificStructuredData())}
            </script>

            {/* Robots selon le type de page */}
            {page === 'results' ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : (
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
            )}
        </Helmet>
    );
};

export default SEO;