/**
 * Analytics script injection.
 * - Plausible: set NEXT_PUBLIC_ANALYTICS_DOMAIN (e.g. "thescentpair.com")
 *   and optionally NEXT_PUBLIC_ANALYTICS_SRC for a self-hosted instance.
 * - GTM: set NEXT_PUBLIC_GTM_ID (e.g. "GTM-XXXXXXX")
 */

const ANALYTICS_DOMAIN = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;
const ANALYTICS_SRC =
  process.env.NEXT_PUBLIC_ANALYTICS_SRC ?? "https://plausible.io/js/script.js";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export function AnalyticsScripts() {
  return (
    <>
      {ANALYTICS_DOMAIN ? (
        <script defer data-domain={ANALYTICS_DOMAIN} src={ANALYTICS_SRC} />
      ) : null}

      {GTM_ID ? (
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      ) : null}
    </>
  );
}
