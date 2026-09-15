-- ============================================================
-- Seed data.
-- Real content comes from the "About Me" write-ups provided.
-- Anything not provided is inserted as a clearly labeled
-- placeholder in ALL_CAPS_WITH_BRACKETS so it's easy to find
-- and replace later (via the admin panel or directly here).
-- Run with: mysql -u root -p portfolio_db < database/seed.sql
-- ============================================================

USE portfolio_db;

-- ---------- profile ----------
INSERT INTO profile (id, full_name, title, tagline, bio, location, email, avatar_url, resume_url)
VALUES (
  1,
  'Syed Hassan',
  'Computer Science Engineering Student',
  'Building impactful software and exploring cloud technologies.',
  'I\'m Syed Hassan, a Computer Science Engineering student passionate about building impactful software and exploring cloud technologies. With a growing foundation in Python, Java, JavaScript, SQL, web development, and AWS, I enjoy turning ideas into practical, scalable solutions. I\'m constantly improving my problem-solving and full-stack development skills through hands-on projects, while staying curious about emerging technologies and real-world applications. My goal is to grow as a versatile software engineer who can build, learn, and deliver technology that creates meaningful value.',
  '[YOUR_CITY_COUNTRY]',
  '[YOUR_EMAIL@EXAMPLE.COM]',
  '/uploads/avatar-placeholder.png',
  '/uploads/resume-placeholder.pdf'
)
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name);

-- ---------- skills ----------
INSERT INTO skills (name, category, proficiency, icon, display_order) VALUES
('Python', 'Programming Languages', 'Proficient', 'python', 1),
('Java', 'Programming Languages', 'Proficient', 'java', 2),
('JavaScript', 'Programming Languages', 'Proficient', 'javascript', 3),
('HTML', 'Web Development', 'Proficient', 'html5', 1),
('CSS', 'Web Development', 'Proficient', 'css3', 2),
('React.js', 'Web Development', 'Familiar', 'react', 3),
('Node.js', 'Web Development', 'Familiar', 'nodedotjs', 4),
('Express.js', 'Web Development', 'Familiar', 'express', 5),
('SQL', 'Database', 'Proficient', 'mysql', 1),
('MySQL', 'Database', 'Proficient', 'mysql', 2),
('MongoDB', 'Database', 'Learning', 'mongodb', 3),
('AWS', 'Cloud & DevOps', 'Familiar', 'amazonaws', 1),
('Git', 'Tools', 'Proficient', 'git', 1),
('GitHub', 'Tools', 'Proficient', 'github', 2);

-- ---------- education (placeholder — replace with real details) ----------
INSERT INTO education (degree, institution, start_year, end_year, grade, coursework, display_order) VALUES
('B.E. / B.Tech in Computer Science Engineering', '[YOUR_COLLEGE_UNIVERSITY_NAME]', '[START_YEAR]', '[END_YEAR]', '[YOUR_CGPA_OR_PERCENTAGE]', 'Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Networks, Cloud Computing', 1);

-- ---------- projects (placeholders — replace with real projects) ----------
INSERT INTO projects (title, summary, description, problem_statement, features, tech_stack, github_url, demo_url, image_url, featured, display_order) VALUES
('[YOUR_PROJECT_1_NAME]', '[One-line summary of what this project does]', '[Full description of the project — replace with real content]', '[What problem does this project solve?]', '[Feature 1]\n[Feature 2]\n[Feature 3]', 'React, Node.js, MySQL', '[YOUR_GITHUB_REPO_URL]', '[YOUR_LIVE_DEMO_URL]', '/uploads/project-placeholder-1.png', TRUE, 1),
('[YOUR_PROJECT_2_NAME]', '[One-line summary of what this project does]', '[Full description of the project — replace with real content]', '[What problem does this project solve?]', '[Feature 1]\n[Feature 2]', 'Python, AWS', '[YOUR_GITHUB_REPO_URL]', '[YOUR_LIVE_DEMO_URL]', '/uploads/project-placeholder-2.png', TRUE, 2);

-- ---------- certifications (placeholder — replace with real certs, e.g. from AWS) ----------
INSERT INTO certifications (name, issuer, issue_date, credential_id, credential_url, badge_url, description, skills_covered, display_order) VALUES
('[YOUR_CERTIFICATION_NAME e.g. AWS Certified Cloud Practitioner]', '[ISSUING_ORGANIZATION e.g. Amazon Web Services]', NULL, '[CREDENTIAL_ID]', '[CREDENTIAL_VERIFY_URL]', '/uploads/badge-placeholder.png', '[Short description of what this certification covers]', 'AWS, Cloud Computing', 1);

-- ---------- experience (only shown when populated) ----------
-- No confirmed experience yet — leave empty until provided.

-- ---------- achievements (only shown when populated) ----------
-- No confirmed achievements yet — leave empty until provided.

-- ---------- social links ----------
INSERT INTO social_links (platform, url, display_order) VALUES
('GitHub', '[YOUR_GITHUB_URL]', 1),
('LinkedIn', '[YOUR_LINKEDIN_URL]', 2),
('Email', 'mailto:[YOUR_EMAIL@EXAMPLE.COM]', 3);
