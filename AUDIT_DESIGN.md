# Audit Design du Portfolio — UX & Accessibilité

Date : 17 août 2026
Auditeur : UI/UX (teammate)
Périmètre : `src/components/*.jsx`, `src/index.css`, `src/data.js`, `tailwind.config.js`, `index.html`

> ⚠️ Aucun fichier n'a été modifié. Ce document liste des recommandations classées par priorité.

---

## 1. Points forts (à conserver)

- **Thème clair/sombre complet et cohérent** : le `ThemeContext` détecte la préférence système, persiste en `localStorage` et applique la classe `dark` correctement (`ThemeContext.jsx`).
- **Sémantique HTML correcte** : `<header>`, `<nav>`, `<main>`, `<section id="...">`, `<footer>`, `<h1>/<h2>/<h3>` hiérarchisés, `<label>` liés aux champs.
- **`lang="fr"`, titre, méta-description et favicon** présents dans `index.html`.
- **Police Inter chargée** avec `preconnect` (`index.html`).
- **Système de design cohérent** : `glass`, `text-gradient`, dégradé accent (ambre en light / bleu-violet en dark) utilisés uniformément sur boutons, timeline, barres, pastilles.
- **Responsive globalement solide** : breakpoints `sm/md/lg` bien répartis sur toutes les grilles.

---

## 2. Problèmes & recommandations par priorité

### 🔴 HIGH

| # | Problème | Localisation | Recommandation |
|---|----------|--------------|----------------|
| H1 | **Contraste insuffisant du `text-gradient` en mode clair** (`amber-500 #f59e0b` sur fond blanc ≈ 1.8:1) — le titre "Software Engineer" et les valeurs des stats sont illisibles en mode clair. | `index.css:18-20`, `Hero.jsx:20`, `About.jsx:42` | En mode clair, passer le dégradé sur des tons plus sombres (`amber-600→amber-800`) ou conserver un `amber-700` uni pour respecter WCAG AA (≥ 4.5:1 pour texte normal). |
| H2 | **Contraste des titres "eyebrow"** : `text-amber-600` sur blanc ≈ 3.3:1 — échoue WCAG AA pour les petits textes (`text-sm`). | `Hero.jsx:14`, `About.jsx:13`, `Experience.jsx:7`, `Skills.jsx:7`, `Education.jsx:7`, `Contact.jsx:56` | Utiliser `amber-700` en mode clair (≥ 4.5:1). Le `accent-cyan` du dark est correct. |
| H3 | **Barres de compétences à largeur arbitraire** (`90 - idx*5`%) : la progression ne reflète aucune donnée réelle, varie par *groupe* et non par *compétence*. Trompeur pour l'utilisateur et inutilisable par un lecteur d'écran. | `Skills.jsx:25` | Supprimer la notion de "niveau" (la plus honnête) ou ajouter un `data-proficiency` réel par compétence dans `data.js`. À défaut, ajouter un texte descriptif accessible (ex. `aria-label="Compétence X : maîtrise élevée"`). |
| H4 | **Icônes emoji lues par les lecteurs d'écran** (👨💻 ✉️ 📞 ⚡ 🎓 ☀️ 🌙 …) : un lecteur d'écran annonce le texte de l'emoji, polluant la navigation. | Tous les composants | Ajouter `aria-hidden="true"` aux éléments d'icône purement décoratifs, et `focusable="false"`. |
| H5 | **Menu mobile non accessible** : pas de `aria-expanded`, pas de fermeture par `Échap`, pas de gestion du focus, pas de `aria-controls`. | `Navbar.jsx:74-100` | Ajouter `aria-expanded={open}`, `aria-controls="mobile-menu"`, fermer sur `Échap`, gérer le focus à l'ouverture. |

### 🟠 MEDIUM

