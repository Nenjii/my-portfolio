"use client";

export default function Footer() {
  return (
    <footer className="py-8 px-6 bg-[#F3F3F3] dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[10px] font-mono text-[#666666] dark:text-[#999999] tracking-wide order-2 md:order-1">
          © 2025 NINO DUQUE. All rights reserved.
        </p>
        <p className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest order-1 md:order-2">
          A WALKING PARADOX
        </p>
      </div>
    </footer>
  );
}
