"use client";

export default function AnimatedWalker() {
  return (
    <>
      <style>{`
        @keyframes walk {
          0% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(8px);
          }
          50% {
            transform: translateX(0);
          }
          75% {
            transform: translateX(-8px);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes leg-swing-left {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-15deg);
          }
          50% {
            transform: rotate(0deg);
          }
          75% {
            transform: rotate(15deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes leg-swing-right {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(15deg);
          }
          50% {
            transform: rotate(0deg);
          }
          75% {
            transform: rotate(-15deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes arm-swing-left {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-20deg);
          }
          50% {
            transform: rotate(0deg);
          }
          75% {
            transform: rotate(20deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes arm-swing-right {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(20deg);
          }
          50% {
            transform: rotate(0deg);
          }
          75% {
            transform: rotate(-20deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        .walker-container {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          animation: walk 1.2s ease-in-out infinite;
        }

        .walker-figure {
          width: 24px;
          height: 24px;
          position: relative;
          display: inline-block;
        }

        .walker-head {
          width: 6px;
          height: 6px;
          background: currentColor;
          border-radius: 50%;
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        }

        .walker-body {
          width: 4px;
          height: 6px;
          background: currentColor;
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
        }

        .walker-leg-left {
          width: 3px;
          height: 5px;
          background: currentColor;
          position: absolute;
          top: 14px;
          left: 40%;
          transform-origin: top center;
          animation: leg-swing-left 1.2s ease-in-out infinite;
        }

        .walker-leg-right {
          width: 3px;
          height: 5px;
          background: currentColor;
          position: absolute;
          top: 14px;
          right: 40%;
          transform-origin: top center;
          animation: leg-swing-right 1.2s ease-in-out infinite;
        }

        .walker-arm-left {
          width: 3px;
          height: 5px;
          background: currentColor;
          position: absolute;
          top: 10px;
          left: 18%;
          transform-origin: top center;
          animation: arm-swing-left 1.2s ease-in-out infinite;
        }

        .walker-arm-right {
          width: 3px;
          height: 5px;
          background: currentColor;
          position: absolute;
          top: 10px;
          right: 18%;
          transform-origin: top center;
          animation: arm-swing-right 1.2s ease-in-out infinite;
        }
      `}</style>

      <div className="walker-container text-[#666666] dark:text-[#999999]">
        <div className="walker-figure">
          <div className="walker-head" />
          <div className="walker-body" />
          <div className="walker-arm-left" />
          <div className="walker-arm-right" />
          <div className="walker-leg-left" />
          <div className="walker-leg-right" />
        </div>
      </div>
    </>
  );
}
