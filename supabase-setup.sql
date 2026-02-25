-- 1. Create Tables
CREATE TABLE IF NOT EXISTS profile (
    id integer PRIMARY KEY DEFAULT 1,
    title text NOT NULL,
    subtitle text NOT NULL,
    resume_url text,
    email text,
    linkedin text,
    github text,
    twitter text
);

CREATE TABLE IF NOT EXISTS experience (
    id text PRIMARY KEY,
    role text NOT NULL,
    company text NOT NULL,
    period text NOT NULL,
    description text NOT NULL,
    tags text[]
);

CREATE TABLE IF NOT EXISTS projects (
    id text PRIMARY KEY,
    title text NOT NULL,
    category text NOT NULL,
    description text NOT NULL,
    tech text[],
    img text,
    col_span text,
    selected boolean DEFAULT true
);

CREATE TABLE IF NOT EXISTS skills (
    name text PRIMARY KEY
);

-- 2. Turn on Row Level Security (RLS) to enforce rules
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- 3. Create Public Read Policies (Allows your React app to fetch data)
BEGIN;
  DROP POLICY IF EXISTS "Public Read Access Profile" ON profile;
  DROP POLICY IF EXISTS "Public Read Access Experience" ON experience;
  DROP POLICY IF EXISTS "Public Read Access Projects" ON projects;
  DROP POLICY IF EXISTS "Public Read Access Skills" ON skills;
  
  CREATE POLICY "Public Read Access Profile" ON profile FOR SELECT USING (true);
  CREATE POLICY "Public Read Access Experience" ON experience FOR SELECT USING (true);
  CREATE POLICY "Public Read Access Projects" ON projects FOR SELECT USING (true);
  CREATE POLICY "Public Read Access Skills" ON skills FOR SELECT USING (true);
COMMIT;


-- 4. Insert Initial Content
INSERT INTO profile (id, title, subtitle, resume_url, email, linkedin, github, twitter)
VALUES (
    1,
    'Building products
that shape the future.',
    'I''m a Product Manager who codes. I utilize my engineering background to bridge the technical gap, translating complex problems into elegant, scalable solutions.',
    '/resume.pdf',
    'hello@prayansh.com',
    'https://linkedin.com',
    'https://github.com',
    'https://twitter.com'
) ON CONFLICT DO NOTHING;

INSERT INTO experience (id, role, company, period, description, tags) VALUES
('E7B2K9', 'Product Manager', 'Current Company', '2023 - Present', 'Leading the product vision and strategy for enterprise solutions. Collaborating with engineering and design teams.', ARRAY['Strategy', 'Roadmapping', 'Agile']),
('M4N1X8', 'Associate Product Manager', 'Previous Tech Co.', '2021 - 2023', 'Managed the full product lifecycle for consumer-facing mobile applications. Increased user retention by 15%.', ARRAY['User Research', 'Data Analysis', 'Mobile']),
('P9Q3R5', 'Software Developer', 'Tech Startup', '2019 - 2021', 'Built scalable web applications using React and Node.js. Transitioned into product management bridging technical constraints.', ARRAY['Full Stack', 'React', 'System Design'])
ON CONFLICT DO NOTHING;

INSERT INTO projects (id, title, category, description, tech, img, col_span, selected) VALUES
('A1B2C3', 'Enterprise Analytics Engine', 'B2B SaaS / AI', 'Architected a real-time analytics engine processing 1M+ events/sec. Reduced query latency by 80% and unlocked new revenue streams via premium insights.', ARRAY['Product Strategy', 'Big Data', 'React'], 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', 'md:col-span-2', true),
('X9Y8Z7', 'Fintech Mobile App', 'Consumer Finance', 'Led the 2.0 redesign focusing on accessibility and trust. Increased user retention by 25% within the first quarter of launch.', ARRAY['Mobile Growth', 'Figma', 'UX Research'], 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop', 'md:col-span-1', true),
('D4E5F6', 'Developer API Portal', 'DevTools', 'Built a developer-first documentation portal and API playground, reducing integration time for partners by 40%.', ARRAY['API Design', 'DX', 'Technical Writing'], 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop', 'md:col-span-1', true),
('G7H8I9', 'Global Supply Chain Ops', 'Internal Tooling', 'Developed an internal dashboard for logistics tracking, saving the operations team 15 hours per week per person.', ARRAY['Operations', 'Dashboard', 'Automation'], 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop', 'md:col-span-2', true)
ON CONFLICT DO NOTHING;

INSERT INTO skills (name) VALUES
('Product Strategy'), ('User Research'), ('Agile & Scrum'), ('A/B Testing'),
('System Design'), ('API Development'), ('React & Node.js'), ('SQL & Analytics'),
('Figma'), ('Jira / Linear'), ('Amplitude'), ('Technical Writing')
ON CONFLICT DO NOTHING;
