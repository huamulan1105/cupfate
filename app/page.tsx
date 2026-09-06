"use client";

import { useEffect, useMemo, useState } from "react";

type Language = "zh" | "en";
type ReadingMode = "daily" | "question";
type Count = 1 | 3;

type TarotCard = {
  number: string;
  zh: string;
  en: string;
  symbol: string;
  upright: { zh: string; en: string };
  reversed: { zh: string; en: string };
  guidance: { zh: string; en: string };
};

type DrawnCard = TarotCard & { reversedPosition: boolean; revealed: boolean };

const cards: TarotCard[] = [
  { number: "0", zh: "愚者", en: "The Fool", symbol: "✦", upright: { zh: "新的开始、开放与探索", en: "New beginnings, openness, and exploration" }, reversed: { zh: "冲动、迟疑或准备不足", en: "Impulsiveness, hesitation, or poor preparation" }, guidance: { zh: "保持好奇，也为下一步留一点准备。", en: "Stay curious, and give your next step some preparation." } },
  { number: "I", zh: "魔术师", en: "The Magician", symbol: "∞", upright: { zh: "主动、专注与善用资源", en: "Initiative, focus, and resourcefulness" }, reversed: { zh: "分心、能力未充分发挥", en: "Distraction or untapped ability" }, guidance: { zh: "先用好手边已有的资源。", en: "Begin with the resources already in your hands." } },
  { number: "II", zh: "女祭司", en: "The High Priestess", symbol: "☾", upright: { zh: "直觉、沉静与内在觉察", en: "Intuition, stillness, and inner awareness" }, reversed: { zh: "忽略直觉、信息尚不清晰", en: "Ignored intuition or unclear information" }, guidance: { zh: "暂缓判断，听听安静下来的自己。", en: "Pause judgment and listen to your quieter self." } },
  { number: "III", zh: "皇后", en: "The Empress", symbol: "❀", upright: { zh: "滋养、丰盛与创造力", en: "Nurture, abundance, and creativity" }, reversed: { zh: "过度付出、忽视自身需要", en: "Overgiving or neglecting your own needs" }, guidance: { zh: "照顾好自己，灵感才有生长的空间。", en: "Care for yourself so inspiration has room to grow." } },
  { number: "IV", zh: "皇帝", en: "The Emperor", symbol: "♜", upright: { zh: "秩序、边界与稳定行动", en: "Structure, boundaries, and steady action" }, reversed: { zh: "控制过度、规则缺乏弹性", en: "Overcontrol or inflexible rules" }, guidance: { zh: "建立清晰边界，但给变化留出余地。", en: "Set clear boundaries while leaving room for change." } },
  { number: "V", zh: "教皇", en: "The Hierophant", symbol: "⌘", upright: { zh: "传统、学习与共同价值", en: "Tradition, learning, and shared values" }, reversed: { zh: "质疑惯例、寻找自己的方法", en: "Questioning convention or finding your own way" }, guidance: { zh: "参考经验，但不必放弃独立思考。", en: "Learn from experience without giving up independent thought." } },
  { number: "VI", zh: "恋人", en: "The Lovers", symbol: "♡", upright: { zh: "连接、选择与价值一致", en: "Connection, choice, and aligned values" }, reversed: { zh: "失衡、沟通不畅或价值冲突", en: "Imbalance, poor communication, or conflicting values" }, guidance: { zh: "选择与你真正重视的事一致的方向。", en: "Choose the direction that matches what you truly value." } },
  { number: "VII", zh: "战车", en: "The Chariot", symbol: "➶", upright: { zh: "意志、推进与掌握方向", en: "Willpower, momentum, and direction" }, reversed: { zh: "急于求成、方向分散", en: "Rushing ahead or scattered direction" }, guidance: { zh: "先确认方向，再集中力量前进。", en: "Confirm your direction, then move with focused effort." } },
  { number: "VIII", zh: "力量", en: "Strength", symbol: "♌︎", upright: { zh: "勇气、耐心与温柔的力量", en: "Courage, patience, and gentle strength" }, reversed: { zh: "自我怀疑、精力消耗", en: "Self-doubt or depleted energy" }, guidance: { zh: "真正的力量也包括耐心与自我善待。", en: "True strength also includes patience and self-kindness." } },
  { number: "IX", zh: "隐者", en: "The Hermit", symbol: "✧", upright: { zh: "独处、反思与寻找答案", en: "Solitude, reflection, and seeking insight" }, reversed: { zh: "封闭、孤立或逃避交流", en: "Withdrawal, isolation, or avoiding connection" }, guidance: { zh: "留一点独处时间，也别拒绝可靠的陪伴。", en: "Make room for solitude without rejecting trusted company." } },
  { number: "X", zh: "命运之轮", en: "Wheel of Fortune", symbol: "◉", upright: { zh: "周期、转机与变化", en: "Cycles, turning points, and change" }, reversed: { zh: "阻滞、抗拒变化或时机未到", en: "Delays, resistance, or timing not yet aligned" }, guidance: { zh: "关注能调整的部分，让变化自然展开。", en: "Focus on what you can adjust and let change unfold." } },
  { number: "XI", zh: "正义", en: "Justice", symbol: "⚖︎", upright: { zh: "公平、责任与清晰判断", en: "Fairness, accountability, and clear judgment" }, reversed: { zh: "偏见、逃避责任或信息不完整", en: "Bias, avoidance, or incomplete information" }, guidance: { zh: "补齐事实，再做对自己和他人都负责的决定。", en: "Gather the facts before making a responsible decision." } },
  { number: "XII", zh: "倒吊人", en: "The Hanged Man", symbol: "◇", upright: { zh: "暂停、换位思考与放下", en: "Pause, perspective, and surrender" }, reversed: { zh: "停滞、拖延或不愿改变视角", en: "Stagnation, delay, or resisting a new perspective" }, guidance: { zh: "暂时不行动，也可能是一种有意识的选择。", en: "Choosing not to act yet can itself be intentional." } },
  { number: "XIII", zh: "死神", en: "Death", symbol: "❦", upright: { zh: "结束、转化与更新", en: "Endings, transformation, and renewal" }, reversed: { zh: "抗拒结束、难以放下", en: "Resisting an ending or struggling to let go" }, guidance: { zh: "它通常象征转变而非字面死亡，为新阶段腾出空间。", en: "This usually symbolizes change, not literal death; make room for a new phase." } },
  { number: "XIV", zh: "节制", en: "Temperance", symbol: "≈", upright: { zh: "平衡、调和与循序渐进", en: "Balance, integration, and moderation" }, reversed: { zh: "失衡、过度或节奏混乱", en: "Imbalance, excess, or a disrupted rhythm" }, guidance: { zh: "放慢一点，寻找可以长期维持的节奏。", en: "Slow down and find a rhythm you can sustain." } },
  { number: "XV", zh: "恶魔", en: "The Devil", symbol: "♑︎", upright: { zh: "束缚、欲望与看见依赖", en: "Attachment, desire, and recognizing dependency" }, reversed: { zh: "松开束缚、重新取得自主", en: "Releasing constraints and reclaiming agency" }, guidance: { zh: "诚实辨认让你失去自由的习惯或关系。", en: "Honestly notice the habits or ties that reduce your freedom." } },
  { number: "XVI", zh: "高塔", en: "The Tower", symbol: "ϟ", upright: { zh: "突变、真相显现与重建", en: "Disruption, revelation, and rebuilding" }, reversed: { zh: "避免变化、余震或内部动摇", en: "Avoided change, aftershocks, or inner upheaval" }, guidance: { zh: "先确保安全与稳定，再决定如何重建。", en: "Secure safety and stability before deciding how to rebuild." } },
  { number: "XVII", zh: "星星", en: "The Star", symbol: "✶", upright: { zh: "希望、疗愈与重新相信", en: "Hope, healing, and renewed trust" }, reversed: { zh: "失望、信心暂时减弱", en: "Discouragement or temporarily diminished faith" }, guidance: { zh: "把希望落在一个微小而可实行的行动上。", en: "Anchor hope in one small, practical action." } },
  { number: "XVIII", zh: "月亮", en: "The Moon", symbol: "☽", upright: { zh: "潜意识、不确定与复杂情绪", en: "The subconscious, uncertainty, and complex feelings" }, reversed: { zh: "迷雾渐散、看见恐惧来源", en: "Clearing confusion or seeing the source of fear" }, guidance: { zh: "情绪是真实的，但不一定等同于事实。", en: "Feelings are real, but they are not always the same as facts." } },
  { number: "XIX", zh: "太阳", en: "The Sun", symbol: "☼", upright: { zh: "清晰、活力与喜悦", en: "Clarity, vitality, and joy" }, reversed: { zh: "短暂低落、期待过高或快乐被遮挡", en: "A temporary dip, high expectations, or obscured joy" }, guidance: { zh: "认可眼前真实而简单的好事。", en: "Acknowledge the simple, genuine good already present." } },
  { number: "XX", zh: "审判", en: "Judgement", symbol: "⌁", upright: { zh: "觉醒、复盘与回应召唤", en: "Awakening, review, and answering a call" }, reversed: { zh: "自我批判、迟迟不作决定", en: "Harsh self-judgment or delayed decisions" }, guidance: { zh: "从经验中提炼答案，不必困在过去。", en: "Take the lesson from experience without staying trapped in it." } },
  { number: "XXI", zh: "世界", en: "The World", symbol: "◎", upright: { zh: "完成、整合与进入新阶段", en: "Completion, integration, and a new phase" }, reversed: { zh: "尚未收尾、遗漏最后一步", en: "Loose ends or one final step remaining" }, guidance: { zh: "确认已经完成的成长，再处理最后的收尾。", en: "Recognize your growth, then tend to the remaining loose ends." } },
];

