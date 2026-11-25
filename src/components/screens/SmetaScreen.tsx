"use client";
// Копия экрана «Смета» из Kubik. Цвета как в приложении, данные тестовые.
// Переключатели живые: посетитель может включать и выключать работы.

import { useState } from "react";
import AppWindow from "../AppWindow";

const INDIGO = "#4f46e5";

type Work = {
  title: string;
  day: number;
  on: boolean;
  subtasks: number; // сколько подпунктов у работы
  details?: string[]; // подпункты, показанные раскрытыми
};

const initialWorks: Work[] = [
  {
    title: "Платёжный календарь: контроль и напоминание о платежах",
    day: 1,
    on: false,
    subtasks: 4,
  },
  {
    title: "Кассовые операции и кассовая книга",
    day: 5,
    on: true,
    subtasks: 3,
    details: [
      "Оформить ПКО/РКО, отразить в 1С",
      "Свести кассовую книгу: сверить остаток, проверить нумерацию",
      "Распечатать ПКО, РКО, кассовую книгу. Собрать подписи",
    ],
  },
  {
    title: "Обработка банковских выписок",
    day: 5,
    on: true,
    subtasks: 3,
  },
  {
    title: "Реестр недостающих документов",
    day: 8,
    on: true,
    subtasks: 0,
  },
];

function Toggle({ on, small = false, onClick }: { on: boolean; small?: boolean; onClick?: () => void }) {
  const w = small ? "w-7 h-4" : "w-9 h-5";
  const dot = small ? "size-3" : "size-4";
  const shift = small ? "translate-x-3" : "translate-x-4";
  const knob = (
    <span className={`block rounded-full bg-white shadow transition-transform duration-300 ${dot} ${on ? shift : "translate-x-0"}`} />
  );
  const className = `relative block shrink-0 rounded-full p-0.5 transition-colors duration-300 ${w}`;
  const style = { background: on ? INDIGO : "#e5e7eb" };
  // Кнопкой делаем только переключатель, который можно нажать
  if (!onClick) return <span className={className} style={style}>{knob}</span>;
  return (
    <button type="button" onClick={onClick} aria-pressed={on} aria-label="Включить работу в смету" className={`${className} cursor-pointer`} style={style}>
      {knob}
    </button>
  );
}

export default function SmetaScreen() {
  const [works, setWorks] = useState(initialWorks);

  const toggle = (index: number) =>
    setWorks((list) => list.map((w, i) => (i === index ? { ...w, on: !w.on } : w)));

  const active = works.filter((w) => w.on).length;

  return (
    <AppWindow title="Смета">
      <div className="text-[#111827]">
        {/* Шапка сметы */}
        <div className="border-b border-slate-100 px-5 py-4">
          <p className="text-[15px] font-semibold">ОсОО «Ала-Тоо Трейд»</p>
          <p className="mt-0.5 text-[11px] text-slate-500">УСН ЕН · Тариф «Оптимальный» · в смете {active} из {works.length} работ</p>
        </div>

        <div className="bg-slate-50/60 p-4">
          <div className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
            <div className="flex items-center gap-2 px-4 py-3">
              <span className="text-[11px] font-semibold tracking-wide">УСЛУГИ ПО ТАРИФУ</span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-200">
                Постоянные
              </span>
            </div>
            <div className="border-y border-slate-100 bg-slate-50 px-4 py-1.5 text-[10px] font-semibold tracking-wide text-slate-500">
              БУХГАЛТЕРСКОЕ ОБСЛУЖИВАНИЕ
            </div>

            {works.map((work, index) => (
              <div key={work.title} className="border-b border-slate-100 last:border-b-0">
                <div className="flex items-start gap-3 px-4 py-3">
                  <div className="pt-0.5">
                    <Toggle on={work.on} onClick={() => toggle(index)} />
                  </div>
                  <div className={`min-w-0 flex-1 transition-opacity duration-300 ${work.on ? "" : "opacity-45"}`}>
                    <p className="flex flex-wrap items-center gap-1.5 text-[12px] font-medium leading-snug">
                      {work.title}
                      {work.subtasks > 0 && (
                        <span className="rounded px-1.5 py-px text-[10px] font-normal" style={{ background: "#eef2ff", color: INDIGO }}>
                          {work.details ? "⌄" : "›"} {work.subtasks} подп.
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 text-[10px] text-slate-400">Ежемесячно · {work.day} числа</p>
                    {work.on && (
                      <p className="mt-0.5 text-[10px] text-slate-400">
                        Исполнитель: <span className="font-medium text-slate-700">Асанова Бермет</span>
                      </p>
                    )}
                  </div>
                  <span className="hidden shrink-0 items-center gap-1.5 text-[10px] text-slate-400 sm:flex">
                    Кол-во
                    <span className="rounded-md px-2 py-0.5 text-[11px] text-slate-700 ring-1 ring-slate-200">− 1 +</span>
                  </span>
                </div>

                {/* Подпункты работы */}
                {work.details && work.on && (
                  <div className="space-y-2 bg-slate-50/70 px-4 py-3 pl-10">
                    {work.details.map((sub, i) => (
                      <div key={sub} className="flex items-center gap-2.5 text-[11px] text-slate-700">
                        <Toggle on small />
                        {i + 1}. {sub}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppWindow>
  );
}
