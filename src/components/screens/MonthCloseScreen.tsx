"use client";
// Копия экрана «Закрытие месяца» из Kubik. Цвета как в приложении, данные тестовые.
// Клик по клетке «клиент × месяц» открывает справа карточку этого месяца, как в самом Kubik.

import { useState } from "react";
import AppWindow from "../AppWindow";

const GREEN = "#059669";
const RED = "#dc2626";
const ORANGE = "#f59e0b";

// c — закрыт, x — открыт и срок прошёл, o — открыт, срок не прошёл, n — нет данных
type Cell = "c" | "x" | "o" | "n";

const months = ["Июнь", "Июль", "Август", "Сентябрь", "Октябрь"];

const rows: { client: string; chief: string; cells: Cell[] }[] = [
  { client: "ОсОО «Ала-Тоо Трейд»", chief: "Асанова Б.", cells: ["c", "c", "c", "c", "c"] },
  { client: "ОсОО «Нур Строй»", chief: "Асанова Б.", cells: ["c", "c", "c", "c", "o"] },
  { client: "ИП Токтогулов Э.", chief: "Касымов Т.", cells: ["n", "c", "x", "c", "o"] },
  { client: "ОсОО «Бишкек Медиа»", chief: "Касымов Т.", cells: ["c", "c", "c", "c", "x"] },
  { client: "ИП Садыкова Н.", chief: "Жээнбекова А.", cells: ["c", "c", "c", "c", "c"] },
  { client: "ОсОО «Ак-Жол»", chief: "Жээнбекова А.", cells: ["n", "n", "c", "c", "o"] },
];

// Карточки сверху: доля клиентов, закрывших сентябрь
const summary = [
  { name: "Вся бухгалтерия", percent: 86, text: "52 из 61 закрыто", late: 3 },
  { name: "Асанова Б.", percent: 94, text: "17 из 18 закрыто", late: 0 },
  { name: "Касымов Т.", percent: 78, text: "18 из 23 закрыто", late: 2 },
];

// Условия закрытия месяца для карточки клиента
function conditions(cell: Cell) {
  if (cell === "c")
    return [
      { ok: true, title: "Сметные задачи закрыты", hint: "Принято 3 из 3" },
      { ok: true, title: "Налоги и отчёты сданы", hint: "Сдано 3 из 3" },
      { ok: true, title: "Вопросов автоаудита нет", hint: "Все проверки совпали" },
    ];
  if (cell === "x")
    return [
      { ok: false, title: "Сметные задачи закрыты", hint: "Принято 2 из 3" },
      { ok: true, title: "Налоги и отчёты сданы", hint: "Сдано 3 из 3" },
      { ok: false, title: "Вопросов автоаудита нет", hint: "1 вопрос ждёт ответа" },
    ];
  return [
    { ok: false, title: "Сметные задачи закрыты", hint: "Принято 1 из 3" },
    { ok: false, title: "Налоги и отчёты сданы", hint: "Сдано 1 из 3" },
    { ok: true, title: "Вопросов автоаудита нет", hint: "Проверка ещё не запускалась" },
  ];
}

const cellStatus: Record<Exclude<Cell, "n">, { label: string; className: string }> = {
  c: { label: "Закрыт", className: "bg-emerald-50 text-emerald-700" },
  x: { label: "Открыт, срок прошёл", className: "bg-red-50 text-red-600" },
  o: { label: "Открыт, срок не прошёл", className: "bg-slate-100 text-slate-600" },
};

function Square({ cell, selected, onClick }: { cell: Cell; selected: boolean; onClick?: () => void }) {
  if (cell === "n") return <span className="grid size-6 place-items-center text-[10px] text-slate-300">·</span>;
  const style =
    cell === "c" ? { background: GREEN } : cell === "x" ? { background: RED } : { border: "1.5px dashed #cbd5e1" };
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Открыть месяц клиента"
      className={`grid size-6 place-items-center rounded-md text-[10px] font-bold text-white transition hover:scale-110 ${
        selected ? "ring-2 ring-[#111827] ring-offset-1" : ""
      }`}
      style={style}
    >
      {cell === "c" ? "✓" : cell === "x" ? "×" : <span className="text-slate-300">·</span>}
    </button>
  );
}

