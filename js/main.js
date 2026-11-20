// ============================================================
// 主控制器 — 游戏流程管理
// ============================================================
import {
  state, initPlayer, addCardToDeck, removeCardFromDeck, addRelic,
  modifyHp, modifyGold, setScreen, nextFloor, upgradeCardSync, hasRelic,
} from './game.js';
import {
  startBattle, playCard, canPlayCard, endPlayerTurn, getBattleRewardGold,
  getRewardCards, takeFx, getCardCost,
} from './battle.js';
import { generateMap, selectNode, getNodeById, isFloorComplete, hasMoreFloors } from './map.js';
import {
  STARTERS, EVENTS, RELICS, createCard, getShopCards, getCardPrice,
  REMOVE_CARD_COST, CARDS_DB, ENEMIES, BOSSES,
} from './data.js';
import * as UI from './ui.js';
import { initFX, unlockAudio, playFxList, SFX } from './fx.js';

let battleBusy = false;

// ============ 启动 ============
function boot() {
  initFX();
  UI.initUI();
  gotoTitle();
}

function gotoTitle() {
  setScreen('title');
  UI.renderTitle(() => {
    unlockAudio();
    SFX.click();
    gotoSelect();
  });
  UI.showScreen('title');
}

// ============ 选择初始宝可梦 ============
function gotoSelect() {
  setScreen('select');
  UI.renderSelect(STARTERS, (starterId) => {
    initPlayer(starterId);
    generateMap(0);
    gotoMap();
  });
  UI.showScreen('select');
}

// ============ 地图 ============
function gotoMap() {
  setScreen('map');
  UI.renderMap({
    onNodeClick: handleNodeClick,
    onDeck: () => UI.renderDeckOverlay(state.player.deck),
  });
  UI.showScreen('map');
}

function handleNodeClick(nodeId) {
  const node = selectNode(nodeId);
  if (!node) return;
  SFX.click();

  switch (node.type) {
    case 'battle':
    case 'elite':
    case 'boss':
      startBattle(node.enemyId, { elite: node.type === 'elite', nodeType: node.type });
      gotoBattle();
      break;
    case 'shop':
      gotoShop();
      break;
    case 'rest':
      gotoRest();
      break;
    case 'event':
      gotoEvent();
      break;
    default:
      gotoMap();
  }
}

// ============ 战斗 ============
function currentBattleNode() {
  return state.map ? getNodeById(state.map.currentNodeId) : null;
}

function gotoBattle() {
  setScreen('battle');
  UI.renderBattle(battleHandlers);
  UI.showScreen('battle');
  playFxList(takeFx());
  setTimeout(() => { battleBusy = false; }, 650);
  battleBusy = true;
}

const battleHandlers = {
  onPlayCard(handIndex, cardEl) {
    if (!state.battle || state.battle.battleOver || battleBusy) return;
    if (!state.battle.isPlayerTurn) { SFX.error(); return; }
    if (!canPlayCard(handIndex)) {
      SFX.error();
      UI.showToast('能量不足', 'warn');
      if (cardEl) {
        cardEl.classList.remove('deny-shake');
        void cardEl.offsetWidth;
        cardEl.classList.add('deny-shake');
      }
      return;
    }

    const rect = cardEl ? cardEl.getBoundingClientRect() : null;
    const result = playCard(handIndex);
    if (!result) return;

    const fx = takeFx();
    if (rect) {
      const cardEv = fx.find(f => f.kind === 'card');
      if (cardEv) cardEv.rect = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
    }
    playFxList(fx);
    battleBusy = true;

    setTimeout(() => {
      if (!state.battle) return;
      UI.renderBattle(battleHandlers);
      battleBusy = false;
      if (state.battle.battleOver) finishBattle();
    }, 180);
  },

  onEndTurn() {
    if (!state.battle || state.battle.battleOver || !state.battle.isPlayerTurn || battleBusy) return;
    battleBusy = true;
    endPlayerTurn();
    playFxList(takeFx());

    setTimeout(() => {
      if (!state.battle) return;
      UI.renderBattle(battleHandlers);
      battleBusy = false;
      if (state.battle.battleOver) finishBattle();
    }, 620);
  },

  onDeck: () => UI.renderDeckOverlay(state.player.deck),

  onViewPile(kind) {
    const b = state.battle;
    if (!b) return;
    const map = {
      draw: [b.drawPile, '🂠 抽牌堆'],
      discard: [b.discardPile, '♻️ 弃牌堆'],
      exhaust: [b.exhaustPile, '🔥 消耗堆'],
    };
    const entry = map[kind];
    if (!entry) return;
    UI.renderPileOverlay(entry[0], entry[1]);
  },
};

function finishBattle() {
  const b = state.battle;
  if (!b) return;
  if (b.won) {
    SFX.victory();
    setTimeout(() => gotoReward(), 1100);
  } else {
    setTimeout(() => gotoGameOver(), 1200);
  }
}

