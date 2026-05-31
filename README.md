# strategie-bascule-v3 — Édition Premium

Version ultime du guide de pilotage stratégique avec une UX/UI spectaculaire.

## Bibliothèques utilisées

| Bibliothèque | Rôle | CDN |
|---|---|---|
| **tsParticles** | Réseau de particules interactif en fond | jsdelivr |
| **GSAP + ScrollTrigger** | Animations fluides, transitions entre étapes | jsdelivr |
| **SplitType** | Animation lettre par lettre des titres | jsdelivr |

## Effets UX/UI

- 🌌 **Particules animées** — réseau de nœuds connectés (écosystème d'agents)
- 🫧 **Glass morphism** — cartes, navigation, footer en verre dépoli
- 🌈 **Gradients animés** — textes, bordures, accents
- ✨ **Micro-interactions** — hover, clic, transitions fluides
- 🎉 **Confettis** — célébration à la complétion des jalons/actions
- 🔮 **Orbes flottantes** — fond dynamique avec dégradés radiaux
- 📐 **Grille subtile** — texture de fond discrète
- 🎯 **Stepper animé** — progression visuelle des étapes

## Déploiement

```bash
cd projects/strategie-bascule-v3
python3 -m http.server 8080
```

GitHub Pages : `https://lofp34.github.io/strategie-bascule-v3/`

## Stack

- HTML/CSS/JS vanilla + CDN libraries
- Zéro build step, zéro npm install
- Déploiement GitHub Pages direct
- Dark/light mode
- localStorage pour la persistance
