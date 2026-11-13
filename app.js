// Current Game State
let currentMode = 'stat'; // 'stat' (인구 비율 반영) or 'random' (균등)
let reincarnationHistory = [];
let currentResult = null;

// Audio synthesis for retro drum roll sounds (pure Web Audio API, no external assets needed!)
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
}

function playTickSound() {
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320 + Math.random() * 80, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {
    // Audio context may be restricted by autoplay policy
  }
}

function playTadaSound(isRare) {
  if (!audioCtx) return;
  try {
    const notes = isRare ? [523.25, 659.25, 783.99, 1046.5] : [440, 554.37, 659.25];
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.1 + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + idx * 0.1);
      osc.stop(audioCtx.currentTime + idx * 0.1 + 0.4);
    });
  } catch (e) {}
}

// Mode Selector
function setMode(mode) {
  currentMode = mode;
  const statBtn = document.getElementById('mode-stat-btn');
  const randBtn = document.getElementById('mode-random-btn');
  const desc = document.getElementById('mode-desc');

  if (mode === 'stat') {
    statBtn.classList.add('active');
    randBtn.classList.remove('active');
    desc.innerHTML = `현재 지구상에 태어나는 신생아 비율을 기반으로 작동합니다.<br>
      <strong>(주의: 인도 & 중국 확률이 합쳐서 약 35%에 육박함!)</strong>`;
  } else {
    randBtn.classList.add('active');
    statBtn.classList.remove('active');
    desc.innerHTML = `모든 국가가 동일한 확률로 선택되는 <strong>완전 공평 운빨 모드</strong>입니다.<br>
      (스위스, 모나코, 한국, 인도가 똑같은 기회를 가집니다!)`;
  }
}

// Random Choice based on Weights or Uniform
function pickCountry() {
  const karma = document.getElementById('karma-select').value;

  if (currentMode === 'random') {
    const randomIndex = Math.floor(Math.random() * COUNTRIES_DATA.length);
    return COUNTRIES_DATA[randomIndex];
  }

  // Calculate adjusted weights with Karma flair
  let totalWeight = 0;
  const weightedList = COUNTRIES_DATA.map(c => {
    let weight = c.birthWeight;

    // Small fun karma adjustments
    if (karma === 'good' && (c.rarityClass === 'legendary' || c.rarityClass === 'mythic' || c.rarityClass === 'epic')) {
      weight *= 1.8; // 분리수거 잘해서 선진국/희귀국 확률 살짝 보정!
    } else if (karma === 'bad' && (c.code === 'IN' || c.code === 'CN')) {
      weight *= 1.25; // 투정부려서 인구 대국 확률 업
    }

    totalWeight += weight;
    return { country: c, cumWeight: totalWeight };
  });

  const rand = Math.random() * totalWeight;
  const picked = weightedList.find(item => rand <= item.cumWeight);
  return picked ? picked.country : COUNTRIES_DATA[0];
}

// Start Reincarnation Flow
function startReincarnation() {
  initAudio();

  const setupCard = document.getElementById('setup-card');
  const rouletteCard = document.getElementById('roulette-card');
  const resultCard = document.getElementById('result-card');

  setupCard.classList.add('hidden');
  resultCard.classList.add('hidden');
  rouletteCard.classList.remove('hidden');

  const slotFlag = document.getElementById('slot-flag');
  const slotCountry = document.getElementById('slot-country');
  const statusText = document.getElementById('status-text');

  const funnyLoadingPhrases = [
    "저승사자가 서류를 검토하는 중...",
    "환생 대기표 발급 완료 (#9,824,192번째)...",
    "영혼 세척 및 기억 포맷 진행 중...",
    "지구 좌표계 핀포인트 조준 중...",
    "운명의 주사위 회전 중..."
  ];

  let phraseIdx = 0;
  statusText.textContent = funnyLoadingPhrases[0];

  const phraseInterval = setInterval(() => {
    phraseIdx = (phraseIdx + 1) % funnyLoadingPhrases.length;
    statusText.textContent = funnyLoadingPhrases[phraseIdx];
  }, 600);

  // Fast Slot Machine Shuffle Animation
  let speed = 60;
  let elapsed = 0;
  const totalDuration = 2600; // 2.6 seconds

  function slotTick() {
    const randomPick = COUNTRIES_DATA[Math.floor(Math.random() * COUNTRIES_DATA.length)];
    slotFlag.textContent = randomPick.flag;
    slotCountry.textContent = randomPick.name;
    slotFlag.style.transform = `scale(${1 + Math.random() * 0.15})`;

    playTickSound();

    elapsed += speed;
    if (elapsed < totalDuration) {
      if (elapsed > 1800) speed += 30; // Slow down effect towards end
      setTimeout(slotTick, speed);
    } else {
      clearInterval(phraseInterval);
      finalizeResult();
    }
  }

  slotTick();
}

// Finalize & Reveal Result
function finalizeResult() {
  const chosen = pickCountry();
  currentResult = chosen;

  // Add to history
  reincarnationHistory.unshift(chosen);

  const rouletteCard = document.getElementById('roulette-card');
  const resultCard = document.getElementById('result-card');

  rouletteCard.classList.add('hidden');
  resultCard.classList.remove('hidden');

  // Fill in result elements
  const rarityElem = document.getElementById('result-rarity');
  rarityElem.textContent = chosen.rarity;
  rarityElem.className = `result-badge ${chosen.rarityClass}`;

  document.getElementById('result-flag').textContent = chosen.flag;
  document.getElementById('result-country-name').textContent = chosen.name;
  document.getElementById('result-quote').textContent = chosen.quote;

  // Format probabilities
  const probText = currentMode === 'stat' 
    ? `약 ${chosen.birthWeight}% (세계 신생아 비율)`
    : `${(100 / COUNTRIES_DATA.length).toFixed(1)}% (완전 균등)`;

  document.getElementById('detail-prob').textContent = probText;
  document.getElementById('detail-job').textContent = chosen.job;
  document.getElementById('detail-skill').textContent = chosen.skill;
  document.getElementById('detail-climate').textContent = chosen.climate;
  document.getElementById('result-commentary').textContent = chosen.commentary;

  // History list update
  updateHistoryUI();

  // Play sound & Confetti
  const isHighRarity = ['epic', 'legendary', 'mythic'].includes(chosen.rarityClass);
  playTadaSound(isHighRarity);

  if (typeof confetti === 'function') {
    if (chosen.code === 'IN') {
      // 인도 당첨 특별 축하 폭죽 (주황 & 초록 & 화이트 국기색)
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF9933', '#FFFFFF', '#138808']
      });
    } else if (isHighRarity) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#fbbf24', '#f472b6', '#38bdf8', '#a855f7']
      });
    } else {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  }
}

// Update History View
function updateHistoryUI() {
  const list = document.getElementById('history-list');
  list.innerHTML = '';
  reincarnationHistory.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'history-tag';
    li.textContent = `${index + 1}회차: ${item.flag} ${item.name}`;
    list.appendChild(li);
  });
}

// Retry Flow
function retry() {
  startReincarnation();
}

// Copy Result Text
function copyResult() {
  if (!currentResult) return;
  const text = `[🎲 다음 생애 환생 시뮬레이터 결과]\n나는 다음 생에 '${currentResult.flag} ${currentResult.name}'의 아기로 환생합니다!\n\n등급: ${currentResult.rarity}\n직업: ${currentResult.job}\n특기: ${currentResult.skill}\n"${currentResult.quote}"`;

  navigator.clipboard.writeText(text).then(() => {
    showToast();
  }).catch(() => {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast();
  });
}

function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}
