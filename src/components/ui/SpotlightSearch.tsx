"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Search, Home, User, FolderOpen, Mail, Copy, Github, Linkedin, Facebook, X } from "lucide-react";

interface SearchItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  category: "navigation" | "actions" | "social";
}

interface SpotlightSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SpotlightSearch({ isOpen, onClose }: SpotlightSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText("oninpoh@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      onClose();
    }, 1500);
  }, [onClose]);

  const navigateTo = useCallback((href: string) => {
    onClose();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [onClose]);

  const openLink = useCallback((url: string) => {
    window.open(url, "_blank");
    onClose();
  }, [onClose]);

  const searchItems: SearchItem[] = [
    { id: "home", label: "Home", icon: <Home size={18} />, action: () => navigateTo("#home"), category: "navigation" },
    { id: "about", label: "About", icon: <User size={18} />, action: () => navigateTo("#about"), category: "navigation" },
    { id: "projects", label: "Projects", icon: <FolderOpen size={18} />, action: () => navigateTo("#work"), category: "navigation" },
    { id: "contact", label: "Contact", icon: <Mail size={18} />, action: () => navigateTo("#contact"), category: "navigation" },
    { id: "copy-email", label: copiedEmail ? "Copied!" : "Copy Email", icon: <Copy size={18} />, action: copyEmail, category: "actions" },
    { id: "github", label: "GitHub", icon: <Github size={18} />, action: () => openLink("https://github.com/Nenjii"), category: "social" },
    { id: "linkedin", label: "LinkedIn", icon: <Linkedin size={18} />, action: () => openLink("https://www.linkedin.com/in/niño-filipen-duque-187421206"), category: "social" },
    { id: "facebook", label: "Facebook", icon: <Facebook size={18} />, action: () => openLink("https://www.facebook.com/mynenjiii"), category: "social" },
  ];

  const filteredItems = searchItems.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const groupedItems = {
    navigation: filteredItems.filter(item => item.category === "navigation"),
    actions: filteredItems.filter(item => item.category === "actions"),
    social: filteredItems.filter(item => item.category === "social"),
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    setQuery("");
    setSelectedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredItems.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
        e.preventDefault();
        filteredItems[selectedIndex].action();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  let currentIndex = 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl mx-4 bg-[#1a1a1a]/95 dark:bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
          <Search size={20} className="text-white/50" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search or jump to..."
            className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-base font-mono"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs text-white/40 bg-white/5 border border-white/10 rounded">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2">
          {filteredItems.length === 0 ? (
            <div className="px-4 py-8 text-center text-white/40 font-mono text-sm">
              No results found
            </div>
          ) : (
            <>
              {groupedItems.navigation.length > 0 && (
                <div className="mb-2">
                  <p className="px-4 py-2 text-xs font-mono text-white/30 uppercase tracking-widest">
                    Navigation
                  </p>
                  {groupedItems.navigation.map((item) => {
                    const itemIndex = currentIndex++;
                    return (
                      <button
                        key={item.id}
                        onClick={item.action}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                          selectedIndex === itemIndex
                            ? "bg-white/10 text-white"
                            : "text-white/70 hover:bg-white/5"
                        }`}
                      >
                        <span className="text-white/50">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {groupedItems.actions.length > 0 && (
                <div className="mb-2">
                  <p className="px-4 py-2 text-xs font-mono text-white/30 uppercase tracking-widest">
                    Actions
                  </p>
                  {groupedItems.actions.map((item) => {
                    const itemIndex = currentIndex++;
                    return (
                      <button
                        key={item.id}
                        onClick={item.action}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                          selectedIndex === itemIndex
                            ? "bg-white/10 text-white"
                            : "text-white/70 hover:bg-white/5"
                        }`}
                      >
                        <span className="text-white/50">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {groupedItems.social.length > 0 && (
                <div>
                  <p className="px-4 py-2 text-xs font-mono text-white/30 uppercase tracking-widest">
                    Social
                  </p>
                  {groupedItems.social.map((item) => {
                    const itemIndex = currentIndex++;
                    return (
                      <button
                        key={item.id}
                        onClick={item.action}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                          selectedIndex === itemIndex
                            ? "bg-white/10 text-white"
                            : "text-white/70 hover:bg-white/5"
                        }`}
                      >
                        <span className="text-white/50">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between text-xs text-white/30 font-mono">
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
        </div>
      </div>
    </div>
  );
}
