# Reverie — archivé

**Ce projet a été rapatrié dans [Natalune](https://natalune.com).** Le journal
de rêves y vit désormais sur [natalune.com/reves](https://natalune.com/reves),
avec ce que ce dépôt-ci ne pouvait pas faire : l'interprétation est enrichie par
la carte natale de la personne, que Natalune est le seul à posséder.

Le partage y est le suivant : **consigner ses rêves est gratuit** — registre
manuel, émotions, calendrier, tableau de bord — et le Premium ajoute l'IA
par-dessus : structuration du récit, trois lectures du même rêve avec un
curseur du factuel au symbolique, et une aquarelle onirique.

Ce dépôt reste en ligne uniquement pour **rediriger**. Les quatre articles de
blog ont été portés dans Natalune avec leurs slugs intacts :

| Ici | Là-bas |
|---|---|
| `/blog/pourquoi-on-oublie-ses-reves` | [natalune.com/blog/pourquoi-on-oublie-ses-reves](https://natalune.com/blog/pourquoi-on-oublie-ses-reves) |
| `/blog/reves-les-plus-courants` | [natalune.com/blog/reves-les-plus-courants](https://natalune.com/blog/reves-les-plus-courants) |
| `/blog/jung-freud-deux-lectures-reve` | [natalune.com/blog/jung-freud-deux-lectures-reve](https://natalune.com/blog/jung-freud-deux-lectures-reve) |
| `/blog/lune-natale-influence-reves` | [natalune.com/blog/lune-natale-influence-reves](https://natalune.com/blog/lune-natale-influence-reves) |

Tout le reste — accueil, `/app`, `/login`, pages légales — mène à
`natalune.com/reves`. Les redirections sont des 308 (permanentes), déclarées
dans `next.config.ts`.

`robots.txt` et `sitemap.xml` sont volontairement **exclus** des redirections :
le sitemap continue d'annoncer les anciennes URL, ce qui est ce qui fait
repasser un crawler dessus pour qu'il découvre les 308.

## Si on veut éteindre pour de bon

Supprimer le projet Vercel fait disparaître les redirections avec lui. Tant
qu'il coûte zéro, mieux vaut le laisser tourner : c'est lui, et pas ce dépôt,
qui sert les 308.

## Ce qui n'a pas été repris

- La **capture vocale** (l'Edge Function Deepgram du dépôt `reverie`) — promise
  depuis mars, jamais branchée à un écran. C'est le seul actif à récupérer si
  on la reprend un jour.
- Le **chiffrement applicatif** annoncé sur la page d'accueil : il n'a jamais
  existé, et il n'est promis nulle part dans Natalune.
