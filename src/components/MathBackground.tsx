// Фон всего сайта: тонкая «тетрадная» сетка, мягкие синие блики и плавающие формулы.
// Формулы настоящие: проводки по плану счетов КР, налоги и взносы, управленческие показатели.
// TODO: сверить счета и формулы с бухгалтером Fineco (особенно 1210, 1410 и формулу ПН).
// Позиции заданы вручную, чтобы на сервере и в браузере всё совпадало.
const formulas = [
  // Проводки
  { text: "Дт 1410  Кт 6110", top: "6%", left: "5%", delay: "0s", size: "text-base" },
  { text: "Дт 3520  Кт 3420", top: "19%", left: "66%", delay: "-3s", size: "text-base" },
  { text: "Дт 3520  Кт 3531", top: "45%", left: "4%", delay: "-9s", size: "text-sm" },
  { text: "Дт 3520  Кт 1210", top: "70%", left: "74%", delay: "-7s", size: "text-base" },
  { text: "Дт 3410  Кт 1210", top: "92%", left: "34%", delay: "-12s", size: "text-sm" },

  // Налоги и взносы КР
  { text: "ПН = (ЗП − Соцфонд) × 10%", top: "31%", left: "10%", delay: "-6s", size: "text-sm" },
  { text: "Соцфонд = ЗП × 17,25% + ЗП × 10%", top: "58%", left: "52%", delay: "-5s", size: "text-sm" },
  { text: "НДС = База × 12%", top: "82%", left: "6%", delay: "-4s", size: "text-base" },
  { text: "ЕН = Доход × ставка", top: "12%", left: "36%", delay: "-10s", size: "text-sm" },

  // Основы учёта
  { text: "Активы = Обязательства + Капитал", top: "38%", left: "58%", delay: "-2s", size: "text-sm" },
  { text: "Сальдо кон. = Сальдо нач. + Об.Дт − Об.Кт", top: "64%", left: "8%", delay: "-11s", size: "text-sm" },
  { text: "Σ Дт = Σ Кт", top: "26%", left: "84%", delay: "-8s", size: "text-xl" },

  // Управленческие показатели
  { text: "Окупаемость = Оплата клиента / Часы", top: "52%", left: "22%", delay: "-1s", size: "text-sm" },
  { text: "Маржа = (Выручка − Себестоимость) / Выручка", top: "88%", left: "56%", delay: "-13s", size: "text-sm" },
  { text: "Оборачиваемость ДЗ = Выручка / Средняя ДЗ", top: "76%", left: "26%", delay: "-6s", size: "text-sm" },
  { text: "Просрочка ДЗ > 30 дней", top: "3%", left: "70%", delay: "-9s", size: "text-sm" },
  { text: "Нагрузка = Клиенты / Бухгалтер", top: "48%", left: "78%", delay: "-4s", size: "text-sm" },
];

export default function MathBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,61,145,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,61,145,0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />

      {/* «Дыхание» — синие блики в цветах сайта */}
      {/* Радиальный градиент вместо CSS-размытия: выглядит так же, но не грузит телефон */}
      <div className="absolute top-1/3 -left-60 size-[720px] rounded-full bg-[radial-gradient(circle,rgba(30,136,229,0.22),transparent_65%)] animate-glow" />
      <div className="absolute top-2/3 -right-60 size-[720px] rounded-full bg-[radial-gradient(circle,rgba(10,61,145,0.18),transparent_65%)] animate-glow [animation-delay:-4s]" />

      {formulas.map((f) => (
        <span
          key={f.text}
          className={`absolute whitespace-nowrap font-mono text-brand/[0.14] animate-float ${f.size} ${
            f.text.length > 22 ? "hidden sm:block" : ""
          }`}
          style={{ top: f.top, left: f.left, animationDelay: f.delay }}
        >
          {f.text}
        </span>
      ))}
    </div>
  );
}
