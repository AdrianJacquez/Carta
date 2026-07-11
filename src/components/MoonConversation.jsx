import { useEffect, useMemo, useState } from "react";
import WindText from "./WindText";
import conversation from "../data/conversation";
import "./MoonConversation.css";
import NumberPuzzle from "./NumberPuzzle";
import { generateClues, generateCode } from "../puzzle/Puzzle";

const MoonConversation = ({ onPuzzleComplete }) => {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState("entering");
  const [secretCode, setSecretCode] = useState(() => generateCode());
  const [showLetter, setShowLetter] = useState(false);

  const currentDialogue = conversation[step];
  const clues = useMemo(() => generateClues(secretCode, 4), [secretCode]);

  useEffect(() => {
    if (phase !== "entering") return;

    const enteringDuration = 900 + currentDialogue.message.length * 25;

    const timer = setTimeout(() => {
      setPhase("visible");
    }, enteringDuration);

    return () => clearTimeout(timer);
  }, [phase, currentDialogue.message]);

  const goToNextStep = () => {
    const isLastStep = step === conversation.length - 1;

    if (isLastStep) {
      return;
    }

    setStep((currentStep) => currentStep + 1);
    setPhase("entering");
  };

  const handleResponse = () => {
    if (phase !== "visible") return;

    setPhase("leaving");

    const leavingDuration = 900 + currentDialogue.message.length * 18;

    setTimeout(() => {
      goToNextStep();
    }, leavingDuration);
  };

  const handlePuzzleComplete = () => {
    setShowLetter(true);
    setPhase("leaving");
    onPuzzleComplete?.();
  };

  return (
    <section className="moon-conversation">
      <WindText
        key={`${currentDialogue.id}-${step}`}
        text={currentDialogue.message}
        phase={phase}
      />

      {currentDialogue.type === "dialogue" && (
        <button
          className={`response-button response-button--${phase}`}
          onClick={handleResponse}
          disabled={phase !== "visible"}
        >
          {currentDialogue.response}
        </button>
      )}

      {currentDialogue.type === "puzzle" && phase === "visible" && (
        <>
          <div className="puzzle-clues">
            {clues.map((clue) => (
              <div key={clue.guess.join("")} className="puzzle-clue">
                <span>{clue.guess.join("")}</span>
                <span>
                  {clue.exact} exactos · {clue.misplaced} desplazados
                </span>
              </div>
            ))}
          </div>

          <NumberPuzzle secretCode={secretCode} onComplete={handlePuzzleComplete} />
        </>
      )}

      {showLetter && (
        <article className="letter-card letter-card--visible">
          <p className="letter-card__heading">Para una brujita</p>
          <p>
            Hola nikoleta, o talvez prefieras bruja o solo nicole, se que fernanda no es opción. Espero te encuentres muy bien y no estés triste por que perdió México. Te escribo esta carta, (que es la primera despues de las que me pedían en la primaria para mi ama) por que quiero que sientas lo que siento y dejar las indirectas a un lado. Quiero contarte lo que ha sido para mi conocerte y tener la dicha de que me llames amigo (que no me gusta) por ahora.
            La primera vez que te vi, lo único que pude pensar fue que eras una diosa jeje literalmente la inalcanzable, ibas con una cara de desprecio increíble y aunque ni siquiera tuve tu mirada un segundo me imagine toda una vida.
            Despues de verte solo pensaba en como podria hablarte, que preguntar o de que hablar contigo, y un buen día saliendo del salón te vi sentada en la banca con el Alan y me brillaron los ojos, aproveche para poder hablarte y quede encantado con la historia de que te habias quedado pelona. Aun no habia confianza pero queria tenerla.

            Ya para el siguiente dia le dije al alan que nos sentaramos del otro lado del salón "para conocer más gente", solo queria hablar mas contigo. 
            Cuando tuvimos nuestra primera discusión sobre que hacían los routers hiciste que te viera como la niña mas inteligente del mundo, quede sorprendido de lo mucho que sabes y la pasión con la que hablabas de resistencias y protoboards como si deberás le supieras, pero enserió me fascinaba escucharte hablar de todo éso.
            El primer semestre la pasé con el me gustas en la punta de la lengua pero nunca me atreví a demostrarlo o no concietemente por que realmente no sentía que pudiera llegar a ser mutuo y no me queria arriesgar a dejar de hablarte, por que, quedar en la friendzone iba a ser muy incómodo para mi y probablemente te hubiera dejado de hablar, además estoy casi seguro de que no te gustaba y aun no estoy completamente seguro de gustarte ahora, pero quiero pensar que si.

            El segundo fue un semestre totalmente diferente, desde el primer día te sentí distinta, mas cercana, y lo mejor, sentía que era mutuo. 
            Hacias que no quisiera entrar a clases por estar un poco mas contigo, y cuando entraba, solo queria que pasarán rápido los minutos sin ti para verte en poo, aunque tengo la teoría de que me usabas para pasar, no la puedo confirmar por que la mayoría me lo pasabas tú, pero las probabilidades nunca son 0.
            Extraño rozar tu brazo cuando caminábamos, ese juego con las manos en el que más de una vez me moría de ganas de tomarte la mano, pero como iba a quedar si la quitabas, o talvez la dejabas ahí y solo el tener que movernos y la pena de que nos vieran nos hiciera soltarnos, pero ese es solo what if.
            Extraño lo linda que te veías tan preocupada por los exámenes de poo. Enojarme contigo por que me apagaras el monitor o no me dejaras escribir.
            Si escribiera todo lo que extraño talvez no acabarías de leer nunca y tampoco me quiero quedar sin palabras si hay futuras cartas
          </p>
        </article>
      )}
    </section>
  );
};

export default MoonConversation;