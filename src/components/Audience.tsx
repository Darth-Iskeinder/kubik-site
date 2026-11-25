import Reveal from "./Reveal";

// «Для кого»: три роли, каждый посетитель находит себя и свою главную выгоду
const roles = [
  {
    tag: "руководителю аутсорс-компании",
    title: "Больше клиентов на каждого бухгалтера",
    points: [
      "Видно, какой клиент приносит деньги, а какой съедает часы",
      "Закрытие месяца по всем клиентам на одном экране",
      "Уход сотрудника не теряет клиентов: задачи переезжают к новому",
    ],
  },
  {
    tag: "главбуху с командой",
    title: "Контроль сроков и качества без обзвона",
    points: [
      "У каждой задачи есть исполнитель и срок",
      "Ночная сверка ловит расхождения в отчётах до сдачи",
      "Сразу видно, кто отстаёт и где просрочка",
    ],
  },
  {
    tag: "частному бухгалтеру",
    title: "Ничего не держать в голове",
    points: [
      "Задачи по каждому клиенту появляются сами каждый месяц",
      "Автоаудит работает как второй проверяющий, которого у вас нет",
      "Можно взять больше клиентов без помощника",
    ],
  },
];

export default function Audience() {
  return (
    <section id="for-whom" className="mx-auto max-w-6xl scroll-mt-16 px-6 pb-20 pt-4">
      <div className="grid gap-5 md:grid-cols-3">
        {roles.map((role, index) => (
          <Reveal key={role.tag} delay={index * 80}>
            <div className="h-full rounded-2xl border border-line bg-panel p-6 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-brand-2/30">
              <p className="font-mono text-sm text-brand-2">{`// ${role.tag}`}</p>
              <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-ink">{role.title}</h3>
              <ul className="mt-5 space-y-3">
                {role.points.map((point) => (
                  <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-slate-600">
                    <span className="mt-[3px] grid size-5 shrink-0 place-items-center rounded-full bg-brand-soft text-[11px] text-brand">
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