// ============ 奖励 ============
function gotoReward() {
  setScreen('reward');
  const gold = getBattleRewardGold();
  modifyGold(gold);
  const cards = getRewardCards();
  state.rewardCards = cards;

  UI.renderReward(gold, cards, {
    onPick: (i) => {
      addCardToDeck(cards[i]);
      UI.showToast(`「${cards[i].name}」加入了牌组`, 'good');
      afterCardReward();
    },
    onSkip: () => afterCardReward(),
    onDeck: () => UI.renderDeckOverlay(state.player.deck),
  });
  UI.showScreen('reward');
}

function afterCardReward() {
  const node = currentBattleNode();
  if (node && (node.type === 'elite' || node.type === 'boss')) {
    gotoRelicReward();
  } else {
    afterReward();
  }
}

function gotoRelicReward() {
  const owned = new Set(state.player.relics.map(r => r.id));
  const available = RELICS.filter(r => !owned.has(r.id));
  if (available.length === 0) { afterReward(); return; }

  const shuffled = available.sort(() => Math.random() - 0.5);
  const choices = shuffled.slice(0, Math.min(3, shuffled.length));

  setScreen('relic');
  UI.renderRelicChoice(choices, (index) => {
    addRelic(choices[index]);
    UI.showToast(`获得遗物：${choices[index].name}`, 'good');
    afterReward();
  });
  UI.showScreen('relic');
}

function afterReward() {
  if (isFloorComplete()) {
    if (hasMoreFloors()) {
      nextFloor();
      generateMap(state.currentFloor);
      UI.showToast(`进入 ${state.map.floorName}`, 'good');
      gotoMap();
    } else {
      gotoVictory();
    }
  } else {
    gotoMap();
  }
}

// ============ 商店 ============
function gotoShop() {
  setScreen('shop');
  const cardIds = getShopCards(state.currentFloor);
  const shopCards = cardIds.map(id => { const c = createCard(id); c.sold = false; return c; });
  const shopPrices = shopCards.map(c => getCardPrice(c));

  function handleBuyCard(index) {
    const card = shopCards[index];
    const price = shopPrices[index];
    if (!card || card.sold) return;
    if (state.player.gold < price) { SFX.error(); UI.showToast('金币不足', 'warn'); return; }
    modifyGold(-price);
    const bought = createCard(card.id);
    addCardToDeck(bought);
    card.sold = true;
    UI.showToast(`购买了「${bought.name}」`, 'good');
    renderShopView();
  }

  function handleRemoveCard() {
    if (state.player.gold < REMOVE_CARD_COST) { SFX.error(); UI.showToast('金币不足', 'warn'); return; }
    if (state.player.deck.length <= 3) { UI.showToast('牌组太少了，无法移除', 'warn'); return; }
    UI.renderCardPicker(state.player.deck, `🗑️ 移除卡牌（🪙${REMOVE_CARD_COST}）`,
      (card) => {
        modifyGold(-REMOVE_CARD_COST);
        removeCardFromDeck(card.uid);
        UI.showToast(`移除了「${card.name}」`, 'good');
        renderShopView();
      },
      '牌组为空'
    );
  }

  function renderShopView() {
    UI.renderShop(shopCards, shopPrices, REMOVE_CARD_COST, {
      onBuyCard: handleBuyCard,
      onRemoveCard: handleRemoveCard,
      onDeck: () => UI.renderDeckOverlay(state.player.deck),
      onLeave: () => gotoMap(),
    });
  }

  renderShopView();
  UI.showScreen('shop');
}

// ============ 休息 ============
function gotoRest() {
  setScreen('rest');
  UI.renderRest({
    onHeal: () => {
      const healAmount = Math.floor(state.player.maxHp * 0.3);
      modifyHp(healAmount);
      UI.showToast(`回复了 ${healAmount} 点 HP`, 'good');
      gotoMap();
    },
    onUpgrade: () => {
      const upgradable = state.player.deck.filter(c => !c.upgraded && CARDS_DB[c.id] && CARDS_DB[c.id].up);
      if (upgradable.length === 0) {
        UI.showToast('没有可升级的卡牌', 'warn');
        gotoMap();
        return;
      }
      UI.renderCardPicker(upgradable, '⬆️ 选择要升级的卡牌', (card) => {
        upgradeCardSync(card.uid, CARDS_DB);
        UI.showToast(`「${card.baseName || card.name}」升级了！`, 'good');
        gotoMap();
      }, '没有可升级的卡牌');
    },
    onDeck: () => UI.renderDeckOverlay(state.player.deck),
  });
  UI.showScreen('rest');
}

// ============ 事件 ============
function gotoEvent() {
  setScreen('event');
  const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];
  state.currentEvent = event;

  UI.renderEvent(event, (choiceIndex) => {
    const choice = event.choices[choiceIndex];
    resolveEventEffect(choice.effect);
    if (state.player.hp <= 0) {
      setTimeout(() => gotoGameOver(), 300);
    } else {
      gotoMap();
    }
  });
  UI.showScreen('event');
}

