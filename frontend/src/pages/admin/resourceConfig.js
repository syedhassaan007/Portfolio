// Describes the editable fields for each resource so ResourceManager can
// render a generic table + form for all of them instead of duplicating
// near-identical CRUD screens seven times.
export const RESOURCES = {
  skills: {
    label: 'Skills',
    titleField: 'name',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      {
        name: 'category', label: 'Category', type: 'select', required: true,
        options: ['Programming Languages', 'Web Development', 'Database', 'Cloud & DevOps', 'Tools'],
      },
      {
        name: 'proficiency', label: 'Proficiency', type: 'select',
        options: ['Learning', 'Familiar', 'Proficient', 'Advanced'],
      },
      { name: 'icon', label: 'Icon slug (optional)', type: 'text' },
      { name: 'display_order', label: 'Order', type: 'number' },
    ],
  },
  certifications: {
    label: 'Certifications',
    titleField: 'name',
    fields: [
      { name: 'name', label: 'Certification name', type: 'text', required: true },
      { name: 'issuer', label: 'Issuing organization', type: 'text', required: true },
      { name: 'issue_date', label: 'Issue date', type: 'date' },
      { name: 'credential_id', label: 'Credential ID', type: 'text' },
      { name: 'credential_url', label: 'Credential URL', type: 'text' },
      { name: 'badge_url', label: 'Badge image URL', type: 'text' },
      { name: 'skills_covered', label: 'Skills covered', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'display_order', label: 'Order', type: 'number' },
    ],
  },
  education: {
    label: 'Education',
    titleField: 'degree',
    fields: [
      { name: 'degree', label: 'Degree', type: 'text', required: true },
      { name: 'institution', label: 'Institution', type: 'text', required: true },
      { name: 'start_year', label: 'Start year', type: 'text' },
      { name: 'end_year', label: 'End year', type: 'text' },
      { name: 'grade', label: 'CGPA / percentage', type: 'text' },
      { name: 'coursework', label: 'Relevant coursework', type: 'textarea' },
      { name: 'display_order', label: 'Order', type: 'number' },
    ],
  },
  projects: {
    label: 'Projects',
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'summary', label: 'One-line summary', type: 'text' },
      { name: 'description', label: 'Full description', type: 'textarea' },
      { name: 'problem_statement', label: 'Problem statement', type: 'textarea' },
      { name: 'features', label: 'Features (one per line)', type: 'textarea' },
      { name: 'tech_stack', label: 'Tech stack (comma separated)', type: 'text' },
      { name: 'github_url', label: 'GitHub URL', type: 'text' },
      { name: 'demo_url', label: 'Live demo URL', type: 'text' },
      { name: 'image_url', label: 'Image URL', type: 'text' },
      { name: 'featured', label: 'Featured', type: 'checkbox' },
      { name: 'display_order', label: 'Order', type: 'number' },
    ],
  },
  experience: {
    label: 'Experience',
    titleField: 'role',
    fields: [
      { name: 'role', label: 'Role', type: 'text', required: true },
      { name: 'organization', label: 'Organization', type: 'text', required: true },
      { name: 'start_date', label: 'Start date', type: 'text' },
      { name: 'end_date', label: 'End date (blank = present)', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'display_order', label: 'Order', type: 'number' },
    ],
  },
  achievements: {
    label: 'Achievements',
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      {
        name: 'category', label: 'Category', type: 'select',
        options: ['Hackathon', 'Award', 'Workshop', 'Event', 'Other'],
      },
      { name: 'date_achieved', label: 'Date', type: 'date' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'display_order', label: 'Order', type: 'number' },
    ],
  },
  'social-links': {
    label: 'Social links',
    titleField: 'platform',
    fields: [
      { name: 'platform', label: 'Platform', type: 'text', required: true },
      { name: 'url', label: 'URL', type: 'text', required: true },
      { name: 'display_order', label: 'Order', type: 'number' },
    ],
  },
};
