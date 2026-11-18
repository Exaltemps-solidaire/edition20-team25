# Déploiement

Chatbot d'orientation sur la démarche ALD 31, pour l'association **ENDOmind**
(endométriose). Il vulgarise la procédure et oriente la patiente vers la
prochaine étape concrète, sans poser de diagnostic.

## Services

- `frontend/` — Next.js en export statique, servi par nginx, exposé publiquement (port 80 du
  conteneur, 8080 sur la VM).
- `api/` — Node sans dépendance, routes `/health` et `/sante` (port 8081, routé derrière `/api/`).

## Services externes appelés

Aucun pour l'instant : l'itération 1 n'affiche que l'écran d'accueil, en dur. Rien ne casse si
un service externe tombe, puisqu'aucun n'est encore appelé.

## Connu comme fragile ou inachevé

- Les 3 choix de situation de l'écran d'accueil sont affichés mais ne naviguent pas encore
  (prévu à l'itération 2).
- Aucune donnée n'est encore persistée (pas de base, pas de stockage).

## Contact

- Équipe : équipe 25 (hackathon eXaltemps Solidaire).
- Association : ENDOmind.
