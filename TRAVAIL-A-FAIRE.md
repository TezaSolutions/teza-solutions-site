# Travail à faire — site Teza Solutions

Notes de dette technique. Chaque entrée dit **ce qui cloche**, **ce que ça
coûte si on ne le fait pas**, et **ce qu'il faut toucher**.

---

## 1. Retirer le `.html` des adresses

**Demandé par Teza le 21 septembre 2026 :** « pk .html a la fin du lien ? »

### Ce qui est mesuré

Les deux formes répondent déjà, GitHub Pages sert l'une comme l'autre :

```
200  https://tezasolutions.com/suppression-donnees
200  https://tezasolutions.com/suppression-donnees.html
```

Mais c'est la forme **longue** qui est déclarée officielle dans le code :

```html
<link rel="canonical" href="https://tezasolutions.com/suppression-donnees.html">
```

C'est donc elle que Google indexe, elle qui apparaît dans les résultats de
recherche, et elle qu'on copie-colle quand on partage un lien.

### Pourquoi ça vaut la peine

Aucune conséquence technique — c'est une question de crédibilité. Stripe,
Linear, Shopify, Vercel : aucun n'affiche `.html`. Les gens ne le nomment
pas, mais ils le remarquent. Sur un site qui vend de l'automatisation à des
entreprises, l'extension de fichier apparente fait amateur.

### Ce qu'il faut toucher

32 pages HTML, et **les quatre à la fois** — corriger seulement les liens
laisserait les canoniques pointer vers l'ancienne forme, ce qui vaut pire
que ne rien faire :

1. `<link rel="canonical">` — l'adresse officielle déclarée
2. `<link rel="alternate" hreflang>` — les trois par page (fr-ca, en-ca, x-default)
3. `<meta property="og:url">` — l'aperçu sur les réseaux sociaux
4. Les liens internes dans `js/header.js`, `js/footer.js`, `en/header.js`,
   `en/footer.js`, et dans le corps des pages
5. `sitemap.xml` — 27 adresses

### ⛔ Ce qui casserait si on s'y prend mal

**Une règle de substitution naïve casse `index.html`.** La racine d'un
dossier se sert par `/` ou `/en/`, pas par `/index`. Une expression
régulière qui retire `.html` partout produirait `https://tezasolutions.com/index`
— une adresse qui **n'existe pas**, déclarée comme canonique de la page
d'accueil. Google désindexerait l'accueil.

**Les gabarits doivent suivre.** `_gabarit-article-FR.html` et
`_template-article-EN.html` servent à créer les prochains articles : les
oublier ferait revenir le `.html` au premier billet publié.

**Vérifier après coup, pas avant.** Une fois en ligne, sonder les 27
adresses du plan du site et confirmer qu'aucune ne rend 404. GitHub Pages
met environ 80 secondes à publier.

### Estimation

Une quinzaine de minutes, dont la moitié en vérification.

**Ne bloque rien.** Les adresses actuelles sont valides — y compris pour la
validation de l'application Meta.

---

## 2. Trois images de blogue manquantes

Signalé de longue date, jamais traité. À reprendre en même temps que le
point 1, puisque les deux touchent les mêmes fichiers.
