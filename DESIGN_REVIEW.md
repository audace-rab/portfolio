# Design Review — Modifications récentes du portfolio

Date : 17 août 2026
Auditeur : UI/UX (teammate)
Contexte : Vérification de cohérence UX/UI après les modifs Dev Coder + Lead.
Aucun fichier modifié — rapport uniquement.

---

## 1. Avis sur la PLACE du badge "Disponible"

### Layout actuel (Hero.jsx :57-69)

```
eyebrow "Bonjour, je suis"      ← mb-4
badge "Disponible pour…"        ← mb-3
h1 "Audace Rabarison"           ← leading principal
h2 "Software Engineer"
tagline
CTA buttons                     ← mt-8
stats grid                      ← mt-10
```

### Le problème actuel

Le badge interrompt la **respiration verticale** entre l'eyebrow et le H1. L'eyebrow (text-sm, uppercase, tracking-widest) sert de préambule au nom — c'est un couplet visuel standard. Y insérer la pilule verte crée un effet de « collé » entre trois éléments de niveaux très différents : un texte indicatif, un badge d'état, puis le nom en 48px extrabold. Le lecteur doit re-prioriser cognitive l'information avant d'atteindre le H1.

### Options analysées

| Option | Position | Avantage | Inconvénient |
|--------|----------|----------|--------------|
| **(a) Actuel** | Entre eyebrow et H1 | Visible, premier regard | Brise le couplet eyebrow→nom ; le badge écrase le rebond naturel vers le H1 |
| **(b) Sous le titre** | Après h2, avant tagline | Reste dans la colonne d'identité ; le badge devient un « résumé de statut » post-identification | Risque d'être moins visible si le scroll est rapide |
| **(c) Sous la tagline, avant CTA** | Après tagline, avant les boutons | Crée un pont logique : identité → contexte → statut → action ; le badge fonctionne comme un **CTA préparatoire** | Léger éloignement du premier écran sur mobile |
| **(d) Près du bouton "Discutons"** | À côté ou juste au-dessus du CTA principal | Ancre le badge à l'action (disponible = contactez-moi) | Perd la portée globale ; ne concerne plus que le CTA contact |

### Recommandation : **Option (c) — sous la tagline, avant les CTA**

**Justification UX :**

- **Patron `Status-indicator + CTA`** (également appelé « availability prompt ») : sur les portfolios et profils LinkedIn/GitHub, le badge de disponibilité est quasi systématiquement placé **à proximité de l'action de contact**, jamais entre le nom et le titre. Voir : LinkedIn (badge « Open to work » sous le headline, au-dessus du CTA « Message »), les pages Webflow « hire me » avec pill au-dessus du CTA.

- **Hiérarchie de l'attention** (Nielsen, *Prioritising Web Usability*) : l'utilisateur scanne en F. L'eyebrow et le H1 constituent la **ligne F horizontale 1** — insérer le badge ici casse le flux. En le plaçant après la tagline, il devient le dernier élément contextuel avant les boutons d'action, ce qui crée une **transition logique : identité → valeur → disponibilité → action**.

- **Cohérence avec le reste du Hero** : les 3 CTA (Contacter, Voir expériences, Télécharger CV) + les 3 stats occupent déjà un espace dense. Le badge « disponible » en amont sert de **micro-argument** pour le CTA « Me contacter » sans concurrencer les autres boutons.

### Snippet JSX proposé (option c)

```jsx
<p className="text-slate-600 dark:text-slate-300 mt-5 max-w-md text-lg">
  {t.hero.tagline.replace('{years}', profile.experienceYears)}
</p>

{/* Badge disponibilité — placé entre la tagline et les CTA */}
<div
  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 mt-6"
  role="status"
>
  <span className="relative flex h-2 w-2" aria-hidden="true">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 motion-reduce:animate-none" />
    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
  </span>
  {t.hero.available}
</div>

<div className="flex flex-wrap gap-4 mt-5">
  {/* ... CTA buttons ... */}
</div>
```

