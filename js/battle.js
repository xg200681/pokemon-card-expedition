// ============================================================
// 战斗系统 — 类杀戮尖塔机制
// ============================================================
import { state, modifyHp, getRelicBonus, hasRelic, getRelic } from './game.js';
import { ENEMIES, BOSSES, createCard, getTypeMultiplier, CARDS_DB } from './data.js';

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function addLog(text, type = '') {
  const b = state.battle;
  if (!b) return;
  b.log.push({ text, type });
  if (b.log.length > 80) b.log.shift();
}

function pushFx(entry) {
  if (!state.battle) return;
  state.battle.fx.push(entry);
}

export function takeFx() {
  if (!state.battle) return [];
  const fx = state.battle.fx;
  state.battle.fx = [];
  return fx;
}

// ---------- 抽牌 / 弃牌 ----------
function drawCards(count) {
  const b = state.battle;
  let drawn = 0;
  for (let i = 0; i < count; i++) {
    if (b.hand.length >= 10) break;
    if (b.drawPile.length === 0) {
      if (b.discardPile.length === 0) break;
      b.drawPile = shuffleArray([...b.discardPile]);
      b.discardPile = [];
      addLog('弃牌堆已洗回抽牌堆。', 'info');
    }
    b.hand.push(b.drawPile.pop());
    drawn++;
  }
  return drawn;
}

export function getCardCost(card) {
  if (card.keywords && card.keywords.includes('xcost')) return 'X';
  let cost = card.cost;
  if (card.type === 'skill' && hasRelic('choice_band')) cost += 1;
  return cost;
}

// ---------- 战斗启动 ----------
export function startBattle(enemyId, opts = {}) {
  const tpl = ENEMIES[enemyId] || BOSSES[enemyId];
  if (!tpl) { console.error('Unknown enemy:', enemyId); return; }

  const maxEnergy = 3 + getRelicBonus('max_energy', null);
  state.battle = {
    enemy: {
      ...JSON.parse(JSON.stringify(tpl)),
      currentHp: tpl.hp, maxHp: tpl.hp,
      block: 0, strength: 0, vulnerable: 0, weak: 0, poison: 0, burn: 0,
      moveIndex: 0, currentMove: null, powers: [],
    },
    drawPile: [], hand: [], discardPile: [], exhaustPile: [],
    energy: maxEnergy, maxEnergy,
    block: 0, strength: 0, dexterity: 0, thorns: 0, plated: 0,
    vulnerable: 0, weak: 0, poison: 0, burn: 0,
    powers: [], futureDraw: 0,
    turn: 1,
    cardsPlayedThisTurn: 0, cardsPlayedTotal: 0,
    log: [], fx: [],
    isPlayerTurn: true, battleOver: false, won: false,
    isElite: !!opts.elite, nodeType: opts.nodeType || null,
    damageDealt: 0,
  };

  // 牌组拷贝并洗牌
  state.battle.drawPile = state.player.deck.map(c => ({ ...c, effects: { ...c.effects } }));
  shuffleArray(state.battle.drawPile);

  // 遗物：战斗开始效果
  const startBlock = getRelicBonus('battle_start_block', null);
  if (startBlock) state.battle.block += startBlock;
  const startStr = getRelicBonus('battle_start_strength', null);
  if (startStr) state.battle.strength += startStr;
  const startThorns = getRelicBonus('battle_start_thorns', null);
  if (startThorns) state.battle.thorns += startThorns;
  const startHeal = getRelicBonus('battle_start_heal', null);
  if (startHeal) modifyHp(startHeal);

  // 固有牌优先入手
  const innate = [];
  for (let i = state.battle.drawPile.length - 1; i >= 0; i--) {
    const c = state.battle.drawPile[i];
    if (c.keywords && c.keywords.includes('innate')) {
      innate.push(c);
      state.battle.drawPile.splice(i, 1);
    }
  }
  innate.reverse().forEach(c => state.battle.hand.push(c));

  // 首回合额外能量（遗物）
  state.battle.energy += getRelicBonus('first_turn_energy', null);

  // 抽初始手牌
  drawCards(Math.max(0, 5 + getRelicBonus('extra_draw', null) - innate.length));
  updateEnemyIntent();
  addLog(`野生的 ${tpl.name} 出现了！`, 'start');
  addLog('--- 你的回合 ---', 'turn');
  pushFx({ kind: 'battleStart', enemy: true, elite: !!state.battle.isElite, boss: !!tpl.isBoss, text: tpl.bossName || tpl.name });
  if (tpl.isBoss) {
    addLog(tpl.intros || '', 'info');
    pushFx({ kind: 'bossIntro', text: tpl.bossName || tpl.name });
  }
}

