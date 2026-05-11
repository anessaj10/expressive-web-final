/* ============================================================
   PRISM — script.js
   Sections:
   1.  Card Data
   2.  State
   3.  Initialization
   4.  Atmosphere
   5.  Screen Navigation
   6.  Path 1 — Color Pick
   7.  Path 1 — Card Pick
   8.  Card Reveal (shared)
   9.  Interpretation Screen
   10. Path 2 — Reflection & AI Matching
   11. Deep Meaning Screen
   12. Reset
   13. Dev helpers
   ============================================================ */


/* ══════════════════════════════════════════════════════════
   1. CARD DATA
   ══════════════════════════════════════════════════════════ */

const COLORS = [
  {
    id: 'red', label: 'Red',
    cards: [
      {
        name: 'Ignite', shade: '#FF2400', glow: 'rgba(255,36,0,0.35)',
        whisper: '"something in you is ready"',
        meaning: 'This is the energy at your root — primal, alive, and present. Ignite speaks to the fire before action, the surge of anger that signals your boundaries, the excitement that has not yet found its direction. You are not too much. You are activated.',
        atmosphere: { starCount:100, starSpeed:1.8, starFlicker:false, fogColor:'rgba(180,40,0,0.12)',   fogOpacity:0.9, fogSpeed:10, waterSpeed:1.8, waterOpacity:0.28 },
        symbol: `<svg width="48" height="60" viewBox="0 0 48 60"><path d="M24 4 C24 4 36 20 32 32 C40 24 38 14 38 14 C44 26 40 44 24 56 C8 44 4 26 10 14 C10 14 8 24 16 32 C12 20 24 4 24 4Z" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="1.2" stroke-linejoin="round"/></svg>`
      },
      {
        name: 'Wound', shade: '#8B0000', glow: 'rgba(139,0,0,0.35)',
        whisper: '"some things take time to close"',
        meaning: 'Deep crimson holds pain that has been carried quietly. Wound is not weakness — it is the honest record of what you have survived. Something tender lives here. You are allowed to acknowledge it without rushing past it.',
        atmosphere: { starCount:30, starSpeed:0.4, starFlicker:false, fogColor:'rgba(100,0,0,0.18)',    fogOpacity:1,   fogSpeed:24, waterSpeed:0.3, waterOpacity:0.10 },
        symbol: `<svg width="48" height="60" viewBox="0 0 48 60"><line x1="24" y1="8" x2="24" y2="52" stroke="rgba(255,255,255,0.8)" stroke-width="1.2"/><line x1="20" y1="24" x2="28" y2="30" stroke="rgba(255,255,255,0.5)" stroke-width="1" stroke-dasharray="2 3"/></svg>`
      }
    ]
  },
  {
    id: 'orange', label: 'Orange',
    cards: [
      {
        name: 'Bloom', shade: '#FF7F00', glow: 'rgba(255,127,0,0.35)',
        whisper: '"the day is opening for you"',
        meaning: 'Bloom is the feeling of waking up and wanting something. It is joy with direction — warmth that has a destination. Something in you is ready to move toward what matters. Let this color carry you forward.',
        atmosphere: { starCount:110, starSpeed:1.4, starFlicker:false, fogColor:'rgba(200,100,0,0.1)',  fogOpacity:0.7, fogSpeed:12, waterSpeed:1.5, waterOpacity:0.26 },
        symbol: `<svg width="48" height="60" viewBox="0 0 48 60"><circle cx="24" cy="30" r="6" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="1.2"/><ellipse cx="24" cy="16" rx="5" ry="8" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="1"/><ellipse cx="24" cy="44" rx="5" ry="8" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="1"/><ellipse cx="10" cy="30" rx="8" ry="5" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="1"/><ellipse cx="38" cy="30" rx="8" ry="5" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="1"/></svg>`
      },
      {
        name: 'Drift', shade: '#FFAB76', glow: 'rgba(255,171,118,0.35)',
        whisper: '"you don\'t have to go anywhere right now"',
        meaning: 'Drift is warmth without urgency. The afternoon that asks nothing of you. A gentle reminder that being unhurried is not the same as being lost. You are allowed to simply exist in this moment.',
        atmosphere: { starCount:60,  starSpeed:0.5, starFlicker:false, fogColor:'rgba(220,140,60,0.08)', fogOpacity:0.6, fogSpeed:28, waterSpeed:0.5, waterOpacity:0.15 },
        symbol: `<svg width="48" height="60" viewBox="0 0 48 60"><path d="M14 30 Q20 20 24 30 Q28 40 34 30" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="1.2" stroke-linecap="round"/></svg>`
      }
    ]
  },
  {
    id: 'yellow', label: 'Yellow',
    cards: [
      {
        name: 'Radiance', shade: '#FFD700', glow: 'rgba(255,215,0,0.35)',
        whisper: '"you are the light you\'ve been looking for"',
        meaning: 'Radiance connects to your solar plexus — the second brain, the seat of inner knowing. This is confidence not borrowed from others, but grown from within. You carry a divinity that doesn\'t need permission.',
        atmosphere: { starCount:120, starSpeed:1.2, starFlicker:false, fogColor:'rgba(220,180,0,0.08)',  fogOpacity:0.4, fogSpeed:20, waterSpeed:1.2, waterOpacity:0.22 },
        symbol: `<svg width="48" height="60" viewBox="0 0 48 60"><circle cx="24" cy="30" r="7" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="1.2"/><line x1="24" y1="10" x2="24" y2="17" stroke="rgba(255,255,255,0.6)" stroke-width="1" stroke-linecap="round"/><line x1="24" y1="43" x2="24" y2="50" stroke="rgba(255,255,255,0.6)" stroke-width="1" stroke-linecap="round"/><line x1="4" y1="30" x2="11" y2="30" stroke="rgba(255,255,255,0.6)" stroke-width="1" stroke-linecap="round"/><line x1="37" y1="30" x2="44" y2="30" stroke="rgba(255,255,255,0.6)" stroke-width="1" stroke-linecap="round"/><line x1="10" y1="16" x2="15" y2="21" stroke="rgba(255,255,255,0.4)" stroke-width="1" stroke-linecap="round"/><line x1="33" y1="39" x2="38" y2="44" stroke="rgba(255,255,255,0.4)" stroke-width="1" stroke-linecap="round"/><line x1="38" y1="16" x2="33" y2="21" stroke="rgba(255,255,255,0.4)" stroke-width="1" stroke-linecap="round"/><line x1="15" y1="39" x2="10" y2="44" stroke="rgba(255,255,255,0.4)" stroke-width="1" stroke-linecap="round"/></svg>`
      },
      {
        name: 'Static', shade: '#F0E68C', glow: 'rgba(240,230,140,0.3)',
        whisper: '"your nervous system is trying to protect you"',
        meaning: 'Static is the signal breaking. The overthinking, the alarm in your body, the flight-or-fight that won\'t settle. Yellow in this form is not failure — it is your system working hard to keep you safe. You can slow down now.',
        atmosphere: { starCount:80,  starSpeed:2.0, starFlicker:true,  fogColor:'rgba(200,190,80,0.12)', fogOpacity:1,   fogSpeed:8,  waterSpeed:2.0, waterOpacity:0.30 },
        symbol: `<svg width="48" height="60" viewBox="0 0 48 60"><polyline points="6,30 14,30 18,18 22,42 26,22 30,38 34,30 42,30" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
      }
    ]
  },
  {
    id: 'green', label: 'Green',
    cards: [
      {
        name: 'Tender', shade: '#4CAF50', glow: 'rgba(76,175,80,0.35)',
        whisper: '"your heart is braver than you think"',
        meaning: 'Tender lives in the heart center. It is the openness of genuine care — for another, for yourself, for something small and growing. This is love without conditions, the green of new leaves, the feeling of being safe enough to be soft.',
        atmosphere: { starCount:75,  starSpeed:0.7, starFlicker:false, fogColor:'rgba(40,120,60,0.1)',   fogOpacity:0.7, fogSpeed:22, waterSpeed:0.7, waterOpacity:0.18 },
        symbol: `<svg width="48" height="60" viewBox="0 0 48 60"><path d="M24 48 C24 48 10 38 10 26 C10 18 24 14 24 24 C24 14 38 18 38 26 C38 38 24 48 24 48Z" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="1.2" stroke-linejoin="round"/></svg>`
      },
      {
        name: 'Ache', shade: '#2D6A4F', glow: 'rgba(45,106,79,0.35)',
        whisper: '"wanting is its own kind of love"',
        meaning: 'Ache is the shadow side of the heart — longing that looks outward, desire tinted with comparison. It is not a flaw to feel this. It is proof that you know what beauty is. The ache points toward something real in you.',
        atmosphere: { starCount:35,  starSpeed:0.4, starFlicker:false, fogColor:'rgba(20,70,40,0.15)',   fogOpacity:1,   fogSpeed:26, waterSpeed:0.3, waterOpacity:0.12 },
        symbol: `<svg width="48" height="60" viewBox="0 0 48 60"><path d="M24 44 C24 44 11 34 11 23 C11 16 17 12 24 18 C31 12 37 16 37 23 C37 34 24 44 24 44Z" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.2"/><line x1="20" y1="27" x2="28" y2="27" stroke="rgba(255,255,255,0.4)" stroke-width="1"/></svg>`
      }
    ]
  },
  {
    id: 'blue', label: 'Blue',
    cards: [
      {
        name: 'Current', shade: '#1E90FF', glow: 'rgba(30,144,255,0.35)',
        whisper: '"you are allowed to move through this"',
        meaning: 'Current is water in motion — cleansing, transitional, alive. Something is shifting in you or around you. This card says: let it move. You do not have to hold everything still. Emotional depth is not a place to drown; it is a place to pass through.',
        atmosphere: { starCount:85,  starSpeed:0.9, starFlicker:false, fogColor:'rgba(20,80,180,0.1)',   fogOpacity:0.8, fogSpeed:14, waterSpeed:1.6, waterOpacity:0.32 },
        symbol: `<svg width="48" height="60" viewBox="0 0 48 60"><path d="M8 24 Q16 16 24 24 Q32 32 40 24" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="1.2" stroke-linecap="round"/><path d="M8 34 Q16 26 24 34 Q32 42 40 34" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1" stroke-linecap="round"/></svg>`
      },
      {
        name: 'Still', shade: '#4682B4', glow: 'rgba(70,130,180,0.35)',
        whisper: '"truth settles like water"',
        meaning: 'Still is the calm after saying the true thing. The throat cleared, the honest word finally spoken. Blue in stillness governs communication — and sometimes the most powerful communication is the quiet that follows understanding.',
        atmosphere: { starCount:20,  starSpeed:0.3, starFlicker:false, fogColor:'rgba(40,80,140,0.1)',   fogOpacity:0.5, fogSpeed:35, waterSpeed:0.2, waterOpacity:0.08 },
        symbol: `<svg width="48" height="60" viewBox="0 0 48 60"><line x1="8" y1="34" x2="40" y2="34" stroke="rgba(255,255,255,0.8)" stroke-width="1.2" stroke-linecap="round"/><line x1="12" y1="28" x2="36" y2="28" stroke="rgba(255,255,255,0.4)" stroke-width="1" stroke-linecap="round"/></svg>`
      }
    ]
  },
  {
    id: 'purple', label: 'Purple',
    cards: [
      {
        name: 'Veil', shade: '#6A0DAD', glow: 'rgba(106,13,173,0.4)',
        whisper: '"trust what you sense before you understand it"',
        meaning: 'Veil is standing at the threshold of knowing — something is being felt before it can be named. This is the territory of the third eye, the quiet intelligence that lives beneath logic. You don\'t need to explain this feeling. You just need to honor it.',
        atmosphere: { starCount:25,  starSpeed:0.4, starFlicker:false, fogColor:'rgba(80,0,140,0.18)',   fogOpacity:1,   fogSpeed:30, waterSpeed:0.4, waterOpacity:0.12 },
        symbol: `<svg width="48" height="60" viewBox="0 0 48 60"><path d="M36 16 A16 20 0 0 1 36 44" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.2" stroke-linecap="round"/></svg>`
      },
      {
        name: 'Awaken', shade: '#BF5FFF', glow: 'rgba(191,95,255,0.4)',
        whisper: '"something larger is trying to reach you"',
        meaning: 'Awaken is the crown opening — creative energy, expanded awareness, the feeling of being connected to something beyond the ordinary. Intuition is sharpened here. Pay attention to what finds you in the next few days.',
        atmosphere: { starCount:120, starSpeed:1.5, starFlicker:false, fogColor:'rgba(140,60,220,0.14)', fogOpacity:0.9, fogSpeed:11, waterSpeed:1.3, waterOpacity:0.28 },
        symbol: `<svg width="48" height="60" viewBox="0 0 48 60"><ellipse cx="24" cy="30" rx="8" ry="5" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="1.2"/><circle cx="24" cy="30" r="2.5" fill="rgba(255,255,255,0.8)"/><line x1="24" y1="12" x2="24" y2="20" stroke="rgba(255,255,255,0.4)" stroke-width="1" stroke-linecap="round"/></svg>`
      }
    ]
  },
  {
    id: 'pink', label: 'Pink',
    cards: [
      {
        name: 'Soft', shade: '#FFB6C1', glow: 'rgba(255,182,193,0.35)',
        whisper: '"you are safe to be this gentle"',
        meaning: 'Soft is the gentle kind of love — the nurturing, the sweetness, the care that asks for nothing in return. Venus energy lives here: beauty, tenderness, the comfort of being held. You deserve the same softness you offer others.',
        atmosphere: { starCount:70,  starSpeed:0.6, starFlicker:false, fogColor:'rgba(220,140,160,0.1)', fogOpacity:0.65,fogSpeed:25, waterSpeed:0.6, waterOpacity:0.16 },
        symbol: `<svg width="48" height="60" viewBox="0 0 48 60"><circle cx="18" cy="30" r="10" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.2"/><circle cx="30" cy="30" r="10" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.2"/></svg>`
      },
      {
        name: 'Pulse', shade: '#FF1493', glow: 'rgba(255,20,147,0.4)',
        whisper: '"desire is not something to apologize for"',
        meaning: 'Pulse is magenta — vibrant, drawn forward, alive with want. This is Venus in her bold form: the excitement of attraction, the pull toward someone or something that lights you up. Your desire is information. Follow it honestly.',
        atmosphere: { starCount:105, starSpeed:1.7, starFlicker:false, fogColor:'rgba(200,0,120,0.12)',  fogOpacity:0.9, fogSpeed:9,  waterSpeed:1.7, waterOpacity:0.30 },
        symbol: `<svg width="48" height="60" viewBox="0 0 48 60"><polyline points="6,30 14,30 18,20 24,40 30,20 34,30 42,30" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
      }
    ]
  },
  {
    id: 'white', label: 'White',
    cards: [
      {
        name: 'Surrender', shade: '#E8E0D5', glow: 'rgba(232,224,213,0.3)',
        whisper: '"letting go is not losing"',
        meaning: 'Surrender is the peace that arrives after resistance ends. White holds all colors — it is not empty, it is complete. Something in you is ready to release a grip you\'ve held for too long. This is not defeat. This is rest.',
        atmosphere: { starCount:45,  starSpeed:0.4, starFlicker:false, fogColor:'rgba(220,215,200,0.1)', fogOpacity:0.5, fogSpeed:30, waterSpeed:0.4, waterOpacity:0.10 },
        symbol: `<svg width="48" height="60" viewBox="0 0 48 60"><path d="M16 24 L24 40 L32 24" fill="none" stroke="rgba(80,80,80,0.8)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="20" x2="36" y2="20" stroke="rgba(80,80,80,0.5)" stroke-width="1" stroke-linecap="round"/></svg>`
      },
      {
        name: 'Hollow', shade: '#C0C0C0', glow: 'rgba(192,192,192,0.25)',
        whisper: '"emptiness is just space waiting to be felt"',
        meaning: 'Hollow is the quiet that feels like absence. Not sad, not broken — simply unfilled. This card asks you to sit with the space rather than rush to fill it. Sometimes the hollow is where the new thing will grow.',
        atmosphere: { starCount:8,   starSpeed:0.3, starFlicker:false, fogColor:'rgba(180,180,180,0.06)',fogOpacity:0.2, fogSpeed:40, waterSpeed:0.1, waterOpacity:0.04 },
        symbol: `<svg width="48" height="60" viewBox="0 0 48 60"><circle cx="24" cy="30" r="14" fill="none" stroke="rgba(80,80,80,0.7)" stroke-width="1.2"/></svg>`
      }
    ]
  },
  {
    id: 'black', label: 'Black',
    cards: [
      {
        name: 'Shield', shade: '#1A1A2E', glow: 'rgba(60,60,120,0.4)',
        whisper: '"you get to choose what enters"',
        meaning: 'Shield is intentional protection. Black absorbs and contains — it does not let everything through, and that is a power, not a flaw. You are allowed to protect your energy. Boundaries are not walls; they are wisdom.',
        atmosphere: { starCount:15,  starSpeed:0.3, starFlicker:false, fogColor:'rgba(20,20,60,0.22)',   fogOpacity:1,   fogSpeed:32, waterSpeed:0.3, waterOpacity:0.10 },
        symbol: `<svg width="48" height="60" viewBox="0 0 48 60"><path d="M24 10 L38 18 L38 32 C38 42 24 50 24 50 C24 50 10 42 10 32 L10 18 Z" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.2" stroke-linejoin="round"/></svg>`
      },
      {
        name: 'Depth', shade: '#4A4A4A', glow: 'rgba(74,74,74,0.4)',
        whisper: '"the dark is not always something to escape"',
        meaning: 'Depth is sitting in darkness without fear. The unknown as a place of rest, not threat. Black holds mystery gently. You do not need to illuminate everything right now. Some things reveal themselves in their own time.',
        atmosphere: { starCount:10,  starSpeed:0.3, starFlicker:false, fogColor:'rgba(40,40,40,0.2)',    fogOpacity:1,   fogSpeed:36, waterSpeed:0.2, waterOpacity:0.08 },
        symbol: `<svg width="48" height="60" viewBox="0 0 48 60"><line x1="24" y1="10" x2="24" y2="42" stroke="rgba(255,255,255,0.7)" stroke-width="1.2" stroke-linecap="round"/><path d="M20 38 L24 46 L28 38" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/></svg>`
      }
    ]
  }
];

