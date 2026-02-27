import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Share2, Bookmark } from 'lucide-react';
import { useData } from '../context/DataContext';

import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const CaseStudy = () => {
    const { id } = useParams();
    // The ID in the URL might be "123-my-blog-title", so we need to extract the actual ID part.
    // Assuming the ID is the first part before the first hyphen.
    const projectId = id.split('-')[0];

    const { data } = useData();
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [copied, setCopied] = useState(false);

    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    useEffect(() => {
        if (data && data.projects) {
            const foundProject = data.projects.find(p => p.id.toString().toUpperCase() === projectId.toUpperCase());
            if (foundProject) {
                setProject(foundProject);
            } else {
                // Handle not found - maybe redirect or show error
                // navigate('/'); 
            }
        }
    }, [data, projectId, navigate]);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-4 w-32 bg-muted rounded mb-4"></div>
                    <p className="text-muted-foreground">Loading case study...</p>
                </div>
            </div>
        );
    }

    // Default rich text content if none exists
    const content = project.caseStudy || `
        <p><em>No case study content has been added for this project yet.</em></p>
        <p>Go to the Admin panel to add rich text content including headers, lists, code blocks, and more.</p>
    `;

    return (
        <article className="min-h-screen bg-background text-foreground selection:bg-brand/20 selection:text-brand">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-brand transform origin-left z-50"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Navigation / Header */}
            <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] md:w-[80%] z-40 rounded-full bg-background/80 backdrop-blur-md border border-border/50 shadow-sm flex items-center justify-between px-6 py-3 transition-all">
                <button
                    onClick={() => navigate('/')}
                    className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft size={24} />
                </button>

                <div className="flex items-center gap-4">
                    <div className="text-sm font-medium text-muted-foreground hidden md:block">
                        {project.title}
                    </div>

                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-all hover:scale-105 active:scale-95"
                        aria-label="Toggle theme"
                    >
                        {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-slate-700" />}
                    </button>

                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                        }}
                        className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-foreground transition-all relative group"
                        title="Copy Link"
                    >
                        {copied ? (
                            <span className="text-xs font-bold text-green-500 animate-in fade-in zoom-in">Copied!</span>
                        ) : (
                            <Share2 size={20} />
                        )}
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="pt-32 pb-16 px-6 md:px-0 max-w-4xl mx-auto text-center">
                <div className="flex justify-center gap-2 mb-6 flex-wrap">
                    {project.tech && project.tech.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-muted/50 text-muted-foreground rounded-full text-xs font-medium tracking-wide border border-border/50 uppercase">
                            {tag}
                        </span>
                    ))}
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-8 leading-tight">
                    {project.title}
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 font-light">
                    {project.description}
                </p>

                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground border-y border-border/50 py-4 w-fit mx-auto px-8">
                    <span className="flex items-center gap-2">
                        <Calendar size={16} />
                        {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-2">
                        <Clock size={16} />
                        5 min read
                    </span>
                </div>
            </header>

            {/* Cover Image */}
            <div className="w-full max-w-5xl mx-auto px-6 mb-16">
                <motion.div
                    className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-muted"
                >
                    <motion.img
                        src={project.img}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    />
                </motion.div>
            </div>

            {/* Rich Text Content */}
            <div className="max-w-3xl mx-auto px-6 pb-24">
                <style dangerouslySetInnerHTML={{
                    __html: `
                        .prose h1 { font-size: 2.25em; font-weight: 800; margin-top: 2em; margin-bottom: 0.5em; letter-spacing: -0.025em; line-height: 1.1; }
                        .prose h2 { font-size: 1.75em; font-weight: 700; margin-top: 1.5em; margin-bottom: 0.5em; letter-spacing: -0.025em; color: var(--foreground); }
                        .prose h3 { font-size: 1.35em; font-weight: 600; margin-top: 1.5em; margin-bottom: 0.5em; color: var(--foreground); }
                        .prose p { margin-bottom: 1.5em; line-height: 1.8; font-size: 1.125rem; color: var(--muted-foreground); text-align: left; }
                        .prose ul, .prose ol { margin-bottom: 1.5em; padding-left: 1.5em; color: var(--muted-foreground); list-style-type: disc; }
                        .prose li { margin-bottom: 0.5em; font-size: 1.125rem; }
                        .prose blockquote { border-left: 4px solid var(--brand); padding-left: 1.5em; font-style: italic; color: var(--foreground); margin: 2em 0; font-size: 1.25em; background: var(--muted); padding: 1.5em; border-radius: 0 0.5em 0.5em 0; }
                        .prose pre { background: #1e1e1e; color: #d4d4d4; padding: 1.25em; rounded: 0.5em; overflow-x: auto; margin-bottom: 1.5em; border-radius: 0.75rem; border: 1px solid var(--border); }
                        .prose code { font-family: 'Fira Code', monospace; font-size: 0.9em; background: var(--muted); padding: 0.2em 0.4em; border-radius: 0.25em; color: var(--code-text); }
                        .prose img { border-radius: 0.75em; margin: 2em 0; width: 100%; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.2); }
                        .prose a { color: var(--brand); text-decoration: underline; text-underline-offset: 4px; transition: color 0.2s; }
                        .prose a:hover { color: var(--brand-hover); }
                        .prose strong { font-weight: 700; color: var(--foreground); }
                    `
                }} />

                <div
                    className="prose prose-lg dark:prose-invert max-w-none text-left"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </div>

            {project.mediumLink && (
                <div className="max-w-3xl mx-auto px-6 mb-12">
                    <p className="text-sm text-muted-foreground italic border-l-2 border-brand pl-4 py-2 bg-muted/30 rounded-r-lg">
                        This blog has been published on <a href={project.mediumLink} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline font-medium">Medium</a>. If you liked it, please show your appreciation by clapping and follow me for more.
                    </p>
                </div>
            )}


            {/* Footer / Contact CTA */}
            <footer className="border-t border-border mt-12 bg-muted/30">
                <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col items-center text-center">
                    <h3 className="text-2xl font-bold mb-4">Want to see more details?</h3>
                    <p className="text-muted-foreground mb-8 max-w-lg">
                        I'm always open to discussing my process and the decisions behind these projects.
                    </p>
                    <button
                        onClick={() => navigate('/#contact')} // Assuming home has contact section id
                        className="px-8 py-3 bg-brand text-white rounded-full font-bold hover:shadow-lg hover:bg-brand-hover transition-all transform hover:-translate-y-1"
                    >
                        Get in Touch
                    </button>
                </div>
            </footer>
        </article>
    );
};

export default CaseStudy;
