import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
        <Route path="/projects" element={<ArchiveView />} />
        <Route path="/projects/:slug" element={<ProjectDetailView />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [loader, setLoader] = useState(false);

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
        // Lenis not available, graceful fallback
      }
    };

    if (loader) {
      initLenis();
    }

    return () => {
      if (lenis) lenis.destroy();
    };
  }, [loader]);

  return (
    <BrowserRouter>
      <div className="relative bg-[#0B0B0B] min-h-screen">
        <AnimatePresence initial={false}>
          {!loader && <Loader onComplete={() => setLoader(true)} />}
        </AnimatePresence>

        <AppBackground />

        {/* Navbar fades in after loader completes */}
        {loader && <Navbar />}

        <div className="relative z-10">
          <AnimatedRoutes loader={loader} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
