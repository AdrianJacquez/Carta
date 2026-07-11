import "./Stars.css";

const STAR_COUNT = 45;

const Stars = () => {
  const stars = Array.from({ length: STAR_COUNT }, (_, index) => ({
    id: index,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 4,
  }));

  return (
    <div className="stars" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            "--x": `${star.x}%`,
            "--y": `${star.y}%`,
            "--size": `${star.size}px`,
            "--duration": `${star.duration}s`,
            "--delay": `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Stars;