
import type { Metadata } from 'next';
import { Target, Eye, Zap, Heart, Shield, Users, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
	title: 'About Us',
	description:
		"Learn about Bilacert, South Africa's trusted compliance partner. We simplify ICASA and NRCS approvals with our values of simplicity, clarity, efficiency, and support.",
	keywords: [
		'about Bilacert',
		'compliance consultant South Africa',
		'ICASA NRCS experts',
		'regulatory compliance team',
		'South Africa compliance company',
		'telecommunications compliance experts',
	],
	openGraph: {
		title: 'About Bilacert - Your Trusted Compliance Partner',
		description:
			"Learn about Bilacert, South Africa's trusted compliance partner. We simplify ICASA and NRCS approvals with our values of simplicity, clarity, efficiency, and support.",
		url: 'https://bilacert.co.za/about',
		type: 'website',
	},
	alternates: {
		canonical: 'https://bilacert.co.za/about',
	},
};

export default function AboutPage() {
	const values = [
		{
			title: 'Simplicity',
			description:
				'We believe compliance should be clear and straightforward. We break down complex regulations into simple, actionable steps, removing unnecessary barriers for businesses.',
			icon: <Eye className='h-8 w-8' />,
		},
		{
			title: 'Clarity',
			description:
				'We communicate in a way that is direct and transparent, avoiding unnecessary jargon. Our goal is to ensure our clients always understand their compliance status and next steps.',
			icon: <Target className='h-8 w-8' />,
		},
		{
			title: 'Efficiency',
			description:
				'We prioritize speed and accuracy, ensuring applications are processed correctly the first time. Our refined processes and deep industry knowledge minimize delays and streamline approvals.',
			icon: <Zap className='h-8 w-8' />,
		},
		{
			title: 'Support',
			description:
				'We are more than just a service provider; we are a partner. We walk alongside our clients through the entire compliance process, offering guidance and solutions every step of the way.',
			icon: <Heart className='h-8 w-8' />,
		},
		{
			title: 'Trust & Integrity',
			description:
				'Regulatory compliance is a critical business function. We operate with honesty and integrity, ensuring our clients can trust us to handle their approvals with the utmost professionalism.',
			icon: <Shield className='h-8 w-8' />,
		},
	];

	const process = [
		{
			step: '1',
			title: 'Consultation',
			description: 'We assess your business needs and determine the required approvals.',
		},
		{
			step: '2',
			title: 'Documentation & Application Preparation',
			description:
				'We gather all necessary paperwork, ensuring accuracy and compliance with regulatory standards.',
		},
		{
			step: '3',
			title: 'Submission & Liaison',
			description:
				'We submit applications on your behalf and manage all communication with regulatory bodies.',
		},
		{
			step: '4',
			title: 'Follow-Up & Resolution',
			description: 'We track application progress, address any issues, and ensure smooth approval.',
		},
		{
			step: '5',
			title: 'Ongoing Compliance Support',
			description:
				'We assist with renewals, amendments, and compliance updates to keep your business aligned with regulations.',
		},
	];

	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<section className='relative text-white py-20'>
				<Image
					src="https://picsum.photos/seed/about/1920/1080"
                    data-ai-hint="office team"
					alt='About Bilacert'
					fill
					priority
					className='object-cover'
				/>
				<div className='absolute inset-0 bg-black/40' />
				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center'>
						<h1 className='text-4xl lg:text-5xl font-bold mb-6'>About Bilacert</h1>
						<p className='text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto'>
							Your trusted compliance partner, simplifying ICASA and NRCS approvals for South
							African businesses since day one.
						</p>
					</div>
				</div>
			</section>

			{/* Mission & Purpose */}
			<section className='py-20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
						<div>
							<h2 className='text-3xl lg:text-4xl font-bold text-primary mb-6'>
								Our Mission & Purpose
							</h2>
							<div className='space-y-6'>
								<div>
									<h3 className='text-xl font-semibold text-primary mb-3'>Our Purpose</h3>
									<p className='text-gray-600 text-lg'>
										To make compliance easy, accessible, and efficient for businesses, so they can
										focus on innovation and growth while we handle the regulatory complexities.
									</p>
								</div>
								<div>
									<h3 className='text-xl font-semibold text-primary mb-3'>Our Mission</h3>
									<p className='text-gray-600 text-lg'>
										Bilacert is committed to being the trusted partner in regulatory compliance,
										providing businesses with expert guidance, seamless application processes, and
										reliable support. Our mission is to remove the guesswork from licensing and
										approvals, ensuring businesses meet South African regulatory requirements with
										confidence and ease.
									</p>
								</div>
							</div>
						</div>
						<div className='bg-secondary-gray p-8 rounded-2xl'>
							<div className='space-y-6'>
								<div className='flex items-center space-x-4'>
									<div className='bg-accent p-3 rounded-lg'>
										<Users className='h-6 w-6 text-white' />
									</div>
									<div>
										<h3 className='font-semibold text-primary'>500+ Clients Served</h3>
										<p className='text-gray-600'>From startups to multinationals</p>
									</div>
								</div>
								<div className='flex items-center space-x-4'>
									<div className='bg-accent p-3 rounded-lg'>
										<CheckCircle className='h-6 w-6 text-white' />
									</div>
									<div>
										<h3 className='font-semibold text-primary'>100% Success Rate</h3>
										<p className='text-gray-600'>On first-time applications</p>
									</div>
								</div>
								<div className='flex items-center space-x-4'>
									<div className='bg-accent p-3 rounded-lg'>
										<Zap className='h-6 w-6 text-white' />
									</div>
									<div>
										<h3 className='font-semibold text-primary'>30% Faster</h3>
										<p className='text-gray-600'>Than industry average</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Our Values */}
			<section className='py-20 bg-secondary-gray'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl lg:text-4xl font-bold text-primary mb-4'>Our Values</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							The principles that guide everything we do and shape our commitment to excellence
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{values.map((value, index) => (
							<div
								key={index}
								className='bg-white p-6 rounded-xl shadow-sm'>
								<div className='text-accent mb-4'>{value.icon}</div>
								<h3 className='text-xl font-semibold text-primary mb-3'>{value.title}</h3>
								<p className='text-gray-600'>{value.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
    