const copy = {
  zh: {
    brand: "纸杯命运", subtitle: "CUPFATE", intro: "从一只小小纸杯里，抽出此刻的一点启发。",
    daily: "今日运势", dailyHint: "看看今天值得留意的能量", question: "心中一问", questionHint: "带着一个问题，获得新的视角",
    one: "一张牌", oneHint: "一条核心提示", three: "三张牌", threeHint: "从三个角度展开",
    prompt: "写下你的问题（可选）", placeholder: "例如：我该如何看待目前的变化？", draw: "开始抽牌", shuffle: "正在洗牌…",
    reveal: "轻触卡牌翻开", redraw: "再抽一次", restart: "返回选择", upright: "正位", reversed: "逆位",
    note: "塔罗仅供娱乐与自我反思，不预测确定结果，也不替代专业建议。",
    offlineNote: "在系统浏览器中添加到主屏幕；首次完整打开后可离线使用。",
    dailySlots: ["上午", "下午", "夜晚"], questionSlots: ["现状", "阻碍", "建议"], oneDaily: "今日提示", oneQuestion: "核心视角",
    meaning: "牌意", suggestion: "给你的提示",
    share: "分享给朋友", shared: "分享链接已复制，可粘贴到微信发送。", shareTitle: "纸杯命运 · 从纸杯里抽出一点启发",
  },
  en: {
    brand: "CUPFATE", subtitle: "纸杯命运", intro: "A small reflection, drawn from the cup.",
    daily: "Daily Reflection", dailyHint: "Notice the energy worth your attention today", question: "Ask a Question", questionHint: "Hold a question and discover another perspective",
    one: "One Card", oneHint: "One essential insight", three: "Three Cards", threeHint: "Explore three perspectives",
    prompt: "Write your question (optional)", placeholder: "For example: How might I view this change?", draw: "Draw cards", shuffle: "Shuffling…",
    reveal: "Tap a card to reveal", redraw: "Draw again", restart: "Back to choices", upright: "Upright", reversed: "Reversed",
    note: "Tarot is for entertainment and self-reflection only. It does not predict certain outcomes or replace professional advice.",
    offlineNote: "Add to your Home Screen in a system browser; available offline after the first full visit.",
    dailySlots: ["Morning", "Afternoon", "Evening"], questionSlots: ["Situation", "Challenge", "Guidance"], oneDaily: "Today’s insight", oneQuestion: "Core perspective",
    meaning: "Meaning", suggestion: "A gentle prompt",
    share: "Share", shared: "Link copied. Send it to a friend in any app.", shareTitle: "CUPFATE · A small reflection from the cup",
  },
};

