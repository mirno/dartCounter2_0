const MAX_VISIT_SCORE = 180;

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function defaultNames(mode) {
  if (mode === "2v2") {
    return {
      side1Name: "Team 1",
      side2Name: "Team 2",
      team1Player1: "Team 1 - Player 1",
      team1Player2: "Team 1 - Player 2",
      team2Player1: "Team 2 - Player 1",
      team2Player2: "Team 2 - Player 2",
    };
  }

  return {
    side1Name: "Player 1",
    side2Name: "Player 2",
    player1Name: "Player 1",
    player2Name: "Player 2",
  };
}

export function normalizeSetup(rawSetup) {
  const mode = rawSetup.mode === "2v2" ? "2v2" : "1v1";
  const names = { ...defaultNames(mode), ...(rawSetup.names || {}) };

  const startingScore = Number.parseInt(rawSetup.startingScore, 10);
  const legsToWinSet = Number.parseInt(rawSetup.legsToWinSet, 10);
  const setsToWinMatch = Number.parseInt(rawSetup.setsToWinMatch, 10);
  const finishHintThreshold = Number.parseInt(rawSetup.finishHintThreshold, 10);
  const firstLegStarterSide = rawSetup.firstLegStarterSide === 1 ? 1 : 0;

  if (!Number.isInteger(startingScore) || startingScore <= 1) {
    throw new Error("startingScore must be an integer > 1");
  }
  if (!Number.isInteger(legsToWinSet) || legsToWinSet <= 0) {
    throw new Error("legsToWinSet must be an integer > 0");
  }
  if (!Number.isInteger(setsToWinMatch) || setsToWinMatch <= 0) {
    throw new Error("setsToWinMatch must be an integer > 0");
  }
  if (!Number.isInteger(finishHintThreshold) || finishHintThreshold <= 1) {
    throw new Error("finishHintThreshold must be an integer > 1");
  }

  const sides =
    mode === "2v2"
      ? [
          {
            name: names.side1Name,
            players: [names.team1Player1, names.team1Player2],
          },
          {
            name: names.side2Name,
            players: [names.team2Player1, names.team2Player2],
          },
        ]
      : [
          {
            name: names.side1Name,
            players: [names.player1Name],
          },
          {
            name: names.side2Name,
            players: [names.player2Name],
          },
        ];

  return {
    mode,
    startingScore,
    legsToWinSet,
    setsToWinMatch,
    finishHintThreshold,
    firstLegStarterSide,
    sides,
  };
}

function initialStateFromSetup(setup) {
  return {
    mode: setup.mode,
    startingScore: setup.startingScore,
    legsToWinSet: setup.legsToWinSet,
    setsToWinMatch: setup.setsToWinMatch,
    finishHintThreshold: setup.finishHintThreshold,
    sides: clone(setup.sides),
    scores: [setup.startingScore, setup.startingScore],
    legWinsInSet: [0, 0],
    setWinsInMatch: [0, 0],
    legNumberInSet: 1,
    setNumberInMatch: 1,
    legStarterSide: setup.firstLegStarterSide,
    currentSide: setup.firstLegStarterSide,
    nextPlayerIndexBySide: [0, 0],
    matchOver: false,
    winnerSide: null,
    eventsApplied: 0,
  };
}

function rotateTurn(state) {
  const side = state.currentSide;
  const playersInSide = state.sides[side].players.length;

  state.nextPlayerIndexBySide[side] =
    (state.nextPlayerIndexBySide[side] + 1) % playersInSide;
  state.currentSide = side === 0 ? 1 : 0;
}

function startNextLeg(state) {
  state.legStarterSide = state.legStarterSide === 0 ? 1 : 0;
  state.scores = [state.startingScore, state.startingScore];
  state.nextPlayerIndexBySide = [0, 0];
  state.currentSide = state.legStarterSide;
  state.legNumberInSet += 1;
}

function closeLegAndMaybeSet(state, winningSide) {
  state.legWinsInSet[winningSide] += 1;

  if (state.legWinsInSet[winningSide] >= state.legsToWinSet) {
    state.setWinsInMatch[winningSide] += 1;
    state.legWinsInSet = [0, 0];
    state.legNumberInSet = 1;

    if (state.setWinsInMatch[winningSide] >= state.setsToWinMatch) {
      state.matchOver = true;
      state.winnerSide = winningSide;
      state.setNumberInMatch = state.setsToWinMatch;
      return;
    }

    state.setNumberInMatch += 1;
  }

  startNextLeg(state);
}

function applyScoreEvent(state, event) {
  if (state.matchOver) {
    return;
  }

  if (event.type !== "SCORE") {
    throw new Error(`Unsupported event type: ${event.type}`);
  }

  const value = Number.parseInt(event.value, 10);
  if (!Number.isInteger(value) || value < 0 || value > MAX_VISIT_SCORE) {
    throw new Error("Score event value must be an integer from 0 to 180");
  }

  const side = state.currentSide;
  const currentScore = state.scores[side];
  const remaining = currentScore - value;

  if (remaining < 0) {
    rotateTurn(state);
    return;
  }

  if (remaining === 0) {
    state.scores[side] = 0;
    closeLegAndMaybeSet(state, side);
    return;
  }

  state.scores[side] = remaining;
  rotateTurn(state);
}

export function deriveGameState(setup, events = []) {
  const normalized = Array.isArray(setup?.sides)
    ? setup
    : normalizeSetup(setup);
  const state = initialStateFromSetup(normalized);

  for (const event of events) {
    applyScoreEvent(state, event);
    state.eventsApplied += 1;
  }

  return state;
}

export function activePlayerName(state) {
  const side = state.currentSide;
  const playerIndex = state.nextPlayerIndexBySide[side];
  return state.sides[side].players[playerIndex];
}

export function finishPossible(state) {
  if (state.matchOver) {
    return false;
  }

  const score = state.scores[state.currentSide];
  return score > 1 && score <= state.finishHintThreshold;
}

export function createScoreEvent(value) {
  return {
    type: "SCORE",
    value,
    createdAt: new Date().toISOString(),
  };
}

export function validateScoreValue(value) {
  const number = Number.parseInt(value, 10);
  if (!Number.isInteger(number) || number < 0 || number > MAX_VISIT_SCORE) {
    throw new Error("Score must be an integer between 0 and 180");
  }

  return number;
}

export function formatEvent(event) {
  return `${event.type} ${event.value} @ ${event.createdAt}`;
}
