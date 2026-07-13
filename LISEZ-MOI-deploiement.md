# Site Teza Solutions — Guide de mise en ligne

Site bilingue (FR + EN) complet, prêt à déployer.

## 1. Tester en local d'abord
Dézippe le dossier, puis double-clique sur `index.html` (page d'accueil FR).
La version anglaise est dans `en/index.html`. Le bouton **FR/EN** en haut à droite bascule entre les deux.

## 2. Structure du site
- **8 pages françaises** : accueil, services, à propos, blogue + 1 article, contact, confidentialité, conditions
- **8 pages anglaises** (dossier `en/`) : mêmes pages traduites
- SEO bilingue complet (hreflang, sitemap.xml, robots.txt, Open Graph, données structurées)
- Formulaire de contact fonctionnel (Web3Forms — les messages arrivent à Contact@tezasolutions.com)
- Emplacements photos réservés (cadres "Photo à venir") — voir section 5

## 3. Déploiement via GitHub Desktop
1. Ouvre ton dossier local `teza-solutions-site` (déjà cloné)
2. **Supprime tout l'ancien contenu** et **copie tout le contenu** de ce dossier `teza-final` à la place
3. Dans GitHub Desktop : vérifie les changements → écris un résumé ("Refonte complète bilingue") → **Commit to main** → **Push origin**
4. Attends 2–5 min → teste sur `https://tezasolutions.github.io/teza-solutions-site/`

## 4. IMPORTANT — Domaine tezasolutions.com
Le fichier **CNAME n'est PAS inclus** volontairement, pour que l'URL github.io reste fonctionnelle pour tes tests.

Quand tes DNS seront prêts (chez Namecheap/Hostinger) :
- Ajoute les **A records** : 185.199.108.153 / 185.199.109.153 / 185.199.110.153 / 185.199.111.153
- Ajoute un **CNAME** : `www` → `tezasolutions.github.io`
- Dans GitHub → Settings → Pages → Custom domain → tape `tezasolutions.com` → Save
  (GitHub créera alors le fichier CNAME automatiquement)

## 5. Ajouter tes vraies photos plus tard
Cherche les blocs `photo-slot` (cadres "Photo à venir") dans les fichiers HTML.
Pour en remplacer un par une vraie photo :
1. Mets ta photo dans le dossier `assets/` (ex : `assets/equipe.jpg`)
2. Remplace le bloc `<div class="photo-slot">...</div>` par :
   `<img src="assets/equipe.jpg" alt="Notre équipe" style="border-radius:16px;width:100%">`
   (ajuste le chemin en `../assets/` pour les pages du dossier `en/`)

Emplacements prévus : accueil (Pourquoi Teza), page Services (×3), page À propos (fondateur) — en FR et EN.

## 6. Après la mise en ligne (SEO)
- Ajoute le site à **Google Search Console** et soumets `sitemap.xml`
- Ça aide Google à indexer les deux langues rapidement
/var/folders/5k/g467w30x06z23hlym90tlk900000gn/T/TemporaryItems/NSIRD_screencaptureui_kRXCZ9/Screenshot 2026-07-12 at 11.31.55 PM.png