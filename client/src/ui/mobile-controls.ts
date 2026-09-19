import { getGameState } from '../test-hook';
import { openPanel } from './window-manager';

const ID = 'mobile-controls';

export function mountMobileControls(): HTMLElement {
  const existing = document.getElementById(ID);
  if (existing) return existing;

  const root = document.createElement('div');
  root.id = ID;
  root.innerHTML = `
    <div class="mobile-camera" aria-label="Camera controls">
      <button data-action="camera-left" aria-label="Rotate camera left">◀</button>
      <button data-action="camera-right" aria-label="Rotate camera right">▶</button>
    </div>
    <div class="mobile-actions" aria-label="Game controls">
      <button class="mobile-btn utility" data-action="interact">E<br><small>Falar</small></button>
      <button class="mobile-btn utility" data-action="inventory">🎒<br><small>Itens</small></button>
      <button class="mobile-btn skill" data-action="skill2">2</button>
      <button class="mobile-btn skill" data-action="skill1">1</button>
      <button class="mobile-btn attack" data-action="attack">⚔<br><small>Atacar</small></button>
    </div>
    <div class="mobile-hint">Toque no chão para mover • toque no inimigo para selecionar</div>
  `;

  const press = (action: string): void => {
    if (action === 'attack') window.__attack__?.();
    else if (action === 'skill1' || action === 'skill2') {
      const idx = action === 'skill1' ? 0 : 1;
      const skillId = getGameState().player.knownSkillIds[idx];
      if (skillId) window.__useSkill__?.(skillId);
    } else if (action === 'interact') {
      const nearby = getGameState().nearbyNpc;
      if (nearby?.npcId) window.__interact__?.(nearby.npcId);
    } else if (action === 'inventory') openPanel('inventory-window');
    else if (action === 'camera-left') window.__rotateCamera__?.(-0.18);
    else if (action === 'camera-right') window.__rotateCamera__?.(0.18);
  };

  root.addEventListener('pointerdown', (ev) => {
    const target = (ev.target as HTMLElement).closest<HTMLButtonElement>('button[data-action]');
    if (!target) return;
    ev.preventDefault();
    press(target.dataset['action'] ?? '');
  });
  document.body.appendChild(root);
  return root;
}
