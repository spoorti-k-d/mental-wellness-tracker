import { useEffect, useRef } from "react";

function BubbleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const bubbles = [];
    const bubbleCount = 18;

    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 80 + Math.random() * 60,
        dx: (Math.random() - 0.5) * 0.6,
        dy: (Math.random() - 0.5) * 0.6
      });
    }

    function drawBubble(b) {
      const gradient = ctx.createRadialGradient(
        b.x - b.r * 0.3,
        b.y - b.r * 0.3,
        b.r * 0.2,
        b.x,
        b.y,
        b.r
      );

      gradient.addColorStop(0, "rgba(255,255,255,0.8)");
      gradient.addColorStop(0.3, "rgba(255,150,255,0.2)");
      gradient.addColorStop(0.6, "rgba(100,200,255,0.2)");
      gradient.addColorStop(1, "rgba(255,255,255,0.05)");

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((b, i) => {
        b.x += b.dx;
        b.y += b.dy;

        if (b.x + b.r > canvas.width || b.x - b.r < 0) b.dx *= -1;
        if (b.y + b.r > canvas.height || b.y - b.r < 0) b.dy *= -1;

        bubbles.forEach((other, j) => {
          if (i === j) return;

          const dist = Math.hypot(b.x - other.x, b.y - other.y);
          if (dist < b.r + other.r) {
            b.dx *= -1;
            b.dy *= -1;
          }
        });

        drawBubble(b);
      });

      requestAnimationFrame(update);
    }

    update();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0
      }}
    />
  );
}

export default BubbleCanvas;