export function canPlayCard(handIndex) {
  const b = state.battle;
  if (!b || b.battleOver || !b.isPlayerTurn) return false;
  const card = b.hand[handIndex];
  if (!card) return false;
  const cost = getCardCost(card);
  if (cost === 'X') return b.energy >= 0;
  return b.energy >= cost;
}

// ---------- 伤害计算 ----------
function calcPlayerDamage(card, effects) {
  let dmg = effects.damage || 0;
  dmg += state.battle.strength * 2;
  dmg += getRelicBonus('attack_damage', null);
  dmg += getRelicBonus('element_damage', { element: card.element });
  if (card.type === 'attack' && hasRelic('choice_band')) {
    dmg += getRelic('choice_band').effect.attackBonus;
  }
  const typeMult = getTypeMultiplier(card.element, state.battle.enemy.element || 'normal');
  dmg = Math.floor(dmg * typeMult);
  if (state.battle.weak > 0) dmg = Math.floor(dmg * 0.75);
  if (state.battle.enemy.vulnerable > 0) dmg = Math.floor(dmg * 1.5);
  return Math.max(0, dmg);
}

/** 卡牌面板预估伤害（每段） */
export function getCardDamagePreview(card) {
  if (!state.battle || !card) return 0;
  if (card.effects.xDamage) {
    return Math.floor((card.effects.xDamage * Math.max(1, state.battle.energy) + state.battle.strength * 2) * getTypeMultiplier(card.element, state.battle.enemy.element));
  }
  if (!card.effects.damage) return 0;
  return calcPlayerDamage(card, card.effects);
}

function calcEnemyDamage(move) {
  const b = state.battle;
  let dmg = move.damage || 0;
  dmg += b.enemy.strength * 2;
  if (b.enemy.weak > 0) dmg = Math.floor(dmg * 0.75);
  if (b.vulnerable > 0 && !hasRelic('everstone')) dmg = Math.floor(dmg * 1.5);
  return Math.max(0, dmg);
}

// ---------- 打牌 ----------
export function playCard(handIndex) {
  const b = state.battle;
  if (!canPlayCard(handIndex)) return null;

  const card = b.hand[handIndex];
  const costDisplay = getCardCost(card);
  const cost = costDisplay === 'X' ? b.energy : costDisplay;
  const energyAtPlay = b.energy;

  b.energy -= cost;
  b.hand.splice(handIndex, 1);
  b.cardsPlayedThisTurn++;
  b.cardsPlayedTotal++;
  if (state.stats) state.stats.cardsPlayed++;

  pushFx({ kind: 'card', card, element: card.element, type: card.type });

  const result = applyCardEffects(card, { energyAtPlay, costDisplay });

  // 卡牌去向
  if (card.keywords && card.keywords.includes('exhaust')) {
    b.exhaustPile.push(card);
    addLog(`「${card.name}」被消耗了。`, 'info');
  } else if (card.type === 'power') {
    b.powers.push(card);
    addLog(`「${card.name}」能力生效！`, 'buff');
  } else {
    b.discardPile.push(card);
  }

  // 遗物：贝壳之铃
  if (hasRelic('shell_bell')) {
    const r = getRelic('shell_bell');
    if (b.cardsPlayedTotal % r.effect.playCount === 0) {
      const healed = modifyHp(r.effect.value);
      addLog(`🔔 贝壳之铃回复了 ${healed} HP！`, 'heal');
      pushFx({ kind: 'heal', amount: healed });
    }
  }

  if (b.hand.length === 0 && b.energy > 0) {
    // 无操作
  }

  checkEnemyDeath();
  if (state.stats && result.damage > 0) state.stats.damageDealt += result.damage;
  return result;
}

