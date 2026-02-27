import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';

const Experience = () => {
    const { data } = useData();
    const experiences = data.experience;

    return (
        <section id="experience" className="section relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-20 text-center relative z-20 bg-background/0"
                >
                    {/* Header needs to be above the line visually if we used absolute, but moving the line inside the grid is cleaner */}
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50 mb-4">
                        Professional Journey
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        My path from writing code to defining product strategy.
                    </p>
                </motion.div>

                <div className="space-y-16 relative">
                    {/* MOVED: Line is now relative to the content container, so it starts after the header */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-brand/20 to-transparent transform md:-translate-x-1/2"></div>

                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Card content... (Same as before) */}
                            <div className="w-full md:w-1/2">
                                <div className={`p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-sm hover:border-brand/50 transition-colors shadow-sm dark:shadow-none ${index % 2 !== 0 ? 'md:text-left' : 'md:text-right'}`}>
                                    <span className="text-brand font-mono text-sm mb-2 block">{exp.period}</span>
                                    <h3 className="text-2xl font-bold text-foreground mb-1">{exp.role}</h3>
                                    <h4 className="text-lg text-muted-foreground mb-4">{exp.company}</h4>
                                    <p className="text-muted-foreground/80 leading-relaxed mb-6 text-sm">
                                        {exp.description}
                                    </p>
                                    <div className={`flex flex-wrap gap-2 ${index % 2 !== 0 ? 'justify-start' : 'justify-end'}`}>
                                        {exp.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 text-xs font-medium rounded-full bg-brand/10 text-brand border border-brand/10"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>


                            {/* Timeline Center Node */}
                            <div className="relative flex items-center justify-center w-8 h-8 md:absolute md:left-1/2 md:-translate-x-1/2 z-20 bg-background rounded-full border border-border">
                                <div className="w-4 h-4 rounded-full bg-brand box-shadow-glow"></div>
                                <div className="absolute w-8 h-8 rounded-full bg-brand/20 animate-ping opacity-75"></div>
                            </div>

                            {/* Empty Space for alignment */}
                            <div className="hidden md:block w-1/2"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
