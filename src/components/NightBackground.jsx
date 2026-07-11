import "./NightBackground.css";
import Stars from "./Stars";

const NightBackground = ({ children }) => {
  return (
    <main className="night-background">

      <Stars />

      <div className="night-content">
      {children}
      </div>

    </main>
  );
};

export default NightBackground;