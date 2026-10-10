import { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import "./App.css";
import Loader from "./features/Loader";
import Navbar from "./features/Navbar/Navbar";
import HeroChatbotButton from "./features/HeroChatbotButton";
import HeroFloatingSpotifyButton from "./features/HeroFloatingSpotifyButton";
import RouteTransition from "./features/RouteTransition";
import { PortfolioQRProvider } from "./context/PortfolioQRContext";
import Particles from "./features/Particles";
import FilmGrain from "./features/FilmGrain";
import ScrollProgress from "./features/ScrollProgress";
const LiquidGlassBackground = lazy(() => import("./features/LiquidGlassBackground"));
const Home = lazy(() => import("./pages/Home"));
const ArchiveView = lazy(() => import("./pages/ArchiveView"));
const ProjectDetailView = lazy(() => import("./pages/ProjectDetailView"));
const PreFooterCTA = lazy(() => import("./pages/PreFooterCTA"));
const LuxuryFooter = lazy(() => import("./features/LuxryFooter"));
const AboutMe = lazy(() => import("./pages/Aboutme"));
const Achievements = lazy(() => import("./pages/Achievements"));
const Uses = lazy(() => import("./pages/Uses"));
const Links = lazy(() => import("./pages/Links"));
const Share = lazy(() => import("./pages/Share"));
const BusinessCard = lazy(() => import("./pages/BusinessCard"));

function AppBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Suspense fallback={null}><LiquidGlassBackground /></Suspense>
      <Particles />
      <FilmGrain />
    </div>
  );
}

function AnimatedRoutes({ loader, location }) {

  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home isLoaded={loader} />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/achviments" element={<Navigate to="/achievements" replace />} />
          <Route path="/uses" element={<Uses />} />
          <Route path="/links" element={<Links />} />
          <Route path="/share" element={<Share />} />
          <Route path="/card" element={<BusinessCard />} />
          <Route path="/projects" element={<ArchiveView />} />
          <Route path="/projects/:slug" element={<ProjectDetailView />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function AppContent() {
  const location = useLocation();
  const isStandaloneCard = ["/share", "/card"].includes(location.pathname);

  // Check sessionStorage so refreshing or direct navigation won't re-trigger
  // if you only want it once per session, or keep standard useState for once per reload.
  const [loader, setLoader] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isRouteTransitioning, setIsRouteTransitioning] = useState(false);
  const [transitionKey, setTransitionKey] = useState(0);
  const [revealKey, setRevealKey] = useState(0);

  useEffect(() => {
    if (isStandaloneCard) setLoader(true);
  }, [isStandaloneCard]);

  useEffect(() => {
    if (displayLocation.pathname === location.pathname) return undefined;

    setIsRouteTransitioning(true);
    setTransitionKey((key) => key + 1);

    const timeout = window.setTimeout(() => {
      setDisplayLocation(location);
      setRevealKey((key) => key + 1);
      setIsRouteTransitioning(false);
    }, 1500);

    return () => window.clearTimeout(timeout);
  }, [location, displayLocation.pathname]);

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
    <div className="relative bg-[#0B0B0B] min-h-screen">
          {/* Render loader only when loader state is false. 
              Handle any exit fade animation inside the Loader component itself. */}
          {!loader && !isStandaloneCard && <Loader onComplete={() => setLoader(true)} />}

          {!isStandaloneCard && <AppBackground />}

          {!isStandaloneCard && <ScrollProgress />}

          {!isStandaloneCard && <HeroChatbotButton />}
          {location.pathname === "/" && <HeroFloatingSpotifyButton />}

          {/* Navbar shows after initial load */}
          {loader && !isStandaloneCard && (
            <Navbar onOpenContactModal={() => setIsContactModalOpen(true)} />
          )}

          <div className="relative z-10">
            <motion.div
              key={revealKey}
              initial={revealKey === 0 ? false : { opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnimatedRoutes loader={loader} location={displayLocation} />
            </motion.div>
          </div>

          <RouteTransition
            key={transitionKey}
            active={isRouteTransitioning}
            transitionKey={transitionKey}
          />

          {!isStandaloneCard && (
            <>
              <PreFooterCTA
                isModalOpen={isContactModalOpen}
                onOpenModal={() => setIsContactModalOpen(true)}
                onCloseModal={() => setIsContactModalOpen(false)}
              />
              <LuxuryFooter />
            </>
          )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <PortfolioQRProvider>
        <AppContent />
      </PortfolioQRProvider>
    </BrowserRouter>
  );
}

export default App;
