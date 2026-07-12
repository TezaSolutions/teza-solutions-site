# Site web — Teza Solutions Inc.

Site statique (HTML/CSS/JS, aucun framework requis) prêt à héberger sur GitHub Pages.

## Structure

```
teza-site/
├── index.html                     Accueil
├── services.html                  Services
├── a-propos.html                  À propos
├── contact.html                   Contact (formulaire)
├── blog.html                      Liste du blogue
├── blog/
│   └── mark-copilot-lancement.html
├── politique-confidentialite.html
├── conditions-utilisation.html
├── css/style.css
├── js/main.js
└── assets/                        Logos
```

## 1. Mettre le site sur GitHub

```bash
cd teza-site
git init
git add .
git commit -m "Site web Teza Solutions v1"
git branch -M main
git remote add origin https://github.com/<ton-compte-github>/teza-solutions-site.git
git push -u origin main
```

## 2. Activer GitHub Pages

1. Sur GitHub, va dans **Settings > Pages** du repo.
2. Source : **Deploy from a branch** → branche `main`, dossier `/ (root)`.
3. Sauvegarde. GitHub te donne une URL du type `https://<compte>.github.io/teza-solutions-site/`.

## 3. Connecter ton domaine (tezasolutions.com) via Namecheap

**Option recommandée — domaine reste chez son registraire actuel, on change juste les DNS :**

Dans **Settings > Pages** de GitHub, ajoute ton domaine personnalisé (`tezasolutions.com`). GitHub va te demander de configurer les DNS. Chez Namecheap (Domain List → Manage → Advanced DNS), ajoute :

| Type  | Hôte | Valeur                  |
|-------|------|-------------------------|
| A     | @    | 185.199.108.153         |
| A     | @    | 185.199.109.153         |
| A     | @    | 185.199.110.153         |
| A     | @    | 185.199.111.153         |
| CNAME | www  | `<compte>.github.io.`   |

Ajoute aussi un fichier `CNAME` (déjà prévu) à la racine du repo contenant simplement :
```
tezasolutions.com
```

Une fois les DNS propagés (quelques minutes à 24h), active **Enforce HTTPS** dans Settings > Pages.

## 4. Si le domaine est chez Hostinger

Tu n'as pas besoin de transférer le domaine pour que ça fonctionne — changer les DNS dans le panneau Hostinger vers les valeurs ci-dessus suffit. Un transfert complet (Hostinger → Namecheap ou vers le compte Teza) est possible mais prend 5 à 7 jours et nécessite le code d'autorisation (EPP) fourni par Hostinger. À faire seulement si tu veux consolider la gestion administrative du domaine, pas pour la mise en ligne.

## 5. Avant de connecter les API Google / TikTok / Facebook

Ces plateformes exigent, pour approuver l'accès à leurs API :
- Un site en ligne, en HTTPS (✅ fourni par GitHub Pages)
- Une politique de confidentialité publique (✅ `politique-confidentialite.html`)
- Des conditions d'utilisation publiques (✅ `conditions-utilisation.html`)
- Des informations de contact claires (✅ dans le pied de page)

Fais réviser les deux pages légales par un professionnel du droit avant de soumettre une demande d'accès API — le contenu actuel est un bon point de départ, pas un texte final validé juridiquement.
