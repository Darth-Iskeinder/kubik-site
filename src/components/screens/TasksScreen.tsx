"use client";
// Копия экрана «БухЗадачник» из Kubik. Цвета как в приложении, данные тестовые.
// Таймер живой: «Старт» запускает его на задаче, а предыдущая задача встаёт на паузу —
// как в самом Kubik, одновременно идёт только одна задача.

import { useEffect, useState } from "react";
import AppWindow from "../AppWindow";

const INDIGO = "#4f46e5";
const GREEN = "#059669";

type Task = {
  title: string;
  client: string;
  period: "Ежемесячно" | "Ежеквартально";
  deadline: string;
  today?: boolean; // срок сегодня
  soon?: boolean; // срок завтра
  sub?: string; // прогресс подпунктов, например «0/3»
};

const todayTasks: Task[] = [
  { title: "Контроль ДЗ/КЗ по срокам", client: "ОсОО «Нур Строй»", period: "Ежеквартально", deadline: "25.11.2026", today: true },
  {
    title: "Учёт кредитов, займов и депозитов",
    client: "ОсОО «Ала-Тоо Трейд»",
    period: "Ежемесячно",
    deadline: "25.11.2026",
    today: true,
    sub: "0/3",
  },
];

const otherTasks: Task[] = [
  { title: "Реестр недостающих документов", client: "ОсОО «Ак-Жол»", period: "Ежемесячно", deadline: "30.11.2026" },
  { title: "Выгрузка базы 1С (dt)", client: "ОсОО «Ак-Жол»", period: "Ежемесячно", deadline: "30.11.2026" },
  { title: "Контроль: сводная карточка по налогам", client: "ОсОО «Бишкек Медиа»", period: "Ежеквартально", deadline: "26.11.2026", soon: true },
  { title: "Контроль: сводная карточка соцфонда", client: "ИП Токтогулов Э.", period: "Ежемесячно", deadline: "30.11.2026" },
];

const allTasks = [...todayTasks, ...otherTasks];

function formatTime(seconds: number) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

// startWith — номер задачи, на которой таймер уже идёт при показе экрана (для шага «работа по таймеру»)
export default function TasksScreen({ startWith }: { startWith?: number }) {
  const [running, setRunning] = useState<number | null>(startWith ?? null);
  const [times, setTimes] = useState<number[]>(() =>
    allTasks.map((_, i) => (i === startWith ? 14 * 60 + 32 : i === 0 && startWith !== undefined ? 23 * 60 + 5 : 0)),
  );

  // Каждую секунду добавляем время задаче, на которой идёт таймер
  useEffect(() => {
    if (running === null) return;
    const id = setInterval(() => setTimes((t) => t.map((v, i) => (i === running ? v + 1 : v))), 1000);
    return () => clearInterval(id);
  }, [running]);

  // Одна строка задачи (функция, а не вложенный компонент, чтобы строки не пересоздавались каждую секунду)
  function renderRow(task: Task, index: number) {
    const isRunning = running === index;
    const time = times[index];
    const paused = !isRunning && time > 0;
    const border = task.today ? "border-l-[3px] border-l-orange-400 bg-orange-50/40" : task.soon ? "border-l-[3px] border-l-amber-300 bg-amber-50/30" : "border-l-[3px] border-l-transparent";

    return (
      <div key={task.title} className={`flex items-center gap-3 border-b border-slate-100 px-3 py-2.5 transition-colors ${border} ${isRunning ? "!bg-indigo-50/60" : ""}`}>
        <span className={`size-1.5 shrink-0 rounded-full ${isRunning ? "animate-pulse bg-orange-400" : "bg-slate-300"}`} />

        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] font-medium">{task.title}</p>
          <div className="mt-0.5 flex items-center gap-1.5">
            {task.sub && <span className="rounded bg-slate-100 px-1 text-[9px] text-slate-500">› {task.sub}</span>}
            {task.today && <span className="rounded bg-orange-100 px-1 text-[9px] font-medium text-orange-700">сегодня</span>}
            {/* На узком телефоне время показываем здесь, а не отдельной колонкой */}
            {time > 0 && (
              <span className={`font-mono text-[10px] tabular-nums min-[400px]:hidden ${isRunning ? "text-orange-500" : "text-slate-600"}`}>
                {formatTime(time)}
              </span>
            )}
            <span className="truncate text-[10px] text-slate-400 sm:hidden">{task.client}</span>
          </div>
        </div>

        <span className="hidden w-32 shrink-0 truncate text-[11px] text-slate-600 sm:block">{task.client}</span>

        <div className="hidden w-[84px] shrink-0 md:block">
          <span className="rounded-full bg-slate-100 px-1.5 py-px text-[9px] text-slate-600">{task.period}</span>
          <p className={`mt-0.5 text-[10px] ${task.today || task.soon ? "font-medium text-orange-600" : "text-slate-400"}`}>до {task.deadline}</p>
        </div>

        <span className={`hidden w-14 shrink-0 text-right font-mono min-[400px]:inline text-[11px] tabular-nums ${isRunning ? "text-orange-500" : paused ? "text-slate-600" : "text-slate-300"}`}>
          {formatTime(time)}
        </span>

        {/* Кнопки таймера */}
        <div className="flex shrink-0 justify-end gap-1 whitespace-nowrap sm:w-[132px]">
          {isRunning ? (
            <>
              <button
                type="button"
                onClick={() => setRunning(null)}
                className="rounded-md bg-white px-2 py-1 text-[10px] font-medium ring-1 ring-indigo-200"
                style={{ color: INDIGO }}
              >
                ❚❚ Пауза
              </button>
              <button
                type="button"
                onClick={() => {
                  setRunning(null);
                  setTimes((t) => t.map((v, i) => (i === index ? 0 : v)));
                }}
                className="rounded-md px-2 py-1 text-[10px] font-medium text-white"
                style={{ background: GREEN }}
              >
                ✓ Стоп
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setRunning(index)}
              className="rounded-md px-2.5 py-1 text-[10px] font-medium text-white transition hover:opacity-90"
              style={{ background: INDIGO }}
            >
              ▶ {paused ? "Продолжить" : "Старт"}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <AppWindow title="БухЗадачник">
      <div className="text-[#111827]">
        {/* Шапка */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
          <p className="text-[15px] font-semibold">БухЗадачник</p>
          <div className="flex items-center gap-2">
            <span
              className="grid size-7 place-items-center rounded-lg text-[11px] font-semibold text-white"
              style={{ background: `linear-gradient(135deg, ${INDIGO}, #8b5cf6)` }}
            >
              А
            </span>
            <div className="hidden leading-tight sm:block">
              <p className="text-[11px] font-medium">Асанова Бермет</p>
              <p className="text-[9px] text-slate-400">Ведущий бухгалтер</p>
            </div>
          </div>
        </div>

        <div className="px-1 pb-1">
          <p className="px-3 pb-1.5 pt-3 text-[10px] font-semibold tracking-wide text-orange-600">СЕГОДНЯ ({todayTasks.length})</p>
          {todayTasks.map((task, i) => renderRow(task, i))}
          <p className="px-3 pb-1.5 pt-3 text-[10px] font-semibold tracking-wide text-slate-400">ОСТАЛЬНЫЕ (43)</p>
          {otherTasks.map((task, i) => renderRow(task, todayTasks.length + i))}
        </div>
      </div>
    </AppWindow>
  );
}
