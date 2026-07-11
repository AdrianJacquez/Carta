import "./Moon.css";

const Moon = ({ hidden = false }) => {
  return (
    <div className={`moon-container ${hidden ? "moon-hidden" : ""}`} aria-hidden="true">
      <div className="moon-background" />
    </div>
  );
};

export default Moon;