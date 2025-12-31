"use client";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export default function LoadingSpinner({ 
  size = "md", 
  text = "Loading...",
  className = ""
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const dotSizes = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      {/* Animated Dots Loader */}
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Rotating ring */}
        <div className="absolute inset-0 rounded-full border-2 border-[#111111]/10 dark:border-white/10" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 animate-spin" />
        
        {/* Center pulse */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Bouncing dots */}
      <div className="flex items-center gap-1">
        <div 
          className={`${dotSizes[size]} bg-[#111111] dark:bg-white rounded-full animate-bounce`}
          style={{ animationDelay: "0ms" }}
        />
        <div 
          className={`${dotSizes[size]} bg-[#111111] dark:bg-white rounded-full animate-bounce`}
          style={{ animationDelay: "150ms" }}
        />
        <div 
          className={`${dotSizes[size]} bg-[#111111] dark:bg-white rounded-full animate-bounce`}
          style={{ animationDelay: "300ms" }}
        />
      </div>

      {/* Loading text */}
      {text && (
        <p className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-wider uppercase">
          {text}
        </p>
      )}

      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-bounce {
          animation: bounce 0.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Alternative minimal loader
export function MinimalLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
    </div>
  );
}

// Skeleton loader for cards
export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-[#111111]/5 dark:bg-white/5 rounded-lg h-48 mb-4" />
      <div className="space-y-3">
        <div className="h-4 bg-[#111111]/5 dark:bg-white/5 rounded w-3/4" />
        <div className="h-3 bg-[#111111]/5 dark:bg-white/5 rounded w-1/2" />
        <div className="h-3 bg-[#111111]/5 dark:bg-white/5 rounded w-5/6" />
      </div>
    </div>
  );
}
