"use client";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function GradientText({ children, className = "" }: GradientTextProps) {
  return (
    <span
      className={`gradient-text ${className}`}
      style={{
        background: "linear-gradient(135deg, #61a5f3ff, #007AFF, #0b50a0ff)",
        backgroundSize: "200% 200%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: "gradient-shift 3s ease infinite",
      }}
    >
      {children}
    </span>
  );
}
