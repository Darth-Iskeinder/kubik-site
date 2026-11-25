import FluidGradient from "./FluidGradient";
import ManagerScreen from "./ManagerScreen";
import { WHATSAPP_URL } from "./contacts";

// Цвета живого градиента (синий, как на референсе)
const BLUE: [string, string, string, string] = ["#0A3D91", "#1E88E5", "#8AD8F8", "#062A66"];

// Заголовок появляется по словам
function Words({ text, startDelay = 0 }: { text: string; startDelay?: number }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block animate-rise" style={{ animationDelay: `${startDelay + i * 70}ms` }}>
          {word}&nbsp;
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Живой градиент со скошенным нижним краем */}
      <FluidGradient
        colors={BLUE}
        className="absolute inset-0 [clip-path:polygon(0_0,100%_0,100%_80%,0_100%)] md:[clip-path:polygon(0_0,100%_0,100%_68%,0_100%)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-28 pt-32 lg:grid-cols-[1.1fr_1fr] lg:pb-32 lg:pt-40">
        <div className="min-w-0">
          <p className="mb-6 inline-flex animate-rise items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm text-white ring-1 ring-white/25 backdrop-blur">
            <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-sky" />
            Для тех, кто ведёт бухгалтерию клиентов, в одиночку или с командой
          </p>
          <h1 className="text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.03em] text-white md:text-[3.5rem] lg:text-[3.75rem]">
            <Words text="Ведите больше клиентов" />
            <span className="block text-[#CFEFFF]">
              <Words text="тем же составом." startDelay={250} />
            </span>
          </h1>
          <p className="mt-7 max-w-xl animate-rise text-lg leading-relaxed text-white/85" style={{ animationDelay: "550ms" }}>
            Задачи по каждому клиенту создаются сами, отчёты проверяются ночью, а вы в любой момент
            видите, что закрыто и кто отстаёт.
          </p>
          <div className="mt-10 flex animate-rise flex-wrap gap-3" style={{ animationDelay: "700ms" }}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap rounded-full bg-white px-5 py-3.5 text-[15px] font-medium text-brand sm:px-7 sm:text-base shadow-[0_8px_24px_-6px_rgba(0,20,60,0.45)] transition hover:-translate-y-0.5"
            >
              Попробовать 3 месяца бесплатно →
            </a>
            <a
              href="#how"
              className="whitespace-nowrap rounded-full px-5 py-3.5 text-[15px] font-medium text-white sm:px-7 sm:text-base ring-1 ring-white/40 backdrop-blur transition hover:bg-white/10"
            >
              Как это работает
            </a>
          </div>
        </div>

        {/* Настоящий экран «Руководитель» из Kubik, с лёгким 3D-наклоном на больших экранах */}
        <div className="mx-auto w-full min-w-0 max-w-xl animate-rise [perspective:1600px]" style={{ animationDelay: "400ms" }}>
          <div className="transition-transform duration-700 ease-out lg:[transform:rotateY(-7deg)_rotateX(3deg)] lg:hover:[transform:rotateY(0deg)_rotateX(0deg)]">
            <ManagerScreen />
          </div>
        </div>
      </div>
    </section>
  );
}
