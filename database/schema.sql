-- ============================================================
-- Portfolio Database Schema (MySQL)
-- Run with: mysql -u root -p < database/schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS portfolio_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE portfolio_db;

-- admin_users: accounts that can log into /admin
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- profile: the single "about me" record (one row, id = 1)
CREATE TABLE IF NOT EXISTS profile (
  id INT PRIMARY KEY DEFAULT 1,
  full_name VARCHAR(100) NOT NULL,
  title VARCHAR(150) NOT NULL,
  tagline VARCHAR(255),
  bio TEXT,
  location VARCHAR(120),
  email VARCHAR(150),
  phone VARCHAR(30),
  avatar_url VARCHAR(255),
  resume_url VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- skills
CREATE TABLE IF NOT EXISTS skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  category ENUM('Programming Languages','Web Development','Database','Cloud & DevOps','Tools') NOT NULL,
  proficiency ENUM('Learning','Familiar','Proficient','Advanced') DEFAULT 'Familiar',
  icon VARCHAR(60),
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- certifications
CREATE TABLE IF NOT EXISTS certifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  issuer VARCHAR(120) NOT NULL,
  issue_date DATE,
  credential_id VARCHAR(120),
  credential_url VARCHAR(255),
  badge_url VARCHAR(255),
  description TEXT,
  skills_covered VARCHAR(255),
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- education
CREATE TABLE IF NOT EXISTS education (
  id INT AUTO_INCREMENT PRIMARY KEY,
  degree VARCHAR(150) NOT NULL,
  institution VARCHAR(150) NOT NULL,
  start_year VARCHAR(10),
  end_year VARCHAR(10),
  grade VARCHAR(50),
  coursework TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- projects
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  summary VARCHAR(255),
  description TEXT,
  problem_statement TEXT,
  features TEXT,
  tech_stack VARCHAR(255),
  github_url VARCHAR(255),
  demo_url VARCHAR(255),
  image_url VARCHAR(255),
  featured BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- experience
CREATE TABLE IF NOT EXISTS experience (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role VARCHAR(150) NOT NULL,
  organization VARCHAR(150) NOT NULL,
  start_date VARCHAR(30),
  end_date VARCHAR(30),
  description TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- achievements (hackathons, awards, workshops, events)
CREATE TABLE IF NOT EXISTS achievements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  category ENUM('Hackathon','Award','Workshop','Event','Other') DEFAULT 'Other',
  date_achieved DATE,
  description TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- social_links
CREATE TABLE IF NOT EXISTS social_links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  platform VARCHAR(50) NOT NULL,
  url VARCHAR(255) NOT NULL,
  display_order INT DEFAULT 0
);

-- contact_messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  subject VARCHAR(200),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
