// node build.mjs: writes the site to dist/ (French at /, English at /en/).
//   SITE_URL  the public address (default https://drive.navetto.ca)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { page } from './src/page.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
const site = (process.env.SITE_URL || 'https://drive.navetto.ca').replace(/\/$/, '');
// Sign-ups go to the Google Form (its answers fill the driver sign-ups Sheet).
const formUrl = 'https://forms.gle/w7S7xDTgm4HiBfQj6';

fs.rmSync(dist, { recursive: true, force: true });
fs.cpSync(path.join(root, 'public'), dist, { recursive: true });
fs.writeFileSync(path.join(dist, 'index.html'), page('fr', { formUrl, site }));
fs.mkdirSync(path.join(dist, 'en'));
fs.writeFileSync(path.join(dist, 'en', 'index.html'), page('en', { formUrl, site }));
const host = new URL(site).host;
if (!host.startsWith('localhost')) fs.writeFileSync(path.join(dist, 'CNAME'), `${host}\n`);
console.log('built', site);
