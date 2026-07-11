import "./WindText.css";

const WindText = ({ text, phase = "visible" }) => {
  return (
    <p className={`wind-text wind-text--${phase}`} aria-label={text}>
      {text.split("").map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className="wind-letter"
          aria-hidden="true"
          style={{
            "--index": index,
            "--delay": `${index * 25}ms`,
            "--drift-x": `${35 + (index % 5) * 12}px`,
            "--drift-y": `${-12 - (index % 4) * 8}px`,
            "--rotation": `${(index % 2 === 0 ? 1 : -1) * (8 + (index % 5) * 4)}deg`,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </p>
  );
};

export default WindText;