function applyCardEffects(card, ctx) {
  const b = state.battle;
  const e = card.effects;
  const result = { card, damage: 0, totalDamage: 0, block: 0, heal: 0, draw: 0, played: true };

  // ---- X 费 ----
  let damageValue = e.damage;
  if (e.xDamage) {
    const spent = ctx.energyAtPlay;
    damageValue = e.xDamage * Math.max(1, spent);
    if (spent === 0) damageValue = 0;
  }

  // ---- 攻击 ----
  if (damageValue) {
    const hits = e.hits || 1;
    const perHitEffects = { ...e, damage: damageValue };
    let total = 0;
    for (let h = 0; h < hits; h++) {
      if (b.enemy.currentHp <= 0) break;
      const dmg = calcPlayerDamage(card, perHitEffects);
      total += applyDamageToEnemy(dmg);
      result.damage = dmg;
      pushFx({
        kind: 'enemyHit', damage: dmg, element: card.element,
        cardType: card.type, hit: h + 1, hits,
        strong: getTypeMultiplier(card.element, b.enemy.element) > 1,
        weak: getTypeMultiplier(card.element, b.enemy.element) < 1,
      });
    }
    result.totalDamage = total;
    let msg = `「${card.name}」造成 ${total} 点伤害`;
    const tm = getTypeMultiplier(card.element, b.enemy.element);
    if (tm > 1) msg += '（效果拔群！）';
    else if (tm < 1) msg += '（效果不好…）';
    addLog(msg, 'damage');
    if (b.enemy.currentHp <= 0) { checkEnemyDeath(); return result; }
  }

  // ---- 护甲 ----
  if (e.block) {
    const gain = e.block + b.dexterity;
    b.block += gain;
    result.block = gain;
    addLog(`获得 ${gain} 点护甲。`, 'block');
    pushFx({ kind: 'block', amount: gain });
  }

  // ---- 回复 ----
  if (e.heal) {
    const healed = modifyHp(e.heal);
    result.heal = healed;
    addLog(`回复 ${healed} 点HP。`, 'heal');
    pushFx({ kind: 'heal', amount: healed });
  }

  // ---- 抽牌 / 能量 ----
  if (e.draw) {
    drawCards(e.draw);
    addLog(`抽了 ${e.draw} 张牌。`, 'info');
    pushFx({ kind: 'draw', amount: e.draw });
  }
  if (e.energy) {
    b.energy += e.energy;
    addLog(`获得 ${e.energy} 点能量。`, 'buff');
    pushFx({ kind: 'energy', amount: e.energy });
  }

  // ---- 能力生效 ----
  if (e.futureDraw) {
    b.futureDraw += e.futureDraw;
    addLog(`每回合将多抽 ${e.futureDraw} 张牌。`, 'buff');
    pushFx({ kind: 'buff', text: `预知未来 +${e.futureDraw}` });
  }

  // ---- 自伤 ----
  if (e.selfDamage) {
    modifyHp(-e.selfDamage);
    addLog(`失去 ${e.selfDamage} 点HP。`, 'damage');
    pushFx({ kind: 'playerHit', damage: e.selfDamage, self: true });
    if (state.player.hp <= 0) { loseBattle(); return result; }
  }
  if (e.selfBlockLoss) {
    b.block = Math.max(0, b.block - e.selfBlockLoss);
  }

  // ---- 自身状态 ----
  if (e.strength) { b.strength += e.strength; addLog(`力量 +${e.strength}！`, 'buff'); pushFx({ kind: 'buff', text: `力量 +${e.strength}` }); }
  if (e.dexterity) { b.dexterity += e.dexterity; addLog(`敏捷 +${e.dexterity}！`, 'buff'); pushFx({ kind: 'buff', text: `敏捷 +${e.dexterity}` }); }
  if (e.thorns) { b.thorns += e.thorns; addLog(`荆棘 +${e.thorns}！`, 'buff'); pushFx({ kind: 'buff', text: `荆棘 +${e.thorns}` }); }
  if (e.plated) { b.plated += e.plated; addLog(`金属化 +${e.plated}！`, 'buff'); pushFx({ kind: 'buff', text: `金属化 +${e.plated}` }); }

  // ---- 敌人状态 ----
  if (e.vulnerable) { b.enemy.vulnerable += e.vulnerable; addLog(`${b.enemy.name} 获得 ${e.vulnerable} 层易伤。`, 'debuff'); pushFx({ kind: 'debuff', text: `易伤 +${e.vulnerable}` }); }
  if (e.weak) { b.enemy.weak += e.weak; addLog(`${b.enemy.name} 获得 ${e.weak} 层虚弱。`, 'debuff'); pushFx({ kind: 'debuff', text: `虚弱 +${e.weak}` }); }
  if (e.poison) { b.enemy.poison += e.poison; addLog(`${b.enemy.name} 获得 ${e.poison} 层中毒。`, 'debuff'); pushFx({ kind: 'debuff', text: `中毒 +${e.poison}` }); }
  if (e.burn) { b.enemy.burn += e.burn; addLog(`${b.enemy.name} 获得 ${e.burn} 层灼伤。`, 'debuff'); pushFx({ kind: 'debuff', text: `灼伤 +${e.burn}` }); }

  // ---- 生成卡牌 ----
  if (e.addCards) {
    for (const [cid, n] of Object.entries(e.addCards)) {
      for (let i = 0; i < n; i++) {
        const c = createCard(cid);
        if (c && b.hand.length < 10) b.hand.push(c);
      }
    }
    addLog('卡牌加入了手牌。', 'info');
  }

  checkEnemyDeath();
  return result;
}

