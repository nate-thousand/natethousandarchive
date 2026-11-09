/**
 * Plantasia — AI insight service (local heuristics).
 *
 * The AI Laboratory's "intelligence" is, for now, a set of deterministic
 * heuristics that translate genes into natural language and propose creative
 * directions. This is intentionally swappable: the same function signatures can
 * later be backed by a real model / cloud endpoint without touching the UI.
 */
import type { OrganismGenes, SpeciesDefinition } from '@species/types';

/** Describe an organism's sound in evocative, beginner-friendly language. */
export function describeOrganism(species: SpeciesDefinition, genes: OrganismGenes): string {
  const brightness =
    genes.sunlight > 0.66 ? 'bright and open' : genes.sunlight > 0.33 ? 'warm' : 'dark and veiled';
  const body = genes.water > 0.6 ? 'liquid, resonant' : 'dry, focused';
  const motion = genes.wind > 0.6 ? 'restless and shifting' : 'calm and still';
  const length = genes.life > 0.6 ? 'long, lingering tails' : 'short, intimate decays';
  const weight = genes.soil > 0.6 ? 'deeply grounded' : 'light and airy';

  return (
    `This ${species.name.toLowerCase()} sings with a ${brightness} timbre — ${body} in body, ` +
    `${weight}, and ${motion}. Notes bloom with ${length}. ` +
    `It is built on ${species.sound.engine} synthesis across ${species.sound.voices} voices.`
  );
}

/** Suggest a creative mutation direction as a short, actionable sentence. */
export function suggestMutation(genes: OrganismGenes): string {
  const ideas: string[] = [];
  if (genes.sunlight < 0.4) ideas.push('let in more Sunlight for a brighter character');
  if (genes.wind < 0.3) ideas.push('add Wind to introduce movement');
  if (genes.life < 0.4) ideas.push('extend Life for longer, more ambient tails');
  if (genes.harmony < 0.4) ideas.push('raise Harmony for richer overtones');
  if (genes.soil < 0.3) ideas.push('deepen the Soil for more low-end weight');
  if (ideas.length === 0) {
    return 'This organism is well balanced — try a bold Randomize to discover a new lineage.';
  }
  return `Try this: ${ideas[0]}.`;
}

/** Generate a poetic name suggestion for a new organism from its genes. */
export function suggestName(species: SpeciesDefinition, genes: OrganismGenes): string {
  const moods = genes.sunlight > 0.6 ? ['Solar', 'Dawn', 'Lumen'] : ['Umbral', 'Dusk', 'Hollow'];
  const traits = genes.life > 0.6 ? ['Drift', 'Echo', 'Veil'] : ['Spark', 'Seed', 'Pulse'];
  const mood = moods[Math.floor(genes.water * moods.length) % moods.length];
  const trait = traits[Math.floor(genes.energy * traits.length) % traits.length];
  return `${mood} ${trait} ${species.name}`;
}
