#!/usr/bin/env node
/**
 * Free Plantasia dev ports before starting Vite.
 * Stale servers on 5181–5185 usually mean an old tab is still running.
 */
import { execSync } from 'node:child_process';

const PORTS = [5180, 5181, 5182, 5183, 5184, 5185];

function pidsOnPort(port) {
  try {
    return execSync(`lsof -ti:${port}`, { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(Boolean);
  } catch {
    return [];
  }
}

let freed = 0;
for (const port of PORTS) {
  for (const pid of pidsOnPort(port)) {
    try {
      execSync(`kill ${pid}`);
      console.log(`  freed port ${port} (pid ${pid})`);
      freed++;
    } catch {
      // Process may have already exited.
    }
  }
}

if (freed === 0) {
  console.log('  dev ports already free');
} else {
  console.log(`  stopped ${freed} stale dev server(s)`);
}
