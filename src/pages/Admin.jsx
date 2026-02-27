import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash, LogOut, Save, X, FileText, Upload, Image as ImageIcon, AlertCircle, ArrowUpRight } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const generateId = () => Math.random().toString(36).substring(2, 8).toUpperCase();

const Admin = () => {
    const { data, loading, updateSection, saveChangesToDatabase } = useData();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('experience');
    const [isSaving, setIsSaving] = useState(false);

    // Local state for buffering changes (Draft Mode)
    const [localData, setLocalData] = useState(data);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // Sync local data with global data when it loads from Supabase
    // We check !hasUnsavedChanges to avoid overwriting user's work-in-progress
    useEffect(() => {
        if (!loading && !hasUnsavedChanges) {
            setLocalData(data);
        }
    }, [data, loading]);

    const handleLogout = () => {
        if (hasUnsavedChanges) {
            if (!confirm("You have unsaved changes. Are you sure you want to logout?")) return;
        }
        logout();
        navigate('/login');
    };

    const saveChanges = async () => {
        setIsSaving(true);
        const { success, error } = await saveChangesToDatabase(localData);
        setIsSaving(false);

        if (success) {
            setHasUnsavedChanges(false);
            alert("Changes published successfully to the live website!");
        } else {
            alert(`Error saving changes: ${error}`);
        }
    };

    // Helper to update local state
    const updateLocalState = (section, newValue) => {
        setLocalData(prev => ({
            ...prev,
            [section]: newValue
        }));
        setHasUnsavedChanges(true);
    };

    const quillModules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            ['clean']
        ],
    };

    const quillFormats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'blockquote', 'code-block',
        'list', 'bullet',
        'script', 'indent',
        'link'
    ];

    // --- Handlers for Sections ---

    // Experience
    const addExperience = () => {
        const newExp = {
            id: generateId(),
            role: "New Role",
            company: "Company Name",
            period: "2024 - Present",
            description: "Description of your role...",
            tags: ["Tag 1", "Tag 2"]
        };
        updateLocalState('experience', [newExp, ...localData.experience]);
    };

    const updateExperience = (id, field, value) => {
        const updated = localData.experience.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        );
        updateLocalState('experience', updated);
    };

    const deleteExperience = (id) => {
        updateLocalState('experience', localData.experience.filter(item => item.id !== id));
    };

    // Projects
    const addProject = () => {
        const newProject = {
            id: generateId(),
            title: "New Project",
            category: "Category",
            description: "Project description...",
            tech: ["React"],
            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", // Default placeholder
            colSpan: "md:col-span-1",
            selected: false,
            caseStudy: "",
            mediumLink: ""
        };
        updateLocalState('projects', [newProject, ...localData.projects]);
    };

    const updateProject = (id, field, value) => {
        // VALIDATION: Max 4 Selected Projects
        if (field === 'selected' && value === true) {
            const currentSelectedCount = localData.projects.filter(p => p.selected).length;
            if (currentSelectedCount >= 4) {
                alert("Action Denied: You can only have 4 'Selected Works' at a time. Please uncheck another project first.");
                return;
            }
        }

        const updated = localData.projects.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        );
        updateLocalState('projects', updated);
    };

    const handleProjectImageUpload = (id, e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            updateProject(id, 'img', url);
        }
    };

    const deleteProject = (id) => {
        updateLocalState('projects', localData.projects.filter(item => item.id !== id));
    };

    // Skills
    const addSkill = () => {
        updateLocalState('skills', [...localData.skills, "New Skill"]);
    };

    const updateSkill = (index, value) => {
        const updated = [...localData.skills];
        updated[index] = value;
        updateLocalState('skills', updated);
    };

    const deleteSkill = (index) => {
        updateLocalState('skills', localData.skills.filter((_, i) => i !== index));
    };

    // Goodreads
    const addGoodreads = () => {
        const newItem = {
            id: generateId(),
            title: "New Item",
            url: "",
            type: "article",
            date: "January'26",
            tags: ["AI"],
            author: ""
        };
        const updatedGoodreads = Array.isArray(localData.goodreads) ? localData.goodreads : [];
        updateLocalState('goodreads', [newItem, ...updatedGoodreads]);
    };

    const updateGoodreads = (id, field, value) => {
        const updated = localData.goodreads.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        );
        updateLocalState('goodreads', updated);
    };

    const deleteGoodreads = (id) => {
        updateLocalState('goodreads', localData.goodreads.filter(item => item.id !== id));
    };

    const cleanUrl = (urlStr) => {
        try {
            const url = new URL(urlStr);
            url.search = ''; // removes query parameters often used for tracking
            return url.toString();
        } catch {
            return urlStr;
        }
    };

    const handleDateChange = (id, yyyyMm) => {
        if (!yyyyMm) {
            updateGoodreads(id, 'date', "");
            return;
        }

        if (yyyyMm.includes('-')) {
            const [year, month] = yyyyMm.split('-');
            const monthNum = parseInt(month, 10);
            if (!isNaN(monthNum) && monthNum >= 1 && monthNum <= 12 && year.length >= 2) {
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                const monthName = months[monthNum - 1];
                const shortYear = year.slice(-2);
                updateGoodreads(id, 'date', `${monthName}'${shortYear}`);
                return;
            }
        }

        // Fallback if browser doesn't send valid YYYY-MM
        updateGoodreads(id, 'date', yyyyMm);
    };

    const getYYYYMM = (dateStr) => {
        if (!dateStr || typeof dateStr !== 'string') return "";
        if (!dateStr.includes("'")) return dateStr; // if it's fallback raw typing

        const [monthName, shortYear] = dateStr.split("'");
        if (!monthName || !shortYear) return dateStr;

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthIndex = months.findIndex(m => m.toLowerCase().startsWith(monthName.toLowerCase()));
        if (monthIndex === -1) return dateStr;

        const year = "20" + shortYear;
        const month = String(monthIndex + 1).padStart(2, '0');
        return `${year}-${month}`;
    };

    // Contact
    const updateContact = (field, value) => {
        updateLocalState('contact', { ...localData.contact, [field]: value });
    };

    // The resume is stored as a string URL in the database.
    const updateResumeUrl = (url) => {
        updateLocalState('hero', { ...localData.hero, resumeUrl: url });
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">

            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-muted border-r border-border p-6 flex flex-col fixed md:relative z-20 h-full">
                <h1 className="text-xl font-bold mb-8 flex items-center gap-2">
                    Admin Panel
                    {hasUnsavedChanges && <span className="w-2 h-2 rounded-full bg-yellow-500" title="Unsaved changes"></span>}
                </h1>

                <nav className="flex-1 space-y-2">
                    {['experience', 'projects', 'skills', 'contact', 'resume', 'goodreads'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`w-full text-left px-4 py-3 rounded-lg capitalize transition-colors ${activeTab === tab ? 'bg-brand text-white' : 'hover:bg-muted/80'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 mt-auto text-red-500 hover:text-red-400 font-medium px-4 py-3"
                >
                    <LogOut size={20} /> Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto h-screen ml-0 md:ml-0 pt-20 md:pt-8">
                <div className="max-w-4xl mx-auto pb-20">

                    {/* Global Save Header - Sticky on Desktop */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 sticky top-0 bg-background/95 backdrop-blur z-10 py-4 border-b border-border">
                        <div>
                            <h2 className="text-3xl font-bold capitalize">{activeTab}</h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                {hasUnsavedChanges ? "You have unsaved changes." : "All changes saved."}
                            </p>
                        </div>

                        <button
                            onClick={saveChanges}
                            disabled={!hasUnsavedChanges || isSaving}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold shadow-lg transition-all ${hasUnsavedChanges && !isSaving ?
                                'bg-brand text-white hover:bg-brand-hover hover:scale-105' :
                                'bg-muted text-muted-foreground opacity-50 cursor-not-allowed'
                                }`}
                        >
                            <Save size={20} className={isSaving ? 'animate-spin' : ''} />
                            {isSaving ? 'Publishing...' : 'Publish Changes'}
                        </button>
                    </div>

                    {/* EXPERIENCE TAB */}
                    {activeTab === 'experience' && (
                        <div className="space-y-6">
                            <div className="flex justify-end mb-4">
                                <button onClick={addExperience} className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg border border-border">
                                    <Plus size={18} /> Add Role
                                </button>
                            </div>

                            {localData.experience.map(exp => (
                                <div key={exp.id} className="p-6 bg-card border border-border rounded-xl space-y-4 shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-lg text-brand">Role #{exp.id}</h3>
                                        <button onClick={() => deleteExperience(exp.id)} className="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-red-500/10">
                                            <Trash size={18} />
                                        </button>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-muted-foreground uppercase">Role Title</label>
                                            <input
                                                value={exp.role}
                                                onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                                                className="p-2 bg-muted rounded border border-border w-full focus:ring-2 focus:ring-brand/20 outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-muted-foreground uppercase">Company</label>
                                            <input
                                                value={exp.company}
                                                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                                className="p-2 bg-muted rounded border border-border w-full focus:ring-2 focus:ring-brand/20 outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-muted-foreground uppercase">Timeline</label>
                                            <input
                                                value={exp.period}
                                                onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                                                className="p-2 bg-muted rounded border border-border w-full focus:ring-2 focus:ring-brand/20 outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-muted-foreground uppercase">Tags</label>
                                            <input
                                                value={exp.tags?.join(", ")}
                                                onChange={(e) => updateExperience(exp.id, 'tags', e.target.value.split(",").map(s => s.trim()))}
                                                className="p-2 bg-muted rounded border border-border w-full focus:ring-2 focus:ring-brand/20 outline-none"
                                                placeholder="Strategy, Design, etc."
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-muted-foreground uppercase">Description</label>
                                        <textarea
                                            value={exp.description}
                                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                            className="w-full p-2 bg-muted rounded border border-border h-24 focus:ring-2 focus:ring-brand/20 outline-none resize-none"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* PROJECTS TAB */}
                    {activeTab === 'projects' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center bg-brand/5 p-4 rounded-lg border border-brand/10 mb-6">
                                <div className="flex items-center gap-2">
                                    <AlertCircle size={20} className="text-brand" />
                                    <span className="text-sm">
                                        Selected: <strong>{localData.projects.filter(p => p.selected).length}</strong> / 4 (Max)
                                    </span>
                                </div>
                                <button onClick={addProject} className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-hover">
                                    <Plus size={18} /> Add Project
                                </button>
                            </div>

                            {localData.projects.map(project => (
                                <div key={project.id} className={`p-6 border rounded-xl space-y-4 ${project.selected ? 'bg-brand/5 border-brand ring-1 ring-brand/20' : 'bg-card border-border'}`}>
                                    <div className="flex items-center justify-between pb-4 border-b border-border/50">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded overflow-hidden bg-muted relative group">
                                                <img src={project.img} alt="cover" className="w-full h-full object-cover" />
                                                <label className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Upload size={16} className="text-white" />
                                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleProjectImageUpload(project.id, e)} />
                                                </label>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg">{project.title || 'Untitled Project'}</h3>
                                                <p className="text-xs text-muted-foreground">{project.category}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <label className={`flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-full transition-colors ${project.selected ? 'bg-brand text-white' : 'bg-muted hover:bg-muted/80'}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={project.selected}
                                                    onChange={(e) => updateProject(project.id, 'selected', e.target.checked)}
                                                    className="hidden"
                                                />
                                                <span className="text-sm font-medium">{project.selected ? 'Selected' : 'Select'}</span>
                                            </label>
                                            <button onClick={() => deleteProject(project.id)} className="text-muted-foreground hover:text-red-500 p-2">
                                                <Trash size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-muted-foreground uppercase">Project Title</label>
                                            <input
                                                value={project.title}
                                                onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                                                className="p-2 bg-muted rounded border border-border w-full mobile-input"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-muted-foreground uppercase">Category</label>
                                            <input
                                                value={project.category}
                                                onChange={(e) => updateProject(project.id, 'category', e.target.value)}
                                                className="p-2 bg-muted rounded border border-border w-full mobile-input"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-muted-foreground uppercase">Grid Size</label>
                                            <select
                                                value={project.colSpan}
                                                onChange={(e) => updateProject(project.id, 'colSpan', e.target.value)}
                                                className="p-2 bg-muted rounded border border-border w-full mobile-input"
                                            >
                                                <option value="md:col-span-1">Small (1 Column)</option>
                                                <option value="md:col-span-2">Large (2 Columns)</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-muted-foreground uppercase">Tags / Tech Stack</label>
                                            <input
                                                value={project.tech?.join(", ")}
                                                onChange={(e) => updateProject(project.id, 'tech', e.target.value.split(",").map(t => t.trim()))}
                                                className="p-2 bg-muted rounded border border-border w-full mobile-input"
                                                placeholder="React, Node, etc"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-muted-foreground uppercase">Medium Link (Optional)</label>
                                            <input
                                                value={project.mediumLink || ''}
                                                onChange={(e) => updateProject(project.id, 'mediumLink', e.target.value)}
                                                className="p-2 bg-muted rounded border border-border w-full mobile-input"
                                                placeholder="https://medium.com/@username/story-slug"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-muted-foreground uppercase">Description</label>
                                        <textarea
                                            value={project.description}
                                            onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                                            className="w-full p-2 bg-muted rounded border border-border h-24 resize-none mobile-input"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-muted-foreground uppercase">
                                            Case Study Content (HTML Supported)
                                        </label>
                                        <p className="text-xs text-muted-foreground mb-2">
                                            Rich Word Editor enabled. Copy-paste directly from Google Docs or Word.
                                        </p>
                                        <div className="bg-white text-black rounded-lg overflow-hidden prose-editor">
                                            <ReactQuill
                                                theme="snow"
                                                value={project.caseStudy || ''}
                                                onChange={(value) => updateProject(project.id, 'caseStudy', value)}
                                                modules={quillModules}
                                                formats={quillFormats}
                                                className="h-64"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* SKILLS TAB */}
                    {activeTab === 'skills' && (
                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-3">
                                {localData.skills.map((skill, index) => (
                                    <div key={index} className="flex items-center gap-2 bg-card border border-border px-3 py-2 rounded-lg shadow-sm group hover:border-brand/50 transition-colors">
                                        <input
                                            value={skill}
                                            onChange={(e) => updateSkill(index, e.target.value)}
                                            className="bg-transparent outline-none w-32 text-sm font-medium"
                                        />
                                        <button onClick={() => deleteSkill(index)} className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                                <button onClick={addSkill} className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg border border-border border-dashed">
                                    <Plus size={16} /> New Skill
                                </button>
                            </div>
                        </div>
                    )}

                    {/* CONTACT TAB */}
                    {activeTab === 'contact' && (
                        <div className="space-y-6">
                            <div className="grid gap-6 max-w-xl">
                                {Object.keys(localData.contact).map(key => (
                                    <div key={key} className="space-y-2">
                                        <label className="text-sm font-semibold text-muted-foreground uppercase flex items-center gap-2">
                                            {key}
                                        </label>
                                        <input
                                            value={localData.contact[key]}
                                            onChange={(e) => updateContact(key, e.target.value)}
                                            className="w-full p-3 bg-card rounded-lg border border-border focus:ring-2 focus:ring-brand/20 outline-none"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* RESUME TAB */}
                    {activeTab === 'resume' && (
                        <div className="space-y-6">
                            <div className="p-12 border border-border bg-card rounded-xl flex flex-col items-center justify-center shadow-sm">
                                <div className="w-16 h-16 rounded-full bg-brand/10 text-brand flex items-center justify-center mb-6">
                                    <FileText size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Resume Configuration</h3>
                                <p className="mb-8 text-center text-muted-foreground text-sm max-w-md">
                                    Your resume is stored as a URL link in the database. Paste a link to your hosted PDF (like a Google Drive link, Dropbox, or a file uploaded elsewhere).
                                </p>

                                <div className="w-full max-w-lg space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-muted-foreground uppercase flex items-center gap-2">
                                            Resume URL Link
                                        </label>
                                        <input
                                            value={localData.hero.resumeUrl || ''}
                                            onChange={(e) => updateResumeUrl(e.target.value)}
                                            placeholder="https://drive.google.com/..."
                                            className="w-full p-4 bg-muted rounded-lg border border-border focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                                        />
                                    </div>

                                    {localData.hero.resumeUrl && (
                                        <div className="p-4 bg-brand/5 border border-brand/20 rounded-lg flex items-center justify-between">
                                            <span className="text-sm font-medium">Test current link:</span>
                                            <a
                                                href={localData.hero.resumeUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-brand hover:underline text-sm font-bold flex items-center gap-1"
                                            >
                                                View Live Resume <ArrowUpRight size={14} />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* GOODREADS TAB */}
                    {activeTab === 'goodreads' && (
                        <div className="space-y-6">
                            <div className="flex justify-end mb-4">
                                <button onClick={addGoodreads} className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-hover">
                                    <Plus size={18} /> Add Item
                                </button>
                            </div>

                            {(localData.goodreads || []).map(item => (
                                <div key={item.id} className="p-6 bg-card border border-border rounded-xl space-y-4 shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-lg text-brand">Item #{item.id}</h3>
                                        <button onClick={() => deleteGoodreads(item.id)} className="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-red-500/10">
                                            <Trash size={18} />
                                        </button>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-muted-foreground uppercase">Title</label>
                                            <input
                                                value={item.title}
                                                onChange={(e) => updateGoodreads(item.id, 'title', e.target.value)}
                                                className="p-2 bg-muted rounded border border-border w-full focus:ring-2 focus:ring-brand/20 outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-muted-foreground uppercase">URL</label>
                                            <input
                                                value={item.url}
                                                onChange={(e) => updateGoodreads(item.id, 'url', e.target.value)}
                                                onBlur={(e) => updateGoodreads(item.id, 'url', cleanUrl(e.target.value))}
                                                className="p-2 bg-muted rounded border border-border w-full focus:ring-2 focus:ring-brand/20 outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-muted-foreground uppercase">Type</label>
                                            <select
                                                value={item.type}
                                                onChange={(e) => updateGoodreads(item.id, 'type', e.target.value)}
                                                className="p-2 bg-muted rounded border border-border w-full focus:ring-2 focus:ring-brand/20 outline-none"
                                            >
                                                <option value="article">Article/Blog</option>
                                                <option value="book">Book</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-muted-foreground uppercase">Month'Year</label>
                                            <input
                                                type="month"
                                                value={getYYYYMM(item.date)}
                                                onChange={(e) => handleDateChange(item.id, e.target.value)}
                                                className="p-2 bg-muted rounded border border-border w-full focus:ring-2 focus:ring-brand/20 outline-none"
                                            />
                                            <div className="text-xs text-muted-foreground mt-1">Displays as: {item.date}</div>
                                        </div>
                                        {item.type === 'book' && (
                                            <div className="space-y-1 md:col-span-2">
                                                <label className="text-xs font-semibold text-muted-foreground uppercase">Author</label>
                                                <input
                                                    value={item.author || ""}
                                                    onChange={(e) => updateGoodreads(item.id, 'author', e.target.value)}
                                                    className="p-2 bg-muted rounded border border-border w-full focus:ring-2 focus:ring-brand/20 outline-none"
                                                    placeholder="e.g. Marty Cagan"
                                                />
                                            </div>
                                        )}
                                        <div className="space-y-1 md:col-span-2">
                                            <label className="text-xs font-semibold text-muted-foreground uppercase">Tags (comma separated)</label>
                                            <input
                                                value={item.tags?.join(",") || ""}
                                                onChange={(e) => updateGoodreads(item.id, 'tags', e.target.value.split(","))}
                                                onBlur={(e) => updateGoodreads(item.id, 'tags', (item.tags || []).map(s => s.trim()).filter(Boolean))}
                                                className="p-2 bg-muted rounded border border-border w-full focus:ring-2 focus:ring-brand/20 outline-none"
                                                placeholder="AI, Product Management, etc."
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};

export default Admin;
