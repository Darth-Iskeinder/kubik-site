"use client";
// Демонстрация ночной сверки: проверки по очереди «пробегают» и получают статус

import { useEffect, useRef, useState } from "react";
import FluidGradient from "./FluidGradient";
import SectionTitle from "./SectionTitle";

// Цвета живого градиента — те же, что на первом экране
const BLUE: [string, string, string, string] = ["#0A3D91", "#1E88E5", "#8AD8F8", "#062A66"];

// Проверки автоаудита из документации Kubik. Суммы — для примера.
// Клиент на методе начисления, поэтому проверка №1 (кассовый метод, счёт 3210) не выполняется.
const checks = [
  { num: 2, name: "Доход в отчёте по ЕН = выручка в учёте", account: "6110", report: "1 248 300,00", ledger: "1 248 300,00", ok: true },
  { num: 3, name: "Единый налог в отчёте = начислен в учёте", account: "3410", report: "49 932,00", ledger: "49 932,00", ok: true },
  { num: 4, name: "Зарплата в Форме 161 = начислена в учёте", account: "3520", report: "412 000,00", ledger: "412 000,00", ok: true },
  { num: 5, name: "Подоходный налог в Форме 161 = в учёте", account: "3420", report: "41 200,02", ledger: "41 200,00", ok: true, note: "разница 0,02 на округлении" },
  { num: 6, name: "Соцвзносы в Форме 161 = в учёте", account: "3531", report: "72 100,00", ledger: "70 040,00", ok: false },
  { num: 7, name: "Взносы ГНПФ в Форме 161 = в учёте", account: "3534", report: "8 240,00", ledger: "8 240,00", ok: true },
];

// Что ещё ловит автоаудит, кроме расхождений в суммах
const catches = [
  { status: "Не тот документ", text: "ОСВ другой фирмы по ИНН, годовая вместо месячной, не та форма" },
  { status: "Не тот период", text: "прикрепили отчёт не за тот месяц" },
  { status: "Нет документа", text: "задачу закрыли, а файла нет" },
  { status: "Файл не открылся", text: "битый или нечитаемый файл" },
];

