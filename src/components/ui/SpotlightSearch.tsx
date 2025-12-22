"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { Search, Home, User, FolderOpen, Mail, Copy, Github, Linkedin, Facebook, FileText, ArrowRight, Command } from "lucide-react";

interface SearchItem {
  id: string;
  label: string;
  shortcut?: string;
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
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [onClose]);

  const openLink = useCallback((url: string) => {
    window.open(url, "_blank");
    onClose();
  }, [onClose]);

  const searchItems: SearchItem[] = [
    { id: "home", label: "Home", shortcut: "H", icon: <Home size={18} />, action: () => navigateTo("#home"), category: "navigation" },
    { id: "about", label: "About", shortcut: "A", icon: <User size={18} />, action: () => navigateTo("#about"), category: "navigation" },
    { id: "projects", label: "Projects", shortcut: "P", icon: <FolderOpen size={18} />, action: () => navigateTo("#work"), category: "navigation" },
    { id: "blogs", label: "Blogs", shortcut: "B", icon: <FileText size={18} />, action: () => navigateTo("#blogs"), category: "navigation" },
    { id: "contact", label: "Contact", shortcut: "C", icon: <Mail size={18} />, action: () => navigateTo("#contact"), category: "navigation" },
    { id: "copy-email", label: copiedEmail ? "Copied!" : "Copy Email", icon: <Copy size={18} />, action: copyEmail, category: "actions" },
    { id: "github", label: "GitHub", icon: <Github size={18} />, action: () => openLink("https://github.com/Nenjii"), category: "social" },
    { id: "linkedin", label: "LinkedIn", icon: <Linkedin size={18} />, action: () => openLink("https://www.linkedin.com/in/niño-filipen-duque-187421206"), category: "social" },
    { id: "facebook", label: "Facebook", icon: <Facebook size={18} />, action: () => openLink("https://www.facebook.com/mynenjiii"), category: "social" },
  ];

  const filteredItems = query.trim() === ""
    ? searchItems
    : searchItems.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase())
      );

  const groupedItems = {
    navigation: filteredItems.filter(item => item.category === "navigation"),
    actions: filteredItems.filter(item => item.category === "actions"),
    social: filteredItems.filter(item => item.category === "social"),
  };

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  // Keyboard navigation
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
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  let currentIndex = 0;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Spotlight Modal - macOS Style */}
      <div className="relative w-full max-w-[640px] mx-4 bg-white/95 dark:bg-[#232323]/95 backdrop-blur-2xl border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Area */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-black/5 dark:border-white/10">
          <Search size={22} className="text-black/40 dark:text-white/40 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 outline-none text-lg"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs text-black/40 dark:text-white/40 bg-black/5 dark:bg-white/10 rounded-md font-mono">
            ESC
          </kbd>
        </div>

        {/* Quick Actions (Default State) */}
        {query.trim() === "" && (
          <div className="px-3 py-3 border-b border-black/5 dark:border-white/10">
            <p className="px-2 py-1.5 text-xs font-medium text-black/40 dark:text-white/40 uppercase tracking-wider">
              Quick Actions
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {groupedItems.navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="flex items-center gap-2 px-3 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 rounded-lg transition-colors"
                >
                  <span className="text-black/60 dark:text-white/60">{item.icon}</span>
                  <span className="text-sm font-medium text-black/80 dark:text-white/80">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        <div ref={listRef} className="max-h-[400px] overflow-y-auto py-2">
          {filteredItems.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <p className="text-black/40 dark:text-white/40 text-sm">No results found for &quot;{query}&quot;</p>
            </div>
          ) : (
            <>
              {/* Navigation Section */}
              {groupedItems.navigation.length > 0 && (
                <div className="mb-1">
                  <p className="px-5 py-2 text-xs font-medium text-black/40 dark:text-white/40 uppercase tracking-wider">
                    Navigation
                  </p>
                  {groupedItems.navigation.map((item) => {
                    const itemIndex = currentIndex++;
                    return (
                      <button
                        key={item.id}
                        data-index={itemIndex}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(itemIndex)}
                        className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${
                          selectedIndex === itemIndex
                            ? "bg-blue-500 text-white"
                            : "text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10"
                        }`}
                      >
                        <span className={selectedIndex === itemIndex ? "text-white" : "text-black/50 dark:text-white/50"}>
                          {item.icon}
                        </span>
                        <span className="flex-1 font-medium">{item.label}</span>
                        {item.shortcut && (
                          <kbd className={`px-2 py-0.5 text-xs rounded font-mono ${
                            selectedIndex === itemIndex
                              ? "bg-white/20 text-white"
                              : "bg-black/5 dark:bg-white/10 text-black/40 dark:text-white/40"
                          }`}>
                            {item.shortcut}
                          </kbd>
                        )}
                        <ArrowRight size={14} className={`${selectedIndex === itemIndex ? "text-white" : "text-black/30 dark:text-white/30"}`} />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Actions Section */}
              {groupedItems.actions.length > 0 && (
                <div className="mb-1">
                  <p className="px-5 py-2 text-xs font-medium text-black/40 dark:text-white/40 uppercase tracking-wider">
                    Actions
                  </p>
                  {groupedItems.actions.map((item) => {
                    const itemIndex = currentIndex++;
                    return (
                      <button
                        key={item.id}
                        data-index={itemIndex}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(itemIndex)}
                        className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${
                          selectedIndex === itemIndex
                            ? "bg-blue-500 text-white"
                            : "text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10"
                        }`}
                      >
                        <span className={selectedIndex === itemIndex ? "text-white" : "text-black/50 dark:text-white/50"}>
                          {item.icon}
                        </span>
                        <span className="flex-1 font-medium">{item.label}</span>
                        <ArrowRight size={14} className={`${selectedIndex === itemIndex ? "text-white" : "text-black/30 dark:text-white/30"}`} />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Social Section */}
              {groupedItems.social.length > 0 && (
                <div>
                  <p className="px-5 py-2 text-xs font-medium text-black/40 dark:text-white/40 uppercase tracking-wider">
                    Social Links
                  </p>
                  {groupedItems.social.map((item) => {
                    const itemIndex = currentIndex++;
                    return (
                      <button
                        key={item.id}
                        data-index={itemIndex}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(itemIndex)}
                        className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${
                          selectedIndex === itemIndex
                            ? "bg-blue-500 text-white"
                            : "text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10"
                        }`}
                      >
                        <span className={selectedIndex === itemIndex ? "text-white" : "text-black/50 dark:text-white/50"}>
                          {item.icon}
                        </span>
                        <span className="flex-1 font-medium">{item.label}</span>
                        <ArrowRight size={14} className={`${selectedIndex === itemIndex ? "text-white" : "text-black/30 dark:text-white/30"}`} />
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs text-black/40 dark:text-white/40">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-black/5 dark:bg-white/10 rounded text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-black/5 dark:bg-white/10 rounded text-[10px]">↓</kbd>
              <span className="ml-1">Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-black/5 dark:bg-white/10 rounded text-[10px]">↵</kbd>
              <span className="ml-1">Select</span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Command size={12} />
            <span>K to toggle</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Use portal to render outside of NavigationDock
  return createPortal(modalContent, document.body);
}