// Flat list of all 18 cards — used by Path 2 AI matching
const ALL_CARDS = COLORS.flatMap(color =>
  color.cards.map(card => ({ ...card, colorId: color.id, colorLabel: color.label }))
);

/* ══════════════════════════════════════════════════════════
   2. STATE
   ══════════════════════════════════════════════════════════ */

let selectedColor    = null;  // color object (Path 1)
let selectedCard     = null;  // the drawn card
let alternativeCard  = null;  // secondary match (Path 2)
let altMatchReason   = '';    // Claude's reason for the secondary
let currentPath      = null;  // 'intuitive' | 'reflective'
let userReflection   = '';    // what the user typed in Path 2
let userInterpretation = '';  // what the user typed on interpret screen
let isStayHere       = false; // deep screen terminal state
let activeAtmosphere = null;  // currently applied atmosphere profile
let pointerX         = 0;     // normalized -1..1, used for parallax
let pointerY         = 0;     // normalized -1..1, used for parallax
let wanderIndex      = 0;
let wanderIntervalId = null;
let wanderPlaying    = false;
const FEEDBACK_STORAGE_KEY = 'prism-feedback-log-v1';
const FEEDBACK_ADMIN_SESSION_KEY = 'prism-feedback-admin-v1';


/* ══════════════════════════════════════════════════════════
   3. INITIALIZATION
   ══════════════════════════════════════════════════════════ */

