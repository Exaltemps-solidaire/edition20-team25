# Itérations — ENDOmind · Chatbot ALD 31

**Plan validé le 2026-11-18**, tel quel.

- **Source du plan** : proposé par l'agent (aucun plan d'itérations PM Lab trouvé dans
  `passation/cadrage/` ni dans `passation.json`).
- **Temps restant annoncé** : 60 minutes (question posée le 2026-11-18, au début de
  `/planifier-iterations`) ; reconfirmé à 60 minutes au début de l'itération 1 ; ~50 minutes
  au début de l'itération 2.
- **Durée du tour de test de l'équipe** : 10 minutes par itération.
- **Capacité** : chaque itération coûte au moins codage (≤ 10 min) + publication (~5 min) +
  tour de test (10 min), soit 15 à 25 minutes. Avec 60 minutes, 2 itérations détaillées tiennent
  confortablement (≈ 50 min au pire), en laissant ~10 min pour stabiliser avant le pitch — pas
  assez pour une 3ᵉ itération complète avec son propre tour de test.
- **✂️ Hors périmètre de cette session** (reporté en « À venir », à ne pas commencer sans
  revalider le temps restant) : les branches de refus (CMRA, tribunal judiciaire), l'écran
  « situer son étape », et l'écran dédié aux ressources de soutien. Le plan de livraison de
  l'équipe les place en 2ᵉ, 3ᵉ et 4ᵉ étapes ; elles ne tiennent pas dans les 60 minutes annoncées
  si on fait déjà le squelette + le parcours « première demande ».

---

## Itération 1 : le chatbot démarre et affiche son écran d'accueil

- **Dans le périmètre** :
  - squelette conforme au contrat de déployabilité (`api/`, `frontend/`, `Dockerfile` de chaque
    service, `/health` et `/sante`) ;
  - `.env.example` et `DEPLOIEMENT.md` à la racine ;
  - l'écran d'accueil du chatbot (texte d'intro ENDOmind + les 3 choix de situation : « je n'ai
    pas encore fait de demande », « j'ai reçu un refus », « je veux juste savoir ») reproduit
    depuis `passation/prototype/index.html` (`screen-1`), affiché en dur : les boutons sont
    visibles mais ne naviguent pas encore.
- **Hors périmètre** : toute navigation entre écrans, tout contenu au-delà de l'accueil.
- **Critères d'acceptation** :
  - Étant donné l'URL publique de l'application, quand une visiteuse l'ouvre, alors elle voit
    l'écran d'accueil du chatbot ENDOmind avec les 3 choix de situation.
  - Étant donné l'application déployée, quand on appelle `/health` et `/sante` sur le port 8080,
    alors les deux répondent `200`.
- **Hypothèse de l'équipe couverte** : aucune — cette itération pose le décor, elle ne mesure
  pas encore « la patiente identifie l'étape suivante ».
- **Codage estimé** : 10 minutes.
- **Fichiers prévus** : `frontend/` (page d'accueil du chatbot, composant d'en-tête), `.env.example`,
  `DEPLOIEMENT.md`.
- **Tests unitaires prévus** : aucun si l'écran est pur balisage (pas de logique métier à cette
  itération) — à confirmer au moment du codage ; si un mapping situation → libellé existe déjà,
  1 test dessus.
- **Étapes ajoutées à la démo** : ouvrir l'application, voir l'écran d'accueil du chatbot.
- **Bilan** :
  - Durée de codage réelle : 3 minutes (dans le budget, pas d'alarme déclenchée).
  - Critères d'acceptation : tous deux satisfaits (écran d'accueil visible avec les 3 choix ;
    `/health` et `/sante` répondent 200 sur 8080 et 8081, vérifié avec `curl` depuis la machine).
  - Tests unitaires : aucun ajouté — itération pure balisage, pas de logique métier
    (règle DoD point 2). `npm test` passe (2 tests existants côté `api/`).
  - Contrat de déployabilité : `./scripts/verifier-deployabilite.sh` → aucune borne, aucune
    alarme.
  - Déploiement : suivi de la recette du `/CLAUDE.md` du serveur jusqu'à l'étape 5 incluse
    (conformément à `docs/guidelines-deploiement.md`, qui exclut commit/push de cette recette) :
    plateforme démarrée, base `team25` créée (anticipation, pas encore utilisée), images
    construites et publiées sur `localhost:5000`, conteneurs `team25_frontend_1` et
    `team25_api_1` en ligne.
  - Rien bloqué par le harnais : pas de secret, tests verts.
  - Démo (hors DoD) : `e2e/demo.spec.ts` complété d'une étape (vérifie l'écran d'accueil et les
    3 choix), rejoué avec succès contre `localhost:8080`.
  - Signalé à PM Lab : version 1, réponse `moteur_avance: false` (version quand même enregistrée).
  - Reporté : rien de prévu n'a été coupé.
  - **Modifications** :
    - `frontend/src/app/page.tsx` — écran d'accueil du chatbot (en-tête, message de bienvenue,
      3 choix de situation non interactifs) ; sert le critère « écran d'accueil visible ».
    - `frontend/src/app/page.module.css` — styles de l'écran, palette ENDOmind reprise du
      prototype.
    - `frontend/src/app/layout.tsx` — titre et description de la page.
    - `frontend/nginx.conf` — en-têtes de sécurité et repli SPA repris du gabarit serveur ;
      sert la conformité au contrat de déployabilité et à la CSP du serveur.
    - `api/Dockerfile`, `frontend/Dockerfile` — images de base qualifiées en
      `docker.io/library/...` ; sert le déploiement (résolution des noms courts échoue sinon).
    - `.env.example` — variables lues par l'application (`PORT`) ; sert la règle 2 du contrat.
    - `DEPLOIEMENT.md` — fiche de reprise du dépôt ; sert la règle 8 du contrat.
    - `podman-compose.yml` (racine) — recette de déploiement sur cette VM.
    - `e2e/demo.spec.ts` — étape de démonstration de l'écran d'accueil (hors DoD).
  - **Provisoire** : les 3 boutons de l'écran d'accueil ne naviguent nulle part (pas de
    `onClick`) — tout le contenu après l'accueil est en dur dans le prototype, pas encore dans
    l'application ; `.env.example` ne liste que `PORT`, à étoffer dès qu'une base, un stockage ou
    une passerelle IA entrent en jeu.

