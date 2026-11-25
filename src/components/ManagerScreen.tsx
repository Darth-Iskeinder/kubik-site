"use client";
// Копия экрана «Руководитель» из Kubik для первого экрана сайта.
// Цвета — как в самом приложении (индиго, зелёный, красный). Данные тестовые, вымышленные.

import { useEffect, useState } from "react";
import AppWindow from "./AppWindow";
import Counter from "./Counter";

// Цвета приложения
const APP = {
  indigo: "#4f46e5",
  green: "#059669",
  red: "#dc2626",
  orange: "#f59e0b",
  ink: "#111827",
  muted: "#6b7280",
};

// Шесть показателей месяца (тестовые данные)
const kpis = [
  { label: "Задач в месяце", value: 486, hint: "12 вне сметы" },
  { label: "Выполнено", value: 412, hint: "85% плана месяца" },
  { label: "Вовремя", value: 87, suffix: "%", hint: "358 из 412 выполненных", bar: 87 },
  { label: "Просрочено сейчас", value: 9, hint: "у 3 сотрудников", danger: true },
  { label: "На проверке", value: 6, hint: "ждут главбуха" },
  { label: "Затрачено времени", value: 312, suffix: "ч 40м", hint: "~45м на задачу" },
];

// Полоса статусов задач: в сумме 486
const statuses = [
  { label: "Выполнено", count: 412, color: APP.green },
  { label: "На проверке", count: 6, color: APP.orange },
  { label: "В работе", count: 23, color: APP.indigo },
  { label: "Не начато", count: 45, color: "#cbd5e1" },
];
const TOTAL = statuses.reduce((sum, s) => sum + s.count, 0);

// Сотрудники (вымышленные)
const people = [
  { name: "Асанова Бермет", role: "Главбух", tasks: 168, percent: 98, color: "#2563eb" },
  { name: "Касымов Тимур", role: "Бухгалтер", tasks: 124, percent: 94, color: "#f97316" },
  { name: "Жээнбекова Айпери", role: "Бухгалтер", tasks: 96, percent: 89, color: "#10b981" },
];

export default function ManagerScreen() {
  // После появления на экране полосы плавно заполняются
  const [filled, setFilled] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setFilled(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AppWindow title="Руководитель">
      <div className="p-4 sm:p-5" style={{ color: APP.ink }}>
        {/* Шапка экрана */}
        <div className="flex items-center justify-between">
          <p className="text-[15px] font-semibold">Руководитель</p>
          <div className="flex items-center gap-2">
            <span className="rounded-lg px-2.5 py-1 text-[11px] font-medium ring-1 ring-slate-200">‹ Ноябрь 2026 ›</span>
            <span
              className="grid size-6 place-items-center rounded-lg text-[11px] font-semibold text-white"
              style={{ background: `linear-gradient(135deg, ${APP.indigo}, #8b5cf6)` }}
            >
              a
            </span>
          </div>
        </div>

        {/* Показатели месяца */}
        <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-xl ring-1 ring-slate-200 sm:grid-cols-3">
          {kpis.map((k, i) => (
            <div
              key={k.label}
              className={`border-slate-200 p-3 ${i % 3 !== 2 ? "sm:border-r" : ""} ${i < 3 ? "sm:border-b" : ""} ${
                i % 2 === 0 ? "max-sm:border-r" : ""
              } ${i < 4 ? "max-sm:border-b" : ""}`}
            >
              <p className="text-[10.5px]" style={{ color: APP.muted }}>
                {k.label}
              </p>
              <p className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl" style={{ color: k.danger ? APP.red : APP.ink }}>
                <Counter to={k.value} suffix={k.suffix} duration={1600} />
              </p>
              {k.bar !== undefined && (
                <div className="mt-1.5 h-1 rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full transition-[width] duration-[1600ms] ease-out"
                    style={{ width: filled ? `${k.bar}%` : "0%", background: APP.green }}
                  />
                </div>
              )}
              <p className="mt-1 text-[10px]" style={{ color: "#9ca3af" }}>
                {k.hint}
              </p>
            </div>
          ))}
        </div>

        {/* Полоса статусов */}
        <div className="mt-4 flex h-2 gap-0.5 overflow-hidden rounded-full bg-slate-100">
          {statuses.map((s) => (
            <div
              key={s.label}
              className="h-full rounded-full transition-[width] duration-[1600ms] ease-out"
              style={{ width: filled ? `${(s.count / TOTAL) * 100}%` : "0%", background: s.color }}
            />
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          {statuses.map((s) => (
            <span key={s.label} className="flex items-center gap-1 text-[10px]" style={{ color: APP.muted }}>
              <span className="size-1.5 rounded-full" style={{ background: s.color }} />
              {s.label} · {s.count}
            </span>
          ))}
        </div>

        {/* По сотрудникам */}
        <div className="mt-4 rounded-xl p-3 ring-1 ring-slate-200">
          <p className="text-[12px] font-semibold">
            По сотрудникам <span className="font-normal text-slate-400">· Ноябрь 2026</span>
          </p>
          <div className="mt-2 space-y-2">
            {people.map((p) => (
              <div key={p.name} className="flex items-center gap-2 text-[11px]">
                <span className="size-1.5 shrink-0 rounded-full" style={{ background: p.color }} />
                <span className="min-w-0 flex-1 truncate">
                  {p.name}{" "}
                  {p.role === "Главбух" ? (
                    <span className="rounded px-1 py-px text-[9px]" style={{ background: "#eef2ff", color: APP.indigo }}>
                      Главбух
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400">бухгалтер</span>
                  )}
                </span>
                <span className="hidden text-[10px] text-slate-400 sm:inline">{p.tasks} задач</span>
                <div className="h-1.5 w-16 rounded-full bg-slate-100 sm:w-20">
                  <div
                    className="h-full rounded-full transition-[width] duration-[1600ms] ease-out"
                    style={{ width: filled ? `${p.percent}%` : "0%", background: p.color }}
                  />
                </div>
                <span className="w-8 text-right font-semibold tabular-nums">{p.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppWindow>
  );
}
