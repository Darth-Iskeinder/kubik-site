import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Основной шрифт с поддержкой кириллицы (сайт на русском)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

// Моноширинный шрифт для цифр и формул
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

// Заголовок вкладки браузера и описание для поисковиков
export const metadata: Metadata = {
  title: "Kubik | Система управления аутсорс-бухгалтерией",
  description:
    "Задачи по смете клиента каждый месяц, ночная сверка отчётов по ЕН и Форме 161 с ОСВ, закрытие месяца, окупаемость клиентов и дебиторка в одной системе для аутсорс-бухгалтерий.",
};

// Общая обёртка для всех страниц сайта
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
