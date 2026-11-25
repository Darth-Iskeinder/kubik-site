import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import PaybackScreen from "./screens/PaybackScreen";
import ReceivablesScreen from "./screens/ReceivablesScreen";

// Блок «Руководителю»: два настоящих экрана Kubik в шахматном порядке (текст и экран, экран и текст).
// Закрытие месяца показано в «Как это работает», поэтому здесь его нет.

const rows = [
  {
    tag: "Окупаемость",
    title: "Сколько сом за час приносит каждый клиент",
    text: "Kubik делит счёт клиента на часы, которые бухгалтеры потратили на него по таймеру, и сравнивает со средним по фирме. Убыточные клиенты видны сразу.",
    points: [
      "Деньги берутся из выставленных счетов, часы из таймеров",
      "Отметка средней ставки по фирме на каждой строке",
      "Отдельно видно, где работали, а счёт не выставили",
    ],
    screen: <PaybackScreen />,
  },
  {
    tag: "Расчёты с клиентами",
    title: "Дебиторка перестаёт быть сюрпризом",
    text: "Все счета месяца на одном экране: кому выставлено, кто оплатил, у кого долг и кому счёт ещё не выставлен.",
    points: [
      "Сколько выставлено и сколько денег уже пришло",
      "Дебиторка и просрочка больше 30 дней",
      "Счёт выставляется в один клик прямо из списка",
    ],
    screen: <ReceivablesScreen />,
  },
];

export default function Managers() {
  return (
    <section id="managers" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <SectionTitle
        tag="руководителю"
        title={
          <>
            Управляйте фирмой по цифрам, <span className="text-gradient">а не по ощущениям</span>
          </>
        }
        text="Какой клиент выгоден и где деньги. Раньше на эти вопросы уходила неделя, теперь хватает двух экранов."
      />

      <div className="mt-16 space-y-20">
        {rows.map((row, index) => (
          <div
            key={row.tag}
            className={`grid items-center gap-10 ${index % 2 === 1 ? "lg:grid-cols-[1.2fr_0.8fr]" : "lg:grid-cols-[0.8fr_1.2fr]"}`}
          >
            <Reveal className={index % 2 === 1 ? "lg:order-2" : ""}>
              <p className="font-mono text-sm text-brand-2">{`// ${row.tag}`}</p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-ink md:text-3xl">{row.title}</h3>
              <p className="mt-4 leading-relaxed text-slate-600">{row.text}</p>
              <ul className="mt-6 space-y-3">
                {row.points.map((point) => (
                  <li key={point} className="flex gap-3 text-[15px] text-slate-600">
                    <span className="mt-[3px] grid size-5 shrink-0 place-items-center rounded-full bg-brand-soft text-[11px] text-brand">
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120} className={`min-w-0 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
              {row.screen}
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