export default function MonthCloseScreen() {
  const [selected, setSelected] = useState({ row: 0, month: 4 });
  const row = rows[selected.row];
  const cell = row.cells[selected.month];
  const status = cell === "n" ? cellStatus.o : cellStatus[cell];

  return (
    <AppWindow title="Закрытие месяца">
      <div className="text-[#111827]">
        <div className="border-b border-slate-100 px-5 py-3">
          <p className="text-[15px] font-semibold">Закрытие месяца</p>
          <p className="text-[10px] text-slate-400">Месяц закрыт, когда все сметные задачи приняты и по автоаудиту нет вопросов</p>
        </div>

        {/* Сводка по сентябрю */}
        <div className="grid grid-cols-3 gap-2 px-4 pt-3">
          {summary.map((s) => {
            const color = s.percent >= 85 ? GREEN : ORANGE;
            return (
              <div key={s.name} className="rounded-xl p-2.5 ring-1 ring-slate-200">
                <p className="truncate text-[10px] text-slate-500">{s.name}</p>
                <p className="mt-0.5 flex items-baseline gap-1">
                  <span className="text-lg font-bold" style={{ color }}>
                    {s.percent}%
                  </span>
                  <span className="hidden text-[9px] text-slate-500 sm:inline">закрыли сентябрь</span>
                </p>
                <div className="mt-1 h-1 rounded-full bg-slate-100">
                  <div className="h-full rounded-full" style={{ width: `${s.percent}%`, background: color }} />
                </div>
                <p className="mt-1 truncate text-[9px] text-slate-400">
                  {s.text}
                  {s.late > 0 && <span className="text-red-600"> · срок прошёл {s.late}</span>}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-[1fr_200px]">
          {/* Сетка «клиент × месяц» */}
          <div className="min-w-0 rounded-xl p-3 ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold">Клиенты × месяцы</p>
              <div className="hidden gap-2 text-[9px] text-slate-500 md:flex">
                <span className="flex items-center gap-1">
                  <span className="size-2 rounded-sm" style={{ background: GREEN }} />
                  закрыт
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-2 rounded-sm" style={{ background: RED }} />
                  срок прошёл
                </span>
              </div>
            </div>
            <table className="mt-2 w-full border-separate border-spacing-y-1 text-[10.5px]">
              <thead>
                <tr className="text-[9px] text-slate-400">
                  <th className="text-left font-normal">Клиент</th>
                  {months.map((m) => (
                    <th key={m} className="w-7 font-normal">
                      {m.slice(0, 3)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, ri) => (
                  <tr key={r.client}>
                    <td className="max-w-0 truncate pr-2">
                      <span className="font-medium">{r.client}</span>
                      <span className="hidden text-slate-400 lg:inline"> · {r.chief}</span>
                    </td>
                    {r.cells.map((c, mi) => (
                      <td key={mi} className="text-center">
                        <span className="inline-grid place-items-center">
                          <Square
                            cell={c}
                            selected={selected.row === ri && selected.month === mi}
                            onClick={() => setSelected({ row: ri, month: mi })}
                          />
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Карточка месяца клиента */}
          <div key={`${selected.row}-${selected.month}`} className="animate-rise rounded-xl p-3 ring-1 ring-slate-200">
            <p className="text-[9px] font-semibold tracking-wide text-slate-400">МЕСЯЦ КЛИЕНТА</p>
            <p className="mt-1 text-[12px] font-semibold leading-snug">
              {row.client} · {months[selected.month]}
            </p>
            <p className="mt-0.5 text-[9.5px] text-slate-400">Главбух {row.chief}</p>
            <span className={`mt-2 inline-block rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${status.className}`}>
              {status.label}
            </span>
            <div className="mt-2 space-y-1.5">
              {conditions(cell).map((c) => (
                <div key={c.title} className="flex gap-2 rounded-lg bg-slate-50 p-2">
                  <span
                    className={`mt-px grid size-4 shrink-0 place-items-center rounded-full text-[9px] font-bold ${
                      c.ok ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {c.ok ? "✓" : "!"}
                  </span>
                  <div>
                    <p className="text-[10.5px] font-medium leading-tight">{c.title}</p>
                    <p className="text-[9px] text-slate-400">{c.hint}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppWindow>
  );
}
