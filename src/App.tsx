import Navigation from './components/custom/Navigation';
import TrelixAssistant from './components/custom/TrelixAssistant';

import Hero from './sections/Hero';
import Products from './sections/Products';
import About from './sections/About';
import InstagramFeed from './components/custom/InstagramFeed';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Photos from './sections/Photos';
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-[#0B0C0E]">
      <Navigation />
      <main>
        <Hero />
        <Products />
        <Photos />
        <About />
        <InstagramFeed />
        <Contact />
      </main>
      <Footer />
      <TrelixAssistant />
    </div>
  );
}

export default App;
