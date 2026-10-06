import { Hero } from "@/components/Hero";
import { TrustChain } from "@/components/TrustChain";
import { Capabilities } from "@/components/Capabilities";
import { FAQ } from "@/components/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustChain />
      <Capabilities />
      <FAQ />
    </main>
  );
}
