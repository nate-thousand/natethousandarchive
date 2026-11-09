import type { BotanicalControls, SpeciesProfile } from '../data/ecosystem';

export type Point = { x: number; y: number };

export type OrganismBranch = {
  id: string;
  path: string;
  depth: number;
  width: number;
};

export type OrganismLeaf = {
  id: string;
  x: number;
  y: number;
  radius: number;
  angle: number;
};

export type OrganismFlower = {
  id: string;
  x: number;
  y: number;
  radius: number;
  petals: number;
};

export type OrganismNode = {
  id: string;
  x: number;
  y: number;
  radius: number;
};

export type OrganismConnection = {
  id: string;
  from: Point;
  to: Point;
};

export type OrganismParticle = {
  id: string;
  x: number;
  y: number;
  radius: number;
  drift: number;
};

export type OrganismRoot = {
  id: string;
  path: string;
  width: number;
};

export type OrganismGeometry = {
  width: number;
  height: number;
  core: { x: number; y: number; radius: number };
  branches: OrganismBranch[];
  leaves: OrganismLeaf[];
  flowers: OrganismFlower[];
  spores: OrganismParticle[];
  nodes: OrganismNode[];
  connections: OrganismConnection[];
  particles: OrganismParticle[];
  roots: OrganismRoot[];
};

const VIEW_WIDTH = 1000;
const VIEW_HEIGHT = 1000;

/**
 * Tiny deterministic PRNG (mulberry32) so an identical seed/species/control set
 * always produces the same organism. Keeps renders stable across frames.
 */
function createRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

type GrowthInput = {
  species: SpeciesProfile;
  controls: BotanicalControls;
  seed: string;
};

/**
 * Recursively build a branching skeleton. Branch count, spread, and depth all
 * scale with the species profile and the live botanical controls so adjusting a
 * knob visibly restructures the organism.
 */
