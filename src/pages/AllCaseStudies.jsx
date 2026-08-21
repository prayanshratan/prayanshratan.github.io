import { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { Filter, ArrowLeft, ArrowUpRight, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SectionLoader from '../components/SectionLoader';

const AllCaseStudies = () => {
    const { data, loading } = useData();
    const caseStudies = data.caseStudies || [];
    const [selectedTag, setSelectedTag] = useState('');

    const allTags = useMemo(() => {
        const tags = new Set();
        caseStudies.forEach(cs => {
            if (cs.tech && Array.isArray(cs.tech)) {
                cs.tech.forEach(t => tags.add(t));
            }
        });
        return Array.from(tags).sort();
    }, [caseStudies]);

    const filteredItems = useMemo(() => {
        if (!selectedTag) return caseStudies;
        return caseStudies.filter(cs => cs.tech && cs.tech.includes(selectedTag));
    }, [caseStudies, selectedTag]);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 pt-24 md:pt-32 pb-12">
                <div className="mb-8 mt-4 md:mt-8 flex flex-col items-start gap-4">
                    <Link to="/" className="text-muted-foreground hover:text-brand flex items-center gap-2 mb-4 transition-colors">
                        <ArrowLeft size={20} /> Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold">Prayansh's Case Studies</h1>
                    <p className="text-xl text-muted-foreground mb-6">Deep-dives into product problems I've solved.</p>

                    <div className="w-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-4 shadow-sm">
                        <div className="bg-amber-100 dark:bg-amber-500/20 p-3.5 rounded-xl shrink-0 text-amber-600 dark:text-amber-400">
                            <AlertTriangle size={28} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-1">Page Under Construction</h3>
                            <p className="text-base text-amber-800 dark:text-amber-200/80 leading-relaxed">
                                I am currently migrating my case studies to this new platform. In the meantime, you can view all my product case studies on my{' '}
                                <a
                                    href="https://prayanshratan.notion.site/9c86d4c7fd34458db68e77f615d8ffc1?v=c3c292be14584dffad03e549b4990e0a"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-bold text-amber-700 dark:text-amber-300 hover:text-amber-600 dark:hover:text-amber-200 underline decoration-amber-300 dark:decoration-amber-700 hover:decoration-amber-500 dark:hover:decoration-amber-400 transition-all inline-flex items-center gap-1"
                                >
                                    legacy website
                                    <ArrowUpRight size={16} />
                                </a>.
                            </p>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="mt-12">
                        <SectionLoader text="Loading case studies from Supabase..." />
                    </div>
                ) : (
                    <>
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
                                Showing {filteredItems.length} case {filteredItems.length === 1 ? 'study' : 'studies'}
                            </div>
                        </div>

                        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-border bg-muted/30">
                                        <th className="py-4 px-6 font-semibold text-sm text-muted-foreground w-2/3">Title</th>
                                        <th className="py-4 px-6 font-semibold text-sm text-muted-foreground w-1/3 border-l border-border hidden md:table-cell">Tags</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredItems.length === 0 ? (
                                        <tr>
                                            <td colSpan="2" className="py-12 text-center text-muted-foreground">
                                                No case studies found for this tag.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredItems.map(cs => (
                                            <tr key={cs.id} className="border-b border-border/50 hover:bg-muted/10 transition-colors group">
                                                <td className="py-4 px-6">
                                                    <Link
                                                        to={`/case-studies/${cs.id}-${cs.title.toLowerCase().replace(/\s+/g, '-')}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="font-medium text-lg text-foreground group-hover:text-brand transition-colors flex items-center gap-2"
                                                    >
                                                        {cs.title}
                                                        <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </Link>
                                                    <div className="flex flex-wrap gap-2 mt-3 md:hidden">
                                                        {cs.tech && cs.tech.map(t => (
                                                            <span key={t} className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-muted text-muted-foreground border border-border">
                                                                {t}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 border-l border-border hidden md:table-cell">
                                                    <div className="flex flex-wrap gap-2">
                                                        {cs.tech && cs.tech.map(t => (
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
                    </>
                )}
            </main>
            <div className="mt-12">
                <Footer />
            </div>
        </div>
    );
};

export default AllCaseStudies;
