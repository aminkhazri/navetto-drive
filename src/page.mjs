// The driver sign-up page, in one language. `lang` is 'fr' (served at /) or 'en' (at /en/).
// Words: t('English', 'Français'). Design: navetto-ui-kit docs/design-standard, the driver's caution yellow.
import { ROUTE, PIN } from './logo.mjs';

export function page(lang, { signupUrl, site }) {
  const fr = lang === 'fr';
  const t = (en, f) => (fr ? f : en);
  const other = fr ? { href: '/en/', label: 'English', lang: 'en' } : { href: '/', label: 'Français', lang: 'fr' };
  const url = fr ? `${site}/` : `${site}/en/`;

  const mark = (id) => `<svg class="mark" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
    <defs><clipPath id="${id}"><rect width="100" height="100" rx="22"/></clipPath></defs>
    <g clip-path="url(#${id})"><rect width="100" height="100" fill="#0e7c55"/>
    <path d="${ROUTE}" fill="none" stroke="#fff" stroke-width="11.5" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="30" cy="72" r="8" fill="#0e7c55" stroke="#fff" stroke-width="3.5"/>
    <path d="${PIN}" fill="#ff6b4a" stroke="#fff" stroke-width="3.5" stroke-linejoin="round"/>
    <circle cx="70" cy="27.75" r="3.04" fill="#fff"/></g></svg>`;
  const brand = (id) => `<a class="brand" href="${fr ? '/' : '/en/'}" aria-label="Navetto">${mark(id)}<span aria-hidden="true">avetto</span></a>`;

  const icon = {
    road: '<path d="M8 21 11 3M16 21 13 3M12 6v2M12 11v2M12 16v2"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    eye: '<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    wallet: '<path d="M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zm0 0V6a2 2 0 0 1 2-2h11"/><circle cx="16.5" cy="13.5" r="1.2"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    shield: '<path d="M12 3 4.5 6v6c0 4.6 3.2 7.9 7.5 9 4.3-1.1 7.5-4.4 7.5-9V6L12 3z"/><path d="m8.8 12 2.2 2.2 4.2-4.4"/>',
  };
  const svg = (name) => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${icon[name]}</svg>`;

  const reasons = [
    ['road', t('Long trips, better fares', 'De longs trajets, de meilleures courses'),
      t('City to city and to the airports. No short hops around town.', 'De ville en ville et vers les aéroports. Pas d’allers-retours en ville.')],
    ['clock', t('Your schedule', 'Votre horaire'),
      t('Choose your hours, your days off and the longest trip you’ll take.', 'Choisissez vos heures, vos congés et la plus longue distance que vous acceptez.')],
    ['eye', t('Your share, before you accept', 'Votre part, avant d’accepter'),
      t('Every request shows what you earn. Decline what doesn’t suit you.', 'Chaque demande affiche ce que vous gagnez. Refusez ce qui ne vous convient pas.')],
    ['wallet', t('Paid your way', 'Payé à votre façon'),
      t('Weekly or monthly, or right away with instant withdrawal. Your tips are yours.', 'Chaque semaine ou chaque mois, ou tout de suite avec le retrait instantané. Vos pourboires sont à vous.')],
    ['pin', t('Trips that start near home', 'Des trajets qui partent près de chez vous'),
      t('Requests come from around your home base, within the radius you set.', 'Les demandes partent autour de votre port d’attache, dans le rayon que vous choisissez.')],
    ['shield', t('Built here', 'Une entreprise d’ici'),
      t('A Québec company, made for drivers in Québec’s regions.', 'Une entreprise québécoise, pensée pour les chauffeurs des régions.')],
  ];

  const steps = [
    [t('Sign up', 'Inscrivez-vous'), t('One minute, on this page. No commitment.', 'Une minute, sur cette page. Sans engagement.')],
    [t('We call you', 'On vous appelle'), t('We answer your questions and walk you through your papers.', 'On répond à vos questions et on vous guide pour vos documents.')],
    [t('Take the road', 'Prenez la route'), t('Once you’re approved, requests near you arrive in the Navetto driver app.', 'Une fois approuvé, les demandes près de chez vous arrivent dans l’app Navetto chauffeur.')],
  ];

  const needs = [
    t('A class 5 licence (or higher), held for at least 12 months', 'Un permis classe 5 (ou plus), depuis au moins 12 mois'),
    t('A car in good shape, registered and inspected', 'Une voiture en bon état, immatriculée et inspectée'),
    t('The right to work in Canada', 'Le droit de travailler au Canada'),
    t('A clean criminal record check', 'Une vérification des antécédents judiciaires'),
    t('Understanding and reading French', 'Comprendre et lire le français'),
  ];

  const faq = [
    [t('Does it cost anything to sign up?', 'L’inscription coûte-t-elle quelque chose?'),
      t('No. Signing up is free and doesn’t commit you to anything.', 'Non. L’inscription est gratuite et ne vous engage à rien.')],
    [t('Is it a job with set hours?', 'Est-ce un emploi avec un horaire fixe?'),
      t('No. You drive as an independent driver, when you want. You accept only the trips that suit you.', 'Non. Vous conduisez comme chauffeur autonome, quand vous le voulez. Vous acceptez seulement les trajets qui vous conviennent.')],
    [t('I don’t have commercial insurance or the training yet.', 'Je n’ai pas encore l’assurance commerciale ni la formation.')],
    [t('What car do I need?', 'Quelle voiture me faut-il?'),
      t('A sedan, an SUV or a minivan in good shape. Trips ask for a standard or a large vehicle; you get the ones your car fits.', 'Une berline, un VUS ou une fourgonnette en bon état. Chaque trajet demande un véhicule standard ou grand; vous recevez ceux qui conviennent à votre voiture.')],
  ];
  faq[2].push(t('Sign up anyway: we’ll tell you exactly what’s needed and how to get it.', 'Inscrivez-vous quand même : on vous dira exactement ce qu’il faut et comment l’obtenir.'));

  const sizes = [
    ['Sedan', t('Sedan or compact', 'Berline ou compacte'), t('4 riders', '4 passagers')],
    ['SUV', t('SUV or wagon', 'VUS ou familiale'), t('Large trunk', 'Grand coffre')],
    ['Minivan', t('Minivan', 'Fourgonnette'), t('6 riders or more', '6 passagers et plus')],
  ];
  const cities = ['Montréal', 'Québec', 'Laval', 'Longueuil', 'Gatineau', 'Sherbrooke', 'Trois-Rivières', 'Saguenay',
    'Lévis', 'Drummondville', 'Saint-Jérôme', 'Granby', 'Saint-Hyacinthe', 'Rimouski', 'Rivière-du-Loup', 'Victoriaville',
    'Joliette', 'Shawinigan', 'Rouyn-Noranda', 'Sept-Îles', 'Baie-Comeau', 'Alma', 'Val-d’Or', 'Ottawa'];

  const title = t('Drive with Navetto: long trips, your schedule', 'Conduisez avec Navetto : de longs trajets, votre horaire');
  const description = t(
    'Become a Navetto driver. Private long-distance trips between Québec’s cities and the airports, your hours, your share shown before you accept. Sign up in one minute.',
    'Devenez chauffeur Navetto. Des trajets privés longue distance entre les villes du Québec et les aéroports, à vos heures, votre part affichée avant d’accepter. Inscription en une minute.',
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
<link rel="alternate" hreflang="x-default" href="${site}/">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site}/share.png">
<meta property="og:locale" content="${fr ? 'fr_CA' : 'en_CA'}">
<meta name="theme-color" content="#1c2226">
<link rel="icon" type="image/png" sizes="32x32" href="/brand/navetto-favicon-32.png">
<link rel="apple-touch-icon" href="/brand/navetto-mark-192.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Overpass:wght@400;600;800&family=Manrope:wght@800&display=swap" rel="stylesheet">
<link rel="preload" as="image" href="/road.webp">
<link rel="stylesheet" href="/site.css">
</head>
<body>
<header class="top">
  <div class="wrap top-in">
    ${brand('m1')}<span class="plate">${t('Driver', 'Chauffeur')}</span>
    <nav class="top-nav">
      <a href="#how">${t('How it works', 'Comment ça marche')}</a>
      <a href="${other.href}" hreflang="${other.lang}" lang="${other.lang}">${other.label}</a>
      <a class="btn btn-sm" href="#join">${t('Sign up', 'Je m’inscris')}</a>
    </nav>
  </div>
</header>

<main>
<section class="hero">
  <div class="hero-photo" role="img" aria-label="${t('A country road in Québec in the fall', 'Un rang du Québec à l’automne')}"></div>
  <div class="wrap hero-in">
    <p class="kicker">${t('Now recruiting drivers in Québec', 'On recrute des chauffeurs au Québec')}</p>
    <h1>${t('Drive the long trips.<br>On your schedule.', 'Conduisez les longs trajets.<br>À votre horaire.')}</h1>
    <p class="lead">${t(
      'Navetto connects Québec’s cities and airports with private, door-to-door rides. Riders book and pay in the app; each trip goes to a driver nearby whose car fits.',
      'Navetto relie les villes du Québec et les aéroports en voiture privée, de porte à porte. Les passagers réservent et paient dans l’app; chaque trajet est offert à un chauffeur de la région dont la voiture convient.',
    )}</p>
    <div class="hero-cta">
      <a class="btn btn-lg" href="#join">${t('Sign up in 1 minute', 'Je m’inscris en 1 minute')}</a>
      <a class="btn btn-lg btn-ghost" href="#how">${t('How it works', 'Comment ça marche')}</a>
    </div>
  </div>
  <div class="road" aria-hidden="true"><span></span></div>
</section>

<section class="band" aria-labelledby="why-h">
  <div class="wrap">
    <h2 id="why-h">${t('Why drive with Navetto', 'Pourquoi conduire avec Navetto')}</h2>
    <ul class="reasons">
      ${reasons.map(([i, h, p]) => `<li>${svg(i)}<h3>${h}</h3><p>${p}</p></li>`).join('\n      ')}
    </ul>
  </div>
</section>

<section class="band band-ink" id="how" aria-labelledby="how-h">
  <div class="wrap">
    <h2 id="how-h">${t('How it works', 'Comment ça marche')}</h2>
    <ol class="steps">
      ${steps.map(([h, p], i) => `<li><span class="exit">${i + 1}</span><h3>${h}</h3><p>${p}</p></li>`).join('\n      ')}
    </ol>
  </div>
</section>

<section class="band" aria-labelledby="need-h">
  <div class="wrap split">
    <div>
      <h2 id="need-h">${t('What you need', 'Ce qu’il vous faut')}</h2>
      <p class="muted">${t('Missing something? Sign up anyway: we’ll guide you through it.', 'Il vous manque quelque chose? Inscrivez-vous quand même : on vous guide.')}</p>
    </div>
    <ul class="checks">
      ${needs.map((n) => `<li>${n}</li>`).join('\n      ')}
    </ul>
  </div>
</section>

<section class="join" id="join" aria-labelledby="join-h">
  <div class="wrap join-in">
    <div class="join-copy">
      <h2 id="join-h">${t('Sign up as a driver', 'Inscrivez-vous comme chauffeur')}</h2>
      <p>${t('Leave your details. We’ll call you within a few days to get you on the road.', 'Laissez vos coordonnées. On vous appelle d’ici quelques jours pour vous mettre sur la route.')}</p>
      <p class="small">${t('Free, no commitment.', 'Gratuit, sans engagement.')}</p>
    </div>
    <form class="form" id="signup" action="${signupUrl}" method="post" novalidate>
      <input type="hidden" name="lang" value="${lang}">
      <div class="hp" aria-hidden="true"><label>Website <input name="website" tabindex="-1" autocomplete="off"></label></div>
      <div class="row">
        <label class="field"><span>${t('First name', 'Prénom')}</span><input name="firstName" autocomplete="given-name" required></label>
        <label class="field"><span>${t('Last name', 'Nom')}</span><input name="lastName" autocomplete="family-name" required></label>
      </div>
      <div class="row">
        <label class="field"><span>${t('Phone', 'Téléphone')}</span><input name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="514 555-0123" required pattern="[0-9 ()+.\\-]{10,}"></label>
        <label class="field"><span>${t('Email', 'Courriel')}</span><input name="email" type="email" autocomplete="email" required></label>
      </div>
      <label class="field"><span>${t('City you’d drive from', 'Ville d’où vous partiriez')}</span><input name="city" list="cities" autocomplete="address-level2" required></label>
      <datalist id="cities">${cities.map((c) => `<option value="${c}">`).join('')}</datalist>
      <label class="field"><span>${t('Car make, model and year', 'Marque, modèle et année de la voiture')}</span><input name="car" placeholder="${t('e.g. Toyota RAV4 2021', 'ex. Toyota RAV4 2021')}" required></label>
      <fieldset class="field sizes">
        <legend>${t('Car size', 'Taille de la voiture')}</legend>
        ${sizes.map(([v, h, s], i) => `<label class="size"><input type="radio" name="size" value="${v}" ${i === 0 ? 'required' : ''}><span><b>${h}</b><small>${s}</small></span></label>`).join('\n        ')}
      </fieldset>
      <label class="tick"><input type="checkbox" name="licence12" value="yes"><span>${t('I’ve held a class 5 licence for at least 12 months', 'J’ai un permis classe 5 depuis au moins 12 mois')}</span></label>
      <label class="tick"><input type="checkbox" name="consent" value="yes" required><span>${t('Navetto may contact me about becoming a driver.', 'Navetto peut me contacter au sujet de mon inscription comme chauffeur.')}</span></label>
      <p class="error" id="error" role="alert" hidden></p>
      <button class="btn btn-lg btn-block" type="submit">${t('Send my sign-up', 'Envoyer mon inscription')}</button>
      <p class="small muted">${t('We use your details only to contact you about driving with Navetto.', 'Nous utilisons vos coordonnées seulement pour vous contacter au sujet de la conduite avec Navetto.')}</p>
    </form>
    <div class="done" id="done" hidden tabindex="-1">
      <h2>${t('Thanks! You’re on the list.', 'Merci! Vous êtes sur la liste.')}</h2>
      <p>${t('We’ll call you within a few days. Questions in the meantime?', 'On vous appelle d’ici quelques jours. Des questions d’ici là?')} <a href="mailto:bonjour@navetto.ca">bonjour@navetto.ca</a></p>
    </div>
  </div>
</section>

<section class="band" aria-labelledby="faq-h">
  <div class="wrap narrow">
    <h2 id="faq-h">${t('Questions', 'Questions')}</h2>
    ${faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('\n    ')}
  </div>
</section>
</main>

<footer class="foot">
  <div class="wrap foot-in">
    ${brand('m2')}
    <p>${t('Private long-distance rides in Québec.', 'Trajets privés longue distance au Québec.')} <a href="https://navetto.ca">navetto.ca</a> · <a href="mailto:bonjour@navetto.ca">bonjour@navetto.ca</a></p>
    <p class="small">${t('Photo', 'Photo')}: <a href="https://commons.wikimedia.org/wiki/File:Chemin_Bombardier_-_panoramio.jpg">Chemin Bombardier</a>, Mario Hains, <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a></p>
  </div>
</footer>

<script>
(() => {
  const form = document.getElementById('signup');
  const error = document.getElementById('error');
  const done = document.getElementById('done');
  const say = (text) => { error.textContent = text; error.hidden = !text; };
  form.addEventListener('input', () => { if (form.checkValidity()) say(''); });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add('tried');
      const bad = form.querySelector(':invalid');
      say(${JSON.stringify(t('Please fill in every field.', 'Veuillez remplir tous les champs.'))});
      bad && bad.focus();
      return;
    }
    say('');
    const button = form.querySelector('button');
    button.disabled = true;
    button.textContent = ${JSON.stringify(t('Sending…', 'Envoi…'))};
    try {
      // A Google Apps Script web app: it answers with a redirect no page can read, so the request is sent "no-cors".
      await fetch(form.action, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(new FormData(form)) });
      form.hidden = true;
      done.hidden = false;
      done.focus();
    } catch {
      button.disabled = false;
      button.textContent = ${JSON.stringify(t('Send my sign-up', 'Envoyer mon inscription'))};
      say(${JSON.stringify(t('It didn’t go through. Check your connection and try again.', 'L’envoi n’a pas fonctionné. Vérifiez votre connexion et réessayez.'))});
    }
  });
})();
</script>
</body>
</html>
`;
}
