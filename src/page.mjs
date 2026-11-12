// The driver page, in one language: 'fr' (served at /) or 'en' (at /en/). One screen: the pitch and the button to the
// sign-up form, beside a phone showing a trip request as the driver app lists it. Design: navetto-ui-kit
// docs/design-standard; white, the driver's caution yellow as accent, ink text, Overpass, no shadows.
import { ROUTE, PIN } from './logo.mjs';

export function page(lang, { formUrl, site }) {
  const fr = lang === 'fr';
  const t = (en, f) => (fr ? f : en);
  const other = fr ? { href: '/en/', label: 'EN', name: 'English', lang: 'en' } : { href: '/', label: 'FR', name: 'Français', lang: 'fr' };
  const url = fr ? `${site}/` : `${site}/en/`;

  const mark = `<svg class="mark" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
    <defs><clipPath id="m"><rect width="100" height="100" rx="22"/></clipPath></defs>
    <g clip-path="url(#m)"><rect width="100" height="100" fill="#0e7c55"/>
    <path d="${ROUTE}" fill="none" stroke="#fff" stroke-width="11.5" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="30" cy="72" r="8" fill="#0e7c55" stroke="#fff" stroke-width="3.5"/>
    <path d="${PIN}" fill="#ff6b4a" stroke="#fff" stroke-width="3.5" stroke-linejoin="round"/>
    <circle cx="70" cy="27.75" r="3.04" fill="#fff"/></g></svg>`;

  const ic = {
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    eye: '<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  };
  const svg = (name, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ic[name]}</svg>`;

  const points = [
    ['clock', t('Your hours', 'Tes heures'), t('Drive when it suits you.', 'Tu conduis quand ça te convient.')],
    ['eye', t('Your share, up front', 'Ta part, d’avance'), t('Shown before you accept.', 'Affichée avant d’accepter.')],
    ['pin', t('Close to home', 'Proche de chez toi'), t('Trips start in your area.', 'Les trajets partent de ta région.')],
  ];

  const title = t('Drive with Navetto', 'Chauffeur Navetto : ton char, tes heures, ta paye');
  const description = t(
    'Long trips between Québec’s cities and airports, on your hours. Become a Navetto driver.',
    'Des longs trajets entre les villes du Québec et les aéroports, à tes heures. Embarque comme chauffeur Navetto.',
  );

  // The phone: a trip request as the driver app lists it. Decorative; the trip is an example.
  const phone = `<figure class="phone" aria-hidden="true">
    <div class="screen">
      <div class="bar"><span class="bar-title">${t('Requests', 'Demandes')}</span><span class="dot"></span></div>
      <div class="offer">
        <div class="when">${t('Fri. Nov. 20 · 7:30 a.m.', 'ven. 20 nov. · 7 h 30')}</div>
        <ol class="route">
          <li><b>Rimouski</b></li>
          <li><b>${t('Québec City airport', 'Aéroport de Québec')}</b><small>YQB</small></li>
        </ol>
        <div class="facts"><span>312 km</span><span>3 h 10</span><span>${t('2 riders', '2 passagers')}</span></div>
        <div class="share"><span>${t('Your share', 'Ta part')}</span><b>${t('shown here', 'affichée ici')}</b></div>
        <div class="acts"><span class="no">${t('Decline', 'Refuser')}</span><span class="yes">${t('Accept', 'Accepter')}</span></div>
      </div>
      <div class="offer offer-2">
        <div class="when">${t('Sat. Nov. 21 · 2 p.m.', 'sam. 21 nov. · 14 h')}</div>
        <ol class="route"><li><b>Rimouski</b></li><li><b>Montréal</b></li></ol>
      </div>
    </div>
  </figure>`;

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
<meta name="theme-color" content="#ffffff">
<link rel="icon" type="image/png" sizes="32x32" href="/brand/navetto-favicon-32.png">
<link rel="apple-touch-icon" href="/brand/navetto-mark-192.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Overpass:wght@400;600;800&family=Manrope:wght@800&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
<header class="top">
  <a class="brand" href="${fr ? '/' : '/en/'}" aria-label="Navetto">${mark}<span aria-hidden="true">avetto</span></a>
  <span class="plate">${t('Driver', 'Chauffeur')}</span>
  <a class="lang" href="${other.href}" hreflang="${other.lang}" lang="${other.lang}" aria-label="${other.name}">${other.label}</a>
</header>
<main class="hero">
  <div class="pitch">
    <p class="eyebrow"><span class="live"></span>${t('Now recruiting across Québec', 'On recrute partout au Québec')}</p>
    <h1>${t('Your car.<br>Your hours.<br>Your pay.', 'Ton char.<br>Tes heures.<br>Ta paye.')}</h1>
    <p class="sub">${t(
      'Private rides from city to city and to the airports. Riders book and pay in the app; you drive.',
      'Des trajets privés de ville en ville et vers les aéroports. Les passagers réservent et paient dans l’app; toi, tu conduis.',
    )}</p>
    <a class="cta" href="${formUrl}">${t('Become a driver', 'Embarque avec nous')}${svg('arrow', 'cta-ic')}</a>
    <ul class="points">
      ${points.map(([i, h, p]) => `<li>${svg(i)}<div><b>${h}</b><span>${p}</span></div></li>`).join('\n      ')}
    </ul>
  </div>
  <div class="visual">
    <div class="lane" aria-hidden="true"></div>
    ${phone}
  </div>
</main>
<footer class="foot">
  <span>© ${new Date().getFullYear()} Navetto</span>
  <a href="https://navetto.ca">navetto.ca</a>
  <a href="mailto:bonjour@navetto.ca">bonjour@navetto.ca</a>
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
h1{font-weight:800;line-height:1;margin:0}
p,figure,ol,ul{margin:0;padding:0}
a{color:inherit}
:focus-visible{outline:3px solid #1c2226;outline-offset:3px}
.top,.hero,.foot{width:min(1180px,100% - 48px);margin:0 auto}
.top{display:flex;align-items:center;gap:10px;padding:22px 0}
.brand{display:inline-flex;align-items:center;gap:1px;font:800 24px/1 Manrope,sans-serif;text-decoration:none}
.mark{width:30px;height:30px}
.plate{font-weight:800;font-size:13px;line-height:1;padding:5px 8px 3px;border-radius:6px;background:#f4b400;color:#1c2226}
.lang{margin-left:auto;font-weight:800;font-size:14px;min-width:44px;min-height:44px;display:grid;place-items:center;text-decoration:none;border-radius:999px;color:#55605a}
.lang:hover{color:#1c2226;background:#f2f4f1}

.hero{flex:1;display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center;padding:32px 0 64px}
.eyebrow{display:inline-flex;align-items:center;gap:10px;font-weight:600;font-size:15px;color:#55605a;padding:7px 14px 5px 12px;border:1.5px solid #e3e7e4;border-radius:999px}
.live{width:8px;height:8px;border-radius:50%;background:#0e7c55}
h1{font-size:clamp(42px,5.6vw,68px);line-height:1.04;margin-top:26px}
.sub{font-size:clamp(18px,1.6vw,21px);color:#55605a;max-width:30em;margin-top:24px}
.cta{display:inline-flex;align-items:center;gap:12px;margin-top:36px;min-height:60px;padding:0 30px 0 32px;border-radius:999px;background:#f4b400;color:#1c2226;font:800 19px/1 Overpass,sans-serif;text-decoration:none;transition:background .2s,gap .2s}
.cta:hover{background:#ffc21a;gap:16px}
.cta-ic{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.points{list-style:none;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:52px;padding-top:28px;border-top:1.5px solid #eceeeb}
.points li{display:grid;gap:10px;align-content:start}
.points b{display:block;font-weight:800;font-size:16px}
.points span{display:block;font-size:15px;color:#6b756f;line-height:1.4}
.ic{width:22px;height:22px;fill:none;stroke:#1c2226;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}

/* The visual: a soft panel, the road's centre line running down it, the phone on top. */
.visual{position:relative;display:grid;place-items:center;min-height:620px;border-radius:32px;background:#f4f5f2;overflow:hidden}
.lane{position:absolute;top:0;bottom:0;left:50%;width:6px;margin-left:-3px;background:repeating-linear-gradient(180deg,#f4b400 0 46px,transparent 46px 82px);animation:drive 1.6s linear infinite}
@keyframes drive{to{background-position:0 82px}}
.phone{position:relative;width:300px;padding:11px;border-radius:46px;background:#1c2226}
.screen{border-radius:36px;background:#fff;padding:24px 16px 26px;display:grid;align-content:start;gap:12px}
.bar{display:flex;align-items:center;justify-content:space-between;padding:4px 6px 8px}
.bar-title{font-weight:800;font-size:22px}
.dot{width:10px;height:10px;border-radius:50%;background:#f4b400}
.offer{border:1.5px solid #e3e7e4;border-radius:20px;padding:16px;display:grid;gap:12px;animation:rise .7s cubic-bezier(.2,.7,.2,1) both .2s}
.offer-2{opacity:.5;animation-name:rise2;animation-delay:.35s}
@keyframes rise{from{opacity:0;transform:translateY(14px)}}
@keyframes rise2{from{opacity:0;transform:translateY(14px)}to{opacity:.5}}
.when{font-weight:600;font-size:13px;color:#6b756f}
.route{list-style:none;display:grid;gap:10px;position:relative;padding-left:22px}
.route::before{content:'';position:absolute;left:5px;top:8px;bottom:8px;width:2px;background:#1c2226}
.route li{position:relative;display:flex;align-items:baseline;justify-content:space-between;gap:8px;font-size:16px;line-height:1.2}
.route li::before{content:'';position:absolute;left:-22px;top:2px;width:12px;height:12px;border-radius:50%;background:#fff;border:2.5px solid #1c2226}
.route li:last-child::before{background:#1c2226}
.route b{font-weight:800}
.route small{font-size:12px;font-weight:600;color:#6b756f}
.facts{display:flex;flex-wrap:wrap;gap:6px}
.facts span{font-weight:600;font-size:12.5px;padding:4px 9px 2px;border-radius:999px;background:#f2f4f1}
.share{display:flex;align-items:center;justify-content:space-between;padding:10px 12px 8px;border-radius:12px;background:#fff4cc;font-size:13px}
.share b{font-weight:800}
.acts{display:grid;grid-template-columns:1fr 1.4fr;gap:8px}
.acts span{display:grid;place-items:center;min-height:42px;border-radius:999px;font-weight:800;font-size:14px}
.no{border:1.5px solid #cfd5d1}
.yes{background:#f4b400}

.foot{display:flex;flex-wrap:wrap;gap:8px 24px;padding:24px 0 28px;border-top:1.5px solid #eceeeb;font-size:14px;color:#6b756f}
.foot a{text-decoration:none}
.foot a:hover{color:#1c2226;text-decoration:underline;text-decoration-color:#f4b400;text-decoration-thickness:2px}
.foot span{margin-right:auto}

@media (max-width:960px){
  .hero{grid-template-columns:1fr;gap:44px;padding:16px 0 48px}
  .visual{min-height:560px;border-radius:28px}
}
@media (max-width:560px){
  .top,.hero,.foot{width:min(1180px,100% - 40px)}
  h1{margin-top:22px}
  .cta{width:100%;justify-content:center}
  .points{grid-template-columns:1fr;gap:18px;margin-top:40px}
  .points li{grid-template-columns:22px 1fr;gap:14px}
  .visual{min-height:540px;margin:0 -20px;border-radius:0}
  .phone{transform:scale(.92)}
  .foot span{width:100%}
}
@media (prefers-reduced-motion:reduce){*,*::before{animation:none!important;transition:none!important}}
`;
