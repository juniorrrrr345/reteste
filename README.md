
# Bot Telegram avec Telegraf + MongoDB + Render

## Installation

```bash
npm install
```

## Lancement en local

Crée un fichier `.env` :

```
BOT_TOKEN=ton_token
MONGODB_URI=ton_url_mongo
```

Puis lance :

```bash
npm start
```

## Déploiement sur Render

- Ajoute les variables d’environnement : `BOT_TOKEN` et `MONGODB_URI`
- Utilise `render.yaml` pour config auto
- Désactive l'auto-sleep pour un bot en polling