function init() {
  generateStars();
  buildColorGrid();
  bindPointerMotion();
  startAtmosphereBreathing();
  syncFeedbackAdminUi();
}

function generateStars() {
  const container = document.getElementById('stars');
  for (let i = 0; i < 120; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top  = Math.random() * 70  + '%';
    star.style.setProperty('--dur',    (3 + Math.random() * 6) + 's');
    star.style.setProperty('--max-op', (0.3 + Math.random() * 0.7).toFixed(2));
    star.style.animationDelay = (Math.random() * 8) + 's';
    container.appendChild(star);
  }
}

function buildColorGrid() {
  const grid = document.getElementById('colorGrid');
  COLORS.forEach(color => {
    const orb = document.createElement('div');
    orb.className = 'color-orb';
    orb.setAttribute('data-label', color.label);
    orb.style.background = `radial-gradient(circle at 35% 35%, ${color.cards[0].shade}99, ${color.cards[0].shade} 60%, ${color.cards[1].shade})`;
    orb.style.boxShadow  = `0 0 20px ${color.cards[0].glow}, 0 0 40px ${color.cards[1].glow}`;
    orb.addEventListener('click', () => pickColor(color));
    grid.appendChild(orb);
  });
}

function bindPointerMotion() {
  window.addEventListener('pointermove', (evt) => {
    const nx = (evt.clientX / window.innerWidth) * 2 - 1;
    const ny = (evt.clientY / window.innerHeight) * 2 - 1;
    pointerX = Math.max(-1, Math.min(1, nx));
    pointerY = Math.max(-1, Math.min(1, ny));
  });
}

function startAtmosphereBreathing() {
  const root = document.documentElement;
  const tick = (t) => {
    const sec = t / 1000;
    const breatheSlow = Math.sin(sec * 0.32);
    const breatheMid  = Math.sin(sec * 0.56 + 0.8);
    const drift       = Math.sin(sec * 0.18 + 1.2);

    const atm = activeAtmosphere || {
      fogOpacity: 0.4,
      waterOpacity: 0.18,
      starSpeed: 0.8
    };

    const fogBase = typeof atm.fogOpacity === 'number' ? atm.fogOpacity : 0.4;
    const waterBase = typeof atm.waterOpacity === 'number' ? atm.waterOpacity : 0.18;
    const starFactor = Math.max(0.7, Math.min(1.5, atm.starSpeed || 1));

    root.style.setProperty('--fog-base-opacity', fogBase.toFixed(3));
    root.style.setProperty('--fog-breathe-opacity', (0.9 + 0.1 * ((breatheSlow + 1) / 2)).toFixed(3));
    root.style.setProperty('--fog-drift-x', `${(drift * 2.5 + pointerX * 1.2).toFixed(2)}%`);
    root.style.setProperty('--fog-breathe-scale', (1 + 0.012 * breatheMid).toFixed(4));

    root.style.setProperty('--water-base-opacity', waterBase.toFixed(3));
    root.style.setProperty('--water-breathe-y', `${(breatheSlow * 2.8).toFixed(2)}px`);
    root.style.setProperty('--water-breathe-blur', `${(0.25 + ((breatheMid + 1) / 2) * 0.75).toFixed(2)}px`);

    root.style.setProperty('--stars-breathe-opacity', (0.88 + 0.12 * ((breatheMid + 1) / 2)).toFixed(3));
    root.style.setProperty('--stars-breathe-scale', (1 + 0.01 * breatheSlow).toFixed(4));
    root.style.setProperty('--stars-parallax-x', `${(pointerX * 4.5).toFixed(2)}px`);
    root.style.setProperty('--stars-parallax-y', `${(pointerY * 3.5).toFixed(2)}px`);

    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ══════════════════════════════════════════════════════════
   4. ATMOSPHERE
   ══════════════════════════════════════════════════════════
   When a card is revealed, the environment shifts to match
   its emotional energy.
   ══════════════════════════════════════════════════════════ */

function setAtmosphere(atm) {
  activeAtmosphere = atm;
  const stars      = document.querySelectorAll('.star');
  const fog        = document.getElementById('fog');
  const water      = document.getElementById('water');
  const ripples    = document.querySelectorAll('.ripple-line');

  // ── Stars ──
  stars.forEach((star, i) => {
    const visible = i < atm.starCount;
    star.style.opacity = visible ? null : '0';
    star.style.animationDuration = (parseFloat(star.style.getPropertyValue('--dur') || '5') / atm.starSpeed) + 's';
    if (atm.starFlicker) {
      star.classList.add('flicker');
    } else {
      star.classList.remove('flicker');
    }
  });

  // ── Fog ──
  fog.style.opacity  = atm.fogOpacity;
  fog.style.background = `radial-gradient(ellipse 70% 100% at 50% 100%, ${atm.fogColor} 0%, transparent 70%)`;
  fog.style.animationDuration = atm.fogSpeed + 's';

  // ── Water ──
  water.style.opacity = atm.waterOpacity;
  ripples.forEach(r => {
    const base = parseFloat(r.style.getPropertyValue('--spd') || '9');
    r.style.animationDuration = (base / atm.waterSpeed) + 's';
  });
}

function resetAtmosphere() {
  activeAtmosphere = null;
  const stars   = document.querySelectorAll('.star');
  const fog     = document.getElementById('fog');
  const water   = document.getElementById('water');
  const ripples = document.querySelectorAll('.ripple-line');

  stars.forEach(star => {
    star.style.opacity = null;
    star.style.animationDuration = null;
    star.classList.remove('flicker');
  });

  fog.style.opacity    = null;
  fog.style.background = null;
  fog.style.animationDuration = null;

  water.style.opacity = '0.18';
  ripples.forEach(r => { r.style.animationDuration = null; });
}


/* ══════════════════════════════════════════════════════════
   5. SCREEN NAVIGATION
   ══════════════════════════════════════════════════════════ */

function goTo(screenId) {
  if (screenId !== 'screen-deep' && isStayHere) exitStayHere();
  if (screenId === 'screen-deep') buildDeepScreen();
  if (screenId === 'screen-wander') renderWanderState();
  const feedbackFadeRoot = document.getElementById('feedbackFadeRoot');
  if (feedbackFadeRoot) feedbackFadeRoot.classList.remove('feedback-fade-in');
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');

  // Gentle cross-fade for the trace room content (same atmosphere, softer entrance).
  if (screenId === 'screen-feedback' && feedbackFadeRoot) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => feedbackFadeRoot.classList.add('feedback-fade-in'));
    });
  }
}

