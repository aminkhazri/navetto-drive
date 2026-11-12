// node publish.mjs <SIGNUP_URL>: builds the site for https://drive.navetto.ca and pushes it to the gh-pages branch,
// which GitHub Pages serves. The address is the Apps Script web app's /exec URL (apps-script/signup.gs): without it the
// page would thank people and drop what they sent, so it refuses to publish.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const signupUrl = process.argv[2] || process.env.SIGNUP_URL;
// "--google-form": no Apps Script yet, so the sign-up button opens the Google Form.
const viaForm = signupUrl === '--google-form';
if (!viaForm && !/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(signupUrl || '')) {
  console.error('Give the Apps Script web app address: node publish.mjs https://script.google.com/macros/s/…/exec (or --google-form)');
  process.exit(1);
}
const run = (cmd, args, cwd = root) => execFileSync(cmd, args, { cwd, stdio: 'inherit' });
execFileSync(process.execPath, ['build.mjs'], { cwd: root, stdio: 'inherit', env: { ...process.env, SIGNUP_URL: viaForm ? '' : signupUrl, SITE_URL: 'https://drive.navetto.ca' } });

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'drive-pages-'));
fs.cpSync(path.join(root, 'dist'), tmp, { recursive: true });
fs.writeFileSync(path.join(tmp, '.nojekyll'), '');
const remote = execFileSync('git', ['remote', 'get-url', 'origin'], { cwd: root }).toString().trim();
const sha = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: root }).toString().trim();
run('git', ['init', '-q', '-b', 'gh-pages'], tmp);
run('git', ['add', '-A'], tmp);
run('git', ['commit', '-q', '-m', `Publish ${sha}`], tmp);
run('git', ['push', '-f', remote, 'gh-pages'], tmp);
fs.rmSync(tmp, { recursive: true, force: true });
console.log('Published', sha, 'to https://drive.navetto.ca');
