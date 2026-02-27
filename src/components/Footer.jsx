const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 border-t border-light bg-muted" style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-light)' }}>
            <div className="container mx-auto px-6 text-center">
                <p className="text-sm text-muted-foreground/60" style={{ color: 'var(--text-muted-foreground/60)' }}>
                    © {currentYear} Prayansh Srivastava. Built with React & Vite.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
