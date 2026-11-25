"use client";
// Копия экрана «Автоаудит» из Kubik. Цвета как в приложении, данные тестовые.
// При показе строки «проверяются» по очереди, как ночная сверка. Кнопки «Принять» и «Не принято» живые.

import { useEffect, useState } from "react";
import AppWindow from "../AppWindow";

type Status = "ok" | "diff" | "doc" | "period";

type Check = {
  rule: string;
  client: string;
  report?: string;
  ledger?: string;
  diff?: string;
  status: Status;
  note?: string;
  hanging?: string; // сколько висит вопрос
};

const checks: Check[] = [
  {
    rule: "№1 Доход в отчёте по ЕН = полученные деньги",
    client: "ИП Садыкова Н.",
    report: "55 000,00",
    ledger: "55 000,00",
    diff: "0,00",
    status: "ok",
  },
  {
    rule: "№2 Зарплата в Форме 161 = начислена в учёте",
    client: "ОсОО «Нур Строй»",
    report: "412 300,00",
    ledger: "410 240,00",
    diff: "2 060,00",
    status: "diff",
    note: "Суммы расходятся. Бухгалтеру ушёл вопрос: заменить файл или объяснить расхождение",
    hanging: "Висит 1 день",
  },
  {
    rule: "№3 Единый налог в отчёте = начислен в учёте",
    client: "ИП Токтогулов Э.",
    status: "doc",
    note: "ИНН не совпадает: в документе 217•••••117, в карточке клиента 229•••••035. Документ чужой или ошибка в карточке",
    hanging: "Висит 5 дней",
  },
  {
    rule: "№1 Доход в отчёте по ЕН = полученные деньги",
    client: "ОсОО «Бишкек Медиа»",
    status: "period",
    note: "В задаче за 10.2026 файл «ОСВ_БМ.xls» за январь 2026, а нужен за октябрь 2026",
    hanging: "Висит 8 дней",
  },
];

const statusView: Record<Status, { label: string; className: string }> = {
  ok: { label: "Совпало", className: "bg-emerald-50 text-emerald-700" },
  diff: { label: "Не совпало", className: "bg-red-50 text-red-600" },
  doc: { label: "Не тот документ", className: "bg-amber-50 text-amber-700" },
  period: { label: "Не тот период", className: "bg-amber-50 text-amber-700" },
};

type Answer = "accepted" | "rejected" | undefined;

export default function AuditScreen() {
  // Сколько строк уже «проверено»: при показе экрана они открываются по очереди
  const [checked, setChecked] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(() => checks.map(() => undefined));

  useEffect(() => {
    if (checked >= checks.length) return;
    const t = setTimeout(() => setChecked((c) => c + 1), checked === 0 ? 500 : 650);
    return () => clearTimeout(t);
  }, [checked]);

  const answer = (index: number, value: Answer) => setAnswers((list) => list.map((a, i) => (i === index ? value : a)));

  const questions = checks.filter((c) => c.status !== "ok").length;

  return (
    <AppWindow title="Автоаудит">
      <div className="text-[#111827]">
        {/* Шапка */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-5 py-3">
          <div>
            <p className="text-[15px] font-semibold">Автоаудит</p>
            <p className="text-[10px] text-slate-400">Ночная сверка отчётов с ОСВ · октябрь 2026</p>
          </div>
          <div className="flex gap-1.5 text-[10px] font-medium">
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700">Совпало {checks.length - questions}</span>
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-amber-700">Вопросов {questions}</span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {checks.map((c, index) => {
            const done = index < checked;
            const view = statusView[c.status];
            const a = answers[index];
            return (
              <div key={c.client + c.rule} className="grid gap-x-4 gap-y-2 px-5 py-3 sm:grid-cols-[1fr_260px]">
                {/* Что проверяется и где */}
                <div className="min-w-0">
                  <p className="text-[10px] leading-snug text-slate-500">{c.rule}</p>
                  <p className="mt-0.5 text-[12px] font-semibold">
                    {c.client} <span className="font-normal text-slate-400">· октябрь 2026</span>
                  </p>
                  {c.report && (
                    <div className="mt-1.5 flex gap-4 font-mono text-[10.5px] tabular-nums">
                      <span>
                        <span className="text-slate-400">в отчёте </span>
                        {c.report}
                      </span>
                      <span>
                        <span className="text-slate-400">в учёте </span>
                        {c.ledger}
                      </span>
                      <span className={c.status === "ok" ? "text-slate-400" : "font-semibold text-red-600"}>Δ {c.diff}</span>
                    </div>
                  )}
                </div>

                {/* Результат проверки */}
                <div className="min-w-0">
                  {!done ? (
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">
                      <span className="size-1.5 animate-pulse rounded-full bg-indigo-500" />
                      Проверяется…
                    </span>
                  ) : (
                    <div className="animate-rise">
                      <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${view.className}`}>{view.label}</span>
                      {c.note && <p className="mt-1 text-[10px] leading-snug text-slate-500">{c.note}</p>}
                      {c.hanging && (
                        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                          {a ? (
                            <span
                              className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ${
                                a === "accepted" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
                              }`}
                            >
                              {a === "accepted" ? "✓ Принято" : "Отправлено на доработку"}
                            </span>
                          ) : (
                            <>
                              <span className="text-[9px] text-slate-400">{c.hanging}</span>
                              <button
                                type="button"
                                onClick={() => answer(index, "accepted")}
                                className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 transition hover:bg-emerald-100"
                              >
                                Принять
                              </button>
                              <button
                                type="button"
                                onClick={() => answer(index, "rejected")}
                                className="rounded-md bg-red-50 px-1.5 py-0.5 text-[10px] font-semibold text-red-600 transition hover:bg-red-100"
                              >
                                Не принято
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppWindow>
  );
}
