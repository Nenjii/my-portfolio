"use client";

import Link from "next/link";
import AnimatedWalker from "../ui/AnimatedWalker";

export default function Footer() {
  return (
    <footer className="py-8 px-6 transition-colors duration-300 bg-transparent">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[10px] font-mono text-[#666666] dark:text-[#999999] tracking-wide order-3 md:order-1">
          © {new Date().getFullYear()} NINO DUQUE. All rights reserved.
        </p>
        <Link
          href="/#contact"
          className="order-2 text-[10px] font-mono tracking-widest text-[#666666] dark:text-[#999999] hover:text-[#111111] dark:hover:text-white transition-colors"
        >
          AVAILABLE FOR WORK — LET&apos;S CONNECT →
        </Link>
        <div className="flex items-center gap-2 order-1 md:order-3">
          
          <p className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest">
            A WALKING PARADOX
          </p>
          <AnimatedWalker />
        </div>
      </div>
    </footer>
  );
}
