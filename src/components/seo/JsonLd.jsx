import siteConfig from '../../data/site-config.json';
import socialLinks from '../../data/social-links.json';

export default function JsonLd() {
  const sameAsUrls = socialLinks
    .map((s) => s.url)
    .filter((url) => !url.startsWith('mailto:'));

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      addressCountry: 'India'
    },
    email: siteConfig.email,
    sameAs: sameAsUrls,
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'The University of Texas at Austin - McCombs School of Business'
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Great Lakes Executive Learning'
      },
      {
        '@type': 'EducationalOrganization',
        name: 'University of Calcutta'
      }
    ],
    knowsAbout: [
      'Data Science',
      'Machine Learning',
      'Predictive Modeling',
      'Econometrics',
      'Statistical Inference',
      'Supervised and Unsupervised Learning',
      'XGBoost',
      'Business Intelligence',
      'Power BI',
      'Tableau',
      'SQL',
      'Python',
      'FastAPI',
      'Generative AI',
      'Prompt Engineering'
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