## Itération 2 : le parcours « première demande » devient réel, jusqu'à l'action concrète

- **Dans le périmètre** : en choisissant « je n'ai pas encore fait de demande » ou « je veux
  juste savoir » sur l'écran d'accueil, la patiente est guidée, pas à pas, jusqu'à une action
  concrète à faire — contenu repris de `passation/prototype/index.html`
  (`screen-2a`/`screen-2c` → `screen-3a` → `screen-4a`) : explication de l'ALD 31 en langage
  doux, étapes de la procédure, puis la prochaine action concrète (« parler à son médecin
  traitant »).
- **Hors périmètre** : le choix « j'ai reçu un refus » (reste un bouton inactif ou redirigé vers
  un message « bientôt disponible »), l'écran de positionnement dans la procédure, l'écran de
  soutien dédié.
- **Critères d'acceptation** :
  - Étant donné l'écran d'accueil, quand la patiente choisit « je n'ai pas encore fait de
    demande » ou « je veux juste savoir », alors elle voit l'explication de l'ALD 31 puis les
    étapes de la procédure.
  - Étant donné qu'elle a parcouru ce chemin jusqu'au bout, quand l'échange se termine, alors
    une action concrète unique lui est présentée (parler à son médecin traitant).
  - Étant donné le choix « j'ai reçu un refus », quand elle clique dessus, alors un message
    explicite indique que ce parcours n'est pas encore disponible (pas d'erreur silencieuse).
- **Hypothèse de l'équipe couverte** : « le chatbot, en vulgarisant les étapes de la procédure
  ALD 31, permet à la patiente de ne pas rester bloquée faute d'information » — mesure :
  la patiente identifie la prochaine étape concrète.
- **Codage estimé** : 10 minutes.
- **Fichiers prévus** : composant(s) de navigation du chatbot côté `frontend/` (état de l'écran
  courant), fichier de contenu des étapes (texte), éventuellement une route `api/` si le contenu
  doit être servi par l'API plutôt qu'en dur côté front (à trancher au codage, dans l'esprit
  « 5 fichiers environ »).
- **Tests unitaires prévus** : 1 à 3, sur la logique de transition (quel écran suivant pour quel
  choix) — pas sur le balisage pur.
- **Étapes ajoutées à la démo** : choisir « je n'ai pas encore fait de demande », dérouler
  jusqu'à l'action concrète proposée.
