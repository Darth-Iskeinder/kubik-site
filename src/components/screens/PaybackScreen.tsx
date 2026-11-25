// Копия блока «Окупаемость» с экрана «Руководитель» в Kubik. Цвета как в приложении, данные тестовые.
// Сом за час = выставлено по счетам / часы по таймерам.

import AppWindow from "../AppWindow";
import Counter from "../Counter";

const INDIGO = "#4f46e5";
const RED = "#dc2626";

const clients = [
  { name: "ОсОО «Ак-Жол»", billed: 38400, hours: "24ч 10м", rate: 1589 },
  { name: "ИП Садыкова Н.", billed: 10900, hours: "8ч 05м", rate: 1348 },
  { name: "ОсОО «Ала-Тоо Трейд»", billed: 55500, hours: "52ч 40м", rate: 1054 },
  { name: "ОсОО «Нур Строй»", billed: 20000, hours: "26ч 15м", rate: 762 },
  { name: "ОсОО «Бишкек Медиа»", billed: 7200, hours: "19ч 50м", rate: 363 },
];
const AVERAGE = 1008; // 132 000 сом / 131 час
const MAX = 1700; // шкала полосок

export default function PaybackScreen() {
  return (
    <AppWindow title="Руководитель">
      <div className="p-4 text-[#111827] sm:p-5">
        <p className="flex flex-wrap items-baseline gap-x-2 text-[14px] font-semibold">
          Окупаемость
          <span className="text-[10px] font-normal text-slate-400">Октябрь 2026 · деньги из счетов, часы из таймеров</span>
        </p>

        <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-xl ring-1 ring-slate-200">
          <div className="border-r border-slate-200 p-3">
            <p className="text-[10px] text-slate-500">Выставлено за месяц</p>
            <p className="mt-0.5 text-xl font-semibold">
              <Counter to={132000} duration={1400} /> <span className="text-[11px] font-normal text-slate-400">сом</span>
            </p>
            <p className="text-[9px] text-slate-400">5 счетов</p>
          </div>
          <div className="p-3">
            <p className="text-[10px] text-slate-500">Средний сом за час</p>
            <p className="mt-0.5 text-xl font-semibold">
              <Counter to={AVERAGE} duration={1400} />
            </p>
            <p className="text-[9px] text-slate-400">по 5 клиентам с данными</p>
          </div>
        </div>

        <table className="mt-3 w-full text-[11px]">
          <thead>
            <tr className="border-b border-slate-200 text-[9.5px] text-slate-400">
              <th className="pb-1.5 text-left font-normal">Компания</th>
              <th className="hidden pb-1.5 text-right font-normal sm:table-cell">Выставлено, сом</th>
              <th className="pb-1.5 text-right font-normal">Часов</th>
              <th className="pb-1.5 pl-3 text-left font-normal">Сом за час</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => {
              const low = c.rate < AVERAGE / 2;
              return (
                <tr key={c.name} className="border-b border-slate-100">
                  <td className="whitespace-nowrap py-2 pr-2 font-medium">{c.name}</td>
                  <td className="hidden py-2 text-right tabular-nums sm:table-cell">{c.billed.toLocaleString("ru-RU")}</td>
                  <td className="whitespace-nowrap py-2 text-right text-slate-500">{c.hours}</td>
                  <td className="w-[36%] py-2 pl-3">
                    <div className="flex items-center gap-2">
                      <div className="relative h-1.5 flex-1 rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${(c.rate / MAX) * 100}%`, background: low ? RED : INDIGO }}
                        />
                        {/* Отметка средней по фирме */}
                        <div className="absolute -top-1 h-3.5 w-px bg-slate-400" style={{ left: `${(AVERAGE / MAX) * 100}%` }} />
                      </div>
                      <span className={`w-10 text-right font-semibold tabular-nums ${low ? "text-red-600" : ""}`}>
                        {c.rate.toLocaleString("ru-RU")}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <p className="mt-3 text-[9.5px] text-slate-400">Работали, а счёта за месяц нет</p>
        <div className="flex items-center justify-between py-1.5 text-[11px] text-slate-500">
          <span>ИП Токтогулов Э.</span>
          <span className="flex items-center gap-3">
            6ч 43м
            <span className="rounded px-1.5 py-px text-[9px]" style={{ background: "#eef2ff", color: INDIGO }}>
              нет счёта
            </span>
          </span>
        </div>
      </div>
    </AppWindow>
  );
}
