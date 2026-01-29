import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';

function Card({ project, index }) {
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group relative border border-border bg-card dark:bg-white/5 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 ${project.colSpan}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15),
              transparent 80%
            )
          `,
                }}
            />

            <div className="flex flex-col h-full relative z-10">
                <div className="p-8 pb-0 flex-grow">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-bold tracking-widest uppercase text-brand mb-2 block">
                            {project.category}
                        </span>
                        <Link
                            to={`/case-studies/${project.id}-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                            className="p-2 rounded-full bg-muted text-foreground transform translate-x-2 -translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand hover:text-white z-20 cursor-pointer"
                        >
                            <ArrowUpRight size={20} />
                        </Link>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-brand transition-colors">
                        {project.title}
                    </h3>

                    <p className="text-muted-foreground text-base leading-relaxed mb-6">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map((t) => (
                            <span key={t} className="px-2 py-1 text-xs font-medium rounded-md bg-muted text-muted-foreground/80">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="h-64 mt-auto overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent z-10"></div>
                    <img
                        src={project.img}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                </div>
            </div>
        </motion.div>
    );
}

const Projects = () => {
    const { data } = useData();
    // Filter only selected projects and take top 4
    const displayProjects = data.projects.filter(p => p.selected).slice(0, 4);

    return (
        <section id="projects" className="section relative">
            <div className="container mx-auto px-6">
                <motion.div className="mb-16 max-w-2xl">
                    <span className="text-brand font-semibold tracking-wider uppercase text-sm mb-2 block">Portfolio</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Selected Works</h2>
                    <p className="text-lg text-muted-foreground font-light">
                        A curation of products I've built, managed, and scaled.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {displayProjects.map((project, index) => (
                        <Card key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
