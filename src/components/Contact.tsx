import FluidGradient from "./FluidGradient";
import { WHATSAPP_URL } from "./contacts";

// Цвета живого градиента — те же, что на первом экране
const BLUE: [string, string, string, string] = ["#0A3D91", "#1E88E5", "#8AD8F8", "#062A66"];

const onStart = [
  "Как смета клиента превращается в задачи на месяц",
  "Ночную сверку автоаудита на примере отчётов",
  "Закрытие месяца, окупаемость клиентов и дебиторку",
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-16 px-6 py-24">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] px-6 py-12 shadow-float sm:px-8 sm:py-16 md:px-16">
        <FluidGradient colors={BLUE} className="absolute inset-0" />

        <div className="relative grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-white md:text-5xl">
              Попробуйте Kubik 3 месяца бесплатно
            </h2>
            <p className="mt-4 max-w-xl text-lg text-white/80">
              Напишите в WhatsApp. Ответим, подключим и покажем, как Kubik работает на ваших
              клиентах.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-block whitespace-nowrap rounded-full bg-white px-7 py-4 font-semibold text-brand shadow-[0_8px_24px_-6px_rgba(0,20,60,0.45)] transition hover:-translate-y-0.5"
            >
              Написать в WhatsApp →
            </a>
          </div>

          <div className="rounded-2xl border border-white/25 bg-white/10 p-6 backdrop-blur-md">
            <p className="font-mono text-sm text-sky">При подключении покажем</p>
            <ul className="mt-4 space-y-3">
              {onStart.map((item) => (
                <li key={item} className="flex gap-3 text-white/90">
                  <span className="text-sky">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
