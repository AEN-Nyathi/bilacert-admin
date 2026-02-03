-- Drop existing tables to start fresh
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;

-- Create services table with all fields including JSONB for structured data
CREATE TABLE services (
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
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
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
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  author TEXT,
  read_time TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  image TEXT
);

-- Create testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Services Data

-- 1. ICASA Type Approvals
INSERT INTO services (title, slug, href, category, description, short_description, icon, content, features, requirements, includes, published, featured, processing_time, pricing, image, thumbnail, seo_title, seo_description, seo_keywords, pricing_plans, process_steps, success_story)
VALUES (
  'ICASA Type Approvals',
  'icasa-type-approvals',
  '/services/icasa-type-approvals',
  'Compliance',
  'Expert guidance for ICASA type approval applications. We handle Standard, Simplified, Tested, and Untested approvals with a proven track record of success.',
  'Streamlined approval process for telecommunications and radio frequency devices.',
  'Award',
  'ICASA (Independent Communications Authority of South Africa) requires all electronic communication equipment to be type-approved before being sold or used in South Africa. This ensures devices meet regulatory, technical, and safety standards.\nOur team simplifies this complex process, handling all documentation, testing coordination, and regulatory communications to ensure your products reach the market quickly and compliantly.',
  ARRAY['All telecommunications equipment', 'Radio frequency devices', 'Electronic communication products'],
  ARRAY['Product technical specifications','EMC/RF test reports','User manual','Product photos'],
  ARRAY['Application filing','Documentation review','Regulatory liaison'],
  true,
  true,
  '30 Working Days',
  5000.00,
  '/herosetion/Type-Approval.jpg',
  '/herosetion/Type-Approval.jpg',
  'ICASA Type Approvals',
  'Expert ICASA type approval services for South African businesses. We handle Standard, Simplified, Tested, and Untested approvals with fast processing and comprehensive support.',
  'ICASA type approval, ICASA certification, telecommunications approval, radio frequency approval, electronic device approval, ICASA compliance, type approval South Africa, ICASA testing',
  '[{"title": "Standard Type Approval", "description": "Required for any equipment that has not been type approved before by the Authority", "features": ["Comprehensive testing", "Full documentation", "Complete compliance review"], "price": "From R5,000", "popular": false}, {"title": "Simplified Type Approval", "description": "Available for products that already obtained type Approval from Authority", "features": ["Streamlined process", "Reduced documentation", "Faster approval"], "price": "From R4,500", "popular": true}, {"title": "Tested & Untested Approvals", "description": "We guide you through the decision-making process for the right approval method.", "features": ["Expert guidance", "Risk assessment", "Optimal pathway selection"], "price": "From R4,500", "popular": false}]',
  '[{"step": "1", "title": "Pre-Assessment", "description": "We evaluate your product and determine the most efficient approval pathway."}, {"step": "2", "title": "Documentation", "description": "We compile and review all required documentation for accuracy and completeness."}, {"step": "3", "title": "Testing Coordination", "description": "We arrange laboratory testing with accredited facilities when required."}, {"step": "4", "title": "Submission", "description": "We submit your application to ICASA and manage all communications."}, {"step": "5", "title": "Approval", "description": "We track progress and ensure timely approval of your certification."}]',
  '{"scenario": "A technology company wanted to import a new range of wireless routers into South Africa.", "challenge": "They needed ICASA type approval but were unfamiliar with the regulatory requirements and documentation process.", "solution": "Bilacert managed their ICASA type approval application from start to finish, ensuring compliance and timely market entry.", "result": "The company received approval 30% faster than industry average, allowing them to launch their products on schedule and capture market opportunities."}'
);

