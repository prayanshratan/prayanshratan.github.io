const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 border-t border-light bg-secondary" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}>
            <div className="container mx-auto px-6 text-center">
                <p className="text-sm text-tertiary" style={{ color: 'var(--text-tertiary)' }}>
                    © {currentYear} Prayansh Srivastava. Built with React & Vite.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
