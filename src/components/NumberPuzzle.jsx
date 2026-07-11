import { useState } from "react";
import "./NumberPuzzle.css";
import { evaluateGuess, isMasterCode } from "../puzzle/Puzzle";

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const NumberPuzzle = ({ secretCode, onComplete }) => {
  const [input, setInput] = useState([]);
  const [status, setStatus] = useState("playing");
  const [feedback, setFeedback] = useState("Introduce el código de 4 dígitos.");

  const handleNumber = (number) => {
    if (status !== "playing" || input.length >= 4) return;

    const nextInput = [...input, number];
    setInput(nextInput);

    if (nextInput.length < 4) {
      setFeedback("Sigue, la luna está atenta.");
      return;
    }

    if (isMasterCode(nextInput)) {
      setStatus("completed");
      setFeedback("La luna responde a tu voluntad.");
      navigator.vibrate?.(50);
      setTimeout(() => {
        onComplete?.();
      }, 900);
      return;
    }

    const isCorrect = nextInput.every((digit, index) => digit === secretCode[index]);

    if (isCorrect) {
      setStatus("completed");
      setFeedback("El código encaja con la noche.");
      navigator.vibrate?.(60);
      setTimeout(() => {
        onComplete?.();
      }, 900);
      return;
    }

    const result = evaluateGuess(secretCode, nextInput);
    setFeedback(`Exactos: ${result.exact} · Desplazados: ${result.misplaced}`);
    setStatus("error");

    setTimeout(() => {
      setInput([]);
      setStatus("playing");
      setFeedback("Inténtalo de nuevo, con calma.");
    }, 850);
  };

  const handleBackspace = () => {
    if (status !== "playing") return;

    setInput((current) => current.slice(0, -1));
    setFeedback("Borra si quieres corregir el camino.");
  };

  const handleClear = () => {
    if (status !== "playing") return;

    setInput([]);
    setFeedback("El cielo vuelve a quedar en blanco.");
  };

  return (
    <div className={`number-puzzle number-puzzle--${status}`}>
      <div className="code-display">
        {Array.from({ length: 4 }, (_, index) => (
          <span
            key={index}
            className={`code-slot ${index < input.length ? "code-slot--solved" : ""}`}
          >
            {input[index] ?? "·"}
          </span>
        ))}
      </div>

      <p className="puzzle-feedback" role="status">
        {feedback}
      </p>

      <div className="number-grid">
        {NUMBERS.map((number) => (
          <button
            key={number}
            className="number-button"
            onClick={() => handleNumber(number)}
            disabled={status !== "playing" || input.length >= 4}
          >
            {number}
          </button>
        ))}
      </div>

      <div className="puzzle-actions">
        <button className="puzzle-action" onClick={handleBackspace}>
          Borrar
        </button>
        <button className="puzzle-action puzzle-action--secondary" onClick={handleClear}>
          Limpiar
        </button>
      </div>
    </div>
  );
};

export default NumberPuzzle;