import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const DataContext = createContext();

const initialDataFallback = {
    hero: {
        title: "Building products\nthat shape the future.",
        subtitle: "I'm a Product Manager who codes. I utilize my engineering background to bridge the technical gap, translating complex problems into elegant, scalable solutions.",
        resumeUrl: "/resume.pdf"
    },
    experience: [],
    projects: [],
    goodreads: [],
    skills: [],
    contact: {
        email: "hello@prayansh.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        twitter: "https://twitter.com"
    }
};

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(initialDataFallback);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSupabaseData = async () => {
            try {
                // Fetch all data concurrently
                const [
                    { data: profileData },
                    { data: experienceData },
                    { data: projectsData },
                    { data: skillsData },
                    { data: goodreadsData }
                ] = await Promise.all([
                    supabase.from('profile').select('*').single(),
                    supabase.from('experience').select('*').order('period', { ascending: false }),
                    supabase.from('projects').select('*'),
                    supabase.from('skills').select('*'),
                    supabase.from('goodreads').select('*')
                ]);

                // Map Supabase profile DB columns back to frontend state shape
                const hero = profileData ? {
                    title: profileData.title,
                    subtitle: profileData.subtitle,
                    resumeUrl: profileData.resume_url
                } : initialDataFallback.hero;

                const contact = profileData ? {
                    email: profileData.email,
                    linkedin: profileData.linkedin,
                    github: profileData.github,
                    twitter: profileData.twitter
                } : initialDataFallback.contact;

                // Format projects (reconnect colSpan -> col_span)
                const formattedProjects = (projectsData || []).map(p => ({
                    ...p,
                    colSpan: p.col_span
                }));

                const skillsList = (skillsData || []).map(s => s.name);

                setData({
                    hero,
                    experience: experienceData || [],
                    projects: formattedProjects,
                    goodreads: goodreadsData || [],
                    skills: skillsList,
                    contact
                });

            } catch (error) {
                console.error("Error fetching data from Supabase:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSupabaseData();
    }, []);

    const updateSection = (section, newData) => {
        // Optimistic UI Update (for local state rendering)
        setData(prev => ({
            ...prev,
            [section]: newData
        }));
    };

    const saveChangesToDatabase = async (localData) => {
        try {
            // 1. Save Profile (Hero & Contact)
            const profileData = {
                id: 1, // We only have one profile record
                title: localData.hero.title,
                subtitle: localData.hero.subtitle,
                resume_url: localData.hero.resumeUrl,
                email: localData.contact.email,
                linkedin: localData.contact.linkedin,
                github: localData.contact.github,
                twitter: localData.contact.twitter
            };
            const { error: profileError } = await supabase.from('profile').upsert(profileData);
            if (profileError) throw profileError;

            // 2. Save Experience
            // For simplicity, we delete all existing and insert the new ones, 
            // to perfectly handle deletions and order changes without complex diffing.
            await supabase.from('experience').delete().neq('id', 'temp'); // Delete all 
            if (localData.experience.length > 0) {
                const { error: expError } = await supabase.from('experience').insert(localData.experience);
                if (expError) throw expError;
            }

            // 3. Save Projects
            // Similarly, replace all projects
            await supabase.from('projects').delete().neq('id', 'temp');
            if (localData.projects.length > 0) {
                const formattedProjects = localData.projects.map(p => ({
                    ...p,
                    col_span: p.colSpan // Convert back to DB column name
                }));
                // Remove frontend specific keys if any. 'colSpan' is tracked but we need to delete it from the object we upload
                formattedProjects.forEach(p => delete p.colSpan);

                const { error: projError } = await supabase.from('projects').insert(formattedProjects);
                if (projError) throw projError;
            }

            // 4. Save Skills
            await supabase.from('skills').delete().neq('name', 'temp');
            if (localData.skills.length > 0) {
                const skillRecords = localData.skills.map(s => ({ name: s }));
                const { error: skillError } = await supabase.from('skills').insert(skillRecords);
                if (skillError) throw skillError;
            }

            // 5. Save Goodreads
            await supabase.from('goodreads').delete().neq('id', 'temp');
            if (localData.goodreads && localData.goodreads.length > 0) {
                const { error: grError } = await supabase.from('goodreads').insert(localData.goodreads);
                if (grError) throw grError;
            }

            // Also update global frontend state to match
            setData(localData);

            return { success: true };
        } catch (error) {
            console.error("Error saving to Supabase:", error);
            return { success: false, error: error.message };
        }
    };

    return (
        <DataContext.Provider value={{ data, updateSection, saveChangesToDatabase, loading }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