Ajustements : `mt-6` au badge + `mt-5` sur le conteneur CTA (au lieu de `mt-8`) pour maintenir la compacité.

---

## 2. Cohérence des modifications récentes — Points vérifiés

### ✅ Ce qui est bien fait

| Élément | Verdict | Détail |
|---------|---------|--------|
| Navbar — ordre `[liens] → CTA → FR\|EN → thème` | ✅ Cohérent | Logique de gauche à droite : navigation → action → settings. Standard UI. |
| Fonts Inter — preload + media=print/onload + noscript | ✅ Robuste | Triple fallback = aucune contention bloquante. `rel="preload"` + `<noscript>` = couverture complète. |
| `prefers-reduced-motion` | ✅ Géré | Animations (fadeUp, float, marquee, reveal) toutes désactivées dans le bloc `@media (prefers-reduced-motion: reduce)`. Marquee stopped. |
| Projects — tilt désactivé sur `pointer:coarse` | ✅ Correct | `window.matchMedia('(pointer:coarse)')` check + `reduced` flag. Pas de shimmer ni tilt sur mobile/tablette tactile. |
| `aria-hidden`, `aria-label`, `aria-expanded` | ✅ Améliorés | Hamburger : `aria-expanded`, `aria-controls="mobile-menu"`. Emojis décoratifs : `aria-hidden="true"`. TechMarquee : `aria-hidden="true"`. |
| Focus-visible rings | ✅ Cohérent | Tous les liens et boutons ont `focus-visible:ring-2` avec `amber-500` (light) / `accent-violet` (dark). |
| 404.html — structure | ✅ Solide | `lang` auto-détecté, `prefers-reduced-motion` géré, monogramme AR, bouton retour. |
| Portrait — WebP + `fetchpriority="high"` | ✅ Optimisé | `srcSet` responsive (768/384), `decoding="async"`, bon `object-position`. |
| Reveal on scroll (L2/M2) | ✅ Corrigé | `IntersectionObserver` + immédiat si `prefers-reduced-motion: reduce`. Fallback solide. |
| Skip link (M5) | ✅ Corrigé | Classe `.a11y-skip` avec `sr-only` → visible au focus. |
| Active nav section (M6) | ✅ Corrigé | `IntersectionObserver` + `aria-current="true"` + style visuel distinct. |
| Sections eyebrow — amber-700 (H2) | ✅ Corrigé | Toutes les eyebrow sont maintenant `text-amber-700` en light (≥4.5:1). |

### ⚠️ Points d'incohérence à corriger

