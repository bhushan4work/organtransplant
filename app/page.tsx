import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustChain } from "@/components/TrustChain";
import { Capabilities } from "@/components/Capabilities";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustChain />
        <Capabilities />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