-- 2. Class ECS/ECNS Licensing
INSERT INTO services (title, slug, href, category, description, short_description, icon, content, features, requirements, includes, published, featured, processing_time, pricing, image, thumbnail, seo_title, seo_description, seo_keywords, pricing_plans, process_steps, success_story)
VALUES (
  'Class ECS/ECNS Licensing',
  'class-ecs-ecns-licensing',
  '/services/class-ecs-ecns-licensing',
  'Licensing',
  'Professional ECS and ECNS licensing services for South African telecommunications providers. Expert guidance for Electronic Communications Service and Network Service licenses.',
  'Expert guidance for Class Electronic Communications Service (ECS) and Electronic Communications Network Service (ECNS) licensing.',
  'Shield',
  'Businesses providing electronic communications services or network infrastructure may require a Class Electronic Communications Service (ECS) or Electronic Communications Network Service (ECNS) license from ICASA. Without the appropriate license, your operations could be at risk of non-compliance, fines, or shutdowns.\nWe simplify the licensing process, ensuring your business remains compliant while you focus on innovation and growth.',
  ARRAY['Required for electronic communication services','Issued by ICASA','Essential for legal operations'],
  ARRAY['Company registration documents','Business plan','Technical network diagram'],
  ARRAY['Eligibility assessment', 'Application preparation', 'ICASA liaison', 'Renewal support'],
  true,
  false,
  '30 working Days',
  7500.00,
  '/class-ens-ecns.jpg',
  '/class-ens-ecns.jpg',
  'Class ECS/ECNS Licensing',
  'Professional ECS and ECNS licensing services for South African telecommunications providers. Expert guidance for Electronic Communications Service and Network Service licenses.',
  'ECS license, ECNS license, electronic communications service, electronic communications network service, telecommunications license, ICASA ECS ECNS, VoIP license, network service license',
  '[{"title": "Basic", "description": "Consultation & Application Review", "features": ["Eligibility assessment", "Application review", "Basic guidance"], "price": "R3,000", "popular": false}, {"title": "Standard", "description": "Full Documentation Submission & Liaison", "features": ["Full documentation preparation", "ICASA submission", "Liaison & tracking", "Application management"], "price": "R7,500", "popular": true}, {"title": "Premium", "description": "End-to-End Approval & Ongoing Support", "features": ["Complete end-to-end service", "Ongoing compliance support", "Priority processing", "Renewal management"], "price": "R9,500", "popular": false}]',
  '[{"step": "1", "title": "Consultation & Eligibility Check", "description": "We assess whether your business requires a Class ECS or ECNS license and identify necessary documentation."}, {"step": "2", "title": "Application Preparation", "description": "Our experts compile, review, and prepare all required documents for complete and accurate submission."}, {"step": "3", "title": "Submission & ICASA Liaison", "description": "We submit the application and manage all interactions with ICASA to streamline the approval process."}, {"step": "4", "title": "License Approval & Issuance", "description": "Once approved, we ensure you receive your official ICASA license."}, {"step": "5", "title": "Post-License Compliance", "description": "We provide ongoing support for license renewals, amendments, and regulatory compliance updates."}]',
  '{"scenario": "A startup launching a VoIP communication platform needed an ECS license to operate legally.", "challenge": "They were unfamiliar with ICASA''s licensing requirements and needed guidance on the application process.", "solution": "Bilacert assessed their needs, filed their application, and ensured they met ICASA''s operational requirements.", "result": "The startup received their ECS license efficiently, allowing them to launch their VoIP platform legally and focus on growing their business."}'
);