function applyDamageToEnemy(dmg) {
  const en = state.battle.enemy;
  let rem = dmg;
  let blocked = 0;
  if (en.block > 0) {
    if (en.block >= rem) { en.block -= rem; blocked = rem; rem = 0; }
    else { blocked = en.block; rem -= en.block; en.block = 0; }
  }
  if (rem > 0) en.currentHp = Math.max(0, en.currentHp - rem);
  if (blocked > 0) {
    addLog(`敌人的护甲抵消了 ${blocked} 点伤害。`, 'block');
    pushFx({ kind: 'enemyBlocked', amount: blocked });
  }
  return dmg - blocked;
}

function applyDamageToPlayer(dmg, opts = {}) {
  const b = state.battle;
  let rem = dmg;
  const info = { total: dmg, blocked: 0, hpLost: 0 };
  if (b.block > 0) {
    if (b.block >= rem) { info.blocked = rem; b.block -= rem; rem = 0; }
    else { info.blocked = b.block; rem -= b.block; b.block = 0; }
  }
  info.hpLost = rem;
  if (rem > 0) modifyHp(-rem);
  return info;
}

function checkEnemyDeath() {
  const b = state.battle;
  if (b.enemy.currentHp <= 0 && !b.battleOver) {
    b.battleOver = true;
    b.won = true;
    addLog(`${b.enemy.name} 被击败了！`, 'victory');
    pushFx({ kind: 'enemyDeath' });
    if (state.stats) {
      state.stats.battlesWon++;
      if (b.isElite) state.stats.elitesWon++;
      if (b.enemy.isBoss) state.stats.bossesWon++;
    }
  }
}

