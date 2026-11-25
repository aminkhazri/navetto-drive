// The driver page, in one language: 'fr' (served at /) or 'en' (at /en/). The first screen is a Québec road at dawn,
// edge to edge, with one thing said over it (long trips, done right), one button to the sign-up form and three marks
// of trust. Under it, a phone showing a trip request as the driver app lists it, and the button again. Same look as
// the driver app's sign-up page (navetto-driver-app #178): the driver's caution yellow, ink, Overpass.
import { ROUTE, PIN } from './logo.mjs';
import { phone, phoneCss } from './phone.mjs';

export function page(lang, { formUrl, site }) {
  const fr = lang === 'fr';
  const t = (en, f) => (fr ? f : en);
  const other = fr ? { href: '/en/', label: 'EN', name: 'English', lang: 'en' } : { href: '/', label: 'FR', name: 'Français', lang: 'fr' };
  const url = fr ? `${site}/` : `${site}/en/`;

  const markSvg = (id) => `<svg class="mark" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
    <defs><clipPath id="${id}"><rect width="100" height="100" rx="22"/></clipPath></defs>
    <g clip-path="url(#${id})"><rect width="100" height="100" fill="#0e7c55"/>
    <path d="${ROUTE}" fill="none" stroke="#fff" stroke-width="11.5" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="30" cy="72" r="8" fill="#0e7c55" stroke="#fff" stroke-width="3.5"/>
    <path d="${PIN}" fill="#ff6b4a" stroke="#fff" stroke-width="3.5" stroke-linejoin="round"/>
    <circle cx="70" cy="27.75" r="3.04" fill="#fff"/></g></svg>`;

  const ic = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  };
  const svg = (name, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ic[name]}</svg>`;

  // Three marks of trust: what makes a long trip with Navetto sure, for the driver and the rider.
  const trust = [
    t('Your share, shown before you accept', 'Ta part, affichée avant d’accepter'),
    t('A fixed fare for the rider', 'Un prix fixe pour le client'),
    t('Trips booked ahead', 'Des trajets réservés d’avance'),
  ];
  const check = '<svg class="ck" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

  const title = t('Drive with Navetto', 'Chauffeur Navetto : ton char, tes heures, ta paye');
  const description = t(
    'Long trips between Québec’s cities and airports, on your hours. Become a Navetto driver.',
    'Des longs trajets entre les villes du Québec et les aéroports, à tes heures. Embarque comme chauffeur Navetto.',
  );

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="fr-CA" href="${site}/">
<link rel="alternate" hreflang="en-CA" href="${site}/en/">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site}/share.png">
<meta name="theme-color" content="#1c2226">
<link rel="preload" as="image" href="/scenes/dawn-route-de-la-station-sunrise.webp">
<link rel="icon" type="image/png" sizes="32x32" href="/brand/navetto-favicon-32.png">
<link rel="apple-touch-icon" href="/brand/navetto-mark-192.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Overpass:wght@400;600;800&family=Manrope:wght@800&display=swap" rel="stylesheet">
<style>${css}${phoneCss}</style>
</head>
<body>
<header class="top">
  <a class="brand" href="${fr ? '/' : '/en/'}" aria-label="Navetto">${markSvg('m')}<span aria-hidden="true">avetto</span></a>
  <span class="plate">${t('Driver', 'Chauffeur')}</span>
  <a class="lang" href="${other.href}" hreflang="${other.lang}" lang="${other.lang}" aria-label="${other.name}">${other.label}</a>
</header>
<main>
  <section class="scene">
    <div class="hero">
      <h1><span>${t('Long-distance rides,', 'Les longs trajets,')} </span><span>${t('done right.', 'enfin bien faits.')}</span></h1>
      <div class="go">
        <a class="cta" href="${formUrl}">${t('Become a driver', 'Devenir chauffeur')}${svg('arrow', 'cta-ic')}</a>
        <p class="note">${t('Free to sign up.', 'Inscription gratuite.')}</p>
      </div>
      <ul class="trust">
        ${trust.map((words) => `<li>${check}${words}</li>`).join('\n        ')}
      </ul>
    </div>
  </section>
  <section class="below">
    <div class="more">
      <h2>${t('Qualified (taxi), or not yet?', 'Chauffeur qualifié (taxi), ou pas encore?')}</h2>
      <p>${t('We’ll help you through the SAAQ process, step by step.', 'On t’accompagne dans les démarches à la SAAQ, étape par étape.')}</p>
      <a class="cta" href="${formUrl}">${t('Become a driver', 'Devenir chauffeur')}${svg('arrow', 'cta-ic')}</a>
    </div>
    <div class="visual">
      <div class="lane" aria-hidden="true"></div>
      ${phone(t, markSvg)}
    </div>
  </section>
</main>
<footer class="foot">
  <span>© ${new Date().getFullYear()} Navetto</span>
  <a href="https://navetto.ca">navetto.ca</a>
  <a href="mailto:bonjour@navetto.ca">bonjour@navetto.ca</a>
  <small>${t('Photo: Giorgio Galeotti, CC BY-SA 4.0', 'Photo : Giorgio Galeotti, CC BY-SA 4.0')}</small>
</footer>
</body>
</html>
`;
}

