import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Tag } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import Footer from '../components/Footer';

const ProjectDetail = () => {
    const { id } = useParams();
    const projectId = id.split('-')[0];
    const { data } = useData();
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);

    useEffect(() => {
        if (data?.projects) {
            const found = data.projects.find(p => p.id.toString().toUpperCase() === projectId.toUpperCase());
            if (found) setProject(found);
        }
    }, [data, projectId]);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-4 w-32 bg-muted rounded mb-4"></div>
                    <p className="text-muted-foreground">Loading project...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Navbar */}
            <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] md:w-[80%] z-40 rounded-full bg-background/80 backdrop-blur-md border border-border/50 shadow-sm flex items-center justify-between px-6 py-3">
                <button
                    onClick={() => navigate('/projects')}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span className="text-sm font-medium hidden sm:block">All Projects</span>
                </button>
                <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-all hover:scale-105 active:scale-95"
                    aria-label="Toggle theme"
                >
                    {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-slate-700" />}
                </button>
            </nav>

            <main className="flex-1 w-full max-w-4xl mx-auto px-6 pt-28 pb-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    {project.category && (
                        <span className="text-brand font-semibold tracking-wider uppercase text-sm mb-3 block">
                            {project.category}
                        </span>
                    )}
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 leading-tight">
                        {project.title}
                    </h1>
                    {project.description && (
                        <p className="text-xl text-muted-foreground leading-relaxed mb-6 font-light">
                            {project.description}
                        </p>
                    )}

                    {/* Tags */}
                    {project.tech && project.tech.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.tech.map(t => (
                                <span key={t} className="flex items-center gap-1 px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium border border-border">
                                    <Tag size={10} />
                                    {t}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-full hover:bg-brand-hover transition-all hover:-translate-y-0.5 shadow-md hover:shadow-brand/25"
                            >
                                <ExternalLink size={18} />
                                View Live Project
                            </a>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-semibold rounded-full hover:opacity-80 transition-all hover:-translate-y-0.5 shadow-md"
                            >
                                <Github size={18} />
                                View on GitHub
                            </a>
                        )}
                    </div>
                </motion.div>

                {/* Cover Image */}
                {project.img && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="rounded-2xl overflow-hidden border border-border/50 shadow-2xl mb-12 bg-muted"
                    >
                        <img
                            src={project.img}
                            alt={project.title}
                            className="w-full object-cover"
                        />
                    </motion.div>
                )}

                {/* Additional Images */}
                {project.images && project.images.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                        {project.images.map((imgUrl, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                className="rounded-xl overflow-hidden border border-border/50 bg-muted"
                            >
                                <img src={imgUrl} alt={`${project.title} screenshot ${idx + 1}`} className="w-full object-cover" />
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Bottom CTA repeat */}
                {(project.liveUrl || project.githubUrl) && (
                    <div className="flex flex-wrap gap-3 pt-8 border-t border-border">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-full hover:bg-brand-hover transition-all hover:-translate-y-0.5"
                            >
                                <ExternalLink size={18} />
                                View Live Project
                            </a>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-semibold rounded-full hover:opacity-80 transition-all hover:-translate-y-0.5"
                            >
                                <Github size={18} />
                                View on GitHub
                            </a>
                        )}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default ProjectDetail;