function loseBattle() {
  const b = state.battle;
  if (b.battleOver) return;
  b.battleOver = true;
  b.won = false;
  addLog('你被击败了…', 'damage');
  pushFx({ kind: 'playerDeath' });
}

// ---------- 回合 ----------
export function endPlayerTurn() {
  const b = state.battle;
  if (!b || b.battleOver || !b.isPlayerTurn) return false;
  b.isPlayerTurn = false;

  // 手牌结算：虚无消耗 / 保留 / 弃牌
  for (let i = b.hand.length - 1; i >= 0; i--) {
    const c = b.hand[i];
    if (c.keywords && c.keywords.includes('ethereal')) {
      b.hand.splice(i, 1);
      b.exhaustPile.push(c);
      addLog(`「${c.name}」消散了。`, 'info');
    } else if (c.keywords && c.keywords.includes('retain')) {
      // 保留
    } else {
      b.hand.splice(i, 1);
      b.discardPile.push(c);
    }
  }

  // 玩家减益在回合结束时衰减
  if (b.vulnerable > 0) b.vulnerable--;
  if (b.weak > 0) b.weak--;

  b.block = 0;
  pushFx({ kind: 'turnEnd' });

  // 敌人回合
  executeEnemyTurn();
  if (state.player.hp <= 0) { loseBattle(); return false; }
  if (b.enemy.currentHp <= 0) { checkEnemyDeath(); return false; }

  startNewPlayerTurn();
  return true;
}

function executeEnemyTurn() {
  const b = state.battle;
  const enemy = b.enemy;
  const move = enemy.currentMove || enemy.moves[0];

  b.enemy.block = 0;
  pushFx({ kind: 'enemyTurn', moveName: move.name, element: enemy.element });
  addLog(`${enemy.name} 使用了「${move.name}」！`, 'info');

  const hits = move.hits || 1;
  let totalToPlayer = 0;
  for (let h = 0; h < hits; h++) {
    if (move.damage) {
      const dmg = calcEnemyDamage(move);
      const info = applyDamageToPlayer(dmg);
      totalToPlayer += info.hpLost;
      pushFx({
        kind: 'playerHit', damage: dmg, blocked: info.blocked,
        hpLost: info.hpLost, element: enemy.element, hit: h + 1, hits,
      });
      if (info.blocked > 0) addLog(`护甲抵消了 ${info.blocked} 点伤害。`, 'block');
      if (info.hpLost > 0) addLog(`受到 ${info.hpLost} 点伤害！`, 'damage');
      // 荆棘反伤
      if (b.thorns > 0 && state.battle.enemy.currentHp > 0) {
        applyDamageToEnemy(b.thorns);
        addLog(`荆棘反弹了 ${b.thorns} 点伤害！`, 'damage');
        pushFx({ kind: 'thorns', amount: b.thorns });
        if (b.enemy.currentHp <= 0) { checkEnemyDeath(); return; }
      }
      if (state.player.hp <= 0) return;
    }
  }

  if (move.block) {
    enemy.block += move.block;
    addLog(`${enemy.name} 获得 ${move.block} 点护甲。`, 'block');
    pushFx({ kind: 'enemyBlock', amount: move.block });
  }
  if (move.heal) {
    const healed = Math.min(enemy.maxHp - enemy.currentHp, move.heal);
    enemy.currentHp += healed;
    addLog(`${enemy.name} 回复了 ${healed} HP。`, 'heal');
    pushFx({ kind: 'enemyHeal', amount: healed });
  }
  if (move.strength) {
    enemy.strength += move.strength;
    addLog(`${enemy.name} 力量 +${move.strength}！`, 'debuff');
    pushFx({ kind: 'enemyBuff', text: `力量 +${move.strength}` });
  }
  if (move.vulnerable && !hasRelic('everstone')) {
    b.vulnerable += move.vulnerable;
    addLog(`你获得了 ${move.vulnerable} 层易伤！`, 'damage');
    pushFx({ kind: 'playerDebuff', text: `易伤 +${move.vulnerable}` });
  }
  if (move.weak && !hasRelic('everstone')) {
    b.weak += move.weak;
    addLog(`你获得了 ${move.weak} 层虚弱！`, 'damage');
    pushFx({ kind: 'playerDebuff', text: `虚弱 +${move.weak}` });
  }
  if (move.poison && !hasRelic('everstone')) {
    b.poison += move.poison;
    addLog(`你中毒了！(${move.poison} 层)`, 'damage');
    pushFx({ kind: 'playerDebuff', text: `中毒 +${move.poison}` });
  }
  if (move.burn && !hasRelic('everstone')) {
    b.burn += move.burn;
    addLog(`你被灼伤了！(${move.burn} 层)`, 'damage');
    pushFx({ kind: 'playerDebuff', text: `灼伤 +${move.burn}` });
  }

  // 敌人减益衰减
  if (enemy.vulnerable > 0) enemy.vulnerable--;
  if (enemy.weak > 0) enemy.weak--;

  enemy.moveIndex++;
  updateEnemyIntent();
  pushFx({ kind: 'enemyIntent', intent: getEnemyIntent() });
}

