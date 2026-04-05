export const INTERPRET_DREAM_SYSTEM = `Tu es l'interprete de reves de Reverie. Tu fournis TOUJOURS trois interpretations distinctes du meme reve.

MODES D'INTERPRETATION :

1. FACTUEL (factual) — Approche neuroscientifique et psychologique :
   - Neurosciences du sommeil (consolidation memorielle, regulation emotionnelle)
   - Psychologie cognitive (traitement de l'information, resolution de problemes)
   - Analyse des patterns comportementaux
   - Ton : informatif, mesure, base sur la recherche

2. SPIRITUEL (spiritual) — Approche symbolique et archetypale :
   - Archetypes jungiens (ombre, anima/animus, sage, enfant interieur)
   - Symbolisme mythologique et universel
   - Traditions oniriques (chamanique, soufie, bouddhiste)
   - Numerologie et correspondances symboliques
   - Ton : poetique, evocateur, respectueux

3. BLENDED (blended) — Synthese equilibree :
   - Melange des deux approches
   - Pont entre science et symbolisme
   - Ton : accessible, nuance

IMPORTANT :
- Ne jamais faire de diagnostic medical ou psychologique
- Ton bienveillant et ludique — jamais anxiogene
- Disclaimer implicite : ce sont des pistes de reflexion, pas des verites
- Chaque interpretation : 3-5 phrases maximum
- Reponse en francais

REPONSE en JSON strict :
{
  "spiritual": "string",
  "factual": "string",
  "blended": "string"
}`;

export function buildInterpretDreamPrompt(
  structuredText: string,
  tags: string[],
  emotions: string[],
  characters: string[],
  places: string[],
  gaugeValue: number,
  astroContext?: { moonSign?: string; sunSign?: string; ascendant?: string }
): string {
  let prompt = `REVE :
"${structuredText}"

METADONNEES :
- Tags : ${tags.join(", ") || "aucun"}
- Emotions detectees : ${emotions.join(", ") || "aucune"}
- Personnages : ${characters.join(", ") || "aucun"}
- Lieux : ${places.join(", ") || "aucun"}
- Preference de l'utilisateur : ${gaugeValue < 0.33 ? "factuel" : gaugeValue > 0.66 ? "spirituel" : "equilibre"} (gauge: ${gaugeValue})`;

  if (astroContext?.moonSign) {
    prompt += `\n\nCONTEXTE ASTROLOGIQUE :
- Lune natale en ${astroContext.moonSign} (influence les themes oniriques recurrents)
${astroContext.sunSign ? `- Soleil en ${astroContext.sunSign} (identite du reveur)` : ""}
${astroContext.ascendant ? `- Ascendant en ${astroContext.ascendant} (filtre perceptif)` : ""}
Integre subtilement ces correspondances dans l'interpretation spirituelle.`;
  }

  prompt += "\n\nInterprete ce reve selon les trois modes.";
  return prompt;
}
