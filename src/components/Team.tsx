import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import TeamScreen from "./screens/TeamScreen";

const roles = [
  {
    role: "Руководитель",
    lead: "Видит всю фирму",
    points: ["Закрытие месяца по всем клиентам", "Автоаудит и ответы бухгалтеров", "Окупаемость и дебиторка"],
  },
  {
    role: "Главбух",
    lead: "Ведёт своих клиентов и команду",
    points: ["Распределяет задачи и принимает работу", "Видит задачи бухгалтеров по своим компаниям", "Микромир команды: кто даёт «недобор»"],
  },
  {
    role: "Бухгалтер",
    lead: "Знает, что делать сегодня",
    points: ["Готовый список задач со сроками", "Чек-лист и инструкция в каждой задаче", "Свой процент выполнения в Микромире"],
  },
];

export default function Team() {
  return (
    <section id="team" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <SectionTitle
        tag="для всей команды"
        title={
          <>
            Каждый видит своё, <span className="text-gradient">и никто не теряется</span>
          </>
        }
        text="Доступ строится по ролям и по ответственности за клиента: главбух видит своих клиентов, бухгалтер свои задачи, руководитель всё."
      />

      <div className="mt-14 grid items-center gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        {/* Роли */}
        <div className="space-y-4">
          {roles.map((r, i) => (
            <Reveal key={r.role} delay={i * 100}>
              <div className="rounded-2xl border border-line bg-panel p-5 shadow-card">
                <p className="font-mono text-sm text-brand-2">{r.role}</p>
                <h3 className="mt-1 font-semibold text-ink">{r.lead}</h3>
                <ul className="mt-3 space-y-2">
                  {r.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm text-slate-600">
                      <span className="text-brand-2">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Настоящий экран «По сотрудникам» */}
        <Reveal delay={200} className="min-w-0">
          <TeamScreen />
          <p className="mt-4 text-center text-sm text-slate-500">
            Главбух видит объём своей команды и процент сдачи каждого. Отстающие заметны без разговоров «на ковре».
          </p>
        </Reveal>
      </div>
    </section>
  );
}