function resolveEventEffect(effect) {
  switch (effect.type) {
    case 'nothing':
      UI.showToast('你什么也没做。');
      break;
    case 'relic_risk': {
      const hpCost = Math.floor(state.player.maxHp * effect.hpCost);
      modifyHp(-hpCost);
      const owned = new Set(state.player.relics.map(r => r.id));
      const avail = RELICS.filter(r => !owned.has(r.id));
      if (avail.length > 0) {
        const relic = avail[Math.floor(Math.random() * avail.length)];
        addRelic(relic);
        UI.showToast(`失去 ${hpCost} HP，获得遗物「${relic.name}」`, 'good');
      } else {
        UI.showToast(`失去 ${hpCost} HP，但什么也没找到…`, 'warn');
      }
      break;
    }
    case 'buy_heal': {
      if (state.player.gold >= effect.cost) {
        modifyGold(-effect.cost);
        const healed = modifyHp(Math.floor(state.player.maxHp * effect.healPercent));
        UI.showToast(`回复了 ${healed} 点 HP`, 'good');
      } else UI.showToast('金币不足', 'warn');
      break;
    }
    case 'buy_card': {
      if (state.player.gold >= effect.cost) {
        modifyGold(-effect.cost);
        const ids = Object.keys(CARDS_DB).filter(id => CARDS_DB[id].rarity === (effect.rarity || 'rare'));
        if (ids.length) {
          const card = createCard(ids[Math.floor(Math.random() * ids.length)]);
          addCardToDeck(card);
          UI.showToast(`获得卡牌「${card.name}」`, 'good');
        }
      } else UI.showToast('金币不足', 'warn');
      break;
    }
    case 'upgrade_random': {
      if (effect.hpCost) modifyHp(-effect.hpCost);
      const upgradable = state.player.deck.filter(c => !c.upgraded && CARDS_DB[c.id] && CARDS_DB[c.id].up);
      if (upgradable.length > 0) {
        const card = upgradable[Math.floor(Math.random() * upgradable.length)];
        upgradeCardSync(card.uid, CARDS_DB);
        UI.showToast(`「${card.baseName || card.name}」升级了！`, 'good');
      } else UI.showToast('没有可升级的卡牌', 'warn');
      break;
    }
    case 'random_gold': {
      const amount = effect.min + Math.floor(Math.random() * (effect.max - effect.min + 1));
      modifyGold(amount);
      UI.showToast(`获得 ${amount} 金币`, 'good');
      break;
    }
    case 'heal_percent': {
      const healed = modifyHp(Math.floor(state.player.maxHp * effect.value));
      UI.showToast(`回复了 ${healed} 点 HP`, 'good');
      break;
    }
    case 'full_heal_remove_card': {
      const healed = modifyHp(state.player.maxHp);
      const removable = state.player.deck.filter(c => c.rarity !== 'basic');
      if (removable.length > 0) {
        const toRemove = removable[Math.floor(Math.random() * removable.length)];
        removeCardFromDeck(toRemove.uid);
        UI.showToast(`回复 ${healed} HP，移除了「${toRemove.name}」`, 'good');
      } else {
        UI.showToast(`回复 ${healed} HP`, 'good');
      }
      break;
    }
    case 'free_card': {
      const ids = Object.keys(CARDS_DB).filter(id => CARDS_DB[id].rarity === (effect.rarity || 'uncommon'));
      if (ids.length) {
        const card = createCard(ids[Math.floor(Math.random() * ids.length)]);
        addCardToDeck(card);
        UI.showToast(`获得卡牌「${card.name}」`, 'good');
      }
      break;
    }
    case 'max_hp_up': {
      if (effect.cost && state.player.gold < effect.cost) { UI.showToast('金币不足', 'warn'); break; }
      if (effect.cost) modifyGold(-effect.cost);
      state.player.maxHp += effect.value;
      modifyHp(effect.value);
      UI.showToast(`最大 HP +${effect.value}`, 'good');
      break;
    }
  }
}

// ============ 结束画面 ============
function gotoGameOver() {
  setScreen('gameover');
  UI.renderGameOver(() => location.reload());
  UI.showScreen('gameover');
}

function gotoVictory() {
  setScreen('victory');
  UI.renderVictory(() => location.reload());
  UI.showScreen('victory');
}

// ============ 快捷键 ============
document.addEventListener('keydown', (e) => {
  if (state.screen !== 'battle' || !state.battle) return;
  if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
  if (document.getElementById('global-overlay')) return;

  if (e.key === 'e' || e.key === 'E') {
    battleHandlers.onEndTurn();
  } else if (e.key === 'd' || e.key === 'D') {
    UI.renderDeckOverlay(state.player.deck);
  } else if (/^[1-9]$/.test(e.key)) {
    const idx = parseInt(e.key) - 1;
    const cardEl = document.querySelector(`.hand-area .card[data-index="${idx}"]`);
    if (cardEl) battleHandlers.onPlayCard(idx, cardEl);
  }
});

// 模块初始化完成后启动，确保后续声明已就绪
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
