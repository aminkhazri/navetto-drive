# drive.navetto.ca: become a Navetto driver

The public page that recruits drivers: the pitch and a button to the sign-up form.
Québec French at `/`, English at `/en/`. Plain HTML and CSS built by `node build.mjs` (no dependencies), after
navetto-ui-kit's design standard (the driver's caution yellow, Overpass).

## Where sign-ups go
The button opens the Google Form *Navetto — Devenez chauffeur* (https://forms.gle/w7S7xDTgm4HiBfQj6); its answers fill
the driver sign-ups Google Sheet.

## Run locally
```sh
SITE_URL=http://localhost:5190 node build.mjs
node serve.mjs   # http://localhost:5190
```

## Publish
`node publish.mjs` builds the site for https://drive.navetto.ca and pushes it to the `gh-pages` branch,
which GitHub Pages serves at the custom domain `drive.navetto.ca` (IONOS DNS: `CNAME drive → aminkhazri.github.io`).
The `gh-pages` branch holds only built files and is replaced on each publish.

