import { motion } from 'framer-motion';

const experiences = [
    {
        role: "Product Manager",
        company: "Current Company",
        period: "2023 - Present",
        description: "Leading the product vision and strategy for enterprise solutions. Collaborating with engineering and design teams.",
        tags: ["Strategy", "Roadmapping", "Agile"]
    },
    {
        role: "Associate Product Manager",
        company: "Previous Tech Co.",
        period: "2021 - 2023",
        description: "Managed the full product lifecycle for consumer-facing mobile applications. Increased user retention by 15%.",
        tags: ["User Research", "Data Analysis", "Mobile"]
    },
    {
        role: "Software Developer",
        company: "Tech Startup",
        period: "2019 - 2021",
        description: "Built scalable web applications using React and Node.js. Transitioned into product management bridging technical constraints.",
        tags: ["Full Stack", "React", "System Design"]
    }
];

const Experience = () => {
    return (
        <section id="experience" className="section relative overflow-hidden">
            {/* Background Decorative Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50 mb-4">
                        Professional Journey
                    </h2>
                    <p className="text-secondary max-w-xl mx-auto">
                        My path from writing code to defining product strategy.
                    </p>
                </motion.div>

                <div className="space-y-16">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Content Card */}
                            <div className="w-full md:w-1/2">
                                <div className={`p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-blue-500/30 transition-colors ${index % 2 !== 0 ? 'md:text-left' : 'md:text-right'}`}>
                                    <span className="text-blue-400 font-mono text-sm mb-2 block">{exp.period}</span>
                                    <h3 className="text-2xl font-bold text-primary mb-1">{exp.role}</h3>
                                    <h4 className="text-lg text-secondary mb-4">{exp.company}</h4>
                                    <p className="text-secondary/80 leading-relaxed mb-6 text-sm">
                                        {exp.description}
                                    </p>
                                    <div className={`flex flex-wrap gap-2 ${index % 2 !== 0 ? 'justify-start' : 'justify-end'}`}>
                                        {exp.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/10"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Timeline Center Node */}
                            <div className="relative flex items-center justify-center w-8 h-8 md:absolute md:left-1/2 md:-translate-x-1/2">
                                <div className="w-4 h-4 rounded-full bg-blue-500 box-shadow-glow"></div>
                                <div className="absolute w-8 h-8 rounded-full bg-blue-500/20 animate-ping"></div>
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
