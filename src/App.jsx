import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import HomeGoodreads from './components/HomeGoodreads';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
    return (
        <div className="min-h-screen bg-primary transition-colors duration-300">
            <Navbar />
            <main>
                <Hero />
                <Experience />
                <Projects />
                <HomeGoodreads />
                <Skills />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;
