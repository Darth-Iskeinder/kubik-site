"use client";
// Шапка: поверх синего градиента — прозрачная с белым текстом,
// после прокрутки — светлая «стеклянная» с тёмным текстом

import { useEffect, useState } from "react";
import { WHATSAPP_URL } from "./contacts";

const navItems = [
  { label: "Для кого", href: "#for-whom" },
  { label: "Как работает", href: "#how" },
  { label: "Автоаудит", href: "#audit" },
  { label: "Руководителю", href: "#managers" },
  { label: "Вопросы", href: "#faq" },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#" className={`flex items-center gap-2.5 text-xl font-semibold tracking-tight transition-colors ${light ? "text-white" : "text-ink"}`}>
      <span
        className={`grid size-8 place-items-center rounded-lg text-sm font-bold shadow-lg transition-colors ${
          light ? "bg-white text-brand shadow-black/10" : "bg-brand text-white shadow-brand/30"
        }`}
      >
        K
      </span>
      Kubik
    </a>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ${
        scrolled ? "bg-white/75 shadow-[0_1px_0_rgba(10,25,60,0.08)] backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo light={!scrolled} />

        <nav className={`hidden gap-8 text-sm transition-colors lg:flex ${scrolled ? "text-slate-600" : "text-white/80"}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={`transition-colors ${scrolled ? "hover:text-ink" : "hover:text-white"}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
            scrolled
              ? "bg-brand text-white shadow-lg shadow-brand/25 hover:bg-[#08327a]"
              : "bg-white/15 text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/25"
          }`}
        >
          Попробовать бесплатно
        </a>
      </div>
    </header>
  );
}