// Special route from reveal — goes to interpret screen for Path 1,
// or directly to deep for Path 2
function goToInterpret() {
  if (currentPath === 'intuitive') {
    buildInterpretScreen();
    goTo('screen-interpret');
  } else {
    goTo('screen-deep');
  }
}

function enterStayHere() {
  if (isStayHere) return;
  isStayHere = true;
  document.body.classList.add('stay-here');
  document.getElementById('stayHereOverlay').classList.add('active');
}

function exitStayHere() {
  isStayHere = false;
  document.body.classList.remove('stay-here');
  document.getElementById('stayHereOverlay').classList.remove('active');
}

function startWanderMode() {
  const currentColorId = selectedColor?.id || selectedCard?.colorId || COLORS[0].id;
  const startIndex = COLORS.findIndex(c => c.id === currentColorId);
  wanderIndex = startIndex >= 0 ? startIndex : 0;
  wanderPlaying = true;
  stopWanderTimer();
  wanderIntervalId = setInterval(() => stepWander(1, false), 7000);
  renderWanderState();
  goTo('screen-wander');
}

function stopWander(target = 'deep') {
  wanderPlaying = false;
  stopWanderTimer();
  const pauseBtn = document.getElementById('wanderPauseBtn');
  if (pauseBtn) pauseBtn.textContent = 'Pause';
  if (target === 'reset') {
    resetAll();
  } else {
    goTo('screen-deep');
  }
}

function stopWanderTimer() {
  if (wanderIntervalId) {
    clearInterval(wanderIntervalId);
    wanderIntervalId = null;
  }
}

function toggleWanderPlayback() {
  wanderPlaying = !wanderPlaying;
  const pauseBtn = document.getElementById('wanderPauseBtn');
  if (!pauseBtn) return;
  if (wanderPlaying) {
    pauseBtn.textContent = 'Pause';
    stopWanderTimer();
    wanderIntervalId = setInterval(() => stepWander(1, false), 7000);
  } else {
    pauseBtn.textContent = 'Resume';
    stopWanderTimer();
  }
}

function stepWander(direction = 1, restartTimer = true) {
  wanderIndex = (wanderIndex + direction + COLORS.length) % COLORS.length;
  renderWanderState();
  if (wanderPlaying && restartTimer) {
    stopWanderTimer();
    wanderIntervalId = setInterval(() => stepWander(1, false), 7000);
  }
}

function renderWanderState() {
  const color = COLORS[wanderIndex];
  if (!color) return;
  const leadCard = color.cards[0];
  document.getElementById('wanderColorLabel').textContent = color.label;
  document.getElementById('wanderWhisper').textContent = leadCard.whisper.replaceAll('"', '');

  document.getElementById('bgLayer').style.background =
    `radial-gradient(ellipse 100% 80% at 50% 100%, ${leadCard.glow} 0%, transparent 65%)`;
  setAtmosphere(leadCard.atmosphere);
}


/* ══════════════════════════════════════════════════════════
   6. PATH 1 — COLOR PICK
   ══════════════════════════════════════════════════════════ */

function pickColor(color) {
  currentPath   = 'intuitive';
  selectedColor = color;

  document.getElementById('bgLayer').style.background =
    `radial-gradient(ellipse 100% 80% at 50% 100%, ${color.cards[0].glow} 0%, transparent 60%)`;

  buildCardBacks(color);
  goTo('screen-pick');
}


/* ══════════════════════════════════════════════════════════
   7. PATH 1 — CARD PICK (face-down cards)
   ══════════════════════════════════════════════════════════ */

function buildCardBacks(color) {
  const area = document.getElementById('cardChoiceArea');
  area.innerHTML = '';

  color.cards.forEach(card => {
    const back = document.createElement('div');
    back.className = 'card-back';
    back.style.setProperty('--card-hover-shade', card.shade);
    back.style.setProperty('--card-hover-glow', card.glow);
    back.innerHTML = `
      <div class="card-back-pattern">
        <svg width="60" height="100" viewBox="0 0 60 100" fill="none">
          <polygon points="30,10 55,90 5,90" stroke="rgba(255,255,255,0.08)" stroke-width="1" fill="none"/>
          <circle cx="30" cy="50" r="12"     stroke="rgba(255,255,255,0.06)" stroke-width="1" fill="none"/>
          <line x1="10" y1="50" x2="50" y2="50" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
        </svg>
      </div>`;
    back.addEventListener('click', () => revealCard(card));
    area.appendChild(back);
  });
}


/* ══════════════════════════════════════════════════════════
   8. CARD REVEAL (shared by both paths)
   ══════════════════════════════════════════════════════════ */

function revealCard(card, foundByReflection = false) {
  selectedCard = card;

  // Shift background
  document.getElementById('bgLayer').style.background =
    `radial-gradient(ellipse 100% 80% at 50% 100%, ${card.glow} 0%, transparent 65%)`;

  // Apply atmosphere
  setAtmosphere(card.atmosphere);

  // Light cards need dark text
  const lightCards = ['Surrender','Hollow','Soft','Static','Radiance'];
  const isLight    = lightCards.includes(card.name);
  const textColor  = isLight ? 'rgba(30,30,30,0.9)'  : 'rgba(255,255,255,0.95)';
  const dimColor   = isLight ? 'rgba(30,30,30,0.5)'  : 'rgba(255,255,255,0.45)';

  const foundLabel = foundByReflection
    ? `<div class="card-found-label">this found you</div>`
    : '';

  document.getElementById('revealedCardWrapper').innerHTML = `
    <div class="revealed-card" style="background: linear-gradient(160deg, ${card.shade}cc, ${card.shade}); --card-glow: ${card.glow};">
      ${foundLabel}
      <div class="card-symbol">${card.symbol}</div>
      <div class="card-name" style="color:${textColor}">${card.name}</div>
    </div>`;
  goTo('screen-reveal');
}