// Inlined: one request, nothing to wait for before the page shows.
const css = `
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;min-height:100vh;min-height:100dvh;display:flex;flex-direction:column;font:400 17px/1.5 Overpass,system-ui,sans-serif;color:#1c2226;background:#fff}
h1,h2{font-weight:800;margin:0}
p,figure,ol,ul{margin:0;padding:0}
a{color:inherit}
:focus-visible{outline:3px solid #1c2226;outline-offset:3px}
main{flex:1}
.top,.hero,.below,.foot{width:min(1180px,100% - 48px);margin:0 auto}

/* The header lies over the photo, in white. */
.top{position:absolute;left:0;right:0;z-index:1;display:flex;align-items:center;gap:10px;padding:22px 0;color:#fff}
.brand{display:inline-flex;align-items:center;gap:1px;font:800 24px/1 Manrope,sans-serif;text-decoration:none}
.mark{width:30px;height:30px}
.plate{font-weight:800;font-size:13px;line-height:1;padding:5px 8px 3px;border-radius:6px;background:#f4b400;color:#1c2226}
.lang{margin-left:auto;font-weight:800;font-size:14px;min-width:44px;min-height:44px;display:grid;place-items:center;text-decoration:none;border-radius:999px}
.lang:hover{background:rgb(255 255 255/.16)}
.top :focus-visible,.scene :focus-visible{outline-color:#fff}

/* The first screen: a Québec road at dawn, edge to edge; darker at the top for the header, at the bottom for the
   words, which sit low over the road. */
.scene{display:flex;min-height:min(100svh,920px);color:#fff;background:linear-gradient(180deg,rgb(10 14 16/.55) 0%,rgb(10 14 16/.15) 35%,rgb(10 14 16/.4) 60%,rgb(10 14 16/.92) 100%),#817673 url(/scenes/dawn-route-de-la-station-sunrise.webp) center 60%/cover}
.hero{display:flex;flex-direction:column;justify-content:flex-end;padding:120px 0 48px}
h1{font-size:clamp(46px,7.6vw,104px);line-height:.98;letter-spacing:-.02em;text-shadow:0 2px 30px rgb(0 0 0/.35)}
h1 span{display:block}
h1 span:last-child{color:#f4b400}
.go{display:flex;flex-wrap:wrap;align-items:center;gap:16px 24px;margin-top:32px}
.cta{display:inline-flex;align-items:center;gap:12px;min-height:60px;padding:0 30px 0 32px;border-radius:999px;background:#f4b400;box-shadow:0 4px 0 #b08200;color:#1c2226;font:800 20px/1 Overpass,sans-serif;text-decoration:none;transition:transform .15s,box-shadow .15s,gap .2s}
.cta:hover{transform:translateY(-2px);box-shadow:0 6px 0 #b08200;gap:16px}
.cta:active{transform:translateY(2px);box-shadow:0 2px 0 #b08200}
.cta-ic{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.note{font-weight:600;font-size:16px;color:#e8ebe6}
.trust{list-style:none;display:flex;flex-wrap:wrap;gap:12px 24px;margin-top:48px;padding-top:24px;border-top:1px solid rgb(255 255 255/.25)}
.trust li{display:flex;align-items:center;gap:8px;font-weight:600;font-size:16px}
.ck{flex:none;width:18px;height:18px;fill:none;stroke:#f4b400;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}

/* Under it: the qualification line and the button again, beside the driver app's Requests screen in a phone. */
.below{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;padding:64px 0}
.more h2{font-size:clamp(28px,3vw,40px);line-height:1.1}
.more p{margin-top:12px;font-size:19px;color:#55605a}
.more .cta{margin-top:28px}

.foot{display:flex;flex-wrap:wrap;gap:8px 24px;padding:24px 0 28px;border-top:1.5px solid #eceeeb;font-size:14px;color:#6b756f}
.foot a{text-decoration:none}
.foot a:hover{color:#1c2226;text-decoration:underline;text-decoration-color:#f4b400;text-decoration-thickness:2px}
.foot span{margin-right:auto}
.foot small{font-size:12px}

@media (max-width:960px){
  .below{grid-template-columns:1fr;gap:44px;padding:48px 0}
}
@media (max-width:560px){
  .top,.hero,.below,.foot{width:min(1180px,100% - 40px)}
  .cta{width:100%;justify-content:center}
  .trust{flex-direction:column}
  .visual{margin:0 -20px;border-radius:0}
  .foot span{width:100%}
}
/* Without motion: the request as it stands, before it's accepted; the road still. */
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
`;
