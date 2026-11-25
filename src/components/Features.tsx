import Reveal from "./Reveal";

// «Продумано до мелочей»: детали, которых не видно на экранах, но которые ценит опытный бухгалтер.
// Основные модули уже показаны настоящими экранами выше и ниже, поэтому здесь только детали.
// Всё по документации продукта.
const details = [
  {
    title: "Честный таймер",
    text: "Время считается на сервере, закрытая вкладка его не остановит. В 20:00 таймер сам встаёт на паузу",
  },
  { title: "Оплаты разносятся сами", text: "Деньги гасят самые старые долги, аванс переходит в следующий счёт" },
  { title: "Приёмка с комментарием", text: "Главбух принимает работу или возвращает её с пояснением" },
  { title: "Смета в PDF", text: "Смету клиента можно выгрузить и отправить ему" },
  { title: "Автоаудит под вашу фирму", text: "Счета в проверках подстраиваются под ваш учёт" },
  { title: "Готовый старт", text: "Новая фирма получает каталог бизнес-процессов и правит его под себя" },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-20">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <Reveal>
          <p className="font-mono text-sm text-brand-2">{"// детали"}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-ink md:text-4xl">
            Продумано <span className="text-gradient">до мелочей</span>
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            То, чего не видно на скриншотах, но что вы оцените в первую же неделю работы.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {details.map((d) => (
              <li key={d.title} className="flex gap-3 border-t border-line py-4">
                <span className="mt-[3px] grid size-5 shrink-0 place-items-center rounded-full bg-brand-soft text-[11px] text-brand">
                  ✓
                </span>
                <div>
                  <p className="font-medium text-ink">{d.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-slate-500">{d.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
