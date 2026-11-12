// The driver sign-up page, in one language: 'fr' (served at /) or 'en' (at /en/). One screen: a headline, three
// facts and the form. Design: navetto-ui-kit docs/design-standard, the driver's caution yellow with ink.
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

  const facts = [
    t('City to city and to the airports', 'De ville en ville et vers les aéroports'),
    t('Your hours, your share shown before you accept', 'Vos heures, votre part affichée avant d’accepter'),
    t('Free to sign up, no commitment', 'Inscription gratuite, sans engagement'),
  ];
  const sizes = [
    ['Sedan', t('Sedan', 'Berline')],
    ['SUV', t('SUV', 'VUS')],
    ['Minivan', t('Minivan', 'Fourgonnette')],
  ];
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
      <div class="row">
        <label><span>${t('First name', 'Prénom')}</span><input name="firstName" autocomplete="given-name" required></label>
        <label><span>${t('Last name', 'Nom')}</span><input name="lastName" autocomplete="family-name" required></label>
      </div>
      <label><span>${t('Phone', 'Téléphone')}</span><input name="phone" type="tel" autocomplete="tel" required pattern="[0-9 ()+.\\-]{10,}"></label>
      <label><span>${t('Email', 'Courriel')}</span><input name="email" type="email" autocomplete="email" required></label>
      <div class="row">
        <label><span>${t('City', 'Ville')}</span><input name="city" autocomplete="address-level2" required></label>
        <label><span>${t('Car', 'Voiture')}</span><input name="car" placeholder="Toyota RAV4" required></label>
      </div>
      <fieldset class="seg"><legend>${t('Car size', 'Taille de la voiture')}</legend>
        ${sizes.map(([v, l], i) => `<label><input type="radio" name="size" value="${v}"${i === 0 ? ' checked' : ''}><span>${l}</span></label>`).join('')}
      </fieldset>
      <p class="error" id="error" role="alert" hidden></p>
      <button class="btn" type="submit">${send}</button>
      <p class="fine">${t('We’ll call you to get you on the road. We use your details for that only.', 'On vous appelle pour vous mettre sur la route. Vos coordonnées servent seulement à ça.')}</p>
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
<meta name="theme-color" content="#f4b400">
<link rel="icon" type="image/png" sizes="32x32" href="/brand/navetto-favicon-32.png">
<link rel="apple-touch-icon" href="/brand/navetto-mark-192.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Overpass:wght@400;800&family=Manrope:wght@800&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
<header class="wrap top">
  <a class="brand" href="${fr ? '/' : '/en/'}" aria-label="Navetto">${mark}<span aria-hidden="true">avetto</span></a>
  <span class="plate">${t('Driver', 'Chauffeur')}</span>
  <a class="lang" href="${other.href}" hreflang="${other.lang}" lang="${other.lang}" aria-label="${other.name}">${other.label}</a>
</header>
<main class="wrap main">
  <div class="pitch">
    <h1>${t('Drive the long trips.', 'Conduisez les longs trajets.')}</h1>
    <ul>${facts.map((f) => `<li>${f}</li>`).join('')}</ul>
  </div>
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
body{margin:0;min-height:100vh;min-height:100dvh;display:flex;flex-direction:column;font:400 17px/1.45 Overpass,system-ui,sans-serif;color:#1c2226;background:#f4b400;-webkit-text-size-adjust:100%}
h1,h2{font-weight:800;line-height:1.08;margin:0}
p{margin:0}
a{color:inherit}
:focus-visible{outline:3px solid #1c2226;outline-offset:2px}
.wrap{width:min(1040px,100% - 40px);margin:0 auto}
.top{display:flex;align-items:center;gap:10px;padding:16px 0}
.brand{display:inline-flex;align-items:center;gap:1px;font:800 24px/1 Manrope,sans-serif;text-decoration:none}
.mark{width:30px;height:30px}
.plate{font-weight:800;font-size:13px;line-height:1;padding:5px 8px 3px;border-radius:6px;background:#1c2226;color:#f4b400}
.lang{margin-left:auto;font-weight:800;font-size:15px;min-width:44px;min-height:44px;display:grid;place-items:center;text-decoration:none}
.main{flex:1;display:grid;grid-template-columns:1fr minmax(0,440px);gap:48px;align-items:center;padding:24px 0 48px}
.pitch h1{font-size:clamp(34px,6vw,60px);max-width:12ch}
.pitch ul{list-style:none;padding:0;margin:20px 0 0;display:grid;gap:8px;font-size:18px}
.pitch li{position:relative;padding-left:28px}
.pitch li::before{content:'';position:absolute;left:0;top:.62em;width:16px;height:4px;border-radius:2px;background:#1c2226}
.card{background:#fff;border:3px solid #1c2226;border-radius:18px;padding:22px;display:grid;gap:12px}
.card label{display:grid;gap:4px;min-width:0}
.card label>span,.seg legend{font-weight:800;font-size:14px;padding:0}
.card input:not([type=radio]){width:100%;min-height:48px;padding:11px 12px 9px;font:400 17px/1.2 Overpass,sans-serif;color:#1c2226;border:2px solid #8e9893;border-radius:10px;background:#fff}
.card input:focus{outline:none;border-color:#1c2226;box-shadow:0 0 0 3px #f4b400}
.tried input:invalid{border-color:#b3261e!important}
.row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.seg{border:0;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.seg legend{margin-bottom:4px}
.seg label{position:relative;display:block}
.seg input{position:absolute;opacity:0;inset:0;margin:0}
.seg span{display:grid;place-items:center;min-height:44px;padding:4px;border:2px solid #8e9893;border-radius:10px;font-weight:800;font-size:15px;cursor:pointer;text-align:center}
.seg input:checked+span{border-color:#1c2226;background:#1c2226;color:#fff}
.seg input:focus-visible+span{outline:3px solid #1c2226;outline-offset:2px}
.btn{display:flex;align-items:center;justify-content:center;min-height:54px;padding:0 24px;border:0;border-radius:999px;background:#1c2226;color:#fff;font:800 18px/1 Overpass,sans-serif;text-decoration:none;cursor:pointer;width:100%}
.btn:disabled{opacity:.6;cursor:progress}
.fine{font-size:14px;color:#55605a;text-align:center}
.error{color:#b3261e;font-weight:800;font-size:15px}
.done{text-align:center;padding:40px 22px}
.done h2{font-size:28px;margin-bottom:6px}
.hp{position:absolute;left:-9999px}
.foot{padding:34px 20px 20px;font-size:14px;text-align:center;color:#fff;background:#1c2226 repeating-linear-gradient(90deg,#f4b400 0 40px,transparent 40px 70px) 0 14px/100% 4px no-repeat}
.foot a{color:#fff}
@media (max-width:820px){.main{grid-template-columns:1fr;gap:20px;padding:4px 0 28px}.pitch ul{margin-top:14px;font-size:16px}}
@media (max-width:420px){.row{grid-template-columns:1fr 1fr;gap:10px}.card{padding:16px}}
`;
