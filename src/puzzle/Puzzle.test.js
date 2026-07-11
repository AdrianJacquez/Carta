import test from 'node:test';
import assert from 'node:assert/strict';
import { generateCode, evaluateGuess, generateClues } from './Puzzle.js';

test('generateCode returns four unique digits between 1 and 9', () => {
  const code = generateCode();

  assert.equal(code.length, 4);
  assert.deepEqual([...new Set(code)], code);
  assert.ok(code.every((digit) => digit >= 1 && digit <= 9));
});

test('evaluateGuess returns exact and misplaced counts', () => {
  const secret = [4, 8, 2, 7];
  const result = evaluateGuess(secret, [4, 7, 2, 9]);

  assert.deepEqual(result, { exact: 2, misplaced: 1 });
});

test('generateClues returns several automatic hints for a secret code', () => {
  const secret = [4, 8, 2, 7];
  const clues = generateClues(secret, 4);

  assert.equal(clues.length, 4);
  assert.ok(clues.every((clue) => Array.isArray(clue.guess)));
  assert.ok(clues.every((clue) => typeof clue.exact === 'number'));
  assert.ok(clues.every((clue) => typeof clue.misplaced === 'number'));
});
