import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import "./App.css";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar/Navbar";
import LiquidGlassBackground from "./components/LiquidGlassBackground";
import Particles from "./components/Particles";
import FilmGrain from "./components/FilmGrain";
import Home from "./pages/Home";
import ArchiveView from "./pages/ArchiveView";
import ProjectDetailView from "./pages/ProjectDetailView";
import PreFooterCTA from "./pages/PreFooterCTA";
import LuxuryFooter from "./components/LuxryFooter";
import AboutMe from "./pages/Aboutme";
import Achievements from "./pages/Achievements";
import Uses from "./pages/Uses";
import Links from "./pages/Links";

function AppBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <LiquidGlassBackground />
      <Particles />
      <FilmGrain />
    </div>
  );
}

function AnimatedRoutes({ loader }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home isLoaded={loader} />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/achviments" element={<Navigate to="/achievements" replace />} />
        <Route path="/uses" element={<Uses />} />
        <Route path="/links" element={<Links />} />
        <Route path="/projects" element={<ArchiveView />} />
        <Route path="/projects/:slug" element={<ProjectDetailView />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  // Check sessionStorage so refreshing or direct navigation won't re-trigger
  // if you only want it once per session, or keep standard useState for once per reload.
  const [loader, setLoader] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    let lenis;
    const initLenis = async () => {
      try {
        const Lenis = (await import("lenis")).default;
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      } catch (e) {
        // Lenis fallback
      }
    };

    if (loader) {
      initLenis();
    }

    return () => {
      if (lenis) lenis?.destroy();
    };
  }, [loader]);

  return (
    <BrowserRouter>
      <div className="relative bg-[#0B0B0B] min-h-screen">
        {/* Render loader only when loader state is false. 
            Handle any exit fade animation inside the Loader component itself. */}
        {!loader && <Loader onComplete={() => setLoader(true)} />}

        <AppBackground />

        {/* Navbar shows after initial load */}
        {loader && (
          <Navbar onOpenContactModal={() => setIsContactModalOpen(true)} />
        )}

        <div className="relative z-10">
          <AnimatedRoutes loader={loader} />
        </div>

        <PreFooterCTA
          isModalOpen={isContactModalOpen}
          onOpenModal={() => setIsContactModalOpen(true)}
          onCloseModal={() => setIsContactModalOpen(false)}
        />
        <LuxuryFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
