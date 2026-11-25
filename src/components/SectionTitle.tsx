import type { ReactNode } from "react";

// Единый вид заголовка секции. invert — белый текст для блоков на синем градиенте.
export default function SectionTitle({
  tag,
  title,
  text,
  center = true,
  invert = false,
}: {
  tag: string;
  title: ReactNode;
  text?: ReactNode;
  center?: boolean;
  invert?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className={`font-mono text-sm ${invert ? "text-sky" : "text-brand-2"}`}>{`// ${tag}`}</p>
      <h2
        className={`mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.025em] md:text-5xl ${invert ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {text && <p className={`mt-5 text-lg leading-relaxed ${invert ? "text-white/80" : "text-slate-600"}`}>{text}</p>}
    </div>
  );
}
