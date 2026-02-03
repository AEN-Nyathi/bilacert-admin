
-- Drop tables in reverse order of dependency to avoid foreign key constraint issues
DROP TABLE IF EXISTS "services" CASCADE;
DROP TABLE IF EXISTS "blog_posts" CASCADE;
DROP TABLE IF EXISTS "testimonials" CASCADE;

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  href TEXT NOT NULL UNIQUE,
  category TEXT,
  description TEXT,
  short_description TEXT,
  icon TEXT,
  order_index INT,
  content TEXT,
  features TEXT[],
  requirements TEXT[],
  includes TEXT[],
  published BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processing_time TEXT,
  pricing NUMERIC,
  image TEXT,
  thumbnail TEXT,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  pricing_plans JSONB,
  process_steps JSONB,
  success_story JSONB
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    author TEXT,
    read_time TEXT,
    category TEXT,
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now(),
    image TEXT
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- Seed Services Data
-- Data is derived from the bilacert.xml and services-config.ts to match the application's structure.

INSERT INTO services (
  title, slug, href, category, description, short_description, icon, published, featured, processing_time, pricing, image, seo_title, seo_description, seo_keywords, features, requirements, includes, content, pricing_plans, process_steps, success_story
) VALUES
(
  'ICASA Type Approvals',
  'icasa-type-approvals',
  '/services/icasa-type-approvals',
  'Compliance',
  'Expert guidance for ICASA type approval applications. We handle Standard, Simplified, Tested, and Untested approvals with a proven track record of success.',
  'Streamlined approval process for telecommunications and radio frequency devices.',
  'Award',
  TRUE,
  TRUE,
  '30 Working Days',
  4500,
  '/herosetion/Type-Approval.jpg',
  'ICASA Type Approvals',
  'Expert ICASA type approval services for South African businesses. We handle Standard, Simplified, Tested, and Untested approvals with fast processing and comprehensive support.',
  'ICASA type approval, ICASA certification, telecommunications approval, radio frequency approval, electronic device approval, ICASA compliance, type approval South Africa, ICASA testing',
  ARRAY['All telecommunications equipment', 'Radio frequency devices', 'Electronic communication products'],
  ARRAY['Completed application form', 'Technical documentation and specifications', 'Test reports from an accredited laboratory', 'Company registration documents'],
  ARRAY['Application filing','Documentation review','Regulatory liaison'],
  'ICASA (Independent Communications Authority of South Africa) requires all electronic communication equipment to be type-approved before being sold or used in South Africa. This ensures devices meet regulatory, technical, and safety standards. Our team simplifies this complex process, handling all documentation, testing coordination, and regulatory communications to ensure your products reach the market quickly and compliantly.',
  '[
    { "title": "Standard", "description": "For new equipment", "features": ["Comprehensive testing", "Full documentation", "Compliance review"], "price": "R5,000", "popular": false },
    { "title": "Simplified", "description": "For pre-approved equipment", "features": ["Streamlined process", "Reduced documentation", "Faster approval"], "price": "R4,500", "popular": true },
    { "title": "Tested & Untested", "description": "Guidance on the best path", "features": ["Expert guidance", "Risk assessment", "Optimal pathway selection"], "price": "R4,500", "popular": false }
  ]',
  '[
    { "step": "1", "title": "Pre-Assessment", "description": "We evaluate your product and determine the most efficient approval pathway." },
    { "step": "2", "title": "Documentation", "description": "We compile and review all required documentation for accuracy and completeness." },
    { "step": "3", "title": "Testing Coordination", "description": "We arrange laboratory testing with accredited facilities when required." },
    { "step": "4", "title": "Submission", "description": "We submit your application to ICASA and manage all communications." },
    { "step": "5", "title": "Approval", "description": "We track progress and ensure timely approval of your certification." }
  ]',
  '{
    "scenario": "A technology company wanted to import a new range of wireless routers into South Africa.",
    "challenge": "They needed ICASA type approval but were unfamiliar with the regulatory requirements and documentation process.",
    "solution": "Bilacert managed their ICASA type approval application from start to finish, ensuring compliance and timely market entry.",
    "result": "The company received approval 30% faster than industry average, allowing them to launch their products on schedule and capture market opportunities."
  }'
),
(
  'NRCS LOA Applications',
  'nrcs-loa-applications',
  '/services/nrcs-loa-applications',
  'Compliance',
  'Letter of Authority applications for electrical and electronic products requiring NRCS certification.',
  'Expert guidance for NRCS LOA applications, ensuring your products meet South African safety and quality standards.',
  'FileText',
  TRUE,
  FALSE,
  '120 Days',
  7000,
  '/NRCS.jpg',
  'NRCS LOA Applications',
  'Professional NRCS Letter of Authority (LOA) application services for South African businesses. Expert guidance for electrical and electronic product compliance.',
  'NRCS LOA, NRCS Letter of Authority, NRCS certification, electrical product approval, electronic product compliance, NRCS South Africa, LOA application, NRCS testing',
  ARRAY['Electrical and electronic products', 'Safety and quality standards compliance', 'Mandatory before importation or sale'],
  ARRAY['Completed application form', 'Valid test reports (not older than 3 years)', 'Product samples (if required)', 'Proof of payment of application fees'],
  ARRAY['Product eligibility assessment', 'Technical documentation preparation', 'Testing coordination', 'Renewals and amendments'],
  'The National Regulator for Compulsory Specifications (NRCS) mandates that certain electrical and electronic products must receive a Letter of Authority (LOA) before entering the South African market. This certification ensures products meet South African safety and quality standards. Our team streamlines the NRCS LOA application process, ensuring businesses obtain approvals efficiently while staying fully compliant with regulatory requirements.',
  '[
    { "title": "Basic", "description": "Eligibility Assessment & Document Review", "features": ["Product eligibility assessment", "Document review", "Basic guidance"], "price": "R3,500", "popular": false },
    { "title": "Standard", "description": "Full Application Submission & NRCS Liaison", "features": ["Full documentation preparation", "NRCS submission", "Liaison & tracking", "Testing coordination"], "price": "R7,000", "popular": true },
    { "title": "Premium", "description": "End-to-End Approval & Compliance Support", "features": ["Complete end-to-end service", "Testing coordination", "Ongoing compliance support", "Priority processing"], "price": "R10,500", "popular": false }
  ]',
  '[
    { "step": "1", "title": "Consultation & Product Review", "description": "We assess your product''''s technical specifications and determine LOA requirements." },
    { "step": "2", "title": "Documentation & Compliance Check", "description": "We compile and verify all necessary compliance documents before submission." },
    { "step": "3", "title": "Submission & NRCS Liaison", "description": "Bilacert submits the application and manages all communication with NRCS." },
    { "step": "4", "title": "Testing (If Required)", "description": "For products needing laboratory testing, we coordinate with accredited testing facilities." },
    { "step": "5", "title": "Approval & Certification", "description": "Once approved, we deliver your NRCS LOA certificate and provide ongoing compliance support." }
  ]',
  '{
    "scenario": "An electronics importer wanted to bring in a new range of LED lighting products but was unaware of NRCS LOA requirements.",
    "challenge": "They needed an LOA but lacked the technical knowledge and documentation required for NRCS compliance.",
    "solution": "Bilacert confirmed the LOA requirement, handled their submission, and ensured a smooth approval process.",
    "result": "The company received their NRCS LOA efficiently, allowing them to import and sell their LED products legally in South Africa without delays."
  }'
),
(
  'Radio Dealer Licensing',
  'radio-dealer-licensing',
  '/services/radio-dealer-licensing',
  'Licensing',
  'Complete licensing support for businesses selling or distributing radio communication equipment.',
  'We simplify the process of obtaining an ICASA Radio Dealer License, ensuring your business stays compliant.',
  'Headphones',
  TRUE,
  FALSE,
  '30 Days',
  3000,
  '/herosetion/Radio-Dealer.jpg',
  'Radio Dealer Licensing',
  'Complete Radio Dealer License services for South African businesses selling radio communication equipment. Expert ICASA licensing support and compliance guidance.',
  'radio dealer license, ICASA radio license, radio communication license, two-way radio license, radio equipment dealer, ICASA dealer license, radio licensing South Africa, communication equipment license',
  ARRAY['Required for radio equipment sales', 'Issued by ICASA', 'Mandatory for legal trading'],
  ARRAY['Business registration documents', 'Tax clearance certificate', 'Proof of address', 'Description of equipment to be sold'],
  ARRAY['Eligibility Assessment', 'Application Preparation', 'ICASA Liaison', 'Ongoing Compliance'],
  'Any business that sells, distributes, or supplies radio communication equipment in South Africa must hold a valid Radio Dealer License issued by ICASA. Without this license, trading in such equipment is illegal and can result in hefty fines or business disruptions. We simplify the licensing process, ensuring your business remains compliant while you focus on growth.',
  '[
    { "title": "Basic", "description": "Consultation & Application Review", "features": ["Eligibility assessment", "Application review", "Basic guidance"], "price": "R1,000", "popular": false },
    { "title": "Standard", "description": "Full Documentation Submission & Liaison", "features": ["Full documentation preparation", "ICASA submission", "Liaison & tracking", "Application management"], "price": "R3,000", "popular": true },
    { "title": "Premium", "description": "End-to-End Approval & Ongoing Support", "features": ["Complete end-to-end service", "Ongoing compliance support", "Priority processing", "Renewal management"], "price": "R4,000", "popular": false }
  ]',
  '[
    { "step": "1", "title": "Consultation & Eligibility Check", "description": "We assess whether your business requires a Radio Dealer License and identify necessary documentation." },
    { "step": "2", "title": "Application Preparation", "description": "Our experts compile, review, and prepare all required documents for complete and accurate submission." },
    { "step": "3", "title": "Submission & ICASA Liaison", "description": "We submit the application and manage all interactions with ICASA to streamline the approval process." },
    { "step": "4", "title": "License Approval & Issuance", "description": "Once approved, we ensure you receive your official Radio Dealer License." },
    { "step": "5", "title": "Post-License Compliance", "description": "We provide ongoing support for license renewals, amendments, and regulatory compliance updates." }
  ]',
  '{
    "scenario": "A two-way radio distributor was unaware of the ICASA licensing requirements and faced operational risks.",
    "challenge": "They needed a Radio Dealer License urgently to avoid business disruption and legal penalties.",
    "solution": "Bilacert swiftly secured their Radio Dealer License, ensuring they could continue trading legally.",
    "result": "The distributor now operates without disruptions, maintaining full compliance with ICASA regulations and avoiding costly penalties."
  }'
),
(
  'Class ECS/ECNS Licensing',
  'class-ecs-ecns-licensing',
  '/services/class-ecs-ecns-licensing',
  'Licensing',
  'Electronic Communications Service and Network Service licensing for telecom providers.',
  'Expert guidance for Class Electronic Communications Service (ECS) and Electronic Communications Network Service (ECNS) licensing.',
  'Shield',
  TRUE,
  FALSE,
  '30 working Days',
  7500,
  '/class-ens-ecns.jpg',
  'Class ECS/ECNS Licensing',
  'Professional ECS and ECNS licensing services for South African telecommunications providers. Expert guidance for Electronic Communications Service and Network Service licenses.',
  'ECS license, ECNS license, electronic communications service, electronic communications network service, telecommunications license, ICASA ECS ECNS, VoIP license, network service license',
  ARRAY['Required for electronic communication services', 'Issued by ICASA', 'Essential for legal operations'],
  ARRAY['Business plan', 'Technical plan', 'Financial statements', 'B-BBEE certificate'],
  ARRAY['Eligibility Assessment', 'Application Preparation', 'ICASA Liaison', 'Ongoing Compliance'],
  'Businesses providing electronic communications services or network infrastructure may require a Class Electronic Communications Service (ECS) or Electronic Communications Network Service (ECNS) license from ICASA. Without the appropriate license, your operations could be at risk of non-compliance, fines, or shutdowns. We simplify the licensing process, ensuring your business remains compliant while you focus on innovation and growth.',
  '[
    { "title": "Basic", "description": "Consultation & Application Review", "features": ["Eligibility assessment", "Application review", "Basic guidance"], "price": "R3,000", "popular": false },
    { "title": "Standard", "description": "Full Documentation Submission & Liaison", "features": ["Full documentation preparation", "ICASA submission", "Liaison & tracking", "Application management"], "price": "R7,500", "popular": true },
    { "title": "Premium", "description": "End-to-End Approval & Ongoing Support", "features": ["Complete end-to-end service", "Ongoing compliance support", "Priority processing", "Renewal management"], "price": "R9,500", "popular": false }
  ]',
  '[
    { "step": "1", "title": "Consultation & Eligibility Check", "description": "We assess whether your business requires a Class ECS or ECNS license and identify necessary documentation." },
    { "step": "2", "title": "Application Preparation", "description": "Our experts compile, review, and prepare all required documents for complete and accurate submission." },
    { "step": "3", "title": "Submission & ICASA Liaison", "description": "We submit the application and manage all interactions with ICASA to streamline the approval process." },
    { "step": "4", "title": "License Approval & Issuance", "description": "Once approved, we ensure you receive your official ICASA license." },
    { "step": "5", "title": "Post-License Compliance", "description": "We provide ongoing support for license renewals, amendments, and regulatory compliance updates." }
  ]',
  '{
    "scenario": "A startup launching a VoIP communication platform needed an ECS license to operate legally.",
    "challenge": "They were unfamiliar with ICASA''''s licensing requirements and needed guidance on the application process.",
    "solution": "Bilacert assessed their needs, filed their application, and ensured they met ICASA''''s operational requirements.",
    "result": "The startup received their ECS license efficiently, allowing them to launch their VoIP platform legally and focus on growing their business."
  }'
),
(
  'License Exemptions',
  'license-exemptions',
  '/services/license-exemptions',
  'Compliance',
  'Assessment and application support for businesses that may qualify for ICASA license exemptions.',
  'We help determine if your business qualifies for ECS/ECNS license exemptions and provide compliance documentation.',
  'Radio',
  TRUE,
  FALSE,
  '30 working Days',
  6800,
  '/ecs-ecns-licensing-explained.jpg',
  'License Exemptions',
  'Expert ECS/ECNS license exemption services for South African businesses. We help determine if your business qualifies for ICASA license exemptions and provide compliance documentation.',
  'license exemption, ECS exemption, ECNS exemption, ICASA exemption, license exemption South Africa, exemption verification, compliance exemption, regulatory exemption',
  ARRAY['Available for specific business models', 'Under ICASA''s exemption list', 'Avoids full licensing process'],
  ARRAY['Detailed business model description', 'Network diagrams (if applicable)', 'Service level agreements'],
  ARRAY['Eligibility Verification', 'Compliance Documentation', 'ICASA Confirmation', 'Ongoing Monitoring'],
  'Not all businesses providing electronic communications services or infrastructure require an ICASA ECS or ECNS license. Some may qualify for an ICASA License Exemption, allowing them to operate legally without the need for a full licensing process. However, determining whether your business qualifies for an exemption can be complex. We simplify the process, ensuring you have the right exemption in place to avoid unnecessary costs and compliance risks.',
  '[
    { "title": "Basic", "description": "Eligibility Assessment", "features": ["Business model assessment", "Exemption verification", "Basic guidance"], "price": "R2,500", "popular": false },
    { "title": "Standard", "description": "Full Documentation & ICASA Confirmation", "features": ["Full documentation preparation", "ICASA confirmation", "Compliance documentation", "Verification process"], "price": "R6,800", "popular": true },
    { "title": "Premium", "description": "End-to-End Exemption Processing", "features": ["Complete end-to-end service", "Ongoing compliance support", "Priority processing", "Annual compliance review"], "price": "R8,000", "popular": false }
  ]',
  '[
    { "step": "1", "title": "Consultation & Business Model Assessment", "description": "We review your business model to determine if an ECS/ECNS exemption applies." },
    { "step": "2", "title": "Documentation & Compliance Review", "description": "We compile the necessary paperwork to support your exemption claim." },
    { "step": "3", "title": "ICASA Confirmation (If Required)", "description": "For certain cases, we submit a request to ICASA for official exemption confirmation." },
    { "step": "4", "title": "Exemption Approval & Compliance Assurance", "description": "Once verified, we provide you with the necessary documentation to prove your exemption status." },
    { "step": "5", "title": "Ongoing Compliance Monitoring", "description": "We track regulatory changes to ensure your exemption remains valid and your business stays compliant." }
  ]',
  '{
    "scenario": "A software company offering cloud-based VoIP services assumed they needed an ECS license.",
    "challenge": "They were unsure about their licensing requirements and wanted to avoid unnecessary costs and regulatory hurdles.",
    "solution": "Bilacert assessed their operations and confirmed they qualified for an exemption, saving them licensing costs.",
    "result": "The company now operates legally under an exemption, avoiding unnecessary licensing fees while maintaining full compliance with ICASA regulations."
  }'
),
(
  'Ski Boat VHF Licensing',
  'ski-boat-vhf-licensing',
  '/services/ski-boat-vhf-licensing',
  'Licensing',
  'VHF radio licensing for marine vessels, including ski boats and recreational watercraft.',
  'Professional VHF radio licensing services for South African marine vessels including ski boats, yachts, and recreational watercraft.',
  'Ship',
  TRUE,
  FALSE,
  '30 working Days',
  3000,
  '/herosetion/Ski-Boat-VHF.jpg',
  'Ski Boat VHF Licensing',
  'Professional VHF radio licensing services for South African marine vessels including ski boats, yachts, and recreational watercraft. Expert ICASA maritime compliance support.',
  'VHF radio license, ski boat VHF, marine radio license, boat VHF license, yacht radio license, maritime radio license, ICASA VHF license, marine communication license',
  ARRAY['Required for marine VHF radio communication', 'Issued by ICASA', 'Essential for safe maritime operations'],
  ARRAY['Vessel registration documents', 'Radio operator certificate of competence', 'Radio equipment details'],
  ARRAY['Vessel Assessment', 'Application Preparation', 'Maritime Compliance', 'Fleet Licensing'],
  'In South Africa, ski boats and other vessels using VHF radios for marine communication are required to have a valid VHF Radio License from ICASA. This ensures that all maritime radio communication remains safe, legal, and interference-free. We simplify the process of obtaining your Ski Boat VHF License, ensuring compliance with ICASA regulations while allowing you to focus on your boating experience.',
  '[
    { "title": "Basic", "description": "Consultation & Application Review", "features": ["Vessel assessment", "Application review", "Basic guidance"], "price": "R1,800", "popular": false },
    { "title": "Standard", "description": "Full Documentation Submission & Liaison", "features": ["Full documentation preparation", "ICASA submission", "Liaison & tracking", "Application management"], "price": "R3,000", "popular": true },
    { "title": "Premium", "description": "End-to-End Approval & Ongoing Support", "features": ["Complete end-to-end service", "Ongoing compliance support", "Priority processing", "Fleet licensing"], "price": "R4,500", "popular": false }
  ]',
  '[
    { "step": "1", "title": "Consultation & Eligibility Check", "description": "We assess whether your ski boat or vessel requires a VHF license and identify necessary documentation." },
    { "step": "2", "title": "Application Preparation", "description": "Our experts compile, review, and prepare all required documents for complete and accurate submission." },
    { "step": "3", "title": "Submission & ICASA Liaison", "description": "We submit the application and manage all interactions with ICASA to streamline the approval process." },
    { "step": "4", "title": "License Approval & Issuance", "description": "Once approved, we ensure you receive your official ICASA VHF Radio License." },
    { "step": "5", "title": "Post-License Compliance", "description": "We provide ongoing support for license renewals, amendments, and regulatory compliance updates." }
  ]',
  '{
    "scenario": "A fishing charter company needed multiple VHF licenses for its fleet of boats.",
    "challenge": "They needed to ensure all vessels were legally compliant before peak season and were unfamiliar with the licensing process.",
    "solution": "Bilacert managed the entire process, ensuring all vessels were legally compliant with maritime regulations.",
    "result": "The charter company received all their VHF licenses efficiently, allowing them to operate legally during peak season without any compliance issues."
  }'
);


