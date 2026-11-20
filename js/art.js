// ============================================================
// 立绘资源 — 内联 SVG 角色画
// ============================================================
import { ART_STARTERS } from './art/starters.js';
import { ART_FOREST } from './art/forest.js';
import { ART_MOUNTAIN } from './art/mountain.js';
import { ART_SUMMIT } from './art/summit.js';
import { TYPE_INFO } from './data.js';

const ART = {
  ...ART_STARTERS,
  ...ART_FOREST,
  ...ART_MOUNTAIN,
  ...ART_SUMMIT,
};

export const ART_IDS = Object.keys(ART);

let _artUid = 0;

/** 返回一段 <svg> 立绘。artId 不存在时返回 emoji 兜底 */
export function artSVG(artId, opts = {}) {
  const fn = ART[artId];
  const variant = opts.variant ? ` variant-${opts.variant}` : '';
  const extra = opts.className ? ' ' + opts.className : '';
  if (!fn) {
    return `<div class="art-fallback${extra}">${opts.emoji || '❓'}</div>`;
  }
  const u = 'a' + (++_artUid);
  return `<svg class="creature-art${variant}${extra}" viewBox="0 0 200 200" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">${fn(u)}</svg>`;
}

/** 带属性光环的立绘容器（战斗/选择界面用） */
export function creatureArt(creature, opts = {}) {
  if (!creature) return '';
  const element = creature.element || 'normal';
  const info = TYPE_INFO[element] || TYPE_INFO.normal;
  const size = opts.size || 'md';
  const variant = creature.variant ? ` data-variant="${creature.variant}"` : '';
  return `
    <div class="art-frame size-${size} element-${element}${opts.className ? ' ' + opts.className : ''}" data-element="${element}"${variant}>
      <div class="art-aura" style="--aura:${info.color}"></div>
      <div class="art-ground"></div>
      <div class="art-body">${artSVG(creature.art || creature.id, { variant: creature.variant, emoji: creature.emoji })}</div>
      <div class="art-sparks"></div>
    </div>`;
}