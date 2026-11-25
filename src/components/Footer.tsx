import { Logo } from "./Header";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row">
        <Logo />
        <p>© 2026 Kubik. Cerera Intelligence × Fineco</p>
      </div>
    </footer>
  );
}
