import { useState, useEffect } from "react";
import "./App.css";
import Loader from "./components/Loader";
import Hero from "./components/Hero";

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
    <div>
      {!loader && <Loader onComplete={() => setLoader(true)} />}
      <Hero isLoaded={loader} />
    </div>
  );
}

export default App;