export function generateOrganism({ species, controls, seed }: GrowthInput): OrganismGeometry {
  const random = createRandom(hashString(`${seed}:${species.name}`));
  const energy = controls.energy / 100;
  const growth = controls.growth / 100;
  const density = controls.density / 100;
  const evolution = controls.evolution / 100;
  const randomness = controls.random / 100;
  const space = controls.space / 100;

  const core = { x: VIEW_WIDTH / 2, y: VIEW_HEIGHT * 0.58, radius: 26 + energy * 22 };

  const branches: OrganismBranch[] = [];
  const leaves: OrganismLeaf[] = [];
  const flowers: OrganismFlower[] = [];
  const nodes: OrganismNode[] = [];

  const maxDepth = Math.round(3 + species.branchBias * 3 + growth * 2);
  const baseLength = (150 + growth * 130) * (0.85 + space * 0.5);

  function grow(
    origin: Point,
    angle: number,
    length: number,
    depth: number,
    trail: string,
  ): void {
    if (depth > maxDepth || length < 14) {
      return;
    }

    const wobble = (random() - 0.5) * (0.5 + randomness * 1.4) * (1 + evolution);
    const tipAngle = angle + wobble;
    const control: Point = {
      x: origin.x + Math.cos(angle - 0.2) * length * 0.5,
      y: origin.y + Math.sin(angle - 0.2) * length * 0.5,
    };
    const tip: Point = {
      x: origin.x + Math.cos(tipAngle) * length,
      y: origin.y + Math.sin(tipAngle) * length,
    };

    branches.push({
      id: `branch-${trail}`,
      path: `M ${origin.x.toFixed(1)} ${origin.y.toFixed(1)} Q ${control.x.toFixed(1)} ${control.y.toFixed(1)} ${tip.x.toFixed(1)} ${tip.y.toFixed(1)}`,
      depth,
      width: Math.max(1.2, (maxDepth - depth + 1) * 1.8 * (0.6 + energy * 0.8)),
    });

    if (random() < 0.5 + density * 0.4) {
      nodes.push({ id: `node-${trail}`, x: tip.x, y: tip.y, radius: 3 + density * 6 });
    }

    const leafChance = species.leafDensity * (0.5 + density);
    if (depth >= maxDepth - 2 && random() < leafChance) {
      leaves.push({
        id: `leaf-${trail}`,
        x: tip.x,
        y: tip.y,
        radius: 9 + species.leafDensity * 16 * (0.6 + growth),
        angle: (tipAngle * 180) / Math.PI,
      });
    }

    if (depth === maxDepth && random() < 0.35 + growth * 0.4) {
      flowers.push({
        id: `flower-${trail}`,
        x: tip.x,
        y: tip.y,
        radius: 14 + growth * 22,
        petals: 5 + Math.round(species.branchBias * 4 + evolution * 4),
      });
    }

    const childCount = 1 + (random() < 0.55 + species.branchBias * 0.4 ? 1 : 0) + (random() < density * 0.5 ? 1 : 0);
    const spread = 0.45 + species.branchBias * 0.7 + randomness * 0.4;
    for (let child = 0; child < childCount; child += 1) {
      const offset = (child - (childCount - 1) / 2) * spread;
      grow(tip, tipAngle + offset, length * (0.66 + growth * 0.12), depth + 1, `${trail}-${child}`);
    }
  }

  const trunks = 1 + Math.round(species.branchBias * 2 + density * 2);
  for (let trunk = 0; trunk < trunks; trunk += 1) {
    const baseAngle = -Math.PI / 2 + (trunk - (trunks - 1) / 2) * (0.3 + space * 0.35);
    grow(core, baseAngle, baseLength, 1, `${trunk}`);
  }

  const roots: OrganismRoot[] = [];
  const rootCount = 2 + Math.round(density * 4 + energy * 2);
  for (let index = 0; index < rootCount; index += 1) {
    const angle = Math.PI / 2 + (index - (rootCount - 1) / 2) * (0.24 + space * 0.2);
    const length = 120 + growth * 120 + random() * 80;
    const control: Point = {
      x: core.x + Math.cos(angle + 0.4) * length * 0.5,
      y: core.y + Math.sin(angle) * length * 0.5,
    };
    const tip: Point = {
      x: core.x + Math.cos(angle) * length * (0.4 + randomness),
      y: core.y + Math.sin(angle) * length,
    };
    roots.push({
      id: `root-${index}`,
      path: `M ${core.x.toFixed(1)} ${core.y.toFixed(1)} Q ${control.x.toFixed(1)} ${control.y.toFixed(1)} ${tip.x.toFixed(1)} ${tip.y.toFixed(1)}`,
      width: Math.max(1.4, 5 - index * 0.4),
    });
  }

  const connections: OrganismConnection[] = [];
  for (let index = 0; index < nodes.length - 1; index += 1) {
    if (random() < 0.28 + density * 0.4) {
      const target = nodes[(index + 1 + Math.floor(random() * 3)) % nodes.length];
      connections.push({
        id: `connection-${index}`,
        from: { x: nodes[index].x, y: nodes[index].y },
        to: { x: target.x, y: target.y },
      });
    }
  }

  const particleCount = Math.round(30 + density * 90 + energy * 40);
  const particles: OrganismParticle[] = [];
  for (let index = 0; index < particleCount; index += 1) {
    particles.push({
      id: `particle-${index}`,
      x: random() * VIEW_WIDTH,
      y: random() * VIEW_HEIGHT,
      radius: 0.6 + random() * 2.4 * (0.5 + clamp01(controls.texture / 100)),
      drift: random() * Math.PI * 2,
    });
  }

  const sporeCount = Math.round(8 + clamp01(controls.life / 100) * 26);
  const spores: OrganismParticle[] = [];
  for (let index = 0; index < sporeCount; index += 1) {
    const angle = random() * Math.PI * 2;
    const distance = 120 + random() * 320;
    spores.push({
      id: `spore-${index}`,
      x: core.x + Math.cos(angle) * distance,
      y: core.y + Math.sin(angle) * distance * 0.7,
      radius: 2 + random() * 4,
      drift: angle,
    });
  }

  return {
    width: VIEW_WIDTH,
    height: VIEW_HEIGHT,
    core,
    branches,
    leaves,
    flowers,
    spores,
    nodes,
    connections,
    particles,
    roots,
  };
}
