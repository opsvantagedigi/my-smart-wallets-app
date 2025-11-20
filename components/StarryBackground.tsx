"use client";
import { useEffect, useRef } from "react";

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId: number;
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.3,
      d: Math.random() * 0.5 + 0.2,
    }));
    function draw() {
      ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx!.save();
      ctx!.globalAlpha = 0.8;
      for (const star of stars) {
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx!.fillStyle = "#fff";
        ctx!.shadowColor = "#00eaff";
        ctx!.shadowBlur = 8;
        ctx!.fill();
        star.y += star.d;
        if (star.y > window.innerHeight) {
          star.y = 0;
          star.x = Math.random() * window.innerWidth;
        }
      }
      ctx!.restore();
      animationId = requestAnimationFrame(draw);
    }
    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="canvas-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