/* ══════════════════════════════════════════════════════════
   9. INTERPRETATION SCREEN (Path 1 only)
   ══════════════════════════════════════════════════════════
   After the reveal but before the meaning — user writes
   their own interpretation first.
   ══════════════════════════════════════════════════════════ */

function buildInterpretScreen() {
  const card = selectedCard;
  const lightCards = ['Surrender','Hollow','Soft','Static','Radiance'];
  const isLight    = lightCards.includes(card.name);
  const textColor  = isLight ? 'rgba(30,30,30,0.9)'  : 'rgba(255,255,255,0.95)';

  // Small card version shown alongside the input
  document.getElementById('interpretCardWrapper').innerHTML = `
    <div class="revealed-card" style="width:162px; height:269px; background: linear-gradient(160deg, ${card.shade}cc, ${card.shade}); --card-glow:${card.glow};">
      <div class="card-symbol">${card.symbol}</div>
      <div class="card-name" style="font-size:1.1rem; color:${textColor}">${card.name}</div>
    </div>`;
}

// Called by the "go deeper" button — saves what they typed before moving on
function saveInterpretation() {
  userInterpretation = document.getElementById('interpretInput')?.value?.trim() || '';
  goTo('screen-deep');
}


/* ══════════════════════════════════════════════════════════
   10. PATH 2 — REFLECTION & AI MATCHING
   ══════════════════════════════════════════════════════════ */

async function submitReflection() {
  const input = document.getElementById('reflectInput').value.trim();
  if (!input) return;

  currentPath    = 'reflective';
  userReflection = input;

  // Go to listening screen
  goTo('screen-listening');

  // Fade the text through a few states
  const listeningText = document.getElementById('listeningText');
  const messages = [
    'the cards are listening',
    'reading what you shared',
    'something is coming forward'
  ];
  let msgIndex = 0;
  const msgInterval = setInterval(() => {
    msgIndex = (msgIndex + 1) % messages.length;
    listeningText.style.opacity = 0;
    setTimeout(() => {
      listeningText.textContent = messages[msgIndex];
      listeningText.style.opacity = 1;
    }, 500);
  }, 2800);

  try {
    const result = await matchCardToReflection(input);
    clearInterval(msgInterval);

    // Find card objects from names
    const primary   = ALL_CARDS.find(c => c.name === result.primary);
    const secondary = ALL_CARDS.find(c => c.name === result.secondary);

    if (!primary) throw new Error('Card not found');

    // Store secondary for later
    alternativeCard = secondary || null;
    altMatchReason  = result.reason || '';

    // Find the color group for the primary card
    selectedColor = COLORS.find(c => c.id === primary.colorId) || null;

    revealCard(primary, true);

  } catch (err) {
    clearInterval(msgInterval);
    console.error('Matching error:', err);
    // Fallback: pick a random card
    const fallback = ALL_CARDS[Math.floor(Math.random() * ALL_CARDS.length)];
    selectedColor  = COLORS.find(c => c.id === fallback.colorId) || null;
    revealCard(fallback, true);
  }
}

async function matchCardToReflection(userText) {
  // Local matcher (no external APIs). Scores cards by overlap with emotion language.
  return matchCardToReflectionLocal(userText);
}

/* matchCardToReflectionLocal — 4-stage local matcher (no external APIs)
   Stage 1  Normalize text (lowercase, strip punctuation but keep apostrophes/hyphens)
   Stage 2  Scan known multi-word phrases ("want to die", "let go", "no point") and
            inject synthetic tokens that point at lexicon groups. This catches
            expressions that get destroyed by stop-word removal.
   Stage 3  Tokenize + light-stem the input, then expand via the emotion lexicon
            (both sides pre-stemmed at load, so 'loved' -> 'lov' matches 'love' -> 'lov').
   Stage 4  Score every card by tag overlap (strong) + card-text overlap (weak) +
            intensity bias. Ties: higher score, then more tag hits, then more
            tag hits anchored on words the visitor actually typed (seed), then
            ALL_CARDS order. If no card scores a real tag hit, route to "holding"
            (Veil / Drift / Surrender / Hollow / Depth) instead of array order.
*/
function matchCardToReflectionLocal(userText) {
  const normalized = normalizeReflectionText(userText);

  // Phrase scan returns BOTH the injected tokens AND a copy of the text with
  // those phrases stripped out. This prevents literal words inside a matched
  // phrase (e.g. "want" inside "want to die") from also triggering unrelated
  // lexicon groups (e.g. `longing`) that would dilute the phrase's intent.
  const { injected: phraseTokens, stripped } = scanPhrases(normalized);
  const baseTokens = tokensFromText(stripped);

  // Tokens carry stems from `tokensFromText`; phrase keys are already short stems
  // (e.g. 'numb', 'loss', 'surrender'), so stemming them again is a no-op.
  const seedTokens = new Set([...baseTokens, ...phraseTokens.map(lightStem)]);
  const expandedTokens = expandTokens(seedTokens);

  const scored = ALL_CARDS.map((card, cardIndex) => {
    const { score, hits, tagHits } = scoreCardAgainstTokens(card, expandedTokens);
    const seedTagHits = countSeedAnchoredTagHits(card, expandedTokens, seedTokens);
    return { card, score, hits, tagHits, seedTagHits, cardIndex };
  }).sort(compareReflectionScores);

  // Low-confidence fallback: nothing scored a real tag hit. Don't let array
  // position pick the card (which always defaulted to Ignite). Route to a
  // "holding" card that honestly reflects the system not reading a clear signal.
  if (scored[0].tagHits === 0) {
    return holdingFallback(normalized);
  }

  const primary   = scored[0];
  const secondary = scored.find(s => s.card.name !== primary.card.name) || scored[1] || primary;

  const hitWords = [...new Set(primary.hits)].slice(0, 4);
  const reason = hitWords.length
    ? `Matched your reflection through: ${hitWords.join(', ')}.`
    : `Matched by overall tone and themes in what you shared.`;

  return {
    primary: primary.card.name,
    secondary: secondary.card.name,
    reason
  };
}

/* Tie-break when score/tagHits are equal: prefer more tag hits that use stems
   the visitor actually typed (seedTokens), then stable ALL_CARDS order. */
function compareReflectionScores(a, b) {
  if (b.score !== a.score) return b.score - a.score;
  if (b.tagHits !== a.tagHits) return b.tagHits - a.tagHits;
  if (b.seedTagHits !== a.seedTagHits) return b.seedTagHits - a.seedTagHits;
  return a.cardIndex - b.cardIndex;
}

/** Tag hits whose stem appears in the user's own words (before lexicon expansion). */
function countSeedAnchoredTagHits(card, expandedTokenSet, seedTokenSet) {
  const cardTags = STEMMED_CARD_TAGS[card.name] || [];
  let n = 0;
  for (const { stem } of cardTags) {
    if (expandedTokenSet.has(stem) && seedTokenSet.has(stem)) n += 1;
  }
  return n;
}

// Stage 2 helper. Scans the normalized text for known phrases. For each match,
// adds the phrase's `inject` tokens AND removes the phrase from the text so
// individual words inside the phrase don't separately trigger lexicon groups.
function scanPhrases(normalizedText) {
  const injected = [];
  let stripped  = normalizedText;
  for (const { phrase, inject } of PHRASE_MAP) {
    if (stripped.includes(phrase)) {
      inject.forEach(tok => injected.push(tok));
      stripped = stripped.split(phrase).join(' ');
    }
  }
  return { injected, stripped };
}

// Stage 3 helper. Expands a stemmed token set via STEMMED_LEXICON groups.
function expandTokens(tokenSet) {
  const out = new Set(tokenSet);
  for (const [key, stems] of Object.entries(STEMMED_LEXICON)) {
    let hit = false;
    for (const s of stems) { if (out.has(s)) { hit = true; break; } }
    if (hit) {
      stems.forEach(s => out.add(s));
      out.add(lightStem(key));
    }
  }
  return out;
}

