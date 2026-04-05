import type { Dream, InterpretationContent } from "@/types/dream";

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
}

function isoAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

export const DEMO_DREAMS: Dream[] = [
  {
    id: "demo-1",
    user_id: "demo-user",
    title: "Vol au-dessus de l'ocean",
    raw_text:
      "Je volais au-dessus d'un ocean immense, l'eau etait d'un bleu profond presque violet. Je pouvais sentir le vent sur mon visage. En dessous, des baleines lumineuses nageaient en cercle.",
    structured_text:
      "Je volais au-dessus d'un ocean immense aux eaux d'un bleu profond, presque violet. Le vent caressait mon visage tandis qu'en contrebas, des baleines luminescentes nageaient en cercles majestueux.",
    voice_audio_path: null,
    emotional_intensity: 8,
    lucidity_level: 3,
    sleep_quality: 4,
    wake_time: null,
    dream_date: daysAgo(0),
    tags: ["vol", "ocean", "baleines", "lumiere"],
    emotions: ["wonder", "peace"],
    characters: [],
    places: ["ocean"],
    is_private: true,
    created_at: isoAgo(0),
    updated_at: isoAgo(0),
  },
  {
    id: "demo-2",
    user_id: "demo-user",
    title: "La maison aux escaliers infinis",
    raw_text:
      "J'etais dans une maison ancienne avec des escaliers qui ne finissaient jamais. Chaque etage avait une porte differente. Derriere l'une d'elles, ma grand-mere m'attendait avec un gateau.",
    structured_text:
      "Je me trouvais dans une maison ancienne parcourue d'escaliers sans fin. Chaque etage revelait une porte differente. Derriere l'une d'entre elles, ma grand-mere m'attendait, un gateau a la main.",
    voice_audio_path: null,
    emotional_intensity: 6,
    lucidity_level: 2,
    sleep_quality: 3,
    wake_time: null,
    dream_date: daysAgo(1),
    tags: ["maison", "escaliers", "portes", "famille"],
    emotions: ["wonder", "love"],
    characters: ["grand-mere"],
    places: ["maison ancienne"],
    is_private: true,
    created_at: isoAgo(1),
    updated_at: isoAgo(1),
  },
  {
    id: "demo-3",
    user_id: "demo-user",
    title: "Poursuite dans la foret de cristal",
    raw_text:
      "Quelqu'un me poursuivait dans une foret ou les arbres etaient en cristal. Ils tintaient comme des cloches quand le vent soufflait. J'ai trouve une clairiere avec un lac miroir.",
    structured_text:
      "Quelqu'un me poursuivait a travers une foret extraordinaire dont les arbres etaient faits de cristal. Ils tintaient comme des cloches sous le souffle du vent. J'ai fini par decouvrir une clairiere abritant un lac parfaitement lisse, tel un miroir.",
    voice_audio_path: null,
    emotional_intensity: 7,
    lucidity_level: 1,
    sleep_quality: 2,
    wake_time: null,
    dream_date: daysAgo(3),
    tags: ["foret", "cristal", "poursuite", "lac", "miroir"],
    emotions: ["fear", "wonder"],
    characters: ["inconnu"],
    places: ["foret de cristal", "clairiere", "lac"],
    is_private: true,
    created_at: isoAgo(3),
    updated_at: isoAgo(3),
  },
  {
    id: "demo-4",
    user_id: "demo-user",
    title: "Concert sous les etoiles",
    raw_text:
      "J'assistais a un concert en plein air. La musique etait tellement belle que les etoiles descendaient du ciel et dansaient autour de nous. Mon ami d'enfance jouait du piano.",
    structured_text:
      "J'assistais a un concert en plein air sous un ciel etoile. La musique etait si belle que les etoiles semblaient descendre du ciel pour danser autour de nous. Mon ami d'enfance etait au piano.",
    voice_audio_path: null,
    emotional_intensity: 9,
    lucidity_level: 4,
    sleep_quality: 5,
    wake_time: null,
    dream_date: daysAgo(5),
    tags: ["musique", "etoiles", "concert", "danse", "piano"],
    emotions: ["joy", "wonder"],
    characters: ["ami d'enfance"],
    places: ["plein air", "scene"],
    is_private: true,
    created_at: isoAgo(5),
    updated_at: isoAgo(5),
  },
];