function startNewPlayerTurn() {
  const b = state.battle;
  b.turn++;
  if (state.stats) state.stats.turns++;
  b.isPlayerTurn = true;
  b.cardsPlayedThisTurn = 0;
  b.block = 0;
  b.energy = b.maxEnergy;

  // 金属化
  if (b.plated > 0) {
    b.block += b.plated;
    addLog(`金属化提供 ${b.plated} 点护甲。`, 'block');
  }

  // 玩家中毒
  if (b.poison > 0) {
    const d = b.poison;
    state.player.hp = Math.max(0, state.player.hp - d);
    addLog(`中毒造成 ${d} 点伤害！`, 'damage');
    pushFx({ kind: 'playerHit', damage: d, hpLost: d, poisonTick: true });
    b.poison--;
  }
  // 玩家灼伤
  if (b.burn > 0) {
    const d = b.burn;
    state.player.hp = Math.max(0, state.player.hp - d);
    addLog(`灼伤造成 ${d} 点伤害！`, 'damage');
    pushFx({ kind: 'playerHit', damage: d, hpLost: d, burnTick: true });
    b.burn--;
  }
  // 敌人中毒
  if (b.enemy.poison > 0) {
    const d = b.enemy.poison;
    b.enemy.currentHp = Math.max(0, b.enemy.currentHp - d);
    addLog(`${b.enemy.name} 中毒受到 ${d} 点伤害！`, 'damage');
    pushFx({ kind: 'enemyHit', damage: d, element: 'poison', dot: true });
    b.enemy.poison--;
  }
  // 敌人灼伤
  if (b.enemy.burn > 0) {
    const d = b.enemy.burn;
    b.enemy.currentHp = Math.max(0, b.enemy.currentHp - d);
    addLog(`${b.enemy.name} 灼伤受到 ${d} 点伤害！`, 'damage');
    pushFx({ kind: 'enemyHit', damage: d, element: 'fire', dot: true });
    b.enemy.burn--;
  }
  if (state.player.hp <= 0) { loseBattle(); return; }
  if (b.enemy.currentHp <= 0) { checkEnemyDeath(); return; }

  // 遗物：吃剩的东西
  if (hasRelic('leftovers')) {
    const v = getRelic('leftovers').effect.value;
    const healed = modifyHp(v);
    if (healed > 0) {
      addLog(`🍎 吃剩的东西回复了 ${healed} HP。`, 'heal');
      pushFx({ kind: 'heal', amount: healed });
    }
  }

  // 抽牌
  const n = 5 + getRelicBonus('extra_draw', null) + b.futureDraw;
  const drawn = drawCards(n);
  pushFx({ kind: 'draw', amount: drawn });

  updateEnemyIntent();
  addLog(`--- 第 ${b.turn} 回合 ---`, 'turn');
  pushFx({ kind: 'turnStart', turn: b.turn });
}

