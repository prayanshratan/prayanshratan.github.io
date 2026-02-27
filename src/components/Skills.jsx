import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';

const Skills = () => {
    const { data } = useData();

    return (
        <section id="skills" className="section relative overflow-hidden bg-background">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="text-brand font-semibold tracking-wider uppercase text-sm mb-2 block">Toolbox</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        Technologies & Methodologies
                    </h2>
                </motion.div>

                <div className="flex flex-wrap justify-center max-w-4xl mx-auto gap-3">
                    {data.skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            className="px-6 py-3 rounded-xl bg-muted/50 border border-white/5 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:border-brand/50 hover:bg-brand/5 transition-all cursor-default"
                        >
                            <span className="font-medium">{skill}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
