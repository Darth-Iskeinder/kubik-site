import Image from "next/image";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

// Шёлковые волны для карточки Cerera: крупные плавные полосы в фиолетовом градиенте с бликом по гребню.
// Каждая волна медленно «дышит» со своей задержкой.
const waves = [
  // Тонкий светлый серп в правом верхнем углу
  {
    d: "M425 -30 C 505 -5, 545 100, 500 215 C 522 110, 492 20, 445 -30 Z",
    fill: "url(#cerera-arc)",
    crest: "M425 -30 C 505 -5, 545 100, 500 215",
    delay: "0s",
  },
  // Узкая лента
  {
    d: "M-30 250 C 90 212, 200 280, 310 244 S 470 200, 540 222 L 540 240 C 470 222, 400 272, 300 264 C 200 292, 90 238, -30 272 Z",
    fill: "url(#cerera-ribbon)",
    crest: "M-30 250 C 90 212, 200 280, 310 244 S 470 200, 540 222",
    delay: "-6s",
  },
  // Вторая лента, ещё тоньше
  {
    d: "M-30 296 C 110 262, 220 328, 330 292 S 480 265, 540 282 L 540 292 C 480 280, 420 314, 330 306 C 220 336, 110 282, -30 312 Z",
    fill: "url(#cerera-wave)",
    crest: "M-30 296 C 110 262, 220 328, 330 292 S 480 265, 540 282",
    delay: "-11s",
  },
];

function SilkWaves() {
  return (
    <svg aria-hidden viewBox="0 0 500 340" preserveAspectRatio="none" className="absolute inset-0 size-full">
      <defs>
        <linearGradient id="cerera-arc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c9c2ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7068c8" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="cerera-ribbon" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7068c8" stopOpacity="0" />
          <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#d6ccff" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="cerera-wave" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8868c0" stopOpacity="0" />
          <stop offset="100%" stopColor="#b9b0ff" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="cerera-crest" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
        </linearGradient>
        <filter id="cerera-soft">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>
      {waves.map((w) => (
        <g key={w.d} className="animate-drift" style={{ animationDelay: w.delay }}>
          <path d={w.d} fill={w.fill} filter="url(#cerera-soft)" />
          {/* Блик по гребню волны, как отлив на шёлке */}
          <path d={w.crest} fill="none" stroke="url(#cerera-crest)" strokeWidth="0.8" />
        </g>
      ))}
    </svg>
  );
}


export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <SectionTitle
        tag="кто мы"
        title={
          <>
            Сделано бухгалтерами <span className="text-gradient">для бухгалтеров</span>
          </>
        }
        text="Kubik создан на стыке двух экспертиз: бухгалтерской практики и технологий. Поэтому система работает так, как на самом деле устроена аутсорс-бухгалтерия."
      />

      {/* Две компании, каждая в своём фирменном стиле */}
      <div className="relative mt-14 grid gap-6 md:grid-cols-2">
        {/* Fineco: белая карточка, зелёный и серо-синий из логотипа */}
        <Reveal>
          <div className="relative h-full overflow-hidden rounded-2xl border border-[#9aca3e]/30 bg-panel p-8 shadow-card">
            <div className="absolute -right-16 -top-16 size-56 rounded-full bg-[#9aca3e]/15 blur-2xl" />
            <div className="relative">
              <Image src="/partners/fineco.png" alt="Fineco, бухгалтерская компания" width={300} height={100} className="h-14 w-auto" />
              <p className="mt-6 font-mono text-sm text-[#5d7d1f]">Методология и практика</p>
              <p className="mt-2 leading-relaxed text-slate-600">
                Fineco привносит в Kubik методологию. Смета клиента, порядок работ, приёмка и закрытие месяца
                выстроены и проверяются на реальном опыте действующей аутсорс-компании.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Методология учёта", "Стандарты приёмки", "Практика аутсорса"].map((item) => (
                  <span key={item} className="rounded-full bg-[#9aca3e]/15 px-3 py-1 text-xs font-medium text-[#5d7d1f]">
                    {item}
                  </span>
                ))}
              </div>
              <a
                href="https://fineco.kg"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-sm font-medium text-[#6c8297] transition hover:text-[#5d7d1f]"
              >
                fineco.kg ↗
              </a>
            </div>
          </div>
        </Reveal>

        {/* Cerera: тёмно-фиолетовый, «агрессивный» стиль, цвета из логотипа */}
        <Reveal delay={120}>
          <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#140d2e] via-[#1d1442] to-[#2a1a5e] p-8 shadow-card ring-1 ring-[#7068c8]/40">
            {/* Мягкий свет и шёлковые волны */}
            <div className="absolute -left-16 -top-24 size-72 rounded-full bg-[#7068c8]/40 blur-3xl" />
                        <SilkWaves />
            <div className="relative">
              <div className="flex h-14 items-center gap-3">
                <Image
                  src="/partners/cerera.png"
                  alt=""
                  width={175}
                  height={159}
                  className="h-12 w-auto drop-shadow-[0_0_14px_rgba(136,104,192,0.8)]"
                />
                <span className="bg-gradient-to-r from-white to-[#b9b0ff] bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
                  Cerera Intelligence
                </span>
              </div>
              <p className="mt-6 font-mono text-sm text-[#b9b0ff]">Технологии и ИИ</p>
              <p className="mt-2 leading-relaxed text-[#d6d1ff]/85">
                Cerera Intelligence привносит технологии: архитектуру платформы, автоматизацию и
                интеллектуальную логику проверок. Команда переводит бухгалтерскую методологию в алгоритмы
                и применяет ИИ там, где он экономит время специалиста.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Архитектура платформы", "Автоматизация", "ИИ-логика"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[#7068c8]/25 px-3 py-1 text-xs font-medium text-[#e4e0ff] ring-1 ring-[#8f86e8]/50"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <a
                href="https://cerera.io"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-sm font-medium text-[#b9b0ff] transition hover:text-white"
              >
                cerera.io ↗
              </a>
            </div>
          </div>
        </Reveal>

        {/* Знак «плюс» между карточками: Fineco + Cerera = Kubik */}
        <div className="absolute left-1/2 top-1/2 z-10 hidden size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-panel text-xl font-semibold text-brand shadow-float ring-1 ring-line md:grid">
          +
        </div>
      </div>
    </section>
  );
}