-- 3. License Exemptions
INSERT INTO services (title, slug, href, category, description, short_description, icon, content, features, requirements, includes, published, featured, processing_time, pricing, image, thumbnail, seo_title, seo_description, seo_keywords, pricing_plans, process_steps, success_story)
VALUES (
  'License Exemptions',
  'license-exemptions',
  '/services/license-exemptions',
  'Licensing',
  'Expert ECS/ECNS license exemption services for South African businesses. We help determine if your business qualifies for exemptions and provide the necessary documentation for compliance assurance.',
  'Determine if your business qualifies for ICASA license exemptions and get compliance documentation.',
  'FileText',
  'Not all businesses providing electronic communications services or infrastructure require an ICASA license. Some may qualify for an exemption, allowing them to operate legally without a full licensing process. Determining qualification can be complex, but we simplify it, ensuring you avoid unnecessary costs and risks.',
  ARRAY['Available for specific business models', 'Under ICASA''s exemption list', 'Avoids full licensing process'],
  ARRAY['Detailed business model description', 'Service offering breakdown', 'Proof of limited scope'],
  ARRAY['Eligibility assessment', 'Compliance documentation', 'ICASA confirmation request'],
  true,
  false,
  '30 working Days',
  6800.00,
  '/ecs-ecns-licensing-explained.jpg',
  '/ecs-ecns-licensing-explained.jpg',
  'License Exemptions',
  'Expert ECS/ECNS license exemption services for South African businesses. We help determine if your business qualifies for ICASA license exemptions and provide compliance documentation.',
  'license exemption, ECS exemption, ECNS exemption, ICASA exemption, license exemption South Africa, exemption verification, compliance exemption, regulatory exemption',
  '[{"title": "Basic", "description": "Eligibility Assessment", "features": ["Business model assessment", "Exemption verification", "Basic guidance"], "price": "R2,500", "popular": false}, {"title": "Standard", "description": "Full Documentation & ICASA Confirmation", "features": ["Full documentation preparation", "ICASA confirmation", "Compliance documentation", "Verification process"], "price": "R6,800", "popular": true}, {"title": "Premium", "description": "End-to-End Exemption Processing", "features": ["Complete end-to-end service", "Ongoing compliance support", "Priority processing", "Annual compliance review"], "price": "R8,000", "popular": false}]',
  '[{"step": "1", "title": "Consultation & Business Model Assessment", "description": "We review your business model to determine if an ECS/ECNS exemption applies."}, {"step": "2", "title": "Documentation & Compliance Review", "description": "We compile the necessary paperwork to support your exemption claim."}, {"step": "3", "title": "ICASA Confirmation (If Required)", "description": "For certain cases, we submit a request to ICASA for official exemption confirmation."}, {"step": "4", "title": "Exemption Approval & Compliance Assurance", "description": "Once verified, we provide you with the necessary documentation to prove your exemption status."}, {"step": "5", "title": "Ongoing Compliance Monitoring", "description": "We track regulatory changes to ensure your exemption remains valid and your business stays compliant."}]',
  '{"scenario": "A software company offering cloud-based VoIP services assumed they needed an ECS license.", "challenge": "They were unsure about their licensing requirements and wanted to avoid unnecessary costs and regulatory hurdles.", "solution": "Bilacert assessed their operations and confirmed they qualified for an exemption, saving them licensing costs.", "result": "The company now operates legally under an exemption, avoiding unnecessary licensing fees while maintaining full compliance with ICASA regulations."}'
);

