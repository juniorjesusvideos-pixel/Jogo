import type { NewNpcSpawn } from '../../db/schema';
const SPAWN_Y = 0;

export interface NpcSpawnFixtureRow {
  npcId: number;
  x: number;
  z: number;
  y?: number;
  heading?: number;
}

export function parseNpcSpawns(rows: NpcSpawnFixtureRow[]): NewNpcSpawn[] {
  return rows.map((row) => ({
    npcId: row.npcId,
    x: row.x,
    y: row.y ?? SPAWN_Y,
    z: row.z,
    heading: row.heading,
  }));
}