- **Bilan** :
  - Durée de codage réelle : 4 minutes pour l'écriture du parcours (dans le budget, pas
    d'alarme déclenchée) ; une correction supplémentaire a suivi pendant la phase de
    vérification (voir ci-dessous), hors du chrono de codage mais avant le signal.
  - Décision de design tranchée au codage : contenu des écrans en dur côté `frontend/`
    (pas de route `api/` nouvelle) — le contenu est statique, identique pour toutes les
    visiteuses, une route API n'aurait rien apporté dans le budget de l'itération.
  - Critères d'acceptation :
    - 1 et 2 satisfaits : les choix « je n'ai pas encore fait de demande » et « je veux
      juste savoir » mènent à l'explication de l'ALD 31 puis aux étapes de la procédure
      (timeline reproduite de `screen-3a`), jusqu'à l'action concrète unique (« parler à
      son médecin traitant », `screen-4a`).
    - 3 satisfait : le choix « j'ai reçu un refus », ainsi que « Trouver du soutien autour
      de moi » sur l'écran final (même famille de cas, pas d'erreur silencieuse), affichent
      un message explicite « pas encore disponible ».
  - Tests unitaires : 3 ajoutés dans `frontend/src/app/chatbot-flow.test.ts`, sur la fonction
    pure `getNextScreen` (logique de transition entre écrans, pas sur le balisage). `npm test`
    passe (2 tests `api/` + 3 tests `frontend/`).
  - Contrat de déployabilité : `./scripts/verifier-deployabilite.sh` → aucune borne, aucune
    alarme (vérifié avant et après la correction de CSP ci-dessous).
  - **Incident trouvé en vérification, corrigé avant signal** : la `Content-Security-Policy`
    posée en itération 1 ne déclarait pas de `script-src`, donc `default-src 'self'`
    s'appliquait aussi aux scripts — elle bloquait les scripts inline que Next.js injecte
    lui-même pour l'hydratation (bootstrap React, payload du routeur). Résultat : la page
    s'affichait, mais aucun bouton ne réagissait (erreur silencieuse, visible seulement dans
    la console du navigateur — `Minified React error #412`). Corrigé en ajoutant
    `script-src 'self' 'unsafe-inline'` aux 4 en-têtes CSP de `frontend/nginx.conf` ; ce point
    avait pourtant été signalé explicitement par le `/CLAUDE.md` du serveur (« elle ne
    déclare pas de `script-src` [...] et la page rend blanc sans erreur serveur ») — relu
    trop vite en itération 1, où l'absence de bouton interactif masquait le symptôme.
  - Déploiement : image `frontend` reconstruite et publiée deux fois (une fois avec le
    nouveau code, une seconde après la correction de CSP) ; `api` inchangée, non
    reconstruite. Conteneurs recréés via `podman compose ... up -d --force-recreate`.
    `/health` et `/sante` répondent `200` sur 8080 et 8081 (vérifié avec `curl` depuis la
    machine, après la correction).
  - Rien bloqué par le harnais : pas de secret, tests verts.
  - Démo (hors DoD) : `e2e/demo.spec.ts` complété d'une étape (parcours « première demande »
    jusqu'à l'action concrète), rejouée avec succès contre `localhost:8080` après la
    correction de CSP (elle avait échoué en timeout avant, pour la même raison que
    l'incident ci-dessus — bon indicateur que la démo attrape ce genre de panne).
  - Signalé à PM Lab : version 2, réponse `moteur_avance: false` (version enregistrée, la
    squad peut la tester).
  - Vérification du développeur demandée, sans bloquer le signal : confirmer dans un
    navigateur que `$URL_PUBLIQUE/health` et `$URL_PUBLIQUE/sante` répondent 200.
  - Reporté : rien de prévu n'a été coupé.
  - **Modifications** :
    - `frontend/src/app/chatbot-flow.ts` — logique pure de transition entre écrans
      (`getNextScreen`) ; sert les 3 critères d'acceptation (quel écran suivant pour quel
      choix, y compris le refus → indisponible).
    - `frontend/src/app/chatbot-flow.test.ts` — 3 tests unitaires sur cette logique ; sert
      le point 2 de la DoD.
    - `frontend/src/app/page.tsx` — composant client (`"use client"`, `useState`) : rendu
      des 6 écrans (accueil, intro × 2, étapes, action, indisponible) et branchement des
      boutons sur `getNextScreen` ; sert les 3 critères d'acceptation.
    - `frontend/src/app/page.module.css` — styles ajoutés pour les nouveaux éléments
      (bulle utilisateur, boutons primaire/secondaire, timeline des étapes, carte ressource) ;
      palette et gabarit repris du prototype.
    - `frontend/nginx.conf` — ajout de `script-src 'self' 'unsafe-inline'` à la CSP ; sert
      la correction de l'incident ci-dessus, sans quoi aucun écran du critère 1 n'est
      atteignable.
    - `e2e/demo.spec.ts` — étape de démonstration du parcours « première demande » (hors
      DoD).
  - **Provisoire** : le bouton « Accéder au guide ENDOmind → » (carte ressource de l'écran
    final) n'a pas de cible réelle — aucun document n'est fourni dans la passation ; le
    bouton « Trouver du soutien autour de moi → » mène au même message « pas encore
    disponible » que « j'ai reçu un refus », en anticipation de l'écran dédié listé dans
    « À venir ».

---

## À venir (non détaillé, ordre de priorité du plan de l'équipe)

1. Branches de refus : orientation CMRA puis tribunal judiciaire (`screen-2b`, `3b`, `3c`, `4b`).
2. Situer son étape : écran de positionnement pour une patiente déjà engagée (`screen-3d`).
3. Trouver du soutien : écran ressources (groupes de parole, cafés patientes, ETP, guides)
   accessible à tout moment (`screen-5`).
