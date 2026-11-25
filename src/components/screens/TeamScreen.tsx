"use client";
// Копия блока «По сотрудникам» с экрана «Руководитель» в Kubik. Цвета как в приложении, данные тестовые.
// Кольцо — объём задач главбуха вместе с розданными бухгалтерам; полоски — процент сдачи каждого.

import { useEffect, useRef, useState } from "react";
import AppWindow from "../AppWindow";

type Person = {
  name: string;
  role: string;
  tasks: number;
  percent: number;
  color: string;
};
type Chief = {
  name: string;
  companies: number;
  overdue?: number;
  people: Person[];
};

const chiefs: Chief[] = [
  {
    name: "Асанова Бермет",
    companies: 4,
    people: [
      {
        name: "Асанова Бермет",
        role: "свои задачи",
        tasks: 162,
        percent: 98,
        color: "#2563eb",
      },
      {
        name: "Жээнбекова Айпери",
        role: "бухгалтер",
        tasks: 35,
        percent: 100,
        color: "#f97316",
      },
      {
        name: "Омурбекова Нурай",
        role: "бухгалтер",
        tasks: 4,
        percent: 100,
        color: "#10b981",
      },
    ],
  },
  {
    name: "Касымов Тимур",
    companies: 8,
    overdue: 3,
    people: [
      {
        name: "Касымов Тимур",
        role: "свои задачи",
        tasks: 190,
        percent: 93,
        color: "#2563eb",
      },
      {
        name: "Сыдыков Эрлан",
        role: "бухгалтер",
        tasks: 60,
        percent: 97,
        color: "#f97316",
      },
      {
        name: "Абдыкадырова Мээрим",
        role: "бухгалтер",
        tasks: 35,
        percent: 100,
        color: "#10b981",
      },
    ],
  },
];

const R = 26;
const CIRCLE = 2 * Math.PI * R;
const GAP = 2.5; // зазор между долями кольца

function Donut({ people, filled }: { people: Person[]; filled: boolean }) {
  const total = people.reduce((s, p) => s + p.tasks, 0);
  // Где начинается каждая доля кольца: сумма долей всех предыдущих
  const starts = people.map((_, i) =>
    people.slice(0, i).reduce((s, p) => s + (p.tasks / total) * CIRCLE, 0),
  );
  return (
    <div className="relative size-[72px] shrink-0">
      <svg viewBox="0 0 64 64" className="size-full -rotate-90">
        <circle
          cx="32"
          cy="32"
          r={R}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="8"
        />
        {people.map((p, i) => {
          const len = Math.max((p.tasks / total) * CIRCLE - GAP, 1);
          return (
            <circle
              key={p.name}
              cx="32"
              cy="32"
              r={R}
              fill="none"
              stroke={p.color}
              strokeWidth="8"
              strokeDasharray={`${filled ? len : 0} ${CIRCLE}`}
              strokeDashoffset={-starts[i]}
              className="transition-[stroke-dasharray] duration-[1400ms] ease-out"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center leading-none">
        <div>
          <p className="text-[15px] font-semibold">{total}</p>
          <p className="mt-0.5 text-[8px] text-slate-400">задач</p>
        </div>
      </div>
    </div>
  );
}

export default function TeamScreen() {
  // Кольца и полоски заполняются, когда экран появляется в поле зрения
  const [filled, setFilled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFilled(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <AppWindow title="Руководитель">
        <div className="text-[#111827]">
          <div className="border-b border-slate-100 px-5 py-3">
            <p className="flex flex-wrap items-baseline gap-x-2 text-[14px] font-semibold">
              По сотрудникам
              <span className="text-[10px] font-normal text-slate-400">
                Ноябрь 2026 · только сметные задачи
              </span>
            </p>
          </div>
          <p className="border-b border-slate-100 bg-slate-50 px-5 py-1.5 text-[9px] font-semibold tracking-wide text-slate-500">
            ГЛАВНЫЕ БУХГАЛТЕРЫ{" "}
            <span className="font-normal normal-case tracking-normal text-slate-400">
              · объём по своим компаниям, вместе с розданным
            </span>
          </p>

          <div className="divide-y divide-slate-100">
            {chiefs.map((chief) => {
              const total = chief.people.reduce((s, p) => s + p.tasks, 0);
              const done = chief.people.reduce(
                (s, p) => s + Math.round((p.tasks * p.percent) / 100),
                0,
              );
              return (
                <div key={chief.name} className="flex gap-4 px-5 py-4">
                  <Donut people={chief.people} filled={filled} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                      <p className="flex flex-wrap items-center gap-1.5 text-[12.5px] font-semibold">
                        {chief.name}
                        <span
                          className="rounded px-1.5 py-px text-[9px] font-medium"
                          style={{ background: "#eef2ff", color: "#4f46e5" }}
                        >
                          Главбух
                        </span>
                        <span className="text-[9.5px] font-normal text-slate-400">
                          {chief.companies} компаний
                          {chief.overdue ? (
                            <span className="text-red-600">
                              {" "}
                              · {chief.overdue} просрочено
                            </span>
                          ) : null}
                        </span>
                      </p>
                      <p className="text-[10px] text-slate-500">
                        сдано {done} ·{" "}
                        <span className="text-[13px] font-semibold text-[#111827]">
                          {Math.round((done / total) * 100)}%
                        </span>
                      </p>
                    </div>

                    <div className="mt-2 space-y-1.5">
                      {chief.people.map((p) => (
                        <div
                          key={p.name}
                          className="flex items-center gap-2 text-[10.5px]"
                        >
                          <span
                            className="size-1.5 shrink-0 rounded-full"
                            style={{ background: p.color }}
                          />
                          <span className="min-w-0 flex-1 truncate">
                            {p.name}{" "}
                            <span className="hidden text-[9px] text-slate-400 sm:inline">
                              {p.role}
                            </span>
                          </span>
                          <span className="hidden text-[9.5px] text-slate-400 sm:inline">
                            {p.tasks} задач
                          </span>
                          <div className="h-1.5 w-14 rounded-full bg-slate-100 sm:w-24">
                            <div
                              className="h-full rounded-full transition-[width] duration-[1400ms] ease-out"
                              style={{
                                width: filled ? `${p.percent}%` : "0%",
                                background: p.color,
                              }}
                            />
                          </div>
                          <span className="w-8 text-right font-medium tabular-nums">
                            {p.percent}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AppWindow>
    </div>
  );
}
