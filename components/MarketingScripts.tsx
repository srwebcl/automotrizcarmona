import Script from 'next/script';

export interface MarketingScriptData {
    type: string;
    value: string;
    placement: string;
}

interface Props {
    scripts: MarketingScriptData[];
    placement: 'head' | 'body_start' | 'body_end';
}

/**
 * Injects marketing scripts (GTM, GA4, Hotjar, Meta Pixel, Clarity, Google Ads, custom)
 * using next/script with the correct loading strategy per tool type.
 */
export default function MarketingScripts({ scripts, placement }: Props) {
    // For predefined tools, their placement is handled here (not by the `placement` DB field)
    const filtered = scripts.filter(s => {
        if (s.type === 'custom') {
            return s.placement === placement;
        }
        // Predefined tools always inject in 'head' placement slot
        return placement === 'head';
    });

    if (filtered.length === 0) return null;

    return (
        <>
            {filtered.map((script, idx) => {
                const key = `mkt-${script.type}-${idx}`;

                switch (script.type) {

                    // ── Google Tag Manager ─────────────────────────────────────────
                    case 'gtm':
                        return (
                            <Script key={key} id={key} strategy="afterInteractive">
                                {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${script.value}');`}
                            </Script>
                        );

                    // ── Google Analytics 4 ─────────────────────────────────────────
                    case 'ga4':
                        return (
                            <>
                                <Script
                                    key={`${key}-src`}
                                    src={`https://www.googletagmanager.com/gtag/js?id=${script.value}`}
                                    strategy="afterInteractive"
                                />
                                <Script key={key} id={key} strategy="afterInteractive">
                                    {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${script.value}');`}
                                </Script>
                            </>
                        );

                    // ── Google Ads ─────────────────────────────────────────────────
                    case 'google_ads':
                        return (
                            <>
                                <Script
                                    key={`${key}-src`}
                                    src={`https://www.googletagmanager.com/gtag/js?id=${script.value}`}
                                    strategy="afterInteractive"
                                />
                                <Script key={key} id={key} strategy="afterInteractive">
                                    {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${script.value}');`}
                                </Script>
                            </>
                        );

                    // ── Meta Pixel (Facebook/Instagram) ────────────────────────────
                    case 'meta_pixel':
                        return (
                            <Script key={key} id={key} strategy="lazyOnload">
                                {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${script.value}');
fbq('track', 'PageView');`}
                            </Script>
                        );

                    // ── Hotjar ─────────────────────────────────────────────────────
                    case 'hotjar':
                        return (
                            <Script key={key} id={key} strategy="lazyOnload">
                                {`(function(h,o,t,j,a,r){
h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
h._hjSettings={hjid:${script.value},hjsv:6};
a=o.getElementsByTagName('head')[0];
r=o.createElement('script');r.async=1;
r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
                            </Script>
                        );

                    // ── Microsoft Clarity ──────────────────────────────────────────
                    case 'clarity':
                        return (
                            <Script key={key} id={key} strategy="lazyOnload">
                                {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${script.value}");`}
                            </Script>
                        );

                    // ── Custom HTML Script ─────────────────────────────────────────
                    case 'custom':
                        // Strip <script> tags if present and use dangerouslySetInnerHTML
                        const rawCode = script.value
                            .replace(/^<script[^>]*>/i, '')
                            .replace(/<\/script>$/i, '')
                            .trim();
                        return (
                            <Script key={key} id={key} strategy="lazyOnload">
                                {rawCode}
                            </Script>
                        );

                    default:
                        return null;
                }
            })}
        </>
    );
}
