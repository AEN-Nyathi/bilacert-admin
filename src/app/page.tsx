
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
	CheckCircle,
	Shield,
	ArrowRight,
} from 'lucide-react';
import StructuredData from '@/components/StructuredData';
import Testimonials from '@/components/Testimonials';
import { getFeaturedServices } from '@/lib/supabase/services';
import { getPublishedBlogPosts } from '@/lib/supabase/blog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/Icon';
import { format } from 'date-fns';

export const metadata: Metadata = {
	title: 'Bilacert - Your Compliance Partner | ICASA & NRCS Approvals',
	description:
		'Bilacert simplifies ICASA and NRCS LOA compliance for South African businesses. Expert guidance for type approvals, licensing, and regulatory compliance. Get your approvals faster with our streamlined process.',
	keywords: [
		'ICASA type approval',
		'NRCS LOA',
		'South Africa compliance',
		'radio dealer license',
		'ECS ECNS licensing',
		'VHF radio license',
		'compliance consultant',
		'regulatory approval',
		'telecommunications compliance',
		'electronic communications',
	],
	authors: [{ name: 'Bilacert (Pty) Ltd' }],
	creator: 'Bilacert',
	publisher: 'Bilacert',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL('https://bilacert.co.za'),
	alternates: {
		canonical: '/',
	},
	openGraph: {
		title: 'Bilacert - Your Compliance Partner | ICASA & NRCS Approvals',
		description:
			'Simplifying ICASA and NRCS compliance for South African businesses. Expert guidance for type approvals, licensing, and regulatory compliance.',
		url: 'https://bilacert.co.za',
		siteName: 'Bilacert',
		images: [
			{
				url: '/logo.jpg',
				width: 1200,
				height: 630,
				alt: 'Bilacert - Your Compliance Partner',
			},
		],
		locale: 'en_ZA',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Bilacert - Your Compliance Partner',
		description: 'Simplifying ICASA and NRCS compliance for South African businesses',
		images: ['/logo.jpg'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			'index': true,
			'follow': true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	verification: {
		google: 'your-google-verification-code',
	},
};


export default async function HomePage() {
	const organizationData = {
		name: 'Bilacert (Pty) Ltd',
		description:
			'Bilacert simplifies ICASA and NRCS LOA compliance for South African businesses. Expert guidance for type approvals, licensing, and regulatory compliance.',
		serviceType: 'Compliance Consulting',
		price: 'From R1,000',
	};

	const services = await getFeaturedServices();
	const blogPosts = await getPublishedBlogPosts(3);


	const whyChooseUs = [
		{
			title: 'Expert Guidance',
			description:
				'Deep industry knowledge and regulatory expertise to guide you through complex compliance requirements.',
			icon: 'Users',
		},
		{
			title: 'Efficient Process',
			description:
				'Streamlined applications and proactive problem-solving to minimize delays and maximize success rates.',
			icon: 'Clock',
		},
		{
			title: 'Client-Centric Approach',
			description:
				'Personalized support and clear communication throughout your compliance journey.',
			icon: 'CheckCircle',
		},
	];

	return (
		<div className='min-h-screen'>
			<StructuredData
				type='Organization'
				data={organizationData}
			/>
			{/* Hero Section */}
			<section className='relative text-white py-20 lg:py-32'>
				<Image
					src="https://picsum.photos/seed/hero/1920/1080"
					data-ai-hint="compliance business"
					alt='Bilacert compliance'
					fill
					priority
					className='object-cover'
				/>
				<div className='absolute inset-0 bg-black/40'></div>
				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
						<div>
							<h1 className='text-4xl lg:text-6xl font-bold mb-6 leading-tight'>
								Compliance Simplified
							</h1>
							<p className='text-xl lg:text-2xl mb-8 text-gray-200'>
								Expert guidance for ICASA and NRCS approvals. We handle the complexity so you can
								focus on growing your business.
							</p>
							<div className='flex flex-col sm:flex-row gap-4'>
								<Button size="lg" asChild>
									<Link href='/contact'>Get Free Consultation</Link>
								</Button>
								<Button size="lg" variant="outline" asChild className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
									<Link href='/services'>View Our Services</Link>
								</Button>
							</div>
						</div>
						<div className='hidden lg:block'>
							<div className='bg-white/10 backdrop-blur-sm rounded-2xl p-8'>
								<div className='space-y-6'>
									<div className='flex items-center space-x-4'>
										<div className='bg-accent p-3 rounded-lg'>
											<CheckCircle className='h-6 w-6 text-white' />
										</div>
										<div>
											<h3 className='font-semibold'>30+ Days Faster</h3>
											<p className='text-gray-300'>Than industry average</p>
										</div>
									</div>
									<div className='flex items-center space-x-4'>
										<div className='bg-accent p-3 rounded-lg'>
											<Shield className='h-6 w-6 text-white' />
										</div>
										<div>
											<h3 className='font-semibold'>100% Compliance</h3>
											<p className='text-gray-300'>Guaranteed approval</p>
										</div>
									</div>
									<div className='flex items-center space-x-4'>
										<div className='bg-accent p-3 rounded-lg'>
											<Icon name="Users" className='h-6 w-6 text-white' />
										</div>
										<div>
											<h3 className='font-semibold'>500+ Clients</h3>
											<p className='text-gray-300'>Successfully served</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Services Overview */}
			<section className='py-20 bg-secondary-gray'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl lg:text-4xl font-bold text-primary mb-4'>Our Services</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							Comprehensive compliance solutions covering all aspects of ICASA and NRCS regulatory
							approvals
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						{services.map((service) => (
							<Link
								key={service.id}
								href={service.href}
								className='bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 group'>
								<div className='text-accent mb-4 group-hover:scale-110 transition-transform duration-200'>
									<Icon name={service.icon || 'Shield'} className='h-8 w-8' />
								</div>
								<h3 className='text-xl font-semibold text-primary mb-3'>{service.title}</h3>
								<p className='text-gray-600 mb-4'>{service.short_description}</p>
								<div className='flex items-center text-accent font-medium'>
									Learn More
									<ArrowRight className='h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200' />
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Why Choose Us */}
			<section className='py-20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl lg:text-4xl font-bold text-primary mb-4'>
							Why Choose Bilacert?
						</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							We make compliance simple, efficient, and stress-free for businesses of all sizes
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{whyChooseUs.map((item, index) => (
							<div
								key={index}
								className='text-center'>
								<div className='bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6'>
									<div className='text-accent'><Icon name={item.icon} className='h-8 w-8' /></div>
								</div>
								<h3 className='text-xl font-semibold text-primary mb-4'>{item.title}</h3>
								<p className='text-gray-600'>{item.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<Testimonials />

			{/* Blog Preview */}
			<section className='py-20 bg-secondary-gray'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl lg:text-4xl font-bold text-primary mb-4'>Latest Insights</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							Stay informed with our latest compliance insights and industry updates
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{blogPosts.map((post) => (
							<Link
								key={post.id}
								href={`/blog/${post.slug}`}
								className='bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2'>
								<div className='text-sm text-gray-500 mb-2'>
									{format(new Date(post.createdAt), 'PP')}
								</div>
								<h3 className='text-xl font-semibold text-primary mb-3'>{post.title}</h3>
								<p className='text-gray-600 mb-4'>{post.excerpt}</p>
								<div className='flex items-center text-accent font-medium'>
									Read More
									<ArrowRight className='h-4 w-4 ml-2' />
								</div>
							</Link>
						))}
					</div>

					<div className='text-center mt-12'>
						<Button asChild>
							<Link href='/blog'>View All Posts</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className='py-20 bg-gradient-to-r from-primary to-primary-light text-white'>
				<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<h2 className='text-3xl lg:text-4xl font-bold mb-6'>
						Ready to Simplify Your Compliance?
					</h2>
					<p className='text-xl mb-8 text-gray-200'>
						Get expert guidance and streamline your ICASA and NRCS approval process. Contact us
						today for a free consultation.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Button size="lg" asChild>
							<Link href='/contact'>Get Free Consultation</Link>
						</Button>
						<Button size="lg" variant="outline" asChild className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
							<a href='tel:0754304433'>Call 075 430 4433</a>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
