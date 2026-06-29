import { createPlantasiaEngine } from '../../../../frameworks/sound-engine/dist/public.js';
import { createDpadEngineAdapter } from './input/engineAdapter.js';
import {
  createDpadPlantasonicMapping,
  initPlantasonicSeed,
} from './input/dpadPlantasonicMapping.js';
import type { DpadDirection } from './input/types.js';

const DOUBLE_TAP_MS = 320;

const KEY_TO_DIR: Record<string, DpadDirection> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  Space: 'center',
};

const DIR_LABEL: Record<DpadDirection, string> = {
  up: 'UP · Bloom',
  down: 'DOWN · Roots',
  left: 'LEFT · Mold',
  right: 'RIGHT · Growth',
  center: 'CENTER · Seed',
};

const GP_TO_DIR: Record<number, DpadDirection> = {
  12: 'up',
  13: 'down',
  14: 'left',
  15: 'right',
  0: 'center',
};

const fmt = (v: number) => v.toFixed(2);

const el = {
  start: document.getElementById('startBtn')!,
  status: document.getElementById('status')!,
  activeDir: document.getElementById('activeDir')!,
  bloom: document.getElementById('bloomVal')!,
  roots: document.getElementById('rootsVal')!,
  mold: document.getElementById('moldVal')!,
  growth: document.getElementById('growthVal')!,
  bacteria: document.getElementById('bacteriaVal')!,
  lastEvent: document.getElementById('lastEvent')!,
  pad: document.getElementById('dpad')!,
  panic: document.getElementById('panicBtn')!,
};

const engine = createPlantasiaEngine();
const adapter = createDpadEngineAdapter(engine);
const mapping = createDpadPlantasonicMapping(adapter, {
  onStateChange: render,
});

const held = new Set<DpadDirection>();
const lastTap: Partial<Record<DpadDirection, number>> = {};
const gpWasDown = new Map<number, boolean>();
let ready = false;
let booting: Promise<boolean> | null = null;
let gamepadIndex = -1;

function render() {
  const s = mapping.getState();
  el.activeDir.textContent = s.activeDirection ? DIR_LABEL[s.activeDirection] : '—';
  el.bloom.textContent = fmt(s.bloom);
  el.roots.textContent = fmt(s.roots);
  el.mold.textContent = fmt(s.mold);
  el.growth.textContent = fmt(s.growth);
  el.bacteria.textContent = fmt(s.bacteria);
  el.lastEvent.textContent = s.lastEvent;

  el.pad.querySelectorAll<HTMLElement>('[data-dir]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.dir === s.activeDirection);
  });
}

async function boot(): Promise<boolean> {
  try {
    await initPlantasonicSeed(adapter);
    ready = true;
    el.status.textContent = 'Ready — arrow keys, d-pad, or gamepad';
    el.status.classList.add('ready');
    el.start.hidden = true;
    render();
    return true;
  } catch (err) {
    console.error('[dpad]', err);
    el.status.textContent = 'Failed — run npm run dev (http://localhost:5173)';
    el.status.classList.remove('ready');
    return false;
  }
}

async function ensureReady(): Promise<boolean> {
  if (ready) return true;
  if (!booting) {
    el.status.textContent = 'Loading Seed sound world…';
    booting = boot().finally(() => {
      booting = null;
    });
  }
  return booting;
}

function press(dir: DpadDirection) {
  if (!ready) return;
  const now = performance.now();
  const prev = lastTap[dir] ?? 0;
  if (now - prev < DOUBLE_TAP_MS && prev > 0) {
    mapping.onDoubleTap(dir);
    lastTap[dir] = 0;
  } else {
    mapping.onPress(dir);
    lastTap[dir] = now;
  }
  held.add(dir);
  render();
}

function release(dir: DpadDirection) {
  if (!ready) return;
  held.delete(dir);
  mapping.onRelease(dir);
  render();
}

async function pressWithBoot(dir: DpadDirection) {
  if (!(await ensureReady())) return;
  press(dir);
}

async function releaseWithBoot(dir: DpadDirection) {
  if (!ready) return;
  release(dir);
}

function holdLoop() {
  if (ready) {
    for (const dir of held) mapping.onHold(dir);
  }
  requestAnimationFrame(holdLoop);
}

function bindKeyboard() {
  document.addEventListener('keydown', (e) => {
    const dir = KEY_TO_DIR[e.code];
    if (!dir || e.repeat) return;
    e.preventDefault();
    void pressWithBoot(dir);
  });

  document.addEventListener('keyup', (e) => {
    const dir = KEY_TO_DIR[e.code];
    if (!dir) return;
    e.preventDefault();
    release(dir);
  });
}

function bindScreenPad() {
  el.pad.querySelectorAll<HTMLButtonElement>('[data-dir]').forEach((btn) => {
    const dir = btn.dataset.dir as DpadDirection;
    btn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      btn.setPointerCapture(e.pointerId);
      void pressWithBoot(dir);
    });
    btn.addEventListener('pointerup', (e) => {
      e.preventDefault();
      release(dir);
    });
    btn.addEventListener('pointerleave', () => release(dir));
    btn.addEventListener('pointercancel', () => release(dir));
  });
}

function bindGamepad() {
  window.addEventListener('gamepadconnected', (e) => {
    gamepadIndex = e.gamepad.index;
    el.status.textContent = ready
      ? `Ready · gamepad: ${e.gamepad.id.slice(0, 24)}`
      : el.status.textContent;
  });

  window.addEventListener('gamepaddisconnected', (e) => {
    if (e.gamepad.index === gamepadIndex) {
      gamepadIndex = -1;
      gpWasDown.clear();
    }
  });

  const poll = () => {
    if (navigator.getGamepads) {
      const pads = navigator.getGamepads();

      if (gamepadIndex < 0) {
        for (let i = 0; i < pads.length; i++) {
          if (pads[i]?.connected) {
            gamepadIndex = i;
            break;
          }
        }
      }

      const gp = pads[gamepadIndex];
      if (gp?.connected) {
        for (const [idxStr, dir] of Object.entries(GP_TO_DIR)) {
          const idx = Number(idxStr);
          const down = !!gp.buttons[idx]?.pressed;
          const was = gpWasDown.get(idx) ?? false;

          if (down && !was) void pressWithBoot(dir);
          if (!down && was) release(dir);
          gpWasDown.set(idx, down);
        }
      }
    }
    requestAnimationFrame(poll);
  };
  requestAnimationFrame(poll);
}

el.start.addEventListener('click', () => {
  void ensureReady();
});
el.panic.addEventListener('click', () => {
  mapping.panic();
  held.clear();
  gpWasDown.clear();
  render();
});

bindKeyboard();
bindScreenPad();
bindGamepad();
holdLoop();
render();
