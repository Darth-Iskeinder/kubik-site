"use client";
// Копия экрана «Расчёты с клиентами» из Kubik. Цвета как в приложении, данные тестовые.
// Кнопка «Выставить» живая: счёт выставляется, и сводка сверху пересчитывается.

import { useState } from "react";
import AppWindow from "../AppWindow";

const INDIGO = "#4f46e5";

type Status = "none" | "sent" | "paid";

type Row = {
  client: string;
  manager: string;
  amount: number;
  debt: number;
  invoice: string;
  status: Status;
};

const initialRows: Row[] = [
  { client: "ОсОО «Тенир Агро»", manager: "Касымов Т.", amount: 15000, debt: 0, invoice: "новый клиент", status: "none" },
  { client: "ОсОО «Ала-Тоо Трейд»", manager: "Асанова Б.", amount: 55500, debt: 0, invoice: "№ 12 от 05.11.2026", status: "paid" },
  { client: "ОсОО «Нур Строй»", manager: "Асанова Б.", amount: 20000, debt: 20000, invoice: "№ 14 от 05.11.2026", status: "sent" },
  { client: "ОсОО «Бишкек Медиа»", manager: "Касымов Т.", amount: 7200, debt: 14400, invoice: "№ 18 от 09.11.2026", status: "sent" },
  { client: "ИП Садыкова Н.", manager: "Жээнбекова А.", amount: 10900, debt: 0, invoice: "№ 21 от 05.11.2026", status: "paid" },
  { client: "ОсОО «Ак-Жол»", manager: "Жээнбекова А.", amount: 38400, debt: 0, invoice: "№ 22 от 05.11.2026", status: "paid" },
];

const statusView: Record<Status, { label: string; className: string }> = {
  none: { label: "Не выставлен", className: "text-amber-700 ring-1 ring-dashed ring-amber-400 bg-amber-50/60" },
  sent: { label: "Выставлен", className: "bg-violet-50 text-violet-700" },
  paid: { label: "Оплачен", className: "bg-emerald-50 text-emerald-700" },
};

const fmt = (n: number) => n.toLocaleString("ru-RU");

export default function ReceivablesScreen() {
  const [rows, setRows] = useState(initialRows);

  const notSent = rows.filter((r) => r.status === "none").length;
  // Сводка по всем 36 счетам месяца: показанные строки — часть таблицы
  const billed = 486200 - initialRows[0].amount + (rows[0].status === "none" ? 0 : rows[0].amount);
  const debt = 168900 + (rows[0].status === "none" ? 0 : rows[0].amount);

  const send = (index: number) =>
    setRows((list) =>
      list.map((r, i) => (i === index ? { ...r, status: "sent", debt: r.amount, invoice: "№ 37 от 25.11.2026" } : r)),
    );

  const kpis = [
    { label: "Выставлено", value: fmt(billed), hint: `${36 - notSent} счетов из 36` },
    { label: "Пришло денег", value: "391 700", hint: "81% от выставленного", color: "#059669" },
    { label: "Дебиторка", value: fmt(debt), hint: "долг клиентов за все месяцы" },
    { label: "Просрочено > 30 дней", value: "14 400", hint: "1 клиент", color: "#dc2626" },
    { label: "Не выставлено", value: String(notSent), hint: notSent ? "показать, кому" : "все счета выставлены", color: notSent ? "#d97706" : "#059669" },
  ];

  return (
    <AppWindow title="Расчёты с клиентами">
      <div className="text-[#111827]">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
          <p className="text-[14px] font-semibold">Счета за ноябрь 2026</p>
          <span
            className="rounded-lg px-2.5 py-1 text-[10px] font-semibold text-white transition-opacity"
            style={{ background: INDIGO, opacity: notSent ? 1 : 0.4 }}
          >
            Выставить за ноябрь: {notSent}
          </span>
        </div>

        {/* Сводка */}
        <div className="grid grid-cols-2 border-b border-slate-100 sm:grid-cols-5">
          {kpis.map((k, i) => (
            <div key={k.label} className={`border-slate-100 p-3 ${i < 4 ? "sm:border-r" : ""} ${i === 4 ? "max-sm:col-span-2" : ""}`}>
              <p className="truncate text-[9.5px] text-slate-500">{k.label}</p>
              <p className="mt-0.5 text-[15px] font-semibold tabular-nums" style={{ color: k.color }}>
                {k.value}
              </p>
              <p className="truncate text-[9px] text-slate-400">{k.hint}</p>
            </div>
          ))}
        </div>

        {/* Счета */}
        <table className="w-full text-[11px]">
          <thead>
            <tr className="text-[9.5px] text-slate-400">
              <th className="py-2 pl-3 text-left font-normal sm:px-4">Клиент</th>
              <th className="hidden py-2 text-left font-normal xl:table-cell">Ответственный</th>
              <th className="py-2 text-right font-normal">Сумма</th>
              <th className="py-2 pl-3 text-right font-normal">Долг</th>
              <th className="hidden py-2 pl-3 text-left font-normal md:table-cell">Счёт за ноябрь</th>
              <th className="py-2 pl-2 pr-3 text-right font-normal sm:px-4">Статус</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.client} className="border-t border-slate-100">
                <td className="max-w-[110px] truncate py-2 pl-3 pr-2 font-medium sm:max-w-none sm:whitespace-nowrap sm:px-4">{r.client}</td>
                <td className="hidden whitespace-nowrap py-2 text-slate-500 xl:table-cell">{r.manager}</td>
                <td className="py-2 text-right tabular-nums">
                  {r.status === "none" ? <span className="text-amber-600">{fmt(r.amount)}</span> : fmt(r.amount)}
                </td>
                <td className={`py-2 pl-2 text-right tabular-nums sm:pl-3 ${r.debt ? "font-medium text-red-600" : "text-slate-300"}`}>
                  {fmt(r.debt)}
                </td>
                <td className="hidden whitespace-nowrap py-2 pl-3 text-slate-500 md:table-cell">{r.invoice}</td>
                <td className="py-2 pl-2 pr-3 text-right sm:px-4">
                  {r.status === "none" ? (
                    <button
                      type="button"
                      onClick={() => send(i)}
                      className="rounded-md px-2 py-0.5 text-[10px] font-semibold text-white transition hover:opacity-90"
                      style={{ background: INDIGO }}
                    >
                      Выставить
                    </button>
                  ) : (
                    <span className={`whitespace-nowrap rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${statusView[r.status].className}`}>
                      {statusView[r.status].label}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppWindow>
  );
}
