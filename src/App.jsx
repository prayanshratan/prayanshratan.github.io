import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check system preference or localStorage
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDark(true);
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            setIsDark(false);
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    return (
        <div className="min-h-screen bg-primary transition-colors duration-300">
            <Navbar isDark={isDark} toggleTheme={toggleTheme} />
            <main>
                <Hero />
                <Experience />
                <Projects />
                <Skills />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;
