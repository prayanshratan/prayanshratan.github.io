import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import SectionLoader from './SectionLoader';

const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

const getSortValue = (period) => {
    if (!period) return 0;
    let [start] = period.split(' - ');
    if (!start) return 0;

    let [m, y] = start.trim().split(' ');
    if (!y) {
        y = m;
        m = 'Jan';
    }

    return parseInt(y) * 12 + (MONTHS[m] || 0);
};

const Experience = () => {
    const { data, loading } = useData();
    // Sort recent jobs first based on start date
    const sortedExperiences = [...(data.experience || [])].sort((a, b) => getSortValue(b.period) - getSortValue(a.period));

    // Group consecutive roles at the same company (LinkedIn Stack approach)
    const groupedExperiences = [];
    let currentGroup = null;

    sortedExperiences.forEach(exp => {
        if (currentGroup && currentGroup.company === exp.company) {
            currentGroup.roles.push(exp);
        } else {
            if (currentGroup) groupedExperiences.push(currentGroup);
            currentGroup = {
                id: exp.id,
                company: exp.company,
                roles: [exp]
            };
        }
    });
    if (currentGroup) groupedExperiences.push(currentGroup);

    return (
        <section id="experience" className="section relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-20 text-center relative z-20 bg-background/0"
                >
                    {/* Header needs to be above the line visually if we used absolute, but moving the line inside the grid is cleaner */}
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50 mb-4">
                        Professional Journey
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        My path from writing code to defining product strategy.
                    </p>
                </motion.div>

                {loading ? (
                    <SectionLoader text="Loading timeline from Supabase..." />
                ) : (
                    <div className="space-y-16 relative">
                    {/* MOVED: Line is now relative to the content container, so it starts after the header */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-brand/20 to-transparent transform md:-translate-x-1/2"></div>

                    {groupedExperiences.map((group, index) => {
                        // Calculate total tenure string for the company
                        const earliestStart = group.roles[group.roles.length - 1].period.split(' - ')[0];
                        const latestEnd = group.roles[0].period.split(' - ')[1] || 'Present';
                        const totalPeriod = group.roles.length > 1 ? `${earliestStart} - ${latestEnd}` : group.roles[0].period;

                        return (
                            <motion.div
                                key={group.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Card content */}
                                <div className={`w-full md:w-1/2 min-w-0 ${index % 2 !== 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                                    <div className="p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-sm hover:border-brand/50 transition-colors shadow-sm dark:shadow-none text-left">
                                        <h3 className="text-3xl font-bold text-foreground mb-2">{group.company}</h3>
                                        <span className="text-muted-foreground font-mono text-sm mb-6 block">{totalPeriod}</span>
                                        
                                        <div className="space-y-6">
                                            {group.roles.map((role, rIdx) => (
                                                <div key={role.id} className="relative min-w-0">
                                                    <h4 className="text-xl font-semibold text-brand mb-1">{role.role}</h4>
                                                    {group.roles.length > 1 && (
                                                        <span className="text-muted-foreground/80 font-mono text-xs mb-3 block">{role.period}</span>
                                                    )}
                                                    
                                                    <div
                                                        className="text-muted-foreground/80 leading-relaxed mb-4 text-sm prose dark:prose-invert prose-brand max-w-none text-left w-full"
                                                        dangerouslySetInnerHTML={{ __html: role.description.replace(/&nbsp;/g, ' ').replace(/\u00A0/g, ' ') }}
                                                    />
                                                    
                                                    <div className="flex flex-wrap gap-2 justify-start mt-2">
                                                        {role.tags.map((tag) => (
                                                            <span
                                                                key={tag}
                                                                className="px-3 py-1 text-[10px] font-medium rounded-full bg-brand/10 text-brand border border-brand/10"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    {/* Divider between roles if not the last one */}
                                                    {rIdx < group.roles.length - 1 && (
                                                        <div className={`w-full h-px bg-border/60 my-6`}></div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline Center Node */}
                                <div className="relative flex items-center justify-center w-8 h-8 md:absolute md:left-1/2 md:-translate-x-1/2 z-20 bg-background rounded-full border border-border">
                                    <div className="w-4 h-4 rounded-full bg-brand box-shadow-glow"></div>
                                    <div className="absolute w-8 h-8 rounded-full bg-brand/20 animate-ping opacity-75"></div>
                                </div>

                                {/* Empty Space for alignment */}
                                <div className="hidden md:block w-1/2"></div>
                            </motion.div>
                        );
                    })}
                </div>
                )}
            </div>
        </section>
    );
};

export default Experience;
