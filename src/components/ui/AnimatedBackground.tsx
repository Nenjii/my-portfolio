"use client";

import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

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
          overflow: hidden;
          z-index: -1;
          transition: background 0.3s ease;
        }

        .animated-bg-container.dark {
          background: #0A0A0A;
        }

        .animated-bg-container.light {
          background: #fafafa;
        }

        .animated-bg-base {
          position: absolute;
          width: 100%;
          height: 100%;
          animation: gradient-shift 20s ease infinite;
          background-size: 200% 200%;
          transition: background 0.3s ease;
        }

        .animated-bg-base.dark {
          background: linear-gradient(45deg, #0a0a0a, #111112ff, #171718ff);
        }

        .animated-bg-base.light {
          background: linear-gradient(45deg, #fafafa, #f0f0f0, #e8e8e8);
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          transition: opacity 0.3s ease;
        }

        .gradient-orb.dark {
          opacity: 0.15;
          mix-blend-mode: screen;
        }

        .gradient-orb.light {
          opacity: 0.3;
          mix-blend-mode: multiply;
        }

        .orb-1 {
          width: 300px;
          height: 300px;
          top: -100px;
          left: -100px;
          animation: float-1 25s ease-in-out infinite;
        }

        .orb-1.dark {
          background: radial-gradient(circle, #2a2a65ff, transparent);
        }

        .orb-1.light {
          background: radial-gradient(circle, #c7d2fe, transparent);
        }

        .orb-2 {
          width: 250px;
          height: 250px;
          bottom: -50px;
          right: -50px;
          animation: float-2 30s ease-in-out infinite;
        }

        .orb-2.dark {
          background: radial-gradient(circle, #050538ff, transparent);
        }

        .orb-2.light {
          background: radial-gradient(circle, #ddd6fe, transparent);
        }

        .orb-3 {
          width: 350px;
          height: 350px;
          top: 50%;
          right: -100px;
          animation: float-3 28s ease-in-out infinite;
        }

        .orb-3.dark {
          background: radial-gradient(circle, #31428bff, transparent);
        }

        .orb-3.light {
          background: radial-gradient(circle, #bfdbfe, transparent);
        }

        .orb-4 {
          width: 200px;
          height: 200px;
          bottom: 10%;
          left: 10%;
          animation: float-1 22s ease-in-out infinite reverse;
        }

        .orb-4.dark {
          background: radial-gradient(circle, #0e1525ff, transparent);
        }

        .orb-4.light {
          background: radial-gradient(circle, #e0e7ff, transparent);
        }

        .ambient-light {
          position: absolute;
          width: 100%;
          height: 100%;
          animation: gradient-shift 30s ease infinite;
          background-size: 200% 200%;
        }

        .ambient-light.dark {
          background: radial-gradient(ellipse at 50% 50%, rgba(7, 7, 7, 0.03) 0%, transparent 70%);
        }

        .ambient-light.light {
          background: radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.5) 0%, transparent 70%);
        }
      `}</style>

      <div className={`animated-bg-container ${isDark ? 'dark' : 'light'}`}>
        <div className={`animated-bg-base ${isDark ? 'dark' : 'light'}`} />
        <div className={`gradient-orb orb-1 ${isDark ? 'dark' : 'light'}`} />
        <div className={`gradient-orb orb-2 ${isDark ? 'dark' : 'light'}`} />
        <div className={`gradient-orb orb-3 ${isDark ? 'dark' : 'light'}`} />
        <div className={`gradient-orb orb-4 ${isDark ? 'dark' : 'light'}`} />
        <div className={`ambient-light ${isDark ? 'dark' : 'light'}`} />
      </div>
    </>
  );
}
