const CODE_LENGTH = 4;
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const MASTER_CODE = "6666";

export function generateCode() {
  const available = [...NUMBERS];
  const code = [];

  while (code.length < CODE_LENGTH) {
    const index = Math.floor(Math.random() * available.length);
    code.push(available.splice(index, 1)[0]);
  }

  return code;
}

export function evaluateGuess(secret, guess) {
  let exact = 0;
  let misplaced = 0;

  guess.forEach((number, index) => {
    if (number === secret[index]) {
      exact += 1;
    } else if (secret.includes(number)) {
      misplaced += 1;
    }
  });

  return {
    exact,
    misplaced,
  };
}

export function generateClues(secretCode, count = 4) {
  const clues = [];

  while (clues.length < count) {
    const guess = generateCode();
    const key = guess.join("");
    const secretKey = secretCode.join("");

    if (key === secretKey) {
      continue;
    }

    const exists = clues.some((clue) => clue.guess.join("") === key);

    if (exists) {
      continue;
    }

    const result = evaluateGuess(secretCode, guess);

    clues.push({
      guess,
      exact: result.exact,
      misplaced: result.misplaced,
    });
  }

  return clues;
}

export function isMasterCode(guess) {
  return guess.join("") === MASTER_CODE;
}

export { CODE_LENGTH, MASTER_CODE };