export const DEMO_INTERPRETATIONS: Record<string, InterpretationContent> = {
  "demo-1": {
    spiritual:
      "Le vol symbolise votre aspiration a la liberte et a l'elevation spirituelle. L'ocean violet represente l'inconscient profond, tandis que les baleines lumineuses sont des guides interieurs — des archetypes de sagesse ancestrale qui circulent dans les profondeurs de votre psyche.",
    factual:
      "Les reves de vol sont associes a un sentiment de controle et de competence dans votre vie eveillee. L'imagerie oceanique suggere un traitement emotionnel profond pendant la phase REM. Les creatures bioluminescentes pourraient refleter des stimuli visuels recents ou un processus de consolidation memorielle.",
    blended:
      "Ce reve reflete un moment de grace interieure. Le vol au-dessus de l'ocean combine un besoin de recul emotionnel avec une confiance grandissante. Les baleines lumineuses, a la croisee du symbolique et du neuronal, suggerent que votre esprit integre des intuitions profondes avec serenite.",
  },
  "demo-2": {
    spiritual:
      "La maison aux escaliers infinis est un symbole classique de l'exploration de soi — chaque etage represente un niveau de conscience. Les portes sont des choix de vie, et votre grand-mere incarne l'archetype de la sagesse maternelle, vous offrant la nourriture emotionnelle dont vous avez besoin.",
    factual:
      "Les architectures impossibles dans les reves refletent le traitement spatial du cerveau pendant le sommeil. La presence de votre grand-mere active les circuits de memoire episodique et d'attachement, suggerant un besoin de reconfort ou de connexion familiale.",
    blended:
      "Ce reve mele exploration interieure et memoire affective. Les escaliers sans fin traduisent une quete de comprehension, tandis que la presence de votre grand-mere — ancrage emotionnel puissant — vous rappelle que les reponses se trouvent parfois dans la simplicite et la tendresse.",
  },
  "demo-3": {
    spiritual:
      "La poursuite dans la foret de cristal evoque une confrontation avec l'ombre jungienne. Le cristal, symbole de clarte et de fragilite, suggere que vous approchez d'une verite interieure delicate. Le lac miroir est une invitation a vous regarder en face.",
    factual:
      "Les reves de poursuite sont parmi les plus courants et reflètent souvent le stress ou l'evitement dans la vie eveille. La foret de cristal pourrait etre une reinterpretation onirique de stimuli auditifs (les tintements). Le lac calme indique une resolution naturelle du stress pendant le sommeil.",
    blended:
      "Ce reve oscille entre fuite et decouverte. La poursuite traduit une tension a resoudre, mais la beaute cristalline de la foret et le lac miroir suggerent que meme dans l'inconfort, votre inconscient vous guide vers un lieu de reflexion et de paix.",
  },
  "demo-4": {
    spiritual:
      "La musique qui fait descendre les etoiles est un puissant symbole d'harmonie cosmique. Votre ami d'enfance au piano represente l'innocence creatrice — une partie de vous qui sait encore jouer sans calcul. Les etoiles dansantes sont des benedictions de l'univers.",
    factual:
      "Ce reve a haute intensite emotionnelle et lucidite elevee suggere une phase REM particulierement active. La musique dans les reves active les memes zones cerebrales que l'ecoute reelle. Le sentiment de beauté transcendante est lie a la liberation de dopamine pendant le sommeil paradoxal.",
    blended:
      "Ce reve est une celebration interieure. La musique et les etoiles convergent pour creer un moment de plenitude onirique, tandis que la presence de votre ami d'enfance relie ce sentiment a vos racines emotionnelles les plus profondes.",
  },
};
