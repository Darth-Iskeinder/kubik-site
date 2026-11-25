import type { ReactNode } from "react";

// Рамка окна браузера для копий экранов Kubik: три точки и подпись экрана
export default function AppWindow({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_-20px_rgba(0,20,60,0.45)] ring-1 ring-black/5 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 rounded-md bg-white px-3 py-0.5 text-[11px] text-slate-400 ring-1 ring-slate-200">
          Kubik · {title}
        </span>
      </div>
      {children}
    </div>
  );
}
