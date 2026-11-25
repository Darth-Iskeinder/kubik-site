"use client";
// «Как это работает»: экскурсия по продукту. Слева шаги, справа экран Kubik для выбранного шага.
// Экраны добавляются по одному; пока у шага нет экрана, справа показывается его описание.
// Шаги переключаются сами, пока человек не нажмёт на шаг. Пока курсор над блоком, прокрутка на паузе.

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import SectionTitle from "./SectionTitle";
import SmetaScreen from "./screens/SmetaScreen";
import TasksScreen from "./screens/TasksScreen";
import AuditScreen from "./screens/AuditScreen";
import MonthCloseScreen from "./screens/MonthCloseScreen";

type Step = {
  when: string;
  title: string;
  text: string;
  screen?: ReactNode;
};

const steps: Step[] = [
  {
    when: "один раз",
    title: "Смета собирается сама",
    text: "Kubik предлагает работы из каталога по режиму налогообложения, виду обслуживания и особенностям клиента: ККМ, сотрудники, ВЭД, маркетплейсы, филиалы.",
    screen: <SmetaScreen />,
  },
  {
    when: "каждый месяц",
    title: "Задачи приходят сами",
    text: "Со сроками по периодичности и сразу нужному исполнителю. Для филиалов отдельная строка на каждый налоговый орган.",
    screen: <TasksScreen />,
  },
  {
    when: "в течение месяца",
    title: "Бухгалтер работает по таймеру",
    text: "Старт, пауза, чек-лист подпунктов. Задача с правилом «С документом» не закроется без файла.",
    screen: <TasksScreen startWith={2} />,
  },
  {
    when: "каждую ночь",
    title: "Автоаудит проверяет отчёты",
    text: "Каждый отчёт сверяется с ОСВ. Расхождение превращается в вопрос бухгалтеру, а не в штраф.",
    screen: <AuditScreen />,
  },
  {
    when: "в конце месяца",
    title: "Месяц закрыт",
    text: "Когда все задачи приняты и вопросов автоаудита нет, месяц клиента закрыт и засчитан главбуху.",
    screen: <MonthCloseScreen />,
  },
];

// Автопрокрутка: сколько показывается один шаг и как часто двигается полоска времени
const STEP_MS = 8000;
const TICK_MS = 100;

// Экран шага, а пока экрана нет, его описание в рамке
function StepScreen({ step }: { step: Step }) {
  if (step.screen) return <>{step.screen}</>;
  return (
    <div className="grid min-h-[320px] place-items-center rounded-2xl border border-dashed border-line bg-panel/60 p-10 text-center">
      <div className="max-w-sm">
        <p className="font-mono text-sm text-brand-2">{step.when}</p>
        <p className="mt-2 text-2xl font-semibold text-ink">{step.title}</p>
        <p className="mt-3 leading-relaxed text-slate-600">{step.text}</p>
      </div>
    </div>
  );
}

// Широкий ли экран (как lg в Tailwind). Нужен, чтобы рисовать экран шага один раз:
// либо под шагом (телефон), либо справа (компьютер), а не оба сразу со скрытой копией.
const LG = "(min-width: 1024px)";
function subscribe(callback: () => void) {
  const mq = window.matchMedia(LG);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function useDesktop() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(LG).matches,
    () => false, // на сервере ширина неизвестна: начинаем с телефонной раскладки
  );
}

export default function HowItWorks() {
  const desktop = useDesktop();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true); // автопрокрутка включена, пока человек сам не выбрал шаг
  const [visible, setVisible] = useState(false); // блок на экране
  const [hover, setHover] = useState(false); // курсор над блоком
  const ref = useRef<HTMLDivElement>(null);
  const step = steps[active];

  // Прокрутку запускаем, только когда блок виден, чтобы человек начал смотреть с первого шага
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const running = auto && visible && !hover;

  // Сколько прошло времени на текущем шаге; когда наберётся STEP_MS, включается следующий шаг
  const [elapsed, setElapsed] = useState(0);
  const elapsedRef = useRef(0);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      elapsedRef.current += TICK_MS;
      if (elapsedRef.current >= STEP_MS) {
        elapsedRef.current = 0;
        setActive((a) => (a + 1) % steps.length);
      }
      setElapsed(elapsedRef.current);
    }, TICK_MS);
    return () => clearInterval(id);
  }, [running]);

  return (
    <section id="how" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <SectionTitle
        tag="как это работает"
        title={
          <>
            От сметы до закрытого месяца <span className="text-gradient">по одной цепочке</span>
          </>
        }
        text="Один раз настраиваете смету клиента. Дальше Kubik каждый месяц ведёт работу сам и показывает, где нужна ваша помощь."
      />

      <div
        ref={ref}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="mt-14 grid grid-cols-1 items-start gap-8 lg:grid-cols-[360px_1fr]"
      >
        {/* Шаги */}
        <ol className="min-w-0 space-y-2">
          {steps.map((s, index) => {
            const isActive = index === active;
            return (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => {
                    setActive(index);
                    setAuto(false);
                    elapsedRef.current = 0;
                    setElapsed(0);
                  }}
                  className={`relative w-full overflow-hidden rounded-2xl p-4 text-left transition duration-300 ${
                    isActive ? "bg-panel shadow-card ring-1 ring-brand-2/30" : "hover:bg-panel/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid size-7 shrink-0 place-items-center rounded-full font-mono text-xs font-bold transition ${
                        isActive ? "bg-gradient-to-br from-brand to-brand-2 text-white shadow-lg shadow-brand/30" : "bg-brand-soft text-brand"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-mono text-xs text-brand-2">{s.when}</p>
                      <p className={`font-semibold ${isActive ? "text-ink" : "text-slate-600"}`}>{s.title}</p>
                    </div>
                  </div>
                  {/* Описание раскрывается у выбранного шага */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <p className="overflow-hidden pl-10 text-sm leading-relaxed text-slate-600">
                      <span className="block pt-2">{s.text}</span>
                    </p>
                  </div>
                  {/* Полоска времени: когда заполнится, включается следующий шаг */}
                  {isActive && auto && (
                    <span className="absolute inset-x-4 bottom-0 h-0.5 overflow-hidden rounded-full bg-brand-soft">
                      <span
                        className="block h-full rounded-full bg-gradient-to-r from-brand to-brand-2 transition-[width] duration-100 ease-linear"
                        style={{ width: `${(elapsed / STEP_MS) * 100}%` }}
                      />
                    </span>
                  )}
                </button>
                {/* На телефоне экран показываем прямо под выбранным шагом */}
                {isActive && !desktop && (
                  <div key={index} className="mt-3 animate-rise lg:hidden">
                    <StepScreen step={s} />
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        {/* Экран выбранного шага */}
        {desktop && (
          <div key={active} className="hidden min-w-0 animate-rise lg:block">
            <StepScreen step={step} />
          </div>
        )}
      </div>
    </section>
  );
}
