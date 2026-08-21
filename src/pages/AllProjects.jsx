import { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { Filter, ArrowLeft, ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SectionLoader from '../components/SectionLoader';

const ProjectTile = ({ project }) => (
    <Link
        to={`/projects/${project.id}-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
        className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-brand/30 transition-all duration-300 flex flex-col"
    >
        <div className="h-48 overflow-hidden relative bg-muted">
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent z-10" />
            {project.img ? (
                <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            ) : (
                <div className="w-full h-full bg-muted" />
            )}
        </div>

        <div className="p-5 flex flex-col flex-1">
            <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-lg text-foreground group-hover:text-brand transition-colors leading-tight">
                    {project.title}
                </h3>
                <ArrowUpRight
                    size={18}
                    className="shrink-0 mt-0.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-brand transition-all"
                />
            </div>

            {project.description && (
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                </p>
            )}

            <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.tech && project.tech.map(t => (
                    <span key={t} className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-muted text-muted-foreground border border-border">
                        {t}
                    </span>
                ))}
            </div>

            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/50">
                {project.liveUrl && (
                    <span className="flex items-center gap-1 text-xs text-brand font-medium">
                        <ExternalLink size={12} /> Live
                    </span>
                )}
                {project.githubUrl && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                        <Github size={12} /> GitHub
                    </span>
                )}
            </div>
        </div>
    </Link>
);

const AllProjects = () => {
    const { data, loading } = useData();
    const projects = data.projects || [];
    const [selectedTag, setSelectedTag] = useState('');

    const allTags = useMemo(() => {
        const tags = new Set();
        projects.forEach(project => {
            if (project.tech && Array.isArray(project.tech)) {
                project.tech.forEach(t => tags.add(t));
            }
        });
        return Array.from(tags).sort();
    }, [projects]);

    const filteredProjects = useMemo(() => {
        if (!selectedTag) return projects;
        return projects.filter(p => p.tech && p.tech.includes(selectedTag));
    }, [projects, selectedTag]);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 pt-24 md:pt-32 pb-12">
                <div className="mb-8 mt-4 md:mt-8 flex flex-col items-start gap-2">
                    <Link to="/" className="text-muted-foreground hover:text-brand flex items-center gap-2 mb-4 transition-colors">
                        <ArrowLeft size={20} /> Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold">Prayansh's Projects</h1>
                    <p className="text-xl text-muted-foreground mb-6">All my projects.</p>
                </div>

                {loading ? (
                    <div className="mt-12">
                        <SectionLoader text="Loading projects from Supabase..." />
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0">
                                <div className="flex items-center gap-2 text-muted-foreground mr-2 shrink-0">
                                    <Filter size={18} />
                                    <span className="text-sm font-medium">Filter:</span>
                                </div>
                                <button
                                    onClick={() => setSelectedTag('')}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${selectedTag === '' ? 'bg-brand text-white border-brand' : 'bg-transparent border-border hover:border-brand/50 text-muted-foreground'}`}
                                >
                                    All
                                </button>
                                {allTags.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => setSelectedTag(tag)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${selectedTag === tag ? 'bg-brand text-white border-brand' : 'bg-transparent border-border hover:border-brand/50 text-muted-foreground'}`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                            <div className="shrink-0 text-sm text-muted-foreground">
                                Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
                            </div>
                        </div>

                        {filteredProjects.length === 0 ? (
                            <div className="py-24 text-center text-muted-foreground">No projects found for this tag.</div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProjects.map(project => (
                                    <ProjectTile key={project.id} project={project} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </main>
            <div className="mt-12">
                <Footer />
            </div>
        </div>
    );
};

export default AllProjects;
