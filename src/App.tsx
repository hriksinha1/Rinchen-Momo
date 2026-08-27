import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Nav } from './components/layout/Nav';
import { Footer } from './components/layout/Footer';
import { MobileBottomBar } from './components/layout/MobileBottomBar';
import { AnnouncementBar } from './components/layout/AnnouncementBar';

import Home from './pages/Home';
import Menu from './pages/Menu';
import Outlets from './pages/Outlets';
import Story from './pages/Story';
import Catering from './pages/Catering';
import Reserve from './pages/Reserve';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-bg-base">
        <AnnouncementBar />
        <Nav />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/outlets" element={<Outlets />} />
            <Route path="/locations" element={<Outlets />} />
            <Route path="/reserve" element={<Reserve />} />
            <Route path="/story" element={<Story />} />
            <Route path="/catering" element={<Catering />} />
            <Route path="/contact" element={<Catering />} /> {/* Fallback to catering for now */}
          </Routes>
        </main>
        <Footer />
        <MobileBottomBar />
      </div>
    </Router>
  );
}

export default App;