-- 4. NRCS LOA Applications
INSERT INTO services (title, slug, href, category, description, short_description, icon, content, features, requirements, includes, published, featured, processing_time, pricing, image, thumbnail, seo_title, seo_description, seo_keywords, pricing_plans, process_steps, success_story)
VALUES (
  'NRCS LOA Applications',
  'nrcs-loa-applications',
  '/services/nrcs-loa-applications',
  'Compliance',
  'Professional NRCS Letter of Authority (LOA) application services for South African businesses. Expert guidance for electrical and electronic product compliance.',
  'Letter of Authority applications for electrical and electronic products.',
  'FileText',
  'The National Regulator for Compulsory Specifications (NRCS) mandates that certain electrical and electronic products must receive a Letter of Authority (LOA) before entering the South African market. This certification ensures products meet South African safety and quality standards. Our team streamlines the NRCS LOA application process, ensuring businesses obtain approvals efficiently while staying fully compliant.',
  ARRAY['Electrical and electronic products', 'Safety and quality standards compliance', 'Mandatory before importation or sale'],
  ARRAY['Test reports from accredited labs', 'Product samples for evaluation', 'Technical file'],
  ARRAY['Product eligibility assessment', 'Technical documentation review', 'Testing coordination'],
  true,
  false,
  '120 Days',
  7000.00,
  '/NRCS.jpg',
  '/NRCS.jpg',
  'NRCS LOA Applications',
  'Professional NRCS Letter of Authority (LOA) application services for South African businesses. Expert guidance for electrical and electronic product compliance.',
  'NRCS LOA, NRCS Letter of Authority, NRCS certification, electrical product approval, electronic product compliance, NRCS South Africa, LOA application, NRCS testing',
  '[{"title": "Basic", "description": "Eligibility Assessment & Document Review", "features": ["Product eligibility assessment", "Document review", "Basic guidance"], "price": "R3,500", "popular": false}, {"title": "Standard", "description": "Full Application Submission & NRCS Liaison", "features": ["Full documentation preparation", "NRCS submission", "Liaison & tracking", "Testing coordination"], "price": "R7,000", "popular": true}, {"title": "Premium", "description": "End-to-End Approval & Compliance Support", "features": ["Complete end-to-end service", "Testing coordination", "Ongoing compliance support", "Priority processing"], "price": "R10,500", "popular": false}]',
  '[{"step": "1", "title": "Consultation & Product Review", "description": "We assess your product''s technical specifications and determine LOA requirements."}, {"step": "2", "title": "Documentation & Compliance Check", "description": "We compile and verify all necessary compliance documents before submission."}, {"step": "3", "title": "Submission & NRCS Liaison", "description": "Bilacert submits the application and manages all communication with NRCS."}, {"step": "4", "title": "Testing (If Required)", "description": "For products needing laboratory testing, we coordinate with accredited testing facilities."}, {"step": "5", "title": "Approval & Certification", "description": "Once approved, we deliver your NRCS LOA certificate and provide ongoing compliance support."}]',
  '{"scenario": "An electronics importer wanted to bring in a new range of LED lighting products but was unaware of NRCS LOA requirements.", "challenge": "They needed an LOA but lacked the technical knowledge and documentation required for NRCS compliance.", "solution": "Bilacert confirmed the LOA requirement, handled their submission, and ensured a smooth approval process.", "result": "The company received their NRCS LOA efficiently, allowing them to import and sell their LED products legally in South Africa without delays."}'
);

-- 5. Radio Dealer Licensing
INSERT INTO services (title, slug, href, category, description, short_description, icon, content, features, requirements, includes, published, featured, processing_time, pricing, image, thumbnail, seo_title, seo_description, seo_keywords, pricing_plans, process_steps, success_story)
VALUES (
  'Radio Dealer Licensing',
  'radio-dealer-licensing',
  '/services/radio-dealer-licensing',
  'Licensing',
  'Complete Radio Dealer License services for South African businesses selling radio communication equipment. Expert ICASA licensing support and compliance guidance.',
  'Complete licensing support for radio communication equipment dealers.',
  'Headphones',
  'Any business that sells, distributes, or supplies radio communication equipment in South Africa must hold a valid Radio Dealer License issued by ICASA. Without this license, trading in such equipment is illegal and can result in hefty fines or business disruptions. We simplify the licensing process, ensuring your business remains compliant while you focus on growth.',
  ARRAY['Required for radio communication equipment sales', 'Issued by ICASA', 'Mandatory for legal trading'],
  ARRAY['Business registration documents', 'Tax clearance certificate', 'List of equipment to be sold'],
  ARRAY['Eligibility assessment', 'Documentation preparation', 'ICASA liaison', 'Renewal support'],
  true,
  false,
  '30 Days',
  3000.00,
  '/herosetion/Radio-Dealer.jpg',
  '/herosetion/Radio-Dealer.jpg',
  'Radio Dealer Licensing',
  'Complete Radio Dealer License services for South African businesses selling radio communication equipment. Expert ICASA licensing support and compliance guidance.',
  'radio dealer license, ICASA radio license, radio communication license, two-way radio license, radio equipment dealer, ICASA dealer license, radio licensing South Africa, communication equipment license',
  '[{"title": "Basic", "description": "Consultation & Application Review", "features": ["Eligibility assessment", "Application review", "Basic guidance"], "price": "R1,000", "popular": false}, {"title": "Standard", "description": "Full Documentation Submission & Liaison", "features": ["Full documentation preparation", "ICASA submission", "Liaison & tracking", "Application management"], "price": "R3,000", "popular": true}, {"title": "Premium", "description": "End-to-End Approval & Ongoing Support", "features": ["Complete end-to-end service", "Ongoing compliance support", "Priority processing", "Renewal management"], "price": "R4,000", "popular": false}]',
  '[{"step": "1", "title": "Consultation & Eligibility Check", "description": "We assess whether your business requires a Radio Dealer License and identify necessary documentation."}, {"step": "2", "title": "Application Preparation", "description": "Our experts compile, review, and prepare all required documents for complete and accurate submission."}, {"step": "3", "title": "Submission & ICASA Liaison", "description": "We submit the application and manage all interactions with ICASA to streamline the approval process."}, {"step": "4", "title": "License Approval & Issuance", "description": "Once approved, we ensure you receive your official Radio Dealer License."}, {"step": "5", "title": "Post-License Compliance", "description": "We provide ongoing support for license renewals, amendments, and regulatory compliance updates."}]',
  '{"scenario": "A two-way radio distributor was unaware of the ICASA licensing requirements and faced operational risks.", "challenge": "They needed a Radio Dealer License urgently to avoid business disruption and legal penalties.", "solution": "Bilacert swiftly secured their Radio Dealer License, ensuring they could continue trading legally.", "result": "The distributor now operates without disruptions, maintaining full compliance with ICASA regulations and avoiding costly penalties."}'
);

