import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import heroCover from '../assets/hero-1-desktop.jpg';
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, OG_LOCALE, SITE_NAME, TWITTER_HANDLE, toAbsoluteUrl } from '../utils/seo';

type JsonLdSchema = Record<string, unknown>;

type SeoProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  noIndex?: boolean;
  jsonLd?: JsonLdSchema | JsonLdSchema[];
};

const Seo = ({
  title,
  description = DEFAULT_DESCRIPTION,
  image = heroCover,
  url,
  type = 'website',
  publishedTime,
  noIndex,
  jsonLd,
}: SeoProps) => {
  const location = useLocation();
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const resolvedImage = toAbsoluteUrl(image);
  const resolvedUrl = toAbsoluteUrl(url ?? `${location.pathname}${location.search}`);
  const twitterCard = resolvedImage ? 'summary_large_image' : 'summary';
  const jsonLdScripts = (Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []).filter(Boolean);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={OG_LOCALE} />
      {resolvedUrl && <meta property="og:url" content={resolvedUrl} />}
      {resolvedImage && <meta property="og:image" content={resolvedImage} />}

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      {resolvedImage && <meta name="twitter:image" content={resolvedImage} />}

      {resolvedUrl && <link rel="canonical" href={resolvedUrl} />}
      {type === 'article' && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {jsonLdScripts.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
