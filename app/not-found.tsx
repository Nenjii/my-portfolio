"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#F3F3F3] dark:bg-[#0A0A0A]">
      <div className="text-center max-w-lg">
        {/* 404 Number */}
        <h1 className="text-[30vw] md:text-[20vw] font-black leading-none tracking-tighter text-[#111111] dark:text-[#F3F3F3] opacity-10">
          404
        </h1>
        
        {/* Message */}
        <div className="-mt-20 md:-mt-32 relative z-10">
          <p className="text-xs font-mono text-[#666666] dark:text-[#999999] tracking-widest mb-4">
            ERROR // PAGE NOT FOUND
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 text-[#111111] dark:text-[#F3F3F3]">
            LOST IN THE VOID
          </h2>
          <p className="text-[#666666] dark:text-[#999999] mb-8 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. 
            Let&apos;s get you back on track.
          </p>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#111111] dark:bg-white text-white dark:text-[#111111] font-bold text-sm tracking-wide hover:opacity-90 transition-all"
            >
              <Home size={18} />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#111111] dark:border-white text-[#111111] dark:text-white font-bold text-sm tracking-wide hover:bg-[#111111]/5 dark:hover:bg-white/10 transition-all"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <p className="absolute bottom-8 text-xs font-mono text-[#666666] dark:text-[#999999]">
        A WALKING PARADOX
      </p>
    </main>
  );
}
