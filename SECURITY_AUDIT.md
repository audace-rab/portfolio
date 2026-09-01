# SECURITY AUDIT — Portfolio (React/Vite, GitHub Pages)

Date : 2026-09-01 · Audit : Security (teammate) · Revue : OpenCode TL

## Score global : OK / faible risque
`npm audit` : **0 vulnérabilité** (509 deps, react 19.2.8, vite 8.2.x, vite-plugin-pwa 1.3.0 — rien de signalé). Build + lint OK.

## Findings

| # | Point | Résultat | Détail |
|---|-------|----------|--------|
| S1 | Secrets (repo + historique) | **OK** | `git ls-files` : seul `.env.example` + `.env.production` suivis — contiennent uniquement des clés **publiques** (GA4 `G-3WYVRGYN40`, site key Turnstile `0x4AAAAAAEfWSXMauMTqpPId`). La SECRET key Turnstile est **absente** du repo et de l'historique (`git log -p` : aucun `sk_live/ghp_/0x4AAAAAAEfWSQhvF`). Workflow `deploy.yml` : OIDC (`id-token: write`), aucun `secrets.*` dans le repo. |
| S2 | Headers live GitHub Pages | **Limite plateforme** | Réponse live : **aucun** CSP, HSTS, XFO, X-Content-Type-Options, ni Referrer-Policy. `Access-Control-Allow-Origin: *`, `Server: GitHub.com`. GitHub Pages ne permet pas d'headers serveur → mitigation par metas (corrigé, cf. F1/F4). |
| S3 | CSP | **Corrigé** | Meta CSP stricte ajoutée (index + 404), **sans** `unsafe-inline` pour les scripts. GA4, Turnstile, Google Fonts, Formspree autorisés explicitement. |
| S4 | RGPD / consentement cookies | **OK** | `AnalyticsContext` charge GA4 **uniquement** après `acceptCookies` (localStorage `cookie-consent`, défaut `undecided`/`declined` → jamais chargé). Bannière avec accept/refuse + piège focus. |
| S5 | RGPD / Formspree | **À documenter (P2)** | Le formulaire Contact envoie nom/email/message à `formspree.io` (tiers). Aucun texte d'info sur le formulaire. |
| S6 | XSS | **OK** | Aucun `dangerouslySetInnerHTML`/`innerHTML`/`eval`/`document.write`. React échappe par défaut. Formulaire : payload JSON vers Formspree, aucun sink XSS. |
| S7 | Dépendances | **OK + correction** | `npm audit` 0 vuln. Dépendance morte `@emailjs/browser` **supprimée** (fonte réduite). |
| S8 | `.gitignore` | **OK** | `.env`/`.env.*` ignorés, exclusions explicites `.env.example`/`.env.production` (clés publiques uniquement). |

## Corrections appliquées

- **F1 — `index.html`** : meta `Content-Security-Policy` (default-src 'self' ; script-src self + googletagmanager + google-analytics + challenges.cloudflare.com ; connect-src + formspree.io/fonts/analytics ; frame-src challenges.cloudflare.com ; font-src fonts.gstatic.com ; `upgrade-insecure-requests` ; pas d'`unsafe-inline` script) + meta `referrer strict-origin-when-cross-origin`.
- **F2 — `index.html`** : suppression du handler inline `onload` sur le chargement différé des fonts (remplacé par écouteur dans `main.jsx`) → **plus aucun script inline**.
- **F3 — `src/main.jsx`** : bascule `media="all"` de `#font-css` au load/error via listener (équivalent fonctionnel, sans inline).
- **F4 — `public/404.html`** : meta CSP stricte (`default-src 'none'`), meta referrer, script inline externalisé → `public/404-lang.js`.
- **F5 — `public/404-lang.js`** (nouveau) : détection langue 404 (ex-script inline).
- **F6 — `package.json` / `package-lock.json`** : suppression `@emailjs/browser` (inutilisé).

## Limitations non corrigeables (GitHub Pages — documentées)

- Impossibilité de définir des headers serveur → HSTS, `X-Frame-Options`/`frame-ancestors`, `X-Content-Type-Options` **ne peuvent pas être émis**.
  - Atténuations : `github.io` est dans la **preload list HSTS** de Chromium ; site sans état privilégié → risque clickjacking faible ; meta CSP couvre le reste.
- `Access-Control-Allow-Origin: *` émis par GitHub : non modifiable, non exploitable (contenu statique public).

## Recommandations

- **P1** — Valider sur le live (preview + production) après le build du lead : events GA4 post-consentement, rendu Turnstile, fonts Inter, aucune violation CSP en console (la validation CDP a été interrompue par l'ordre de livraison).
- **P2** — Ajouter une mention RGPD sous le formulaire Contact (données envoyées à Formspree, traitement de données personnelles) ; considérer le **self-hosting des fonts** Inter (supprime la requête Google pré-consentement).
- **P3** — Migrer vers une plateforme avec contrôle d'headers (ex. Cloudflare Pages) si les headers HSTS/XFO deviennent requis ; surveiller `npm audit` en CI.