// ============================================================
// 游戏状态管理
// ============================================================
import { STARTERS, createCard, RELICS, CARDS_DB } from './data.js';

export const state = {
  screen: 'title',
  player: null,
  map: null,
  currentFloor: 0,
  battle: null,
  shopItems: null,
  currentEvent: null,
  rewardCards: null,
  stats: null,
};

export function initPlayer(starterId) {
  const starter = STARTERS.find(s => s.id === starterId);
  if (!starter) return;
  state.player = {
    pokemon: {
      id: starter.id, name: starter.name, emoji: starter.emoji,
      art: starter.art || starter.id, element: starter.element, title: starter.title,
    },
    hp: starter.hp,
    maxHp: starter.maxHp,
    gold: 60,
    deck: starter.starterCards.map(id => createCard(id)),
    relics: [],
  };
  state.currentFloor = 0;
  state.stats = {
    battlesWon: 0, elitesWon: 0, bossesWon: 0, floorsCleared: 0,
    cardsPlayed: 0, damageDealt: 0, cardsAdded: 0, turns: 0,
  };
}

export function addCardToDeck(card) {
  state.player.deck.push(card);
  if (state.stats) state.stats.cardsAdded++;
}

export function removeCardFromDeck(uid) {
  const idx = state.player.deck.findIndex(c => c.uid === uid);
  if (idx >= 0) state.player.deck.splice(idx, 1);
}

export function addRelic(relic) {
  if (!state.player.relics.find(r => r.id === relic.id)) {
    state.player.relics.push({ ...relic });
    return true;
  }
  return false;
}

export function hasRelic(id) {
  return !!state.player && state.player.relics.some(r => r.id === id);
}

export function getRelic(id) {
  return state.player && state.player.relics.find(r => r.id === id);
}

export function modifyHp(amount) {
  const before = state.player.hp;
  state.player.hp = Math.max(0, Math.min(state.player.maxHp, state.player.hp + amount));
  return state.player.hp - before;
}

export function modifyGold(amount) {
  state.player.gold = Math.max(0, state.player.gold + amount);
}

export function getRelicBonus(type, context) {
  if (!state.player) return 0;
  let bonus = 0;
  for (const relic of state.player.relics) {
    if (relic.effect.type === type) {
      if (context && relic.effect.element && relic.effect.element !== context.element) continue;
      bonus += relic.effect.value || 0;
    }
  }
  return bonus;
}

export function setScreen(s) { state.screen = s; }

export function nextFloor() {
  state.currentFloor++;
  if (state.stats) state.stats.floorsCleared++;
}

export function upgradeCardSync(uid, db = CARDS_DB) {
  const card = state.player.deck.find(c => c.uid === uid);
  if (!card || card.upgraded) return false;
  const template = db[card.id];
  if (!template || !template.up) return false;
  const upgraded = createCard(card.id, true);
  // 保留原有 uid，避免外部引用失效
  card.upgraded = true;
  card.cost = upgraded.cost;
  card.effects = upgraded.effects;
  card.keywords = upgraded.keywords;
  card.name = upgraded.name;
  card.description = upgraded.description;
  return true;
}

export function relicById(id) {
  return RELICS.find(r => r.id === id);
}