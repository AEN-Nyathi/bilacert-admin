-- Drop tables if they exist to apply new schema changes. For development only.
-- This will delete all existing data.
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS blog_posts;

-- Create services table with all fields
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  href TEXT NOT NULL UNIQUE,
  category TEXT,
  description TEXT,
  short_description TEXT,
  icon TEXT,
  order_index INTEGER,
  content TEXT,
  features TEXT[],
  requirements TEXT[],
  includes TEXT[],
  published BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  processing_time TEXT,
  pricing NUMERIC,
  image TEXT,
  thumbnail TEXT,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  image TEXT
);

-- Seed Services Data
-- Note: Seeding only a subset of columns. The rest will have default or NULL values.
INSERT INTO services (title, slug, href, description, short_description, icon, features, pricing, includes, published, category, processing_time) VALUES
(
  'ICASA Type Approvals',
  'icasa-type-approvals',
  '/services/icasa-type-approvals',
  'Comprehensive support for ICASA type approval applications, including Standard, Simplified, Tested, and Untested approvals.',
  'Streamlined approval process for telecommunications and radio frequency devices.',
  'Award',
  ARRAY['Standard Type Approval', 'Simplified Type Approval', 'Tested & Untested Approvals', 'Testing Coordination'],
  2000,
  ARRAY['Full Application Management', 'Documentation Review & Submission', 'Liaison with ICASA', 'Regular Status Updates'],
  TRUE,
  'Compliance',
  '30 Working Days'
),
(
  'NRCS LOA Applications',
  'nrcs-loa-applications',
  '/services/nrcs-loa-applications',
  'Letter of Authority applications for electrical and electronic products requiring NRCS certification.',
  'Letter of Authority applications for electrical and electronic products.',
  'FileText',
  ARRAY['Product Eligibility Assessment', 'Technical Documentation', 'Testing Coordination', 'Renewals & Amendments'],
  6500,
  ARRAY['Technical File Compilation', 'Submission to NRCS', 'Test Report Verification', 'Follow-up and Tracking'],
  TRUE,
  'Certification',
  '120 Days'
),
(
  'Radio Dealer Licensing',
  'radio-dealer-licensing',
  '/services/radio-dealer-licensing',
  'Complete licensing support for businesses selling or distributing radio communication equipment.',
  'Complete licensing support for radio communication equipment dealers.',
  'Headphones',
  ARRAY['Eligibility Assessment', 'Application Preparation', 'ICASA Liaison', 'Ongoing Compliance'],
  3000,
  ARRAY['License Application', 'Business Plan Review', 'Compliance Checklist', 'Annual Renewal Reminders'],
  TRUE,
  'Licensing',
  '30 Days'
),
(
  'Class ECS/ECNS Licensing',
  'class-ecs-ecns-licensing',
  '/services/class-ecs-ecns-licensing',
  'Electronic Communications Service and Network Service licensing for telecom providers.',
  'Electronic Communications Service and Network Service licensing.',
  'Shield',
  ARRAY['ECS License Applications', 'ECNS License Applications', 'Compliance Support', 'Renewals & Updates'],
  7500,
  ARRAY['Service and Network Audits', 'Business Plan Assistance', 'ICASA Application Submission', 'Post-license Support'],
  TRUE,
  'Licensing',
  '30 working Days'
),
(
  'License Exemptions',
  'license-exemptions',
  '/services/license-exemptions',
  'Assessment and application support for businesses that may qualify for ICASA license exemptions.',
  'Determine if your business qualifies for ICASA license exemptions.',
  'Radio',
  ARRAY['Eligibility Verification', 'Compliance Documentation', 'ICASA Confirmation', 'Ongoing Monitoring'],
  6800,
  ARRAY['Business Model Review', 'Legal Framework Check', 'Exemption Justification Report', 'ICASA Correspondence'],
  TRUE,
  'Compliance',
  '30 Days'
),
(
  'Ski Boat VHF Licensing',
  'ski-boat-vhf-licensing',
  '/services/ski-boat-vhf-licensing',
  'VHF radio licensing for marine vessels, including ski boats and recreational watercraft.',
  'VHF radio licensing for ski boats and recreational watercraft.',
  'Ship',
  ARRAY['Vessel Assessment', 'Application Preparation', 'Maritime Compliance', 'Fleet Licensing'],
  1800,
  ARRAY['Radio Equipment Check', 'Operator Certificate Verification', 'License Application & Submission', 'Call Sign Allocation'],
  TRUE,
  'Licensing',
  '30 working Days'
);

-- Seed Blog Posts Data
INSERT INTO blog_posts (title, slug, excerpt, content, category, published, image) VALUES
(
  'Understanding ICASA Type Approval Requirements',
  'icasa-type-approval-requirements',
  'A comprehensive guide to ICASA type approval requirements for South African businesses. Learn about the different types of approvals and how to navigate the process.',
  E'<p>ICASA (Independent Communications Authority of South Africa) type approval is a mandatory certification process for all electronic communication equipment before it can be sold or used in South Africa. This comprehensive guide will help you understand the requirements and navigate the process successfully.</p>\n      \n      <h2>What is ICASA Type Approval?</h2>\n      <p>ICASA type approval ensures that electronic communication devices meet South African regulatory, technical, and safety standards. This includes telecommunications equipment, radio frequency devices, and other electronic communication products.</p>\n      \n      <h2>Types of ICASA Approvals</h2>\n      <h3>Standard Type Approval</h3>\n      <p>Required for most telecommunications and radio frequency devices. This is the most common type of approval and involves comprehensive testing and documentation.</p>\n      \n      <h3>Simplified Type Approval</h3>\n      <p>Available for products that meet specific pre-approved conditions. This streamlined process is faster and less expensive for qualifying products.</p>\n      \n      <h3>Tested & Untested Approvals</h3>\n      <p>We guide clients through the decision-making process, ensuring they select the right approval method based on their product specifications and requirements.</p>\n      \n      <h2>The Application Process</h2>\n      <p>Our team handles the entire application process, from initial assessment to final approval. We ensure all documentation is complete and accurate, minimizing delays and maximizing success rates.</p>\n      \n      <h2>Why Choose Bilacert?</h2>\n      <p>With our expertise and streamlined processes, we typically reduce approval times by 30% compared to industry average, while maintaining a 100% success rate on first-time applications.</p>',
  'ICASA Approvals',
  TRUE,
  '/ICASA.png'
);
