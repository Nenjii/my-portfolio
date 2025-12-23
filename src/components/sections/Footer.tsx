"use client";

import AnimatedWalker from "../ui/AnimatedWalker";

export default function Footer() {
  return (
    <footer className="py-8 px-6 transition-colors duration-300 bg-transparent">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[10px] font-mono text-[#666666] dark:text-[#999999] tracking-wide order-2 md:order-1">
          © 2025 NINO DUQUE. All rights reserved.
        </p>
        <div className="flex items-center gap-2 order-1 md:order-2">
          
          <p className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest">
            A WALKING PARADOX
          </p>
          <AnimatedWalker />
        </div>
      </div>
    </footer>
  );
}
