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
            Hola nikoleta, o talvez prefieras bruja o solo nicole, se que fernanda no es opción. Espero te encuentres muy bien. Te escribo esta carta, (que es la primera despues de las que me pedían en la primaria para mi ama) por que quiero que sientas lo que siento y dejar las indirectas a un lado. Quiero contarte lo que ha sido para mi conocerte y tener la dicha de que me llames amigo (que no me gusta) por ahora.
La primera vez que te vi, lo único que pude pensar fue que eras una diosa jeje literalmente la inalcanzable, ibas con una cara de desprecio increíble y aunque ni siquiera tuve tu mirada un segundo me imagine toda una vida.
Despues de verte solo pensaba en como podria hablarte, que preguntar o de que hablar contigo, y un buen día saliendo del salón te vi sentada en la banca con el Alan y me brillaron los ojos, aproveche para poder hablarte y quede encantado con la historia de que te habias quedado pelona. Aun no habia confianza pero queria tenerla.

Ya para el siguiente dia le dije al alan que nos sentaramos del otro lado del salón "para conocer más gente", solo queria hablar mas contigo. Me ponía tan nervioso cada vez que hablaba contigo por mínimo que fuera el intercambio de palabras, me daba pena hasta verte a los ojos.
Cuando tuvimos nuestra primera discusión sobre que hacían los routers hiciste que te viera como la niña mas inteligente del mundo, quede sorprendido de lo mucho que sabes y la pasión con la que hablabas de resistencias y protoboards como si deberás le supieras, pero enserió me fascinaba escucharte hablar de todo éso.
El primer semestre la pasé con el me gustas en la punta de la lengua pero nunca me atreví a demostrarlo o no concientemente por que realmente no sentía que pudiera llegar a ser mutuo y no me queria arriesgar a dejar de hablarte, por que, quedar en la friendzone iba a ser muy incómodo para mi y probablemente te hubiera dejado de hablar, además estoy casi seguro de que no te gustaba y aun no estoy completamente seguro de gustarte ahora, pero quiero pensar que si.

El segundo semestre fue totalmente diferente, desde el primer día te sentí distinta, mas cercana, y lo mejor, sentía que era mutuo. 
Hacias que no quisiera entrar a clases por estar un poco mas contigo, y cuando entraba, solo queria que pasarán rápido los minutos sin ti para verte en poo, aunque tengo la teoría de que me usabas para pasar, no la puedo confirmar por que la mayoría me lo pasabas tú, pero las probabilidades nunca son cero.
Extraño rozar tu brazo cuando caminábamos, ese juego con las manos en el que más de una vez me moría de ganas de tomarte la mano. Pero como iba a quedar si la quitabas, o talvez la dejabas ahí y solo el tener que movernos y la pena de que nos vieran nos hiciera soltarnos, pero ese es solo un what if.
Si superas todas las veces que te vi y las ganas que tenia de decirte lo hermosa que te veías, pero me detenía el pensar que podria ser incomodo, no hubo un dia que te viera que no lo pensará.
Extraño lo linda que te veías tan preocupada por los exámenes de poo. Enojarme contigo por que me apagaras el monitor o no me dejaras escribir.
Si escribiera todo lo que extraño talvez no acabarías de leer nunca y tampoco me quiero quedar sin palabras si hay futuras cartas.

Me gustas, me gustan tus ojos, tu inteligencia, tus labios, tu personalidad, tu cabello, tu humor, tu nariz, tu terquedad, tus manos, tu carácter, tus brazitos, todo de ti.
Quiero conocer todo de ti y que conozcas todo de mí, saber mas de ti que todos.
Brujita hermosa, nose si me hiciste un amarre, pero quiero pensar que todo lo que siento es por que nace de mí y no por que estes haciendo magea, y si asi fuera, continúa, hazlo tan bien que no pueda desamarrarme ni en mil vidas mas.
Ya casi un año de conocerte, y casi un año de guardar esto, creo que no muy bien, pero es que no soy tan discreto. 
Me gusto mucho escribir esto para ti, pueden no ser las mejores palabras o falten cosas por explicar pero la práctica hace al maestro y quiero que sea contigo.
Te quiero mucho, te mando un abrazo rompecostillas y un pellizco en ese bracito que tanto me encanta.
            
          </p>
          <p className="letter-card__signature">PSDT: Quiero que escuches esta cancion, y me invites un cigarro aunque ya no fumo</p>
          <iframe
            data-testid="embed-iframe"
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/track/3SNOoNcM4sHo7TdeUJX1PL?utm_source=generator&si=8045da1783af49ac"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </article>
      )}
    </section>
  );
};

export default MoonConversation;