"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  className?: string;
  cursorClassName?: string;
  showCursor?: boolean;
}

export default function TypewriterText({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  loop = true,
  className = "",
  cursorClassName = "",
  showCursor = true,
}: TypewriterTextProps) {
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    const currentFullText = texts[textIndex];

    if (isWaiting) {
      const waitTimeout = setTimeout(() => {
        setIsWaiting(false);
        if (loop || textIndex < texts.length - 1) {
          setIsDeleting(true);
        }
      }, pauseDuration);
      return () => clearTimeout(waitTimeout);
    }

    if (isDeleting) {
      if (currentText.length > 0) {
        const deleteTimeout = setTimeout(() => {
          setCurrentText((prev) => prev.slice(0, -1));
        }, deletingSpeed);
        return () => clearTimeout(deleteTimeout);
      } else {
        setIsDeleting(false);
        if (loop) {
          setTextIndex((prev) => (prev + 1) % texts.length);
        } else if (textIndex < texts.length - 1) {
          setTextIndex((prev) => prev + 1);
        }
      }
    } else {
      if (currentText.length < currentFullText.length) {
        const typeTimeout = setTimeout(() => {
          setCurrentText(currentFullText.slice(0, currentText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(typeTimeout);
      } else {
        if (loop || textIndex < texts.length - 1) {
          setIsWaiting(true);
        }
      }
    }
  }, [currentText, textIndex, isDeleting, isWaiting, texts, typingSpeed, deletingSpeed, pauseDuration, loop]);

  return (
    <span className={className}>
      {currentText}
      {showCursor && <span className={`animate-pulse ${cursorClassName}`}>|</span>}
    </span>
  );
}
