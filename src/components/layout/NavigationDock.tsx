"use client";

import { useState, useEffect, useCallback } from "react";
import { Home, User, FolderOpen, Mail, Sun, Moon, Command } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";
import SpotlightSearch from "@/components/ui/SpotlightSearch";

interface NavItem {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export default function NavigationDock() {
  const { theme, toggleTheme } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);

  const openSpotlight = useCallback(() => {
    setIsSpotlightOpen(true);
  }, []);

  const closeSpotlight = useCallback(() => {
    setIsSpotlightOpen(false);
  }, []);

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSpotlightOpen(prev => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navItems: NavItem[] = [
    { href: "#home", icon: <Home size={24} />, label: "Home" },
    { href: "#about", icon: <User size={24} />, label: "About" },
    { href: "#work", icon: <FolderOpen size={24} />, label: "Projects" },
    { href: "#contact", icon: <Mail size={24} />, label: "Contact" },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 px-4 py-3 bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-[#111111]/10 dark:border-white/10 rounded-full shadow-lg">
        {navItems.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            className="dock-icon-item group relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ease-out hover:bg-[#111111]/5 dark:hover:bg-white/10"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              transform: hoveredIndex === index ? "scale(1.25) translateY(-8px)" : "scale(1)",
            }}
          >
            <span className="text-[#111111] dark:text-white transition-colors">
              {item.icon}
            </span>
            
            {/* Tooltip */}
            <span
              className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-xs font-mono rounded-md whitespace-nowrap transition-all duration-200 pointer-events-none"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                transform: hoveredIndex === index ? "translateY(0)" : "translateY(4px)",
              }}
            >
              {item.label}
            </span>
          </a>
        ))}

        {/* Divider */}
        <div className="w-px h-8 bg-[#111111]/10 dark:bg-white/10 mx-1" />

        {/* Spotlight Search Button */}
        <button
          onClick={openSpotlight}
          className="dock-icon-item group relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ease-out hover:bg-[#111111]/5 dark:hover:bg-white/10"
          onMouseEnter={() => setHoveredIndex(navItems.length)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            transform: hoveredIndex === navItems.length ? "scale(1.25) translateY(-8px)" : "scale(1)",
          }}
          aria-label="Search (⌘K)"
        >
          <span className="text-[#111111] dark:text-white transition-colors">
            <Command size={24} />
          </span>
          
          {/* Tooltip */}
          <span
            className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-xs font-mono rounded-md whitespace-nowrap transition-all duration-200 pointer-events-none"
            style={{
              opacity: hoveredIndex === navItems.length ? 1 : 0,
              transform: hoveredIndex === navItems.length ? "translateY(0)" : "translateY(4px)",
            }}
          >
            Search ⌘K
          </span>
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-[#111111]/10 dark:bg-white/10 mx-1" />

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="dock-icon-item group relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ease-out hover:bg-[#111111]/5 dark:hover:bg-white/10"
          onMouseEnter={() => setHoveredIndex(navItems.length + 1)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            transform: hoveredIndex === navItems.length + 1 ? "scale(1.25) translateY(-8px)" : "scale(1)",
          }}
          aria-label="Toggle dark mode"
        >
          <span className="text-[#111111] dark:text-white transition-colors">
            {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
          </span>
          
          {/* Tooltip */}
          <span
            className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-xs font-mono rounded-md whitespace-nowrap transition-all duration-200 pointer-events-none"
            style={{
              opacity: hoveredIndex === navItems.length + 1 ? 1 : 0,
              transform: hoveredIndex === navItems.length + 1 ? "translateY(0)" : "translateY(4px)",
            }}
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </span>
        </button>
      </div>

      {/* Spotlight Search Modal */}
      <SpotlightSearch isOpen={isSpotlightOpen} onClose={closeSpotlight} />
    </nav>
  );
}
