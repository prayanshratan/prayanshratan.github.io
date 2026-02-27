import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';

function GoodreadsCard({ item, index, onClick }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group relative border border-border bg-card dark:bg-zinc-900/50 dark:border-zinc-600 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 md:col-span-1 cursor-pointer`}
            onClick={onClick}
        >
            <div className="flex flex-col h-full relative z-10 p-8">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold tracking-widest uppercase text-brand mb-2 block">
                        {item.type === 'book' ? 'Book' : 'Blog'}
                    </span>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-brand transition-colors line-clamp-3" title={item.title}>
                    {item.title}
                </h3>

                {item.author && item.type === 'book' && (
                    <h4 className="text-sm font-medium text-muted-foreground mb-3 truncate" title={item.author}>
                        by {item.author}
                    </h4>
                )}

                {item.url && item.type === 'article' && (
                    <div className="text-[10px] text-muted-foreground truncate mb-3 group-hover:text-foreground transition-colors" title={item.url}>
                        {item.url.replace(/^https?:\/\//, '').replace(/^www\./, '')}
                    </div>
                )}

                <div className="flex flex-wrap gap-2 mt-auto pt-6">
                    {item.tags?.map((t, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs font-medium rounded-md bg-muted text-muted-foreground/80 truncate max-w-[120px]">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

const HomeGoodreads = () => {
    const { data } = useData();
    const [selectedItem, setSelectedItem] = useState(null);

    const allItems = data.goodreads || [];
    const latestBooks = allItems.filter(item => item.type === 'book').slice(0, 2);
    const latestBlogs = allItems.filter(item => item.type === 'article').slice(0, 2);

    // Interleave them to make it look nice, or just combine
    const displayItems = [...latestBooks, ...latestBlogs];

    if (displayItems.length === 0) return null;

    return (
        <section id="goodreads" className="section relative bg-muted/30">
            <div className="container mx-auto px-6">
                <motion.div className="mb-16 max-w-2xl">
                    <span className="text-brand font-semibold tracking-wider uppercase text-sm mb-2 block">Goodreads</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Recent Reads</h2>
                    <p className="text-lg text-muted-foreground font-light mb-2">
                        A collection of books and blogs I've read or found interesting.
                    </p>
                    <Link to="/goodreads" className="text-brand hover:underline font-medium inline-flex items-center gap-1">
                        See all Goodreads here<ArrowUpRight size={16} />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayItems.map((item, index) => (
                        <GoodreadsCard key={item.id} item={item} index={index} onClick={() => setSelectedItem(item)} />
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <Link
                        to="/goodreads"
                        className="group flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-brand text-brand hover:bg-brand hover:text-white font-bold rounded-full transition-all duration-300"
                    >
                        View Full Library
                        <ArrowUpRight size={20} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Modal */}
            {selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
                    <div
                        className="bg-card border border-border/50 rounded-2xl w-full max-w-lg p-8 relative shadow-2xl animate-in zoom-in-95 duration-200 text-left"
                    >
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-6 right-6 p-2 bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground rounded-full transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>

                        <div className="mb-6 flex items-center gap-3">
                            <span className="bg-brand/10 text-brand text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-widest">
                                {selectedItem.type === 'article' ? 'blog' : selectedItem.type}
                            </span>
                            {selectedItem.date && (
                                <span className="text-sm font-medium text-muted-foreground">
                                    {selectedItem.date}
                                </span>
                            )}
                        </div>

                        <h2 className="text-3xl font-bold mb-2 leading-tight">{selectedItem.title}</h2>
                        {selectedItem.author && selectedItem.type === 'book' && (
                            <h3 className="text-xl font-medium text-muted-foreground mb-6">by {selectedItem.author}</h3>
                        )}

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
        </section>
    );
};

export default HomeGoodreads;
