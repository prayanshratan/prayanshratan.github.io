import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const KanbanColumn = ({ dateStr, items, setSelectedItem }) => {
    const [isAtBottom, setIsAtBottom] = useState(false);
    const hasMore = items.length > 4;

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        // 5px threshold for "bottom"
        if (scrollHeight - scrollTop <= clientHeight + 5) {
            setIsAtBottom(true);
        } else {
            setIsAtBottom(false);
        }
    };

    return (
        <div className="min-w-[300px] w-[300px] bg-muted/30 rounded-2xl p-4 snap-start border border-border/50 shrink-0 relative flex flex-col">
            <div className="bg-background px-4 py-1.5 rounded-full inline-flex items-center justify-center text-sm font-bold mb-4 text-foreground shadow-sm self-start">
                {dateStr}
            </div>
            <div
                className="space-y-4 overflow-y-auto max-h-[480px] pr-1 pb-1 no-scrollbar transition-all"
                onScroll={handleScroll}
            >
                {items.map(item => (
                    <div
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className="bg-card border border-border p-5 rounded-xl shadow-sm cursor-pointer hover:border-brand/50 hover:shadow-md transition-all group shrink-0"
                    >
                        <h3 className="font-bold mb-2 text-sm md:text-base transition-colors">{item.title}</h3>
                        {item.url && (
                            <div className="text-[10px] text-muted-foreground truncate mb-3 group-hover:text-foreground transition-colors">
                                {item.url.replace(/^https?:\/\//, '').replace(/^www\./, '')}
                            </div>
                        )}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                            {item.tags?.map((t, idx) => (
                                <span key={idx} className="bg-brand/10 text-brand text-[10px] uppercase font-bold px-2 py-0.5 rounded-md">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {hasMore && !isAtBottom && (
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background/90 max-h-[100%] to-transparent rounded-b-2xl flex items-end justify-center pb-2 transition-opacity duration-300">
                    <span className="text-[10px] font-bold text-white dark:text-black bg-black/80 dark:bg-white/90 px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                        Scroll for more
                    </span>
                </div>
            )}
        </div>
    );
};

const Goodreads = () => {
    const { data } = useData();
    const goodreads = data?.goodreads || [];

    const [articleFilter, setArticleFilter] = useState('All');
    const [bookFilter, setBookFilter] = useState('All');
    const [selectedItem, setSelectedItem] = useState(null);

    const articles = goodreads.filter(item => item.type === 'article');
    const books = goodreads.filter(item => item.type === 'book');

    const articleTags = useMemo(() => {
        const tags = new Set(['All']);
        articles.forEach(item => {
            if (item.tags) item.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags);
    }, [articles]);

    const bookTags = useMemo(() => {
        const tags = new Set(['All']);
        books.forEach(item => {
            if (item.tags) item.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags);
    }, [books]);

    const filteredArticles = useMemo(() => {
        if (articleFilter === 'All') return articles;
        return articles.filter(item => item.tags?.includes(articleFilter));
    }, [articles, articleFilter]);

    const filteredBooks = useMemo(() => {
        if (bookFilter === 'All') return books;
        return books.filter(item => item.tags?.includes(bookFilter));
    }, [books, bookFilter]);

    // Group articles by date (Month'Year)
    const articlesByDate = useMemo(() => {
        const grouped = {};
        filteredArticles.forEach(item => {
            const dateStr = item.date || "Unknown";
            if (!grouped[dateStr]) grouped[dateStr] = [];
            grouped[dateStr].push(item);
        });
        return grouped;
    }, [filteredArticles]);

    // Sort the columns by date descending
    const sortedDateKeys = useMemo(() => {
        return Object.keys(articlesByDate).sort((a, b) => {
            if (a === "Unknown") return 1;
            if (b === "Unknown") return -1;

            const getVal = (ds) => {
                if (!ds || !ds.includes("'")) return 0;
                const [m, y] = ds.split("'");
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                const mo = months.findIndex(x => x.toLowerCase().startsWith(m.toLowerCase()));
                if (mo === -1) return 0;
                return parseInt("20" + y) * 100 + mo;
            };
            return getVal(b) - getVal(a);
        });
    }, [articlesByDate]);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 pt-24 md:pt-32">
                <div className="mb-8 mt-4 md:mt-8 flex flex-col items-start gap-4">
                    <Link to="/" className="text-muted-foreground hover:text-brand flex items-center gap-2 mb-4 transition-colors">
                        <ArrowLeft size={20} /> Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold">Prayansh's Goodreads</h1>
                </div>

                {/* Articles Header & Filter */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                    <h2 className="text-2xl font-bold">Blogs</h2>
                    <div className="relative w-full md:w-auto">
                        <select
                            value={articleFilter}
                            onChange={(e) => setArticleFilter(e.target.value)}
                            className="appearance-none p-3 pr-10 bg-card border border-border rounded-xl focus:ring-2 focus:ring-brand/20 outline-none w-full shadow-sm text-sm font-medium transition-all hover:border-brand/50 cursor-pointer"
                        >
                            {articleTags.map(tag => (
                                <option key={tag} value={tag}>{tag}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                {/* Articles Kanban */}
                <div className="flex gap-6 overflow-x-auto pb-8 snap-x items-start">
                    {sortedDateKeys.length === 0 && (
                        <p className="text-muted-foreground">No articles found.</p>
                    )}
                    {sortedDateKeys.map((dateStr) => (
                        <KanbanColumn
                            key={dateStr}
                            dateStr={dateStr}
                            items={articlesByDate[dateStr]}
                            setSelectedItem={setSelectedItem}
                        />
                    ))}
                </div>

                {/* Books Section Header & Filter */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mt-12 mb-4 gap-4">
                    <h2 className="text-2xl font-bold">Books</h2>
                    <div className="relative w-full md:w-auto">
                        <select
                            value={bookFilter}
                            onChange={(e) => setBookFilter(e.target.value)}
                            className="appearance-none p-3 pr-10 bg-card border border-border rounded-xl focus:ring-2 focus:ring-brand/20 outline-none w-full shadow-sm text-sm font-medium transition-all hover:border-brand/50 cursor-pointer"
                        >
                            {bookTags.map(tag => (
                                <option key={tag} value={tag}>{tag}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                    {filteredBooks.length === 0 && (
                        <p className="text-muted-foreground">No books found.</p>
                    )}
                    {filteredBooks.map(item => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className="bg-card border border-border p-6 rounded-xl shadow-sm cursor-pointer hover:border-brand/50 transition-colors"
                        >
                            <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                            <div className="flex flex-wrap gap-2">
                                {item.tags?.map((t, idx) => (
                                    <span key={idx} className="bg-brand/10 text-brand text-[10px] uppercase font-bold px-2 py-1 rounded">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <div className="mt-12 w-full">
                <Footer />
            </div>

            {/* Modal */}
            {/* Updated Modern Modal */}
            {selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
                    <div
                        className="bg-card border border-border/50 rounded-2xl w-full max-w-lg p-8 relative shadow-2xl animate-in zoom-in-95 duration-200"
                    >
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-6 right-6 p-2 bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground rounded-full transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>

                        <div className="mb-6 flex items-center gap-3">
                            <span className="bg-brand/10 text-brand text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-widest">
                                {selectedItem.type}
                            </span>
                            {selectedItem.date && (
                                <span className="text-sm font-medium text-muted-foreground">
                                    {selectedItem.date}
                                </span>
                            )}
                        </div>

                        <h2 className="text-3xl font-bold mb-6 leading-tight">{selectedItem.title}</h2>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {selectedItem.tags?.map((t, idx) => (
                                <span key={idx} className="bg-muted text-foreground text-xs font-semibold px-3 py-1.5 rounded-lg border border-border/50">
                                    {t}
                                </span>
                            ))}
                        </div>

                        {selectedItem.url && (
                            <div className="pt-6 border-t border-border/50 flex flex-col gap-2">
                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Direct Link</span>
                                <a
                                    href={selectedItem.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-3 text-sm font-medium p-4 bg-muted/30 hover:bg-muted/50 rounded-xl border border-border/50 transition-all hover:border-brand/30 w-full break-all break-words"
                                >
                                    <div className="p-2 bg-background rounded-lg shadow-sm group-hover:bg-brand group-hover:text-white transition-colors shrink-0">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                    </div>
                                    <span className="text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2">
                                        {selectedItem.url}
                                    </span>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Goodreads;