export default function AutoAudit() {
  const ref = useRef<HTMLDivElement>(null);
  const [checked, setChecked] = useState(-1); // сколько проверок уже прошло
  const [run, setRun] = useState(0); // номер «прогона», чтобы перезапускать анимацию

  // Запускаем сверку, когда блок появился на экране
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun((r) => (r === 0 ? 1 : r));
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (run === 0) return;
    let i = -1;
    const timer = setInterval(() => {
      i += 1;
      setChecked(i);
      if (i >= checks.length) clearInterval(timer);
    }, 650);
    return () => clearInterval(timer);
  }, [run]);

  const finished = checked >= checks.length;

  return (
    <section id="audit" className="relative scroll-mt-16 overflow-hidden">
      {/* Синий градиент со скошенными краями — второй «яркий» момент страницы */}
      <FluidGradient
        colors={BLUE}
        speed={0.8}
        className="absolute inset-0 [clip-path:polygon(0_6%,100%_0,100%_94%,0_100%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionTitle
        invert
        tag="автоаудит"
        title={
          <>
            Пока вы спите, Kubik <span className="text-[#CFEFFF]">сверяет каждый отчёт</span>
          </>
        }
        text="Каждую ночь система читает ОСВ и отчёты, которые бухгалтеры приложили к задачам, и сравнивает цифры. Вы утром видите не «вроде всё сдали», а конкретный список расхождений."
      />

      <div ref={ref} className="mt-14 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Таблица сверки */}
        <div className="relative">
          <div className="absolute -inset-6 rounded-[2rem] bg-[#062A66]/30 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white shadow-float">
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
              <div>
                <p className="font-semibold text-ink">ОсОО «Бета» · сентябрь</p>
                <p className="font-mono text-xs text-slate-500">метод начисления · ОСВ из 1С ↔ отчёт по ЕН ↔ Форма 161</p>
              </div>
              <button
                type="button"
                aria-label="Сверить ещё раз"
                onClick={() => {
                  setChecked(-1); // сбрасываем таблицу и запускаем сверку заново
                  setRun((r) => r + 1);
                }}
                className="shrink-0 whitespace-nowrap rounded-lg border border-line bg-white px-3 py-1.5 text-xs text-ink shadow-card transition hover:border-brand-2/40 hover:text-brand"
              >
                ↻<span className="hidden sm:inline"> Сверить ещё раз</span>
              </button>
            </div>

            <ul className="divide-y divide-line">
              {checks.map((c, index) => {
                const state = index < checked ? (c.ok ? "ok" : "bad") : index === checked ? "run" : "wait";
                return (
                  <li
                    key={c.account}
                    className={`grid grid-cols-[1fr_auto] items-center gap-3 px-5 py-3 transition-colors duration-500 sm:grid-cols-[1fr_auto_auto] ${
                      state === "run" ? "bg-brand-soft" : state === "bad" ? "bg-red-50/70" : ""
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm text-ink">
                        <span className="mr-2 font-mono text-xs text-slate-500">№{c.num}</span>
                        {c.name}
                      </p>
                      <p className="mt-0.5 font-mono text-xs text-slate-500">
                        счёт {c.account}
                        {state === "ok" && c.note ? ` · ${c.note}` : ""}
                      </p>
                    </div>
                    <p className="hidden text-right font-mono text-xs tabular-nums text-slate-500 sm:block">
                      {state === "wait" ? "…" : `${c.report} / ${c.ledger}`}
                    </p>
                    <span
                      className={`w-24 shrink-0 rounded-full sm:w-28 px-2.5 py-1 text-center text-xs font-medium ring-1 transition-colors duration-500 ${
                        state === "ok"
                          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                          : state === "bad"
                            ? "bg-red-50 text-red-700 ring-red-200"
                            : state === "run"
                              ? "animate-pulse bg-blue-50 text-blue-700 ring-blue-200"
                              : "bg-slate-50 text-slate-400 ring-slate-200"
                      }`}
                    >
                      {state === "ok" ? "Совпало ✓" : state === "bad" ? "Не совпало" : state === "run" ? "Сверяю…" : "Ожидает"}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* Итог сверки */}
            <div
              className={`border-t border-line px-5 py-4 text-sm transition-opacity duration-700 ${finished ? "opacity-100" : "opacity-0"}`}
            >
              <p className="text-slate-700">
                <span className="font-semibold text-emerald-700">5 из 6 совпали.</span> По соцвзносам разница
                2 060,00 сом, и бухгалтеру ушёл вопрос:{" "}
                <span className="font-medium text-ink">заменить файл или объяснить расхождение.</span>
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Для клиентов на кассовом методе вместо №2 сверяется №1: доход в отчёте по ЕН = полученные деньги (3210).
              </p>
            </div>
          </div>
        </div>

        {/* Правая колонка: что ещё ловит + почему это важно */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-white/70 bg-white/95 p-6 shadow-float">
            <p className="font-semibold text-ink">Ловит не только цифры</p>
            <ul className="mt-4 space-y-3">
              {catches.map((c) => (
                <li key={c.status} className="text-sm">
                  <span className="mr-2 rounded-md bg-amber-50 px-2 py-0.5 font-mono text-xs text-amber-700 ring-1 ring-amber-200">
                    {c.status}
                  </span>
                  <span className="text-slate-600">{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/95 p-6 text-sm leading-relaxed text-slate-600 shadow-float">
            <p className="font-semibold text-ink">Без лишней паники</p>
            <p className="mt-2">
              Разница до 1 сома считается округлением, а не ошибкой. Квартальный отчёт по ЕН сравнивается
              с суммой трёх месячных ОСВ, отчёты филиалов складываются. Kubik понимает ОСВ из 1С, а также
              старую и новую форму ЕН из кабинета налоговой.
            </p>
          </div>
          <div className="rounded-2xl border border-white/25 bg-white/10 p-6 text-sm leading-relaxed text-white/85 backdrop-blur-md">
            <p className="font-semibold text-white">Вопрос → ответ → решение</p>
            <p className="mt-2">
              Бухгалтер заменяет файл или пишет объяснение. Руководитель нажимает «Принять» или
              возвращает с комментарием. Каждое расхождение доводится до конца.
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
