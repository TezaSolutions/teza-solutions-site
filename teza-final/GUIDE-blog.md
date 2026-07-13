# Guide — Publier un article de blogue (5 min)

Ton site étant en HTML, publier un article = créer un fichier + ajouter 2 petites lignes ailleurs.
Voici la marche à suivre exacte. Compte ~5 min une fois que tu as ton texte.

---

## Étape 1 — Créer l'article FR

1. Dans le dossier `blog/`, **duplique** le fichier `_gabarit-article-FR.html`
2. **Renomme** la copie avec un nom clair, en minuscules, avec des tirets, sans accents ni espaces.
   Exemple : `blog/5-taches-a-automatiser.html`
3. Ouvre-le et **remplace tout ce qui est entre [CROCHETS]** :
   - `[TITRE DE L'ARTICLE]` (2 endroits : title + h1)
   - `[DESCRIPTION SEO]` (2 endroits : meta description + og:description) — 1 phrase, ~150 caractères, avec un mot-clé
   - `[NOM-DU-FICHIER]` → le nom exact que tu as donné (ex: `5-taches-a-automatiser`)
   - `[NOM-DU-FICHIER-EN]` → le nom que tu donneras à la version anglaise (ex: `5-tasks-to-automate`)
   - `[CATÉGORIE]` (ex : Automatisation, Conseils, Actualité)
   - `[JOUR MOIS ANNÉE]` (ex : 15 juillet 2026)
   - Le **contenu** entre les balises `<!-- DÉBUT DU CONTENU -->` et `<!-- FIN DU CONTENU -->`

## Étape 2 — Créer l'article EN

Même chose avec `_template-article-EN.html`, à dupliquer dans `en/blog/`.
(Astuce : tu peux publier le FR d'abord et ajouter l'EN plus tard — dans ce cas, retire temporairement la ligne `hreflang` "en-ca" du fichier FR.)

## Étape 3 — Ajouter la carte dans la liste du blogue

Ouvre `blog.html`. Trouve le bloc `<a href="blog/mark-copilot-lancement.html" class="post-card reveal">`.
**Copie tout ce bloc** (de `<a` jusqu'au `</a>` correspondant) et colle-le juste au-dessus, puis modifie :
- le `href` → `blog/[ton-fichier].html`
- la date et la catégorie (`post-meta`)
- le titre (`h3`)
- le résumé (`p`)

Fais pareil dans `en/blog.html` pour la version anglaise.

## Étape 4 — Ajouter au sitemap (important pour le SEO)

Ouvre `sitemap.xml`. Copie un bloc `<url>...</url>` existant d'article et adapte-le :

```xml
  <url>
    <loc>https://tezasolutions.com/blog/[ton-fichier].html</loc>
    <xhtml:link rel="alternate" hreflang="fr-ca" href="https://tezasolutions.com/blog/[ton-fichier].html"/>
    <xhtml:link rel="alternate" hreflang="en-ca" href="https://tezasolutions.com/en/blog/[ton-fichier-en].html"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://tezasolutions.com/blog/[ton-fichier].html"/>
  </url>
```

## Étape 5 — Publier

1. GitHub Desktop → tu vois tes nouveaux fichiers → résumé (ex : "Nouvel article : ...") → **Commit to main** → **Push origin**
2. Attends 2-5 min

## Étape 6 — Dire à Google (optionnel mais recommandé)

Dans Google Search Console → barre "Inspect any URL" → colle l'URL de ton nouvel article → **Demander une indexation**. Ça accélère son apparition dans Google.

---

## Astuces
- **Nom de fichier** = ton URL = compte pour le SEO. Mets-y un mot-clé (ex: `automatiser-prise-rendez-vous.html` plutôt que `article3.html`).
- **Titre** : clair et accrocheur, avec le sujet principal au début.
- **Description SEO** : c'est le texte que Google affiche sous ton titre dans les résultats. Donne envie de cliquer.
- **Longueur** : vise 400+ mots pour que Google prenne l'article au sérieux.
- **Un lien vers contact** en fin d'article (déjà dans le gabarit) aide à convertir les lecteurs.