// Stage 4 fallback. Picks from a small "holding" pool by light heuristics on the
// raw text. The pool is intentionally narrow — these cards are gentle, honest
// about ambiguity, and never scold or amp up. No red cards live here.
function holdingFallback(normalizedText) {
  const HOLDING_POOL = ['Veil','Drift','Surrender','Hollow','Depth'];
  let primaryName;

  // Theme-based regexes are checked first; length is the final tie-breaker.
  if (/(let go|releas|surrender|give up|giving up)/.test(normalizedText)) {
    primaryName = 'Surrender';
  } else if (/(empty|nothing|alone|dead|numb|hollow|gone)/.test(normalizedText)) {
    primaryName = 'Hollow';
  } else if (/(tired|exhaust|done|drain|spent|weary)/.test(normalizedText)) {
    primaryName = 'Drift';
  } else if (/(dark|unknown|deep|mystery|silent)/.test(normalizedText)) {
    primaryName = 'Depth';
  } else if (/(afraid|scared|fear|frighten|terrified|terror|unsafe|panic)/.test(normalizedText)) {
    primaryName = 'Static';
  } else if (/(free|freedom|liberat|unburden|unbound)/.test(normalizedText)) {
    primaryName = 'Bloom';
  } else {
    // Tiny / unreadable input — Veil is the honest "I can't quite see this" card.
    primaryName = 'Veil';
  }

  const others = HOLDING_POOL.filter(n => n !== primaryName);
  const secondaryName = others[Math.floor(Math.random() * others.length)];

  return {
    primary: primaryName,
    secondary: secondaryName,
    reason: `Your words didn't ring a clear bell — this card is here to hold the space with you.`
  };
}

function normalizeReflectionText(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9\s'-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokensFromText(text) {
  const raw = text.split(' ').map(t => t.trim()).filter(Boolean);
  const out = [];
  for (const token of raw) {
    if (STOP_WORDS.has(token)) continue;
    out.push(lightStem(token));
  }
  return out;
}

function lightStem(token) {
  // Intentionally tiny stemmer: just enough to reduce obvious variants.
  let t = token;
  if (t.endsWith("'s")) t = t.slice(0, -2);
  if (t.endsWith("ing") && t.length > 5) t = t.slice(0, -3);
  if (t.endsWith("ed") && t.length > 4) t = t.slice(0, -2);
  if (t.endsWith("ly") && t.length > 4) t = t.slice(0, -2);
  if (t.endsWith("s") && t.length > 3) t = t.slice(0, -1);
  return t;
}

function scoreCardAgainstTokens(card, tokenSet) {
  const cardTags = STEMMED_CARD_TAGS[card.name] || [];
  const cardTextTokens = tokensFromText(normalizeReflectionText(`${card.whisper} ${card.meaning}`));
  const cardTokenSet = new Set(cardTextTokens);

  let score = 0;
  let tagHits = 0;
  const hits = [];

  // 1) Direct overlap with curated tags (strong signal). Both sides are pre-stemmed.
  for (const { original, stem } of cardTags) {
    if (tokenSet.has(stem)) {
      score += 6;
      tagHits += 1;
      hits.push(original);
    }
  }

  // 2) Overlap with card text (weaker signal, but useful)
  for (const token of tokenSet) {
    if (cardTokenSet.has(token)) {
      score += 1;
      hits.push(token);
    }
  }

  // 3) Boost for "intensity" words to steer toward sharper cards
  const intensity = [...tokenSet].filter(t => INTENSITY_WORDS.has(t)).length;
  if (intensity > 0) {
    const intensityBias = INTENSE_CARDS.has(card.name) ? 3 : 0;
    score += intensityBias;
  }

  // 4) Floor non-zero so the upstream sort is deterministic, but we no longer
  //    rely on position to break ties — `tagHits === 0` triggers the fallback.
  if (score === 0) score = 0.1;

  return { score, hits, tagHits };
}

// Common words we don't want to "match" on.
const STOP_WORDS = new Set([
  'a','an','and','are','as','at','be','because','been','but','by','can','cant',"can't",
  'did','do','does','dont',"don't",'for','from','had','has','have','i',"i'm",'im','in',
  'into','is','it',"it's",'its','just','like','me','my','not','of','on','or','so','some',
  'that','the','their','then','there','they','this','to','too','was','we','were','what',
  'when','with','you','your'
]);

// Lexicon groups: if any word from a group appears, we expand it to include the full group.
// This makes matching robust to different phrasing without using any external libraries.
const EMOTION_LEXICON = {
  anxious:   ['anxious','anxiety','nervous','worried','worry','panic','panicky','stress','stressed','overwhelm','overwhelmed','uneasy','restless','tense',
              'afraid','scared','fear','fears','frightened','frightening','unsafe','terror','terrifying'],
  sad:       ['sad','down','heavy','grief','grieving','mourning','cry','crying','teary','heartbroken','heartache','blue','tearful','depressed'],
  angry:     ['angry','mad','furious','rage','irritated','frustrated','resent','resentful','pissed','annoyed'],
  lonely:    ['lonely','alone','isolated','disconnect','disconnected','unseen','leftout','alienated','solo','separate'],
  numb:      ['numb','empty','hollow','blank','detached','flat','nothing','dead','dying','died','frozen','void'],
  tender:    ['tender','soft','gentle','open','warm','caring','love','loved','loving','safe','sweet','kind','held',
              'mom','mother','maternal','caretaker','caregiver','nurturer','nurturing'],
  longing:   ['long','longing','yearn','yearning','miss','missing','ache','aching','want','wanting','desire','desiring','crave','craving'],
  calm:      ['calm','still','quiet','settled','peace','peaceful','grounded','okay','centered'],
  confused:  ['confused','uncertain','unsure','lost','foggy','unclear','mixed','disoriented'],
  hopeful:   ['hope','hopeful','optimistic','ready','opening','new','bloom','possibility',
              'free','freedom','liberated','liberate','liberating','unburdened','unbound','relief'],
  protected: ['protected','guarded','boundary','boundaries','shield','closedoff','walls','closed'],
  loss:      ['loss','heartache','heartbroken','mourning','gone','grieving','grief','ended'],
  worthless: ['worthless','useless','failure','broken','pointless','unwanted'],
  exhausted: ['tired','exhausted','drained','burntout','done','spent','depleted','weary',
              'overloaded','overload','overworked'],
  safe:      ['safe','held','home','secure']
};

const INTENSITY_WORDS = new Set([
  'very','really','so','extremely','overwhelm','overwhelmed','panic','panicky','rage',
  'furious','terrified','devastated','exhausted'
]);

// Cards that tend to fit higher intensity reflections.
const INTENSE_CARDS = new Set(['Wound','Static','Shield','Depth','Ache','Pulse','Ignite']);

// Curated tags per card (small, editable, and very high-signal).
const CARD_TAGS = {
  Ignite:    ['anger','angry','rage','boundary','boundaries','activated','energy','fire','ready'],
  Wound:     ['hurt','pain','grief','sad','heartbroken','heartache','tender','healing','scar','loss','mourning','broken'],
  Bloom:     ['hope','hopeful','ready','opening','joy','want','desire','forward',
              'free','freedom','liberate','liberated','unburdened'],
  Drift:     ['tired','exhausted','slow','pause','rest','unhurried','float','breathe','drained','weary','spent',
              'overloaded','overworked'],
  Radiance:  ['confident','confidence','clear','light','know','knowing','power'],
  Static:    ['anxious','anxiety','overthink','overthinking','nervous','panic','stress','stressed','tense','restless',
              'afraid','scared','fear','frighten','frightened','unsafe','terror'],
  Tender:    ['tender','soft','open','love','loved','loving','warm','care','caring','safe','held','sweet',
              'mom','mother','maternal','caretaker','caregiver'],
  Ache:      ['longing','yearn','missing','miss','want','wanting','ache','aching','comparison','heartbroken','heartache','crave'],
  Current:   ['change','shifting','move','moving','flow','transition','release','free','freedom'],
  Still:     ['calm','still','quiet','truth','honest','spoken','relief','settled','peace'],
  Veil:      ['intuition','intuitive','mysterious','uncertain','confused','foggy','sense','lost','unclear','disoriented'],
  Awaken:    ['connected','connection','creative','alive','expanding','spiritual','bigger'],
  Soft:      ['gentle','soft','nurture','nurturing','comfort','held','safe','sweet','warm',
              'mom','mother','maternal',
              'love','loved','loving'],
  Pulse:     ['desire','want','wanting','attraction','alive','excited','bold'],
  Surrender: ['letgo','letting','release','accept','acceptance','rest','ease','done','tired','exhausted'],
  Hollow:    ['empty','hollow','numb','nothing','blank','space','absence','alone','lonely','isolated','dead','frozen','worthless'],
  Shield:    ['protected','guarded','boundary','boundaries','no','safe','protect','unsafe','vulnerable'],
  Depth:     ['dark','darkness','unknown','quiet','rest','mystery','deep','dead','numb','frozen']
};

