"use client";
// "use client" — компонент работает в браузере: ему нужна анимация и отслеживание прокрутки

import { useEffect, useRef, useState } from "react";

type CounterProps = {
  to: number; // до какого числа считать
  duration?: number; // сколько длится анимация, в миллисекундах
  suffix?: string; // что дописать после числа, например "%"
};

// Число, которое «отсчитывается» от 0, когда появляется на экране
export default function Counter({ to, duration = 2000, suffix = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let frame = 0;

    // IntersectionObserver сообщает, когда элемент стал виден на экране
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect(); // считаем только один раз

        // Без анимации, если человек отключил её в системе
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setValue(to);
          return;
        }

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // плавное замедление в конце
          setValue(Math.round(to * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}
