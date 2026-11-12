// node publish.mjs: builds the site for https://drive.navetto.ca and pushes it to the gh-pages branch, which GitHub
// Pages serves.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const run = (cmd, args, cwd = root) => execFileSync(cmd, args, { cwd, stdio: 'inherit' });
execFileSync(process.execPath, ['build.mjs'], { cwd: root, stdio: 'inherit', env: { ...process.env, SITE_URL: 'https://drive.navetto.ca' } });

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