// ---------- 敌人意图 ----------
function updateEnemyIntent() {
  const b = state.battle;
  const enemy = b.enemy;
  const moveIdx = enemy.pattern[enemy.moveIndex % enemy.pattern.length];
  b.enemy.currentMove = enemy.moves[moveIdx] || enemy.moves[0];
}

export function getEnemyIntent() {
  const b = state.battle;
  if (!b || !b.enemy || !b.enemy.currentMove) return null;
  const move = b.enemy.currentMove;
  const hits = move.hits || 1;
  const dmg = move.damage ? calcEnemyDamage(move) : 0;
  const lines = [];
  let mainType = 'attack';

  if (move.damage) {
    lines.push({ icon: '⚔️', text: hits > 1 ? `${dmg} × ${hits}` : `${dmg}`, cls: 'atk' });
  }
  if (move.block) { lines.push({ icon: '🛡️', text: `${move.block}`, cls: 'def' }); if (!move.damage) mainType = 'defend'; }
  if (move.heal) { lines.push({ icon: '💚', text: `+${move.heal}`, cls: 'def' }); if (!move.damage) mainType = 'defend'; }
  if (move.strength) { lines.push({ icon: '💪', text: `+${move.strength}`, cls: 'buff' }); if (!move.damage) mainType = 'buff'; }
  if (move.vulnerable) { lines.push({ icon: '💔', text: `+${move.vulnerable}`, cls: 'debuff' }); if (!move.damage) mainType = 'debuff'; }
  if (move.weak) { lines.push({ icon: '⬇️', text: `+${move.weak}`, cls: 'debuff' }); if (!move.damage) mainType = 'debuff'; }
  if (move.poison) { lines.push({ icon: '☠️', text: `+${move.poison}`, cls: 'dot' }); if (!move.damage) mainType = 'debuff'; }
  if (move.burn) { lines.push({ icon: '🔥', text: `+${move.burn}`, cls: 'dot' }); if (!move.damage) mainType = 'debuff'; }

  return { ...move, lines, damage: dmg, hits, type: mainType, name: move.name };
}

// ---------- 奖励 ----------
export function getBattleRewardGold() {
  const b = state.battle;
  if (!b || !b.enemy) return 0;
  let gold = b.enemy.gold || 15;
  if (b.isElite) gold = Math.floor(gold * 1.6);
  if (b.enemy.isBoss) gold = Math.floor(gold * 1.4);
  gold += getRelicBonus('flat_gold', null);
  return Math.floor(gold * (1 + getRelicBonus('gold_bonus', null)));
}

export function getRewardCards(excludeIds = []) {
  const allIds = Object.keys(CARDS_DB).filter(id => {
    const c = CARDS_DB[id];
    return c.rarity !== 'basic' && c.rarity !== 'special' && !excludeIds.includes(id);
  });
  const wanted = 3 + getRelicBonus('reward_card_bonus', null);
  const cards = [];
  const weighted = [];
  for (const id of allIds) {
    const r = CARDS_DB[id].rarity;
    const w = r === 'rare' ? 1 : r === 'uncommon' ? 3 : 5;
    for (let i = 0; i < w; i++) weighted.push(id);
  }
  let guard = 0;
  while (cards.length < wanted && guard++ < 200) {
    const id = weighted[Math.floor(Math.random() * weighted.length)];
    if (cards.find(c => c.id === id)) continue;
    cards.push(createCard(id));
  }
  return cards;
}