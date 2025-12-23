"use client";

export default function AnimatedBackground() {
  return (
    <>
      <style>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes float-1 {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 30px) scale(0.9);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }

        @keyframes float-2 {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-40px, 40px) scale(0.95);
          }
          66% {
            transform: translate(20px, -30px) scale(1.05);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }

        @keyframes float-3 {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(50px, 20px) scale(1.02);
          }
          66% {
            transform: translate(-30px, -40px) scale(0.98);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }

        .animated-bg-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #0A0A0A;
          overflow: hidden;
          z-index: -1;
        }

        .animated-bg-base {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #0a0a0a, #111112ff, #171718ff);
          animation: gradient-shift 20s ease infinite;
          background-size: 200% 200%;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          mix-blend-mode: screen;
        }

        .orb-1 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #2a2a65ff, transparent);
          top: -100px;
          left: -100px;
          animation: float-1 25s ease-in-out infinite;
        }

        .orb-2 {
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, #050538ff, transparent);
          bottom: -50px;
          right: -50px;
          animation: float-2 30s ease-in-out infinite;
        }

        .orb-3 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, #31428bff, transparent);
          top: 50%;
          right: -100px;
          animation: float-3 28s ease-in-out infinite;
        }

        .orb-4 {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, #0e1525ff, transparent);
          bottom: 10%;
          left: 10%;
          animation: float-1 22s ease-in-out infinite reverse;
        }

        .ambient-light {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at 50% 50%, rgba(7, 7, 7, 0.03) 0%, transparent 70%);
          animation: gradient-shift 30s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>

      <div className="animated-bg-container">
        <div className="animated-bg-base" />
        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />
        <div className="gradient-orb orb-3" />
        <div className="gradient-orb orb-4" />
        <div className="ambient-light" />
      </div>
    </>
  );
}
