import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const SectionLoader = ({ text = "Fetching content from database..." }) => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 opacity-80"
        >
            <Loader2 size={28} className="animate-spin text-brand mb-4" />
            <p className="text-sm font-mono text-muted-foreground">{text}</p>
        </motion.div>
    );
};

export default SectionLoader;
