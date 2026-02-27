import { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { Filter, ArrowLeft, ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AllProjects = () => {
    const { data } = useData();
    const projects = data.projects || [];
    const [selectedTag, setSelectedTag] = useState('');

    // Extract all unique tags (we assume tech/tags are in project.tech, or if category is used as well)
    // The previous components use project.tech for tags.
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
        <div className="min-h-screen bg-background text-foreground flex flex-col pt-24 pb-12 px-6">
            <Navbar />
            <div className="max-w-5xl mx-auto flex-1 w-full">
                <div className="mb-12 flex flex-col items-start gap-4">
                    <Link to="/" className="text-muted-foreground hover:text-brand flex items-center gap-2 mb-4 transition-colors">
                        <ArrowLeft size={20} /> Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold">Prayansh's Product Case Studies</h1>
                    <p className="text-xl text-muted-foreground">All my case studies, product requirement documents, and technical blogs.</p>
                </div>

                {/* Filter Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0">
                        <div className="flex items-center gap-2 text-muted-foreground mr-2 shrink-0">
                            <Filter size={18} />
                            <span className="text-sm font-medium">Filter by tag:</span>
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
                        Showing {filteredProjects.length} case {filteredProjects.length === 1 ? 'study' : 'studies'}
                    </div>
                </div>

                {/* Table View */}
                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border bg-muted/30">
                                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground w-2/3">Title</th>
                                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground w-1/3 border-l border-border hidden md:table-cell">Tags</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProjects.length === 0 ? (
                                <tr>
                                    <td colSpan="2" className="py-12 text-center text-muted-foreground">
                                        No case studies found for this tag.
                                    </td>
                                </tr>
                            ) : (
                                filteredProjects.map(project => (
                                    <tr key={project.id} className="border-b border-border/50 hover:bg-muted/10 transition-colors group">
                                        <td className="py-4 px-6">
                                            <Link
                                                to={`/case-studies/${project.id}-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-medium text-lg text-foreground group-hover:text-brand transition-colors flex items-center gap-2"
                                            >
                                                {project.title}
                                                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>

                                            {/* Mobile only tags display directly under title */}
                                            <div className="flex flex-wrap gap-2 mt-3 md:hidden">
                                                <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-brand/10 text-brand border border-brand/20">
                                                    {project.category}
                                                </span>
                                                {project.tech && project.tech.map(t => (
                                                    <span key={t} className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-muted text-muted-foreground border border-border">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 border-l border-border hidden md:table-cell">
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-brand/10 text-brand border border-brand/20">
                                                    {project.category}
                                                </span>
                                                {project.tech && project.tech.map(t => (
                                                    <span key={t} className="px-2.5 py-1 text-xs font-medium rounded-md bg-muted text-muted-foreground border border-border">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-12">
                <Footer />
            </div>
        </div>
    );
};

export default AllProjects;
