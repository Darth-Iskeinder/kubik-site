"use client";
// Калькулятор «Сколько клиентов вы возьмёте без найма».
// Все исходные цифры вводит сам посетитель — мы ничего не обещаем, только считаем.
// Допущение одно: ручную сверку отчётов берёт на себя автоаудит, а сбор статусов «что сдано»
// заменяет экран «Закрытие месяца». Освободившееся время переводим в клиентов и деньги.

import { useState } from "react";
import SectionTitle from "./SectionTitle";
import { WHATSAPP_URL } from "./contacts";

function Slider({
  label,
  hint,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-baseline justify-between gap-4 text-sm">
        <span className="text-slate-700">
          {label}
          {hint && <span className="mt-0.5 block text-xs text-slate-400">{hint}</span>}
        </span>
        <span className="shrink-0 font-mono text-ink tabular-nums">
          {value.toLocaleString("ru-RU")} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-2"
      />
    </label>
  );
}

// Склонение: 1 клиент, 2 клиента, 5 клиентов
function plural(n: number, one: string, few: string, many: string) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

export default function Calculator() {
  const [clients, setClients] = useState(30);
  const [checkMinutes, setCheckMinutes] = useState(30);
  const [statusHours, setStatusHours] = useState(10);
  const [hoursPerClient, setHoursPerClient] = useState(8);
  const [fee, setFee] = useState(15000);

  // Сколько часов в месяц освободится
  const freedHours = Math.round((clients * checkMinutes) / 60 + statusHours);
  // Сколько клиентов можно взять на это время, и сколько они принесут
  const extraClients = Math.floor(freedHours / hoursPerClient);
  const extraMonth = extraClients * fee;
  const extraYear = extraMonth * 12;

  return (
    <section id="calc" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <SectionTitle
        tag="посчитайте сами"
        title={
          <>
            Сколько клиентов вы возьмёте <span className="text-gradient">без найма</span>
          </>
        }
        text="Подставьте свои цифры. Считаем только время, которое Kubik забирает на себя: ручную сверку отчётов и выяснение, что сдано, а что нет."
      />

      <div className="mt-14 grid gap-8 rounded-3xl border border-line bg-panel p-6 shadow-card md:grid-cols-[1.1fr_1fr] md:p-10 max-sm:p-4">
        <div className="space-y-7">
          <Slider label="Сколько клиентов вы ведёте" value={clients} min={5} max={200} step={5} unit="" onChange={setClients} />
          <Slider
            label="Минут на сверку отчётов одного клиента"
            hint="ЕН и Форма 161 против ОСВ, в месяц"
            value={checkMinutes}
            min={5}
            max={120}
            step={5}
            unit="мин"
            onChange={setCheckMinutes}
          />
          <Slider
            label="Часов на выяснение «что сдано, что нет»"
            hint="звонки, переписка, сбор статусов, в месяц"
            value={statusHours}
            min={0}
            max={60}
            step={1}
            unit="ч"
            onChange={setStatusHours}
          />
          <Slider
            label="Сколько часов в месяц занимает один клиент"
            value={hoursPerClient}
            min={2}
            max={40}
            step={1}
            unit="ч"
            onChange={setHoursPerClient}
          />
          <Slider label="Средний чек клиента в месяц" value={fee} min={3000} max={100000} step={1000} unit="сом" onChange={setFee} />
        </div>

        {/* Результат */}
        <div className="relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-[#062A66] via-brand to-brand-2 p-6 text-white sm:p-8 shadow-float">
          <div aria-hidden className="absolute -right-16 -top-16 size-56 rounded-full bg-sky/30 blur-3xl animate-glow" />

          <p className="relative text-sm text-white/75">Освободится в месяц</p>
          <p className="relative mt-1 font-mono text-2xl font-bold tabular-nums text-sky">
            {freedHours} {plural(freedHours, "час", "часа", "часов")}
          </p>

          <div className="relative mt-6 border-t border-white/15 pt-6">
            {extraClients > 0 ? (
              <>
                <p className="text-sm text-white/75">Этого хватит ещё на</p>
                <p className="mt-1 text-4xl font-bold tracking-tight md:text-5xl">
                  {extraClients} {plural(extraClients, "клиента", "клиентов", "клиентов")}
                </p>
                <p className="mt-3 font-mono text-2xl font-bold tabular-nums">
                  +{extraMonth.toLocaleString("ru-RU")} <span className="text-base font-normal text-white/75">сом в месяц</span>
                </p>
                <p className="mt-1 text-sm text-white/70">
                  {extraYear.toLocaleString("ru-RU")} сом в год без нового сотрудника
                </p>
              </>
            ) : (
              <>
                <p className="text-2xl font-bold leading-snug">Пока не хватает на целого клиента</p>
                <p className="mt-2 text-sm text-white/75">
                  Но {freedHours} {plural(freedHours, "час", "часа", "часов")} в месяц вы перестанете тратить на рутину.
                </p>
              </>
            )}
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-8 inline-block self-start rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand shadow-[0_8px_24px_-6px_rgba(0,20,60,0.45)] transition hover:-translate-y-0.5"
          >
            Попробовать 3 месяца бесплатно →
          </a>

          <p className="relative mt-6 text-xs leading-relaxed text-white/60">
            Расчёт по вашим цифрам. Мы считаем, что ручную сверку берёт на себя автоаудит, а статусы видны
            на экране «Закрытие месяца». Остальная работа остаётся прежней.
          </p>
        </div>
      </div>
    </section>
  );
}
