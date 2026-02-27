import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Twitter, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

const Contact = () => {
    const { data } = useData();
    const { contact } = data;

    return (
        <section id="contact" className="py-32 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand/5"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tighter"
                    >
                        Let's build the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-purple-500">
                            next big thing.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto"
                    >
                        I'm currently looking for new opportunities in Product Management.
                        If you need someone who speaks both 'User' and 'Code', let's talk.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col items-center gap-8"
                    >
                        <a
                            href={`mailto:${contact.email}`}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full text-lg font-medium shadow-lg hover:shadow-brand/25 transition-all hover:-translate-y-1"
                        >
                            <Mail size={20} />
                            <span>Contact Me</span>
                            <ArrowRight size={20} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                        </a>

                        <div className="flex gap-8 mt-8">
                            {[
                                { icon: <Linkedin size={24} />, href: contact.linkedin },
                                { icon: <Github size={24} />, href: contact.github },
                                { icon: <Twitter size={24} />, href: contact.twitter }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 rounded-full bg-muted/50 text-muted-foreground hover:bg-foreground hover:text-background transition-all hover:scale-110"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
