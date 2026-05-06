import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import ButtonGradient from "./assets/svg/ButtonGradient";

// Core components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Lazy-loaded components
const Hero = lazy(() => import("./components/Hero"));
const Popular = lazy(() => import("./components/Popular"));
const Benefits = lazy(() => import("./components/Benefits"));
const Games = lazy(() => import("./components/Games"));
const Tournament = lazy(() => import("./components/Tournament"));
const NewsDetail = lazy(() => import("./components/NewsDetail"));
const TournamentDetail = lazy(() => import("./components/TournamentDetail"));

// Category pages
const Moba = lazy(() => import("./kategori/Moba"));
const Fps = lazy(() => import("./kategori/Fps"));
const Rpg = lazy(() => import("./kategori/Rpg"));

// News pages - dynamically imported when needed
const getNewsComponent = (category, id) => {
  return lazy(() => import(`./${category}news/Berita${category}${id}`));
};

const App = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      const heroSection = document.getElementById("hero");
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.pathname]);

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Popular />
                  <Benefits />
                </>
              }
            />
            <Route path="/games" element={<Games />} />
            <Route path="/tournament" element={<Tournament />} />
            <Route path="/tournaments/:slug" element={<TournamentDetail />} />
            <Route path="/news/:slug" element={<NewsDetail />} />
            <Route path="/berita/:slug" element={<NewsDetail />} />
            <Route path="/moba" element={<Moba />} />
            <Route path="/fps" element={<Fps />} />
            <Route path="/rpg" element={<Rpg />} />
            
            {/* Dynamic route for news based on category */}
            <Route path="/:category/:id" element={<NewsDetail />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export default App;