| # | Problème | Sévérité | Localisation | Recommandation |
|---|----------|----------|--------------|----------------|
| C1 | **Typo dans Projects.jsx :12** : `"Fast API"` devrait être **"FastAPI"** (un seul mot, camelCase, c'est le nom officiel du framework). | P2 — Visuel | `Projects.jsx:12` | Corriger en `"FastAPI"`. |
| C2 | **Absence de `manifest.json`** dans `public/` — le `<meta name="theme-color">` est présent mais le manifest requis pour la PWA (icônes 192/512, `start_url`, `scope`) n'a pas été trouvé dans le filesystem. | P1 — Fonctionnel | `public/` manquant | Créer `public/manifest.json` et l'ajouter dans `index.html` via `<link rel="manifest" ...>`. |
| C3 | **Service Worker non trouvé** dans le répertoire `public/`. Le contexte mentionne une PWA offline mais aucun fichier `sw.js` ou `service-worker.js` n'existe. | P1 — Fonctionnel | `public/` manquant | Si la PWA offline est souhaitée, créer le SW et l'enregistrer dans `main.jsx`. Sinon, ne pas créer de `theme-color`/meta PWA sans support. |
| C4 | **`og:image` pointe vers un SVG** (`og-image.svg`) — les Open Graph imagecards ne supportent pas SVG pour la plupart des plateformes (Facebook, LinkedIn, Twitter). | P2 — SEO | `index.html:16` | Exporter en PNG/JPG (1200×630) et changer l'URL. |
| C5 | **Float amélioré (−10px) mais la classe `.animate-float` est utilisée sur le portrait et les blobs Hero** — sur desktop c'est correct, mais sur mobile le portrait (w-80 h-80) + float crée un mouvement perpétuel qui peut gêner la lecture sous le badge/CTA. | P2 — UX | `Hero.jsx:135`, `index.css:83-95` | Limiter le float au portrait uniquement sur desktop (`md:animate-float`) ou réduire à −6px sur mobile. |
| C6 | **Le glow amber (`rgba(146, 64, 14, 0.2)`) dans `index.css:40` ne correspond plus au gradient amber-600→800** — `amber-600 = #d97706` et `amber-800 = #92400e`, mais la box-shadow utilise un橙âtre intermédiaire. Légère inconsistency perceptible. | P3 — Visuel | `index.css:40` | Passer à `rgba(217, 119, 6, 0.2)` (= amber-500, plus proche du gradient actuel). |
| C7 | **Le 404.html n'a pas de `<meta name="theme-color">`** alors que le site principal en a un. | P3 — Cohérence | `404.html:6` | Ajouter `<meta name="theme-color" content="#0f172a" />` dans le `<head>`. |
| C8 | **Le `lang="fr"` du 404 est fixe** — le script détecte la langue mais ne met pas à jour l'attribut `lang` du `<html>`. Les lecteurs d'écran resteront en français même si la page affiche l'anglais. | P2 — A11y | `404.html:78` | Ajouter `document.documentElement.lang = lang` dans le script IIFE. |

---

## 3. Recommandations prioritaires (triées)

### P1 — Corriger avant la prochaine publication

| # | Action |
|---|--------|
| 1 | **Déplacer le badge disponibilité** de sa position actuelle (entre eyebrow et H1) à **sous la tagline, avant les CTA** (option c). Référence : patron "availability prompt" standard (LinkedIn, Webflow hire-me pages). |
| 2 | **Créer `manifest.json`** dans `public/` avec `start_url: "/portfolio/"`, `scope: "/portfolio/"`, `id: "/portfolio/"`, `theme_color: "#0f172a"`, `background_color: "#0f172a"`, et les icônes 192/512. Ajouter `<link rel="manifest">` dans `index.html`. |
| 3 | **Créer ou valider le service worker** pour l'offline. Si non souhaité, retirer le `theme-color` et les métadonnées PWA de `index.html` pour éviter une promesse non tenue. |

### P2 — Corriger dans la semaine

| # | Action |
|---|--------|
| 4 | Corriger `"Fast API"` → `"FastAPI"` (`Projects.jsx:12`). |
| 5 | Remplacer `og-image.svg` par un PNG/JPG 1200×630 pour les Open Graph cards. |
| 6 | Ajouter `document.documentElement.lang = lang` dans le script du 404.html. |
| 7 | Limiter le float du portrait sur mobile : `className="... md:animate-float"` (supprimer le float sur <md). |

### P3 — Amélioration future

| # | Action |
|---|--------|
| 8 | Ajuster la box-shadow glow amber dans `index.css:40` pour correspondre au gradient amber-600→800. |
| 9 | Ajouter `<meta name="theme-color" content="#0f172a" />` au 404.html. |

---

## 4. Résumé global

Le code a **considérablement progressé** depuis l'audit initial : contraste corrigé (amber-700), `prefers-reduced-motion` respecté, `focus-visible` partout, aria améliorés, reveal on scroll, skip link, nav active, tilt touch-safe, portrait WebP optimisé. Le badge disponibilité est la seule question architecturale ouverte — son placement actuel casse la respiration visuelle eyebrow→nom, et le repositionner sous la tagline aligne le flux UX avec les standards de l'industrie.