// Multi-word phrases scanned BEFORE tokenization. When a phrase is present in the
// normalized text, we inject its `inject` keys as synthetic tokens. Those keys then
// trigger their EMOTION_LEXICON groups during expansion. This catches expressions
// like "want to die" or "give up" that get destroyed by stop-word removal.
const PHRASE_MAP = [
  { phrase: 'want to die',      inject: ['numb','loss','surrender'] },
  { phrase: 'wanna die',        inject: ['numb','loss','surrender'] },
  { phrase: 'kill myself',      inject: ['numb','loss','surrender'] },
  { phrase: 'end it all',       inject: ['numb','loss','surrender'] },
  { phrase: 'end it',           inject: ['numb','loss','surrender'] },
  { phrase: 'disappear',        inject: ['numb','loss'] },
  { phrase: 'give up',          inject: ['surrender','exhausted'] },
  { phrase: 'giving up',        inject: ['surrender','exhausted'] },
  { phrase: "i'm done",         inject: ['surrender','exhausted'] },
  { phrase: 'im done',          inject: ['surrender','exhausted'] },
  { phrase: 'done with',        inject: ['surrender','exhausted'] },
  { phrase: 'let go',           inject: ['surrender'] },
  { phrase: 'letting go',       inject: ['surrender'] },
  { phrase: 'no point',         inject: ['numb','loss'] },
  { phrase: "what's the point", inject: ['numb','loss'] },
  { phrase: 'whats the point',  inject: ['numb','loss'] },
  { phrase: 'falling apart',    inject: ['loss','sad'] },
  { phrase: 'breaking down',    inject: ['loss','sad'] },
  { phrase: 'not enough',       inject: ['worthless'] },
  { phrase: 'burnt out',        inject: ['exhausted'] },
  { phrase: 'burned out',       inject: ['exhausted'] },
  { phrase: 'tired mom',        inject: ['tender','exhausted'] },
  { phrase: 'exhausted mom',    inject: ['tender','exhausted'] },
  { phrase: 'burnt out mom',    inject: ['tender','exhausted'] },
  { phrase: 'burned out mom',   inject: ['tender','exhausted'] },
  { phrase: 'overwhelmed mom',  inject: ['tender','exhausted'] },
  { phrase: 'drained mom',      inject: ['tender','exhausted'] },
  { phrase: 'tired mother',     inject: ['tender','exhausted'] },
  { phrase: 'exhausted mother', inject: ['tender','exhausted'] },
  { phrase: 'burnt out mother', inject: ['tender','exhausted'] },
  { phrase: 'burned out mother',inject: ['tender','exhausted'] },
  { phrase: 'overwhelmed mother', inject: ['tender','exhausted'] },
  { phrase: 'drained mother',   inject: ['tender','exhausted'] },
  { phrase: 'like a mom',       inject: ['tender'] },
  { phrase: 'as a mom',         inject: ['tender'] },
  { phrase: 'being a mom',      inject: ['tender'] },
  { phrase: 'feel like a mom',  inject: ['tender'] },
  { phrase: 'like a mother',    inject: ['tender'] },
  { phrase: 'as a mother',      inject: ['tender'] },
  { phrase: 'being a mother',   inject: ['tender'] },
  { phrase: 'motherhood',       inject: ['tender'] }
];

// Pre-stemmed lookup tables. Built once at module load so the user side and the
// dictionary side go through the same `lightStem` function — this is what fixes
// the asymmetry that made `loved` (stemmed to "lov") miss `'love'` (unstemmed).
const STEMMED_LEXICON = (() => {
  const out = {};
  for (const [key, words] of Object.entries(EMOTION_LEXICON)) {
    const stems = new Set(words.map(lightStem));
    stems.add(lightStem(key));
    out[key] = stems;
  }
  return out;
})();

const STEMMED_CARD_TAGS = (() => {
  const out = {};
  for (const [name, tags] of Object.entries(CARD_TAGS)) {
    out[name] = tags.map(t => ({ original: t, stem: lightStem(t) }));
  }
  return out;
})();


/* ══════════════════════════════════════════════════════════
   11. DEEP MEANING SCREEN
   ══════════════════════════════════════════════════════════ */

function buildDeepScreen() {
  const card      = selectedCard;
  const colorGroup = selectedColor || COLORS.find(c => c.id === card.colorId);
  const siblingCard = colorGroup?.cards.find(c => c.name !== card.name) || null;

  const lightCards = ['Surrender','Hollow','Soft','Static','Radiance'];
  const isLight    = lightCards.includes(card.name);
  const textColor  = isLight ? 'rgba(30,30,30,0.9)'  : 'rgba(255,255,255,0.95)';

  // Small card
  document.getElementById('deepCardWrapper').innerHTML = `
    <div class="revealed-card" style="width:172px; height:290px; background: linear-gradient(160deg, ${card.shade}cc, ${card.shade}); --card-glow:${card.glow};">
      <div class="card-symbol">${card.symbol}</div>
      <div class="card-name" style="font-size:1.2rem; color:${textColor}">${card.name}</div>
    </div>`;

  // Save interpretation if coming from interpret screen
  const savedText = document.getElementById('interpretInput')?.value?.trim() || '';
  if (savedText) userInterpretation = savedText;

  // Your reflection block (Path 1 only, if they wrote something)
  const reflectionBlock = (currentPath === 'intuitive' && userInterpretation)
    ? `<div class="your-reflection">You wrote: "${userInterpretation}"</div>`
    : '';

  // Alternative card (Path 2 only) — single-card UX: user can override the current card.
  let altBlock = '';
  if (currentPath === 'reflective' && alternativeCard) {
    altBlock = `
      <div class="alt-card-section">
        <button class="alt-toggle" onclick="overrideWithAlternative()">this doesn't resonate →</button>
        <div class="match-reason">${altMatchReason}</div>
      </div>`;
  }

  // Path 1: let them swap to the other card in the same color.
  // Still single-card UX: we replace the current card (no two cards at once).
  let path1SwapBlock = '';
  if (currentPath === 'intuitive' && siblingCard) {
    path1SwapBlock = `
      <div class="alt-card-section">
        <button class="alt-toggle" onclick="overrideWithSiblingCard()">this doesn't resonate →</button>
        <div class="match-reason">If this doesn’t fit, you can try the other card in this color.</div>
      </div>`;
  }

  document.getElementById('deepText').innerHTML = `
    <div class="small-label">${colorGroup?.label || ''}</div>
    <div class="card-whisper">${card.whisper}</div>
    <hr class="divider">
    <div class="card-meaning">${card.meaning}</div>
    ${reflectionBlock}
    ${path1SwapBlock}
    ${altBlock}
    <button class="soft-btn" style="margin-top:1rem;" onclick="enterStayHere()">Stay here</button>
    <button class="soft-btn" style="margin-top:1rem;" onclick="startWanderMode()">Wander the colors</button>
    <button class="soft-btn" style="margin-top:1rem;" onclick="resetAll()">Draw again</button>
    <a href="#" class="feedback-foot-link" onclick="goToFeedbackRoom(); return false;">leave a trace</a>`;
}

