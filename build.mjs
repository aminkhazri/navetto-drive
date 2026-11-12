// node build.mjs: writes the site to dist/ (French at /, English at /en/).
//   SIGNUP_URL  where the form posts: the Google Apps Script web app (apps-script/signup.gs)
//   SITE_URL    the public address (default https://drive.navetto.ca)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { page } from './src/page.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
const site = (process.env.SITE_URL || 'https://drive.navetto.ca').replace(/\/$/, '');
const signupUrl = process.env.SIGNUP_URL || '/signup';

fs.rmSync(dist, { recursive: true, force: true });
fs.cpSync(path.join(root, 'public'), dist, { recursive: true });
fs.copyFileSync(path.join(root, 'src', 'site.css'), path.join(dist, 'site.css'));
fs.writeFileSync(path.join(dist, 'index.html'), page('fr', { signupUrl, site }));
fs.mkdirSync(path.join(dist, 'en'));
fs.writeFileSync(path.join(dist, 'en', 'index.html'), page('en', { signupUrl, site }));
const host = new URL(site).host;
if (!host.startsWith('localhost')) fs.writeFileSync(path.join(dist, 'CNAME'), `${host}\n`);
console.log('built', site, '→', signupUrl);