-- 6. Ski Boat VHF Licensing
INSERT INTO services (title, slug, href, category, description, short_description, icon, content, features, requirements, includes, published, featured, processing_time, pricing, image, thumbnail, seo_title, seo_description, seo_keywords, pricing_plans, process_steps, success_story)
VALUES (
  'Ski Boat VHF Licensing',
  'ski-boat-vhf-licensing',
  '/services/ski-boat-vhf-licensing',
  'Licensing',
  'Professional VHF radio licensing services for South African marine vessels including ski boats, yachts, and recreational watercraft. Expert ICASA maritime compliance support.',
  'VHF radio licensing for marine vessels, including ski boats and yachts.',
  'Ship',
  'In South Africa, ski boats and other vessels using VHF radios for marine communication are required to have a valid VHF Radio License from ICASA. This ensures that all maritime radio communication remains safe, legal, and interference-free. We simplify the process of obtaining your Ski Boat VHF License, ensuring compliance with ICASA regulations while allowing you to focus on your boating experience.',
  ARRAY['Required for marine VHF radio communication', 'Issued by ICASA', 'Essential for safe maritime operations'],
  ARRAY['Vessel registration details', 'VHF radio model and serial number', 'Operator certificate of competency'],
  ARRAY['Vessel assessment', 'Application preparation', 'Maritime compliance checks'],
  true,
  false,
  '30 working Days',
  3000.00,
  '/herosetion/Ski-Boat-VHF.jpg',
  '/herosetion/Ski-Boat-VHF.jpg',
  'Ski Boat VHF Licensing',
  'Professional VHF radio licensing services for South African marine vessels including ski boats, yachts, and recreational watercraft. Expert ICASA maritime compliance support.',
  'VHF radio license, ski boat VHF, marine radio license, boat VHF license, yacht radio license, maritime radio license, ICASA VHF license, marine communication license',
  '[{"title": "Basic", "description": "Consultation & Application Review", "features": ["Vessel assessment", "Application review", "Basic guidance"], "price": "R1,800", "popular": false}, {"title": "Standard", "description": "Full Documentation Submission & Liaison", "features": ["Full documentation preparation", "ICASA submission", "Liaison & tracking", "Application management"], "price": "R3,000", "popular": true}, {"title": "Premium", "description": "End-to-End Approval & Ongoing Support", "features": ["Complete end-to-end service", "Ongoing compliance support", "Priority processing", "Fleet licensing"], "price": "R4,500", "popular": false}]',
  '[{"step": "1", "title": "Consultation & Eligibility Check", "description": "We assess whether your ski boat or vessel requires a VHF license and identify necessary documentation."}, {"step": "2", "title": "Application Preparation", "description": "Our experts compile, review, and prepare all required documents for complete and accurate submission."}, {"step": "3", "title": "Submission & ICASA Liaison", "description": "We submit the application and manage all interactions with ICASA to streamline the approval process."}, {"step": "4", "title": "License Approval & Issuance", "description": "Once approved, we ensure you receive your official ICASA VHF Radio License."}, {"step": "5", "title": "Post-License Compliance", "description": "We provide ongoing support for license renewals, amendments, and regulatory compliance updates."}]',
  '{"scenario": "A fishing charter company needed multiple VHF licenses for its fleet of boats.", "challenge": "They needed to ensure all vessels were legally compliant before peak season and were unfamiliar with the licensing process.", "solution": "Bilacert managed the entire process, ensuring all vessels were legally compliant with maritime regulations.", "result": "The charter company received all their VHF licenses efficiently, allowing them to operate legally during peak season without any compliance issues."}'
);