function goToFeedbackRoom() {
  if (!selectedCard) return;
  const color = selectedColor?.label || selectedCard.colorLabel || '';
  const hint = document.getElementById('feedbackCardHint');
  if (hint) hint.textContent = `You drew ${selectedCard.name}${color ? ` (${color})` : ''}.`;
  updateFeedbackCountLabel();
  syncFeedbackAdminUi();
  const status = document.getElementById('feedbackStatus');
  if (status) status.textContent = '';
  goTo('screen-feedback');
}

function submitFeedbackEntry() {
  const selected = document.querySelector('input[name="feedbackResonance"]:checked');
  const resonance = selected ? selected.value : '';
  const note = document.getElementById('feedbackInput')?.value?.trim() || '';
  const status = document.getElementById('feedbackStatus');

  if (!resonance && !note) {
    if (status) status.textContent = 'Choose yes, almost, or not quite—or a line in the box.';
    return;
  }

  const existing = getFeedbackEntries();
  existing.push({
    timestamp: new Date().toISOString(),
    card: selectedCard?.name || '',
    color: selectedColor?.label || selectedCard?.colorLabel || '',
    path: currentPath || '',
    userReflection: userReflection || '',
    resonance,
    note
  });
  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(existing));
  updateFeedbackCountLabel();

  if (status) status.textContent = 'Recorded. Thank you.';
  if (selected) selected.checked = false;
  const input = document.getElementById('feedbackInput');
  if (input) input.value = '';
}

function syncFeedbackAdminUi() {
  const admin = document.getElementById('feedbackAdmin');
  if (!admin) return;
  admin.hidden = !isFeedbackAdminUnlocked();
}

function isFeedbackAdminUnlocked() {
  return sessionStorage.getItem(FEEDBACK_ADMIN_SESSION_KEY) === '1';
}

function tryUnlockFeedbackAdmin() {
  const guess = window.prompt('Passphrase?');
  if (!guess) return false;
  if (guess.trim().toLowerCase() !== 'drogon') return false;
  sessionStorage.setItem(FEEDBACK_ADMIN_SESSION_KEY, '1');
  syncFeedbackAdminUi();
  const status = document.getElementById('feedbackStatus');
  if (status) status.textContent = 'Admin tools unlocked for this tab.';
  return true;
}

function exportFeedbackEntries() {
  if (!isFeedbackAdminUnlocked()) return;
  const entries = getFeedbackEntries();
  const status = document.getElementById('feedbackStatus');
  if (!entries.length) {
    if (status) status.textContent = 'No saved notes yet.';
    return;
  }

  const blob = new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `prism-feedback-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  if (status) status.textContent = `Exported ${entries.length} note${entries.length === 1 ? '' : 's'}.`;
}

function clearFeedbackEntries() {
  if (!isFeedbackAdminUnlocked()) return;
  const status = document.getElementById('feedbackStatus');
  const entries = getFeedbackEntries();
  if (!entries.length) {
    if (status) status.textContent = 'No saved notes to clear.';
    return;
  }
  const ok = window.confirm('Clear all saved feedback notes?');
  if (!ok) return;
  localStorage.removeItem(FEEDBACK_STORAGE_KEY);
  updateFeedbackCountLabel();
  if (status) status.textContent = 'Saved notes cleared.';
}

function getFeedbackEntries() {
  try {
    const raw = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Unable to read feedback entries:', err);
    return [];
  }
}

function updateFeedbackCountLabel() {
  const countLabel = document.getElementById('feedbackCount');
  if (!countLabel) return;
  const count = getFeedbackEntries().length;
  countLabel.textContent = `saved notes: ${count}`;
}

function overrideWithAlternative() {
  if (!alternativeCard) return;

  // Replace the current card with the alternative (single-card experience).
  const next = alternativeCard;
  alternativeCard = null;
  altMatchReason = '';

  selectedCard = next;
  selectedColor = COLORS.find(c => c.id === next.colorId) || null;

  // Update atmosphere to match the new card immediately.
  document.getElementById('bgLayer').style.background =
    `radial-gradient(ellipse 100% 80% at 50% 100%, ${next.glow} 0%, transparent 65%)`;
  setAtmosphere(next.atmosphere);

  // Rebuild the deep screen with the new card.
  buildDeepScreen();
  goTo('screen-deep');
}

function overrideWithSiblingCard() {
  const current = selectedCard;
  if (!current) return;

  const group = selectedColor || COLORS.find(c => c.id === current.colorId);
  const sibling = group?.cards.find(c => c.name !== current.name);
  if (!sibling) return;

  // Swap so they can go back-and-forth if they click again.
  selectedCard = sibling;
  selectedColor = group || null;

  // Update atmosphere immediately.
  document.getElementById('bgLayer').style.background =
    `radial-gradient(ellipse 100% 80% at 50% 100%, ${sibling.glow} 0%, transparent 65%)`;
  setAtmosphere(sibling.atmosphere);

  buildDeepScreen();
  goTo('screen-deep');
}


/* ══════════════════════════════════════════════════════════
   12. RESET
   ══════════════════════════════════════════════════════════ */

function resetAll() {
  exitStayHere();
  stopWanderTimer();
  wanderPlaying = false;
  wanderIndex = 0;

  selectedColor      = null;
  selectedCard       = null;
  alternativeCard    = null;
  altMatchReason     = '';
  currentPath        = null;
  userReflection     = '';
  userInterpretation = '';

  resetAtmosphere();

  document.getElementById('bgLayer').style.background      = '';
  document.getElementById('revealedCardWrapper').innerHTML  = '';
  document.getElementById('deepCardWrapper').innerHTML      = '';
  document.getElementById('deepText').innerHTML             = '';
  document.getElementById('interpretCardWrapper').innerHTML = '';
  document.getElementById('wanderColorLabel').textContent   = '';
  document.getElementById('wanderWhisper').textContent      = '';

  const reflectInput = document.getElementById('reflectInput');
  if (reflectInput) reflectInput.value = '';
  const interpretInput = document.getElementById('interpretInput');
  if (interpretInput) interpretInput.value = '';
  const feedbackInput = document.getElementById('feedbackInput');
  if (feedbackInput) feedbackInput.value = '';
  const feedbackStatus = document.getElementById('feedbackStatus');
  if (feedbackStatus) feedbackStatus.textContent = '';
  document.querySelectorAll('input[name="feedbackResonance"]').forEach(el => {
    el.checked = false;
  });

  goTo('screen-landing');
}


/* ══════════════════════════════════════════════════════════
   13. DEV HELPERS
   ══════════════════════════════════════════════════════════
   Run `__match("i feel alone")` from the browser console to see
   exactly what the matcher is doing for any input — useful when
   troubleshooting why a phrase landed on a particular card.
   ══════════════════════════════════════════════════════════ */

window.__match = function (text) {
  const normalized = normalizeReflectionText(text);
  const { injected: phraseTokens, stripped } = scanPhrases(normalized);
  const baseTokens = tokensFromText(stripped);
  const seedTokens = new Set([...baseTokens, ...phraseTokens.map(lightStem)]);
  const expanded   = expandTokens(seedTokens);

  const top5 = ALL_CARDS.map(c => {
    const { score, hits, tagHits } = scoreCardAgainstTokens(c, expanded);
    return { card: c.name, color: c.colorLabel, score: +score.toFixed(2), tagHits, hits: [...new Set(hits)] };
  }).sort((a, b) => b.score - a.score).slice(0, 5);

  const result = matchCardToReflectionLocal(text);

  return {
    input: text,
    normalized,
    strippedAfterPhrases: stripped,
    phraseInjected: [...phraseTokens],
    seedTokens: [...seedTokens],
    expanded: [...expanded],
    fallbackTriggered: top5[0].tagHits === 0,
    userFacingPrimary: result.primary,
    userFacingSecondary: result.secondary,
    top5
  };
};

// Feedback room: unlock admin tools by clicking the title.
document.addEventListener('click', (evt) => {
  const el = evt.target;
  if (!(el instanceof Element)) return;
  if (el.id !== 'feedbackTitle') return;
  // Only attempt unlock while on the feedback screen.
  const feedbackScreen = document.getElementById('screen-feedback');
  if (feedbackScreen && !feedbackScreen.classList.contains('active')) return;
  tryUnlockFeedbackAdmin();
});


/* ── START ── */
init();