function randomIndex(max: number) {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const value = new Uint32Array(1);
    const limit = Math.floor(0x100000000 / max) * max;
    do crypto.getRandomValues(value); while (value[0] >= limit);
    return value[0] % max;
  }
  return Math.floor(Math.random() * max);
}

function drawCards(count: Count): DrawnCard[] {
  const pool = [...cards];
  return Array.from({ length: count }, () => {
    const [card] = pool.splice(randomIndex(pool.length), 1);
    return { ...card, reversedPosition: randomIndex(2) === 1, revealed: false };
  });
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("zh");
  const [mode, setMode] = useState<ReadingMode>("daily");
  const [count, setCount] = useState<Count>(1);
  const [question, setQuestion] = useState("");
  const [drawn, setDrawn] = useState<DrawnCard[]>([]);
  const [shuffling, setShuffling] = useState(false);
  const [shareNotice, setShareNotice] = useState(false);
  const t = copy[language];

  useEffect(() => {
    if (location.protocol === "https:" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
  }, []);

  const slots = useMemo(() => {
    if (count === 1) return [mode === "daily" ? t.oneDaily : t.oneQuestion];
    return mode === "daily" ? t.dailySlots : t.questionSlots;
  }, [count, mode, t]);

  function beginReading() {
    setShuffling(true);
    window.setTimeout(() => { setDrawn(drawCards(count)); setShuffling(false); }, 700);
  }

  function revealCard(index: number) {
    setDrawn((current) => current.map((card, i) => i === index ? { ...card, revealed: true } : card));
  }

  function reset() { setDrawn([]); setShuffling(false); }

  async function shareSite() {
    const shareData = { title: t.shareTitle, text: t.intro, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(shareData);
      else await navigator.clipboard.writeText(window.location.href);
      setShareNotice(true);
      window.setTimeout(() => setShareNotice(false), 2600);
    } catch (error) {
      if ((error as DOMException)?.name === "AbortError") return;
      window.prompt(language === "zh" ? "复制这个链接，发送给朋友：" : "Copy this link and send it to a friend:", window.location.href);
    }
  }

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="topbar">
        <div className="wordmark" aria-label={t.brand}><span className="brand-mark cup-mark" aria-hidden="true"><i /><b /></span><span><strong>{t.brand}</strong><small>{t.subtitle}</small></span></div>
        <div className="top-actions"><button className="share-button" onClick={shareSite} aria-label={t.share}><span aria-hidden="true">↗</span>{t.share}</button><button className="language-switch" onClick={() => setLanguage(language === "zh" ? "en" : "zh")} aria-label="切换语言 / Switch language"><span className={language === "zh" ? "active" : ""}>中</span><i /><span className={language === "en" ? "active" : ""}>EN</span></button></div>
      </header>

      {drawn.length === 0 ? (
        <section className="welcome">
          <div className="cupcake-glyph" aria-hidden="true"><span className="frosting"><i /><i /><i /></span><span className="cup-liner" /><b>✦</b></div>
          <p className="eyebrow">A MOMENT FOR YOU</p><h1>{t.intro}</h1>
          <div className="choice-block">
            <div className="mode-grid" role="group" aria-label={language === "zh" ? "选择占卜模式" : "Choose reading mode"}>
              <button className={`mode-card ${mode === "daily" ? "selected" : ""}`} onClick={() => setMode("daily")}><span className="mode-icon">☀︎</span><span><strong>{t.daily}</strong><small>{t.dailyHint}</small></span><span className="radio-dot" /></button>
              <button className={`mode-card ${mode === "question" ? "selected" : ""}`} onClick={() => setMode("question")}><span className="mode-icon">☾</span><span><strong>{t.question}</strong><small>{t.questionHint}</small></span><span className="radio-dot" /></button>
            </div>
            {mode === "question" && <label className="question-field"><span>{t.prompt}</span><textarea maxLength={120} value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={t.placeholder} rows={2} /><small>{question.length}/120</small></label>}
            <div className="count-picker" role="group" aria-label={language === "zh" ? "选择抽牌数量" : "Choose number of cards"}>
              <button className={count === 1 ? "selected" : ""} onClick={() => setCount(1)}><strong>{t.one}</strong><small>{t.oneHint}</small></button>
              <button className={count === 3 ? "selected" : ""} onClick={() => setCount(3)}><strong>{t.three}</strong><small>{t.threeHint}</small></button>
            </div>
            <button className={`draw-button ${shuffling ? "shuffling" : ""}`} onClick={beginReading} disabled={shuffling}><span>{shuffling ? t.shuffle : t.draw}</span><span aria-hidden="true">✦</span></button>
          </div>
        </section>
      ) : (
        <section className="reading">
          <p className="eyebrow">{mode === "daily" ? t.daily : t.question}</p>
          <h1>{mode === "question" && question.trim() ? `“${question.trim()}”` : t.intro}</h1><p className="reveal-hint">{t.reveal}</p>
          <div className={`cards-layout count-${count}`}>
            {drawn.map((card, index) => (
              <article className="card-reading" key={`${card.number}-${index}`}>
                <p className="slot-label">{slots[index]}</p>
                <button className={`tarot-card ${card.revealed ? "revealed" : ""}`} onClick={() => revealCard(index)} aria-label={card.revealed ? (language === "zh" ? card.zh : card.en) : t.reveal}>
                  <span className="card-inner"><span className="card-back"><span className="back-frame"><i>✦</i><span className="cup-seal"><em /><b /></span><i>⌄</i></span></span><span className={`card-front ${card.reversedPosition ? "is-reversed" : ""}`}><small>{card.number}</small><span className="card-symbol">{card.symbol}</span><strong>{language === "zh" ? card.zh : card.en}</strong><small>{card.number}</small></span></span>
                </button>
                {card.revealed && <div className="interpretation"><div className="card-title"><strong>{language === "zh" ? card.zh : card.en}</strong><span>{card.reversedPosition ? t.reversed : t.upright}</span></div><dl><div><dt>{t.meaning}</dt><dd>{card.reversedPosition ? card.reversed[language] : card.upright[language]}</dd></div><div><dt>{t.suggestion}</dt><dd>{card.guidance[language]}</dd></div></dl></div>}
              </article>
            ))}
          </div>
          <div className="reading-actions"><button className="secondary-button" onClick={() => setDrawn(drawCards(count))}>{t.redraw}</button><button className="text-button" onClick={reset}>{t.restart}</button></div>
        </section>
      )}
      <footer><span className="footer-cup" aria-hidden="true" /><div><p>{t.note}</p><p className="offline-note">{t.offlineNote}</p></div><span>✦</span></footer>
      <div className={`share-notice ${shareNotice ? "visible" : ""}`} role="status" aria-live="polite">{t.shared}</div>
    </main>
  );
}
