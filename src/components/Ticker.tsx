// Бегущая строка: реальные проверки автоаудита Kubik (суммы — для примера)
const items = [
  "Доход в отчёте по ЕН = выручка в учёте (6110) · Совпало ✓",
  "Зарплата в Форме 161 = начислена в учёте (3520) · Совпало ✓",
  "Подоходный налог (3420) · разница 0,02 на округлении · Совпало ✓",
  "Единый налог в отчёте = начислен в учёте (3410) · Совпало ✓",
  "Соцвзносы (3531) · Не совпало → вопрос бухгалтеру",
  "Взносы ГНПФ (3534) · Совпало ✓",
  "ОСВ годовая вместо месячной · Не тот документ",
];

export default function Ticker() {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line bg-white/60 py-4 backdrop-blur [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-ticker gap-12">
        {loop.map((item, index) => (
          <span key={index} className="whitespace-nowrap font-mono text-sm text-brand/60">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
