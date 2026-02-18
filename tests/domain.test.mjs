import test from "node:test";
import assert from "node:assert/strict";

import {
  activePlayerName,
  createScoreEvent,
  deriveGameState,
  finishPossible,
  normalizeSetup,
} from "../src/domain.mjs";

function setup1v1() {
  return normalizeSetup({
    mode: "1v1",
    startingScore: 101,
    legsToWinSet: 2,
    setsToWinMatch: 2,
    finishHintThreshold: 170,
    firstLegStarterSide: 0,
    names: {
      side1Name: "A",
      side2Name: "B",
      player1Name: "A",
      player2Name: "B",
    },
  });
}

test("1v1 turn alternates", () => {
  const setup = setup1v1();
  const state = deriveGameState(setup, [createScoreEvent(20)]);
  assert.equal(state.currentSide, 1);
});

test("bust does not change side score but rotates turn", () => {
  const setup = setup1v1();
  const events = [createScoreEvent(120)];
  const state = deriveGameState(setup, events);
  assert.equal(state.scores[0], 101);
  assert.equal(state.currentSide, 1);
});

test("undo by replay preserves deterministic turn and score", () => {
  const setup = setup1v1();
  const events = [
    createScoreEvent(40),
    createScoreEvent(30),
    createScoreEvent(10),
  ];

  const withThree = deriveGameState(setup, events);
  const withTwo = deriveGameState(setup, events.slice(0, 2));

  assert.notEqual(withThree.scores[0], withTwo.scores[0]);
  assert.equal(withTwo.currentSide, 0);
});

test("winning leg updates leg count and resets for next leg", () => {
  const setup = setup1v1();
  const events = [createScoreEvent(101)];
  const state = deriveGameState(setup, events);

  assert.equal(state.legWinsInSet[0], 1);
  assert.equal(state.scores[0], 101);
  assert.equal(state.scores[1], 101);
});

test("2v2 rotates players deterministically inside each team", () => {
  const setup = normalizeSetup({
    mode: "2v2",
    startingScore: 301,
    legsToWinSet: 1,
    setsToWinMatch: 1,
    finishHintThreshold: 170,
    firstLegStarterSide: 0,
    names: {
      side1Name: "T1",
      side2Name: "T2",
      team1Player1: "T1P1",
      team1Player2: "T1P2",
      team2Player1: "T2P1",
      team2Player2: "T2P2",
    },
  });

  let state = deriveGameState(setup, []);
  assert.equal(activePlayerName(state), "T1P1");

  state = deriveGameState(setup, [createScoreEvent(10), createScoreEvent(20)]);
  assert.equal(state.currentSide, 0);
  assert.equal(activePlayerName(state), "T1P2");
});

test("finish possible follows threshold", () => {
  const setup = setup1v1();
  const state = deriveGameState(setup, []);
  assert.equal(finishPossible(state), true);
});

test("set number does not exceed configured sets when match ends", () => {
  const setup = normalizeSetup({
    mode: "1v1",
    startingScore: 50,
    legsToWinSet: 1,
    setsToWinMatch: 2,
    finishHintThreshold: 170,
    firstLegStarterSide: 0,
    names: {
      side1Name: "A",
      side2Name: "B",
      player1Name: "A",
      player2Name: "B",
    },
  });

  const events = [
    createScoreEvent(50),
    createScoreEvent(0),
    createScoreEvent(50),
  ];
  const state = deriveGameState(setup, events);

  assert.equal(state.matchOver, true);
  assert.equal(state.winnerSide, 0);
  assert.equal(state.setNumberInMatch, 2);
});

test("undo across completed leg restores prior turn and player order", () => {
  const setup = normalizeSetup({
    mode: "2v2",
    startingScore: 40,
    legsToWinSet: 2,
    setsToWinMatch: 1,
    finishHintThreshold: 170,
    firstLegStarterSide: 0,
    names: {
      side1Name: "T1",
      side2Name: "T2",
      team1Player1: "T1P1",
      team1Player2: "T1P2",
      team2Player1: "T2P1",
      team2Player2: "T2P2",
    },
  });

  const events = [createScoreEvent(40), createScoreEvent(10)];
  const stateAfterTwoEvents = deriveGameState(setup, events);
  const stateAfterUndo = deriveGameState(setup, events.slice(0, 1));

  assert.equal(stateAfterTwoEvents.currentSide, 0);
  assert.equal(activePlayerName(stateAfterTwoEvents), "T1P1");
  assert.equal(stateAfterUndo.currentSide, 1);
  assert.equal(activePlayerName(stateAfterUndo), "T2P1");
});
