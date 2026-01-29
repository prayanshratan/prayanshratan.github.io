import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

const initialData = {
    hero: {
        title: "Building products\nthat shape the future.",
        subtitle: "I'm a Product Manager who codes. I utilize my engineering background to bridge the technical gap, translating complex problems into elegant, scalable solutions.",
        resumeUrl: "/resume.pdf"
    },
    experience: [
        {
            id: 'E7B2K9',
            role: "Product Manager",
            company: "Current Company",
            period: "2023 - Present",
            description: "Leading the product vision and strategy for enterprise solutions. Collaborating with engineering and design teams.",
            tags: ["Strategy", "Roadmapping", "Agile"]
        },
        {
            id: 'M4N1X8',
            role: "Associate Product Manager",
            company: "Previous Tech Co.",
            period: "2021 - 2023",
            description: "Managed the full product lifecycle for consumer-facing mobile applications. Increased user retention by 15%.",
            tags: ["User Research", "Data Analysis", "Mobile"]
        },
        {
            id: 'P9Q3R5',
            role: "Software Developer",
            company: "Tech Startup",
            period: "2019 - 2021",
            description: "Built scalable web applications using React and Node.js. Transitioned into product management bridging technical constraints.",
            tags: ["Full Stack", "React", "System Design"]
        }
    ],
    projects: [
        {
            id: 'A1B2C3',
            title: "Enterprise Analytics Engine",
            category: "B2B SaaS / AI",
            description: "Architected a real-time analytics engine processing 1M+ events/sec. Reduced query latency by 80% and unlocked new revenue streams via premium insights.",
            tech: ["Product Strategy", "Big Data", "React"],
            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
            colSpan: "md:col-span-2",
            selected: true
        },
        {
            id: 'X9Y8Z7',
            title: "Fintech Mobile App",
            category: "Consumer Finance",
            description: "Led the 2.0 redesign focusing on accessibility and trust. Increased user retention by 25% within the first quarter of launch.",
            tech: ["Mobile Growth", "Figma", "UX Research"],
            img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
            colSpan: "md:col-span-1",
            selected: true
        },
        {
            id: 'D4E5F6',
            title: "Developer API Portal",
            category: "DevTools",
            description: "Built a developer-first documentation portal and API playground, reducing integration time for partners by 40%.",
            tech: ["API Design", "DX", "Technical Writing"],
            img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop",
            colSpan: "md:col-span-1",
            selected: true
        },
        {
            id: 'G7H8I9',
            title: "Global Supply Chain Ops",
            category: "Internal Tooling",
            description: "Developed an internal dashboard for logistics tracking, saving the operations team 15 hours per week per person.",
            tech: ["Operations", "Dashboard", "Automation"],
            img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
            colSpan: "md:col-span-2",
            selected: true
        }
    ],
    skills: [
        "Product Strategy", "User Research", "Agile & Scrum", "A/B Testing",
        "System Design", "API Development", "React & Node.js", "SQL & Analytics",
        "Figma", "Jira / Linear", "Amplitude", "Technical Writing"
    ],
    contact: {
        email: "hello@prayansh.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        twitter: "https://twitter.com"
    }
};

export const DataProvider = ({ children }) => {
    // In a real enterprise app, this would come from Supabase/API
    // For now, we initialize from local storage if available, else default
    const [data, setData] = useState(() => {
        const saved = localStorage.getItem('portfolio_data');
        return saved ? JSON.parse(saved) : initialData;
    });

    useEffect(() => {
        localStorage.setItem('portfolio_data', JSON.stringify(data));
    }, [data]);

    const updateSection = (section, newData) => {
        setData(prev => ({
            ...prev,
            [section]: newData
        }));
    };

    return (
        <DataContext.Provider value={{ data, updateSection }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
