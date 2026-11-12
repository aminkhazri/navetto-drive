# drive.navetto.ca: become a Navetto driver

The public page that recruits drivers: why drive with Navetto, how it works, what you need, and a sign-up form.
Québec French at `/`, English at `/en/`. Plain HTML and CSS built by `node build.mjs` (no dependencies), after
navetto-ui-kit's design standard (the driver's caution yellow, Overpass).

## Where sign-ups go
The form posts to a Google Apps Script web app (`apps-script/signup.gs`): each sign-up is a row in the "Site" tab of
the *Navetto — Chauffeurs inscrits / Driver sign-ups* Google Sheet, and an email to bonjour@navetto.ca. Set up steps
are at the top of that file. Its `/exec` address is the repository variable `SIGNUP_URL`.

## Run locally
```sh
SIGNUP_URL=/signup SITE_URL=http://localhost:5190 node build.mjs
node serve.mjs   # http://localhost:5190, sign-ups written to signups.log
```
On Git Bash, prefix with `MSYS_NO_PATHCONV=1` so `/signup` isn't turned into a Windows path.

## Publish
Every push to `main` builds and publishes to GitHub Pages (`.github/workflows/pages.yml`), at the custom domain
`drive.navetto.ca` (IONOS DNS: `CNAME drive → aminkhazri.github.io`).

The road photo is *Chemin Bombardier* by Mario Hains, CC BY-SA 3.0 (credited in the footer), from the driver app.