| # | Problème | Localisation | Recommandation |
|---|----------|--------------|----------------|
| M1 | **Aucune gestion de `prefers-reduced-motion`** : `float` (infini) et `fade-up` ignorent la préférence de réduction des animations. | `index.css:38-65` | Envelopper les animations dans `@media (prefers-reduced-motion: reduce)` pour les désactiver ou les réduire. |
| M2 | **`fade-up` appliqué une seule fois au chargement** : le contenu est `opacity:0` et ne devient visible qu'au mount ; sans JS ou si l'animation ne tourne pas, le Hero reste invisible. | `Hero.jsx:13`, `index.css:49-52` | Ajouter un fallback / utiliser une API d'intersection pour déclencher à l'entrée dans le viewport, avec état initial visible si `prefers-reduced-motion`. |
| M3 | **Manque de focus-visible sur les éléments interactifs** : navigation hover-only, boutons sans anneau de focus clair. | `Navbar.jsx:42,57`, `Contact.jsx:118`, `Footer.jsx:10` | Ajouter `focus-visible:ring-2 ring-offset-2` sur liens/boutons, et `focus-visible:ring` sur les champs (en plus de `focus:border`). |
| M4 | **Formulaires sans annonce accessible** : succès/erreur non annoncés aux lecteurs d'écran ; pas de `aria-live`. | `Contact.jsx:122-129` | Encapsuler les messages succès/erreur dans une zone `aria-live="polite"` ; marquer les champs invalides avec `aria-invalid`. |
| M5 | **Pas de lien "skip to content"** : les utilisateurs clavier doivent parcourir toute la nav pour atteindre le contenu. | `App.jsx` | Ajouter un lien `a11y-skip` caché-visuellement mais visible au focus (`#contenu → <main id="contenu">`). |
| M6 | **Aucun indicateur de section active dans la nav** : l'utilisateur ne sait pas où il se trouve. | `Navbar.jsx` | Suivre la section visible (IntersectionObserver) et styler le lien actif (`aria-current="true"`). |
| M7 | **`bg-slate-500` en mode clair pour labels/texte secondaire** ≈ 4.7:1 — juste à la limite ; avec des petits textes ou sur fond teinté il peut échouer. | `Contact.jsx:71`, `Footer.jsx:6,9` | Passer en `slate-600` pour plus de marge de sécurité en mode clair. |
| M8 | **Animation infinie `float` sans pause** : peut être distrayante / source de vertige. | `index.css:64-65` | Limiter l'amplitude (`translateY(-10px)`), et désactiver via `prefers-reduced-motion`. |

### 🟢 LOW

| # | Problème | Localisation | Recommandation |
|---|----------|--------------|----------------|
| L1 | **Position de la timeline fragile** : `-left-[41px]` (nombre magique). | `Experience.jsx:15` | Utiliser une position relative au conteneur (ex. `-left-[27px]`) ou centrer le point via `translate`, plus robuste. |
| L2 | **Absence de transitions d'entrée au scroll** (reveal on scroll) sur About/Experience/Skills/Education. | Tous les composants | Ajouter une animation d'apparition au scroll (respectant `prefers-reduced-motion`) pour fluidifier le parcours. |
| L3 | **Hero en mobile** : `text-5xl` sur le nom complet peut être large sur très petits écrans. | `Hero.jsx:17` | Utiliser une taille fluide (ex. `text-[clamp(2.5rem,8vw,3.75rem)]`). |
| L4 | **Champs de formulaire sans `autocomplete`** ni `aria-describedby` d'aide. | `Contact.jsx:81-113` | Ajouter `autocomplete="name"` / `autocomplete="email"`. |
| L5 | **Hover uniquement** : certaines cartes changent au survol sans effet tactile équivalent (`active:`). | `Experience.jsx:16`, `Education.jsx:14` | Ajouter des états `active:` et `focus-visible:` pour un retour clair mobile/clavier. |
| L6 | **Pastilles tech/compétences sans `title` ni séparation** : rien ne décrit le lien entre pastille et catégorie. | `Experience.jsx:24-31` | Optionnel : grouper avec `aria-label` ou garder simple (pastilles décoratives OK si le contexte texte suffit). |

---

## 3. Synthèse

- **Priorité maximale** : corriger le contraste en mode clair (H1, H2) — c'est un défaut d'accessibilité réel et très visible.
- **Priorité données** : rendre les barres de compétences honnêtes ou accessibles (H3).
- **Priorité a11y structurelle** : menu mobile accessible (H5), `aria-hidden` sur emojis (H4), `prefers-reduced-motion` (M1, M2).
- **Améliorations UX** : reveal-on-scroll (L2), navigation active (M6), lien skip-to-content (M5).

Résumé chiffré : **5 High · 8 Medium · 6 Low** = 19 recommandations, dont 13 liées à l'accessibilité.