export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "pourquoi-on-oublie-ses-reves",
    title: "Pourquoi on oublie 95% de ses reves au reveil",
    excerpt:
      "La science explique pourquoi les reves s'effacent en quelques secondes et comment les capturer avant qu'ils disparaissent.",
    content: `Le phenomene est universel : vous vous reveillez avec un reve vivide en tete, et quelques minutes plus tard, il s'est evapore. La neuroscience a une explication claire.

**La norepinephrine, cle de la memoire**

Pendant le sommeil paradoxal (REM), la phase ou les reves sont les plus intenses, le cerveau reduit drastiquement la production de norepinephrine — un neurotransmetteur essentiel a la consolidation des souvenirs. Sans lui, les experiences oniriques restent dans la memoire a court terme et s'effacent rapidement au reveil.

**La fenetre de 5 minutes**

Des etudes montrent que vous disposez d'environ 5 minutes apres le reveil pour ancrer un reve dans la memoire a long terme. C'est pourquoi tenir un journal de reves est si efficace : l'acte d'ecrire (ou de dicter) force le transfert vers la memoire declarative.

**Comment mieux se souvenir**

1. Gardez un carnet ou votre telephone a portee de main
2. Ne bougez pas immediatement au reveil — les mouvements accelerent l'oubli
3. Fermez les yeux et "rejouez" le reve mentalement avant de l'ecrire
4. Meme des fragments comptent : une couleur, une emotion, un lieu

**Le role de Reverie**

C'est exactement pour cette raison que Reverie est concu pour la capture express : en quelques secondes, vous dictez ou tapez l'essentiel, et l'IA s'occupe de structurer le reste. Pas besoin d'un recit complet — votre inconscient a deja fait le travail.`,
    date: "2026-04-01",
    tags: ["neuroscience", "memoire", "sommeil"],
  },
  {
    slug: "reves-les-plus-courants",
    title: "Les 5 reves les plus courants et ce qu'ils signifient",
    excerpt:
      "Chute libre, poursuite, dents qui tombent... Pourquoi certains reves reviennent chez tout le monde?",
    content: `Certains themes oniriques transcendent les cultures, les ages et les epoques. Voici les 5 plus universels et leurs interpretations croisees.

**1. La chute libre**

Le reve de chute est le plus repandu au monde. Cote neuroscience, il s'agit souvent d'une myoclonie hypnagogique — une contraction musculaire involontaire a l'endormissement. Cote symbolique, Jung y voit une perte de controle ou un lacher-prise necessaire.

**2. Etre poursuivi**

Le reve de poursuite active les memes circuits cerebraux que la peur reelle. Il reflete souvent l'evitement d'une situation stressante. En psychologie jungienne, le poursuivant represente l'"ombre" — un aspect de soi qu'on refuse de confronter.

**3. Les dents qui tombent**

Surprenamment universel, ce reve est souvent lie a l'anxiete sociale ou a la peur du jugement. Certaines traditions symboliques y voient un passage, une transformation.

**4. Voler**

Le reve de vol est associe a un sentiment de liberte et de competence. Plus votre vol est controle et agreable, plus il reflete une confiance dans votre vie eveillee.

**5. Se retrouver nu en public**

Ce reve exprime la vulnerabilite et la peur d'etre "decouvert". Il est particulierement frequent dans les periodes de transition professionnelle ou sociale.

**Et vous?**

Avec Reverie, vous pouvez suivre vos themes recurrents et decouvrir vos propres patterns. Chaque reve est une piece du puzzle de votre inconscient.`,
    date: "2026-04-03",
    tags: ["interpretation", "psychologie", "symboles"],
  },
  {
    slug: "jung-freud-deux-lectures-reve",
    title: "Jung vs Freud : deux lectures d'un meme reve",
    excerpt:
      "Decouvrez comment deux geants de la psychologie interpretent exactement le meme reve de facon radicalement differente.",
    content: `Imaginez ce reve : vous marchez dans une foret sombre et decouvrez une maison abandonnee. A l'interieur, un miroir vous montre un visage que vous ne reconnaissez pas.

**L'interpretation freudienne**

Pour Freud, le reve est un "accomplissement deguise d'un desir refoule". La foret sombre representerait l'inconscient ou reside des pulsions. La maison abandonnee serait le corps ou le "moi" neglige. Le miroir au visage inconnu pointerait vers un desir narcissique refoule — un aspect de soi qu'on refuse d'admettre par convention sociale.

**L'interpretation jungienne**

Pour Jung, le reve est un message compensatoire de l'inconscient. La foret est le voyage interieur — l'"individuation". La maison abandonnee represente un aspect de la psyche inexplore. Et le visage inconnu dans le miroir est l'"Ombre" — cette partie de nous-memes que nous n'avons pas encore integree. Jung dirait : "Ce reve vous invite a rencontrer qui vous etes vraiment."

**Qui a raison?**

Les deux approches ont leur valeur. Freud decortique le mecanisme (pourquoi ce reve maintenant?), tandis que Jung cherche la direction (vers quoi ce reve vous guide?). C'est pour cela que Reverie propose une jauge d'interpretation — pour que vous puissiez explorer les deux perspectives et trouver ce qui resonne avec vous.`,
    date: "2026-04-05",
    tags: ["psychologie", "jung", "freud", "interpretation"],
  },
  {
    slug: "lune-natale-influence-reves",
    title: "Votre signe lunaire influence-t-il vos reves?",
    excerpt:
      "La Lune gouverne les emotions et l'inconscient en astrologie. Quel lien avec votre monde onirique?",
    content: `En astrologie, la Lune represente l'inconscient, les emotions profondes et l'intuition. C'est le "moi nocturne" — celui qui s'exprime quand la conscience rationnelle dort.

**La Lune et le sommeil**

La Lune natale (votre signe lunaire a la naissance) revele votre paysage emotionnel interieur. Chaque signe lunaire colore differemment l'experience onirique :

- **Lune en Belier** : reves d'action, de combat, de departs impetueux
- **Lune en Taureau** : reves sensoriels, jardins, nourriture, confort
- **Lune en Gemeaux** : reves rapides, dialogues, changements de scene
- **Lune en Cancer** : reves de maison, famille, eau, nostalgie
- **Lune en Lion** : reves grandioses, scenes de theatre, reconnaissance
- **Lune en Vierge** : reves methodiques, details precis, resolution de problemes
- **Lune en Balance** : reves relationnels, beaute, harmonie
- **Lune en Scorpion** : reves intenses, transformation, secrets reveles
- **Lune en Sagittaire** : reves de voyage, aventure, expansion
- **Lune en Capricorne** : reves de structures, montagnes, accomplissement
- **Lune en Verseau** : reves futuristes, collectifs, inventions
- **Lune en Poissons** : reves fluides, oceaniques, mystiques

**La synergie Ciel Natal x Reverie**

En liant votre theme natal (calcule sur Ciel Natal) a votre journal Reverie, l'interpretation IA integre votre signe lunaire pour personnaliser l'analyse de vos reves. Votre Lune en Scorpion teinte l'interpretation differemment d'une Lune en Gemeaux.

Calculez votre theme natal gratuitement sur Ciel Natal, puis liez-le a votre compte Reverie pour des interpretations enrichies.`,
    date: "2026-04-05",
    tags: ["astrologie", "lune", "ciel-natal", "interpretation"],
  },
];