-- Seed Blog Posts Data
INSERT INTO blog_posts (slug, title, excerpt, content, category, published, image, author, read_time) VALUES
(
  'icasa-type-approval-requirements',
  'Understanding ICASA Type Approval Requirements',
  'A comprehensive guide to ICASA type approval requirements for South African businesses.',
  '<p>ICASA (Independent Communications Authority of South Africa) type approval is a mandatory certification process...</p>',
  'ICASA Approvals',
  TRUE,
  '/ICASA.png',
  'Bilacert Team',
  '5 min read'
),
(
  'nrcs-loa-guide',
  'NRCS LOA: What You Need to Know',
  'Everything you need to know about NRCS Letter of Authority applications.',
  '<p>The National Regulator for Compulsory Specifications (NRCS) Letter of Authority (LOA) is a critical certification...</p>',
  'NRCS Compliance',
  TRUE,
  '/NRCS.jpg',
  'Bilacert Team',
  '7 min read'
),
(
  'radio-dealer-licensing-guide',
  'Radio Dealer Licensing Made Simple',
  'Step-by-step guide to obtaining your Radio Dealer License from ICASA.',
  '<p>Operating as a radio dealer in South Africa requires proper licensing from ICASA...</p>',
  'Licensing',
  TRUE,
  '/radio-dealer-licensing-guide.jpg',
  'Bilacert Team',
  '6 min read'
);


-- Seed Testimonials Data
INSERT INTO testimonials (post_url) VALUES
('https://web.facebook.com/abram.nyathi.1/posts/pfbid02ko48NxyJV74fPKgKewogGyFURoAgsCKjp2gMB1suARU72Qm9g59SpxzHbe9fYxadl');
