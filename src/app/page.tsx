import MathBackground from "@/components/MathBackground";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Audience from "@/components/Audience";
import Ticker from "@/components/Ticker";
import Pains from "@/components/Pains";
import HowItWorks from "@/components/HowItWorks";
import AutoAudit from "@/components/AutoAudit";
import Features from "@/components/Features";
import Managers from "@/components/Managers";
import Team from "@/components/Team";
import Calculator from "@/components/Calculator";
import About from "@/components/About";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Главная страница. Порядок блоков — как в продающем разговоре:
// для кого → боль → решение → «вау» (автоаудит) → возможности → выгода руководителю → команда →
// расчёт выгоды → доверие → возражения → призыв к действию
export default function Home() {
  return (
    <>
      <MathBackground />
      <Header />
      <main className="flex-1 overflow-x-clip">
        <Hero />
        <Audience />
        <Ticker />
        <Pains />
        <HowItWorks />
        <AutoAudit />
        <Features />
        <Managers />
        <Team />
        <Calculator />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
