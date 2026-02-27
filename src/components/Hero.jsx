import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { useData } from '../context/DataContext';

const Hero = () => {
    const { data } = useData();

    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">

            {/* Dynamic Background Grid */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
            </div>

            {/* Spotlight Effect (Dark Mode Only) */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-50%] left-[-10%] w-[1000px] h-[1000px] bg-brand/20 rounded-full blur-[100px] animate-blob mix-blend-screen opacity-0 dark:opacity-100"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-screen opacity-0 dark:opacity-100"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 pt-20">
                <div className="max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-sm font-medium tracking-wide">Available for new opportunities</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                        className="text-6xl md:text-8xl font-bold tracking-tight mb-8 text-foreground leading-[1.1]"
                    >
                        Building products <br />
                        that <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-purple-600 animate-shimmer dark:text-glow">shape the future.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed font-light"
                    >
                        {data.hero.subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-wrap gap-4"
                    >
                        <a
                            href="#projects"
                            className="group relative inline-flex h-14 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                        >
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-all group-hover:bg-slate-900">
                                View Selected Work <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </a>

                        <a
                            href={data.hero.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-14 items-center justify-center rounded-full border border-border bg-background px-8 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            Resume <Download className="ml-2 w-4 h-4" />
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-widest text-muted-foreground/60">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-muted-foreground to-transparent"></div>
            </motion.div>
        </section>
    );
};

export default Hero;
