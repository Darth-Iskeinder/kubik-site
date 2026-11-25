import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

// Боли руководителя бухгалтерии → чем на них отвечает Kubik
const pains = [
  {
    pain: "Список работ на месяц живёт в Excel и в голове главбуха",
    answer: "Задачи создаются сами по смете каждого клиента, со сроками и исполнителем.",
  },
  {
    pain: "Ошибку в отчёте находит налоговая, а не вы",
    answer: "Каждую ночь автоаудит сверяет отчёты по ЕН и Форме 161 с ОСВ и задаёт бухгалтеру вопрос.",
  },
  {
    pain: "«Месяц закрыт?» И неделя уходит на обзвон сотрудников",
    answer: "Сетка «клиент × месяц» показывает, что закрыто, что открыто и что просрочено.",
  },
  {
    pain: "Непонятно, какой клиент приносит прибыль, а какой съедает часы",
    answer: "Таймер на каждой задаче и блок «Окупаемость»: сколько сом за час даёт каждый клиент.",
  },
  {
    pain: "Пришёл новый бухгалтер или ушёл старый, и клиенты «теряются»",
    answer: "Смена ответственного переносит строки сметы и открытые задачи. Вы видите, что именно переедет.",
  },
  {
    pain: "Дебиторка считается раз в квартал, когда уже поздно",
    answer: "«Расчёты с клиентами»: выставлено, пришло денег, дебиторка и просрочка больше 30 дней.",
  },
];

export default function Pains() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionTitle
        tag="узнаёте?"
        title={
          <>
            Бухгалтерия растёт, <span className="text-gradient">а контроль отстаёт</span>
          </>
        }
        text="Чем больше клиентов, тем больше держится на памяти людей. Kubik забирает эту нагрузку на себя."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {pains.map((item, index) => (
          <Reveal key={item.pain} delay={index * 80}>
            <div className="h-full rounded-2xl border border-line bg-panel p-6 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-brand-2/30">
              <p className="flex gap-3 font-medium text-ink">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-red-50 text-xs text-red-600 ring-1 ring-red-200">
                  ✕
                </span>
                {item.pain}
              </p>
              <div className="my-4 h-px bg-gradient-to-r from-slate-200 to-transparent" />
              <p className="flex gap-3 leading-relaxed text-slate-600">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-emerald-50 text-xs text-emerald-600 ring-1 ring-emerald-200">
                  ✓
                </span>
                {item.answer}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
