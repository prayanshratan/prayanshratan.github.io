import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { isDark, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Experience', href: '/#experience' },
        { name: 'Projects', href: '/projects' },
        { name: 'Skills', href: '/#skills' },
        { name: 'Contact', href: '/#contact' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100, x: "-50%", opacity: 0 }}
                animate={{ y: 0, x: "-50%", opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full ${isScrolled
                    ? 'w-[90%] md:w-[70%] bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-lg py-2'
                    : 'w-[95%] md:w-[80%] bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 py-4'
                    }`}
            >
                <div className="w-full px-6 flex items-center justify-between">
                    <a href="#" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition-transform">
                            P
                        </div>
                        <span className="text-xl font-bold tracking-tight text-foreground">
                            Prayansh<span className="text-blue-500">.</span>
                        </span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-1">
                        <div className="flex items-center gap-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                                >
                                    {link.name}
                                    <span className="absolute bottom-1 left-4 right-4 h-px bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                                </a>
                            ))}
                        </div>

                        <div className="w-px h-6 bg-border-light mx-4"></div>

                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-all hover:scale-105 active:scale-95"
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-slate-700" />}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-muted/50 text-foreground"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-foreground"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={link.name}
                                    href={link.href}
                                    className="text-3xl font-bold text-foreground hover:text-blue-500"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
