import {
  activePlayerName,
  createScoreEvent,
  deriveGameState,
  finishPossible,
  formatEvent,
  normalizeSetup,
  validateScoreValue,
} from "./domain.mjs";

const STORAGE_KEY = "codex_dartcounter_state_v1";

const setupView = document.querySelector("#setup-view");
const matchView = document.querySelector("#match-view");
const setupForm = document.querySelector("#setup-form");
const modeInput = document.querySelector("#mode");
const mode1v1Fields = document.querySelector("#mode-1v1-fields");
const mode2v2Fields = document.querySelector("#mode-2v2-fields");
const scoreInput = document.querySelector("#score-input");
const addScoreButton = document.querySelector("#add-score");
const undoButton = document.querySelector("#undo");
const newMatchButton = document.querySelector("#new-match");
const turnText = document.querySelector("#turn-text");
const finishBadge = document.querySelector("#finish-badge");
const scoreboards = document.querySelector("#scoreboards");
const statusText = document.querySelector("#status-text");
const eventsList = document.querySelector("#events");
const errorBox = document.querySelector("#error-box");

let setup = null;
let events = [];

function setError(message) {
  errorBox.textContent = message || "";
}

function clearError() {
  setError("");
}

function showSetupView() {
  setupView.hidden = false;
  matchView.hidden = true;
}

function showMatchView() {
  setupView.hidden = true;
  matchView.hidden = false;
}

function serialize() {
  return JSON.stringify({ setup, events });
}

function persist() {
  if (!setup) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }

  localStorage.setItem(STORAGE_KEY, serialize());
}

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return false;
  }

  try {
    const parsed = JSON.parse(raw);
    setup = normalizeSetup(parsed.setup);
    events = Array.isArray(parsed.events) ? parsed.events : [];
    return true;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    setup = null;
    events = [];
    return false;
  }
}

function currentState() {
  if (!setup) {
    return null;
  }

  return deriveGameState(setup, events);
}

function sideCard(state, sideIndex) {
  const side = state.sides[sideIndex];
  const isActiveSide = sideIndex === state.currentSide;
  const activePlayerIndex = state.nextPlayerIndexBySide[sideIndex];

  const players = side.players
    .map((name, index) => {
      const marker = isActiveSide && index === activePlayerIndex && !state.matchOver ? "*" : "";
      return `<li>${name} ${marker}</li>`;
    })
    .join("");

  return `
    <article class="score-card ${isActiveSide ? "active" : ""}">
      <h3>${side.name}</h3>
      <p class="score-value">${state.scores[sideIndex]}</p>
      <p>Set wins: ${state.setWinsInMatch[sideIndex]} / ${state.setsToWinMatch}</p>
      <p>Leg wins (current set): ${state.legWinsInSet[sideIndex]} / ${state.legsToWinSet}</p>
      <ul>${players}</ul>
    </article>
  `;
}

function renderEvents() {
  const recent = events.slice(-12).reverse();
  if (recent.length === 0) {
    eventsList.innerHTML = "<li>No events yet.</li>";
    return;
  }

  eventsList.innerHTML = recent
    .map((event) => `<li>${formatEvent(event)}</li>`)
    .join("");
}

function renderMatch() {
  const state = currentState();
  if (!state) {
    showSetupView();
    return;
  }

  showMatchView();

  scoreboards.innerHTML = [0, 1].map((idx) => sideCard(state, idx)).join("");

  if (state.matchOver) {
    turnText.textContent = `Match complete. Winner: ${state.sides[state.winnerSide].name}`;
    addScoreButton.disabled = true;
    scoreInput.disabled = true;
  } else {
    turnText.textContent = `Turn: ${state.sides[state.currentSide].name} / ${activePlayerName(state)}`;
    addScoreButton.disabled = false;
    scoreInput.disabled = false;
  }

  finishBadge.textContent = finishPossible(state) ? "Finish possible" : "No finish";
  finishBadge.className = finishPossible(state) ? "badge badge-on" : "badge badge-off";

  statusText.textContent = `Set ${state.setNumberInMatch}, Leg ${state.legNumberInSet}`;
  undoButton.disabled = events.length === 0;

  renderEvents();
}

function readSetupFromForm() {
  const mode = modeInput.value === "2v2" ? "2v2" : "1v1";

  const base = {
    mode,
    startingScore: setupForm.startingScore.value,
    legsToWinSet: setupForm.legsToWinSet.value,
    setsToWinMatch: setupForm.setsToWinMatch.value,
    finishHintThreshold: setupForm.finishHintThreshold.value,
    firstLegStarterSide: Number.parseInt(setupForm.firstLegStarterSide.value, 10),
    names: {
      side1Name: setupForm.side1Name.value,
      side2Name: setupForm.side2Name.value,
    },
  };

  if (mode === "2v2") {
    base.names.team1Player1 = setupForm.team1Player1.value;
    base.names.team1Player2 = setupForm.team1Player2.value;
    base.names.team2Player1 = setupForm.team2Player1.value;
    base.names.team2Player2 = setupForm.team2Player2.value;
  } else {
    base.names.player1Name = setupForm.player1Name.value;
    base.names.player2Name = setupForm.player2Name.value;
  }

  return normalizeSetup(base);
}

function updateModeVisibility() {
  const mode = modeInput.value;
  const is2v2 = mode === "2v2";
  mode1v1Fields.hidden = is2v2;
  mode2v2Fields.hidden = !is2v2;
}

setupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearError();

  try {
    setup = readSetupFromForm();
    events = [];
    persist();
    renderMatch();
  } catch (error) {
    setError(error.message);
  }
});

addScoreButton.addEventListener("click", () => {
  clearError();

  try {
    const value = validateScoreValue(scoreInput.value);
    events.push(createScoreEvent(value));
    scoreInput.value = "";
    persist();
    renderMatch();
  } catch (error) {
    setError(error.message);
  }
});

undoButton.addEventListener("click", () => {
  clearError();

  if (events.length === 0) {
    return;
  }

  events.pop();
  persist();
  renderMatch();
});

newMatchButton.addEventListener("click", () => {
  clearError();
  setup = null;
  events = [];
  persist();
  showSetupView();
});

modeInput.addEventListener("change", updateModeVisibility);

updateModeVisibility();
if (load()) {
  renderMatch();
} else {
  showSetupView();
}