-- Seed Blog Posts Data
INSERT INTO blog_posts (slug, title, excerpt, content, category, published, image, author, read_time) VALUES
(
  'icasa-type-approval-requirements',
  'Understanding ICASA Type Approval Requirements',
  'A comprehensive guide to ICASA type approval requirements for South African businesses. Learn about the different types of approvals and how to navigate the process.',
  E'<p>ICASA (Independent Communications Authority of South Africa) type approval is a mandatory certification process for all electronic communication equipment before it can be sold or used in South Africa. This comprehensive guide will help you understand the requirements and navigate the process successfully.</p>\n      \n      <h2>What is ICASA Type Approval?</h2>\n      <p>ICASA type approval ensures that electronic communication devices meet South African regulatory, technical, and safety standards. This includes telecommunications equipment, radio frequency devices, and other electronic communication products.</p>\n      \n      <h2>Types of ICASA Approvals</h2>\n      <h3>Standard Type Approval</h3>\n      <p>Required for most telecommunications and radio frequency devices. This is the most common type of approval and involves comprehensive testing and documentation.</p>\n      \n      <h3>Simplified Type Approval</h3>\n      <p>Available for products that meet specific pre-approved conditions. This streamlined process is faster and less expensive for qualifying products.</p>\n      \n      <h3>Tested & Untested Approvals</h3>\n      <p>We guide clients through the decision-making process, ensuring they select the right approval method based on their product specifications and requirements.</p>\n      \n      <h2>The Application Process</h2>\n      <p>Our team handles the entire application process, from initial assessment to final approval. We ensure all documentation is complete and accurate, minimizing delays and maximizing success rates.</p>\n      \n      <h2>Why Choose Bilacert?</h2>\n      <p>With our expertise and streamlined processes, we typically reduce approval times by 30% compared to industry average, while maintaining a 100% success rate on first-time applications.</p>',
  'ICASA Approvals',
  TRUE,
  '/ICASA.png',
  'Bilacert Team',
  '5 min read'
),
(
  'nrcs-loa-guide',
  'NRCS LOA: What You Need to Know',
  'Everything you need to know about NRCS Letter of Authority applications. From eligibility to the application process, we cover it all.',
  E'<p>The National Regulator for Compulsory Specifications (NRCS) Letter of Authority (LOA) is a critical certification for electrical and electronic products entering the South African market.</p>\n      \n      <h2>What is an NRCS LOA?</h2>\n      <p>An NRCS LOA is a certificate that confirms your product meets South African safety and quality standards. It''s required for certain electrical and electronic products before they can be imported, sold, or distributed.</p>\n      \n      <h2>Which Products Require an LOA?</h2>\n      <p>Products that typically require an NRCS LOA include electrical appliances, electronic devices, lighting products, and other regulated electrical equipment.</p>\n      \n      <h2>The Application Process</h2>\n      <p>Our team manages the entire LOA application process, including product assessment, documentation preparation, testing coordination, and submission to NRCS.</p>',
  'NRCS Compliance',
  TRUE,
  '/NRCS.jpg',
  'Bilacert Team',
  '7 min read'
);


-- Seed Testimonials Data
INSERT INTO testimonials (post_url) VALUES
('https://web.facebook.com/abram.nyathi.1/posts/pfbid02ko48NxyJV74fPKgKewogGyFURoAgsCKjp2gMB1suARU72Qm9g59SpxzHbe9fYxadl');
