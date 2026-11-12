// The driver sign-up page, in one language: 'fr' (served at /) or 'en' (at /en/). One screen: a headline, three
// one line and four fields. Design: navetto-ui-kit docs/design-standard; white, with the driver's caution yellow as accent.
// signupUrl: the Apps Script web app the form posts to. Without one, the card is a button to fallbackUrl (the Google Form).
import { ROUTE, PIN } from './logo.mjs';

export function page(lang, { signupUrl, fallbackUrl, site }) {
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

  const send = t('Sign me up', 'Je m’inscris');

  const title = t('Drive with Navetto', 'Conduisez avec Navetto');
  const description = t(
    'Long trips between Québec’s cities and airports, on your hours. Sign up as a Navetto driver in one minute.',
    'De longs trajets entre les villes du Québec et les aéroports, à vos heures. Devenez chauffeur Navetto en une minute.',
  );

  const form = signupUrl
    ? `<form class="card" id="signup" action="${signupUrl}" method="post" novalidate>
      <input type="hidden" name="lang" value="${lang}">
      <div class="hp" aria-hidden="true"><input name="website" tabindex="-1" autocomplete="off"></div>
      <label><span>${t('Full name', 'Nom complet')}</span><input name="name" autocomplete="name" required></label>
      <label><span>${t('Phone', 'Téléphone')}</span><input name="phone" type="tel" autocomplete="tel" required pattern="[0-9 ()+.\-]{10,}"></label>
      <label><span>${t('City', 'Ville')}</span><input name="city" autocomplete="address-level2" required></label>
      <label><span>${t('Car', 'Voiture')}</span><input name="car" placeholder="${t('e.g. Honda CR-V 2020', 'ex. Honda CR-V 2020')}" required></label>
      <p class="error" id="error" role="alert" hidden></p>
      <button class="btn" type="submit">${send}</button>
      <p class="fine">${t('Free, no commitment. We’ll call you back.', 'Gratuit et sans engagement. On vous rappelle.')}</p>
    </form>
    <div class="card done" id="done" hidden tabindex="-1">
      <h2>${t('You’re on the list!', 'Vous êtes sur la liste!')}</h2>
      <p>${t('We’ll call you within a few days.', 'On vous appelle d’ici quelques jours.')}</p>
    </div>`
    : `<div class="card">
      <a class="btn" href="${fallbackUrl}">${send}</a>
      <p class="fine">${t('A one-minute form.', 'Un formulaire d’une minute.')}</p>
    </div>`;

  const script = signupUrl
    ? `<script>
(() => {
  const form = document.getElementById('signup');
  const error = document.getElementById('error');
  const say = (text) => { error.textContent = text; error.hidden = !text; };
  form.addEventListener('input', () => { if (form.classList.contains('tried') && form.checkValidity()) say(''); });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add('tried');
      say(${JSON.stringify(t('Please fill in the fields in red.', 'Remplissez les champs en rouge.'))});
      form.querySelector(':invalid').focus();
      return;
    }
    say('');
    const button = form.querySelector('button');
    button.disabled = true;
    button.textContent = ${JSON.stringify(t('Sending…', 'Envoi…'))};
    try {
      // A Google Apps Script web app answers with a redirect no page can read, so the request is sent "no-cors".
      await fetch(form.action, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(new FormData(form)) });
      form.hidden = true;
      const done = document.getElementById('done');
      done.hidden = false;
      done.focus();
    } catch {
      button.disabled = false;
      button.textContent = ${JSON.stringify(send)};
      say(${JSON.stringify(t('It didn’t go through. Check your connection and try again.', 'L’envoi n’a pas fonctionné. Vérifiez votre connexion et réessayez.'))});
    }
  });
})();
</script>`
    : '';

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
<link href="https://fonts.googleapis.com/css2?family=Overpass:wght@400;800&family=Manrope:wght@800&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
<header class="top">
  <a class="brand" href="${fr ? '/' : '/en/'}" aria-label="Navetto">${mark}<span aria-hidden="true">avetto</span></a>
  <span class="plate">${t('Driver', 'Chauffeur')}</span>
  <a class="lang" href="${other.href}" hreflang="${other.lang}" lang="${other.lang}" aria-label="${other.name}">${other.label}</a>
</header>
<main class="main">
  <h1>${t('Drive the long trips.', 'Conduisez les longs trajets.')}</h1>
  <p class="sub">${t('City to city and to the airports. Your hours, your share shown before you accept.', 'De ville en ville et vers les aéroports. Vos heures, votre part affichée avant d’accepter.')}</p>
  ${form}
</main>
<footer class="foot"><a href="https://navetto.ca">navetto.ca</a> · <a href="mailto:bonjour@navetto.ca">bonjour@navetto.ca</a></footer>
${script}
</body>
</html>
`;
}

// Inlined: one request fewer, nothing to wait for before the page shows.
const css = `
*{box-sizing:border-box}
[hidden]{display:none!important}
body{margin:0;min-height:100vh;min-height:100dvh;display:flex;flex-direction:column;font:400 17px/1.5 Overpass,system-ui,sans-serif;color:#1c2226;background:#fff;-webkit-text-size-adjust:100%}
h1,h2{font-weight:800;line-height:1.05;margin:0}
p{margin:0}
a{color:inherit}
:focus-visible{outline:3px solid #1c2226;outline-offset:2px}
.top{display:flex;align-items:center;gap:10px;width:min(1120px,100% - 40px);margin:0 auto;padding:20px 0}
.brand{display:inline-flex;align-items:center;gap:1px;font:800 24px/1 Manrope,sans-serif;text-decoration:none}
.mark{width:30px;height:30px}
.plate{font-weight:800;font-size:13px;line-height:1;padding:5px 8px 3px;border-radius:6px;background:#f4b400;color:#1c2226}
.lang{margin-left:auto;font-weight:800;font-size:14px;min-width:44px;min-height:44px;display:grid;place-items:center;text-decoration:none;color:#55605a}
.lang:hover{color:#1c2226}
.main{flex:1;width:min(440px,100% - 40px);margin:0 auto;padding:clamp(24px,8vh,88px) 0 56px}
h1{font-size:clamp(40px,9vw,54px)}
h1::after{content:'';display:block;width:56px;height:5px;border-radius:3px;margin:22px 0 0;background:#f4b400}
.sub{margin-top:18px;font-size:18px;color:#55605a}
.card{margin-top:36px;display:grid;gap:16px}
.card label{display:grid;gap:6px}
.card label>span{font-weight:800;font-size:14px}
.card input{width:100%;min-height:54px;padding:14px 16px 12px;font:400 17px/1.2 Overpass,sans-serif;color:#1c2226;border:1.5px solid #cfd5d1;border-radius:12px;background:#fff;transition:border-color .15s}
.card input::placeholder{color:#9aa39e}
.card input:hover{border-color:#9aa39e}
.card input:focus{outline:none;border-color:#1c2226;box-shadow:0 0 0 3px rgba(244,180,0,.55)}
.tried input:invalid{border-color:#b3261e}
.btn{display:flex;align-items:center;justify-content:center;width:100%;min-height:56px;margin-top:8px;padding:0 24px;border:0;border-radius:999px;background:#f4b400;color:#1c2226;font:800 18px/1 Overpass,sans-serif;text-decoration:none;cursor:pointer;transition:background .15s}
.btn:hover{background:#ffc21a}
.btn:disabled{opacity:.6;cursor:progress}
.fine{font-size:14px;color:#6b756f;text-align:center}
.error{color:#b3261e;font-weight:800;font-size:15px}
.done{margin-top:36px;padding:28px;border:1.5px solid #cfd5d1;border-radius:16px;text-align:center}
.done h2{font-size:26px;margin-bottom:6px}
.hp{position:absolute;left:-9999px}
.foot{padding:30px 20px 22px;font-size:14px;text-align:center;color:#6b756f;background:repeating-linear-gradient(90deg,#f4b400 0 32px,transparent 32px 56px) 0 0/100% 3px no-repeat}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
`;
