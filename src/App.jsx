import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Manifesto from "./components/Manifesto.jsx";
import Crew from "./components/Crew.jsx";
import Dreams from "./components/Dreams.jsx";
import Moments from "./components/Moments.jsx";
import Sagas from "./components/Sagas.jsx";
import Fruits from "./components/Fruits.jsx";
import Sunny from "./components/Sunny.jsx";
import LaughTale from "./components/LaughTale.jsx";
import WillOfD from "./components/WillOfD.jsx";
import Extras from "./components/Extras.jsx";
import EpisodeGuide from "./components/EpisodeGuide.jsx";
import WorldMap from "./components/WorldMap.jsx";
import Footer from "./components/Footer.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";
import { SakeOverlay, WhitebeardFlash } from "./components/EasterEggs.jsx";
import { useSiteAnimations } from "./hooks/useSiteAnimations.js";

export default function App() {
  const rootRef = useSiteAnimations();

  return (
    <div ref={rootRef} className="min-h-screen bg-[#070d13] font-body text-[#f3ead2] antialiased">
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <Crew />
        <Dreams />
        <Moments />
        <Sagas />
        <Fruits />
        <Sunny />
        <LaughTale />
        <WillOfD />
        <Extras />
        <EpisodeGuide />
        <WorldMap />
      </main>
      <Footer />
      <MusicPlayer />
      <SakeOverlay />
      <WhitebeardFlash />
    </div>
  );
}
