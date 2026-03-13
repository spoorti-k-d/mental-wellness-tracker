import { Link } from "react-router-dom";
import { useRef } from "react";
import "./Home.css";

function Home() {

  const bubbleRef = useRef(null);

  const handleMouseMove = (e) => {

    if (!bubbleRef.current) return;

    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;

    bubbleRef.current.style.transform =
      `translate(${x * 40}px, ${y * 40}px)`;

  };

  return (

    <div
      className="home-container"
      onMouseMove={handleMouseMove}
    >

      <div className="bubbles" ref={bubbleRef}>
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      <div className="home-content">

        <h1>Mental Wellness Tracker</h1>

        <p>
          Understand your mind. Track your stress.
          Improve your well-being.
        </p>

        <div className="home-buttons">

          <Link to="/login">
            <button className="btn">Login</button>
          </Link>

          <Link to="/register">
            <button className="btn">Register</button>
          </Link>

        </div>

      </div>

    </div>

  );

}

export default Home;