
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getPublishedServices } from '@/lib/services';
import Icon from '@/components/Icon';

export const metadata: Metadata = {
	title: 'Our Services - Bilacert',
	description:
		'Comprehensive licensing and certification services for South African businesses. ICASA type approvals, NRCS LOA, radio dealer licensing, and more.',
	keywords: [
		'ICASA licensing',
		'NRCS certification',
		'radio licensing',
		'VHF licensing',
		'ECS ECNS licensing',
		'license exemptions',
		'compliance services South Africa',
	],
	openGraph: {
		title: 'Services - Bilacert',
		description:
			'Comprehensive licensing and certification services for South African businesses.',
		url: 'https://bilacert.co.za/services',
		type: 'website',
	},
	alternates: {
		canonical: 'https://bilacert.co.za/services',
	},
};

export default async function ServicesPage() {
	const services = await getPublishedServices();

	return (
		<div className='min-h-screen'>
			<section className='py-20 bg-gradient-to-r from-primary to-primary-light text-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='max-w-3xl'>
						<h1 className='text-4xl lg:text-5xl font-bold mb-6'>Our Services</h1>
						<p className='text-xl text-gray-200 mb-8'>
							Comprehensive licensing and certification services to help your business stay compliant and
							competitive in South Africa's regulated industries.
						</p>
					</div>
				</div>
			</section>

			<section className='py-20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{services.map((service) => (
							<Link
								key={service.id}
								href={service.href}
								className='group'>
								<div className='bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:border-accent hover:shadow-lg transition-all duration-300 h-full flex flex-col'>
									<div className='bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors'>
										<Icon name={service.icon || 'Shield'} className="h-6 w-6 text-accent" />
									</div>

									<h3 className='text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors'>
										{service.title}
									</h3>

									<p className='text-gray-600 mb-6 text-sm flex-grow'>{service.shortDescription || service.description}</p>

									<div className='flex items-center text-accent font-semibold group-hover:translate-x-2 transition-transform'>
										Learn More
										<ArrowRight className='h-4 w-4 ml-2' />
									</div>

									{service.processingTime && (
										<div className='mt-6 pt-6 border-t border-gray-200'>
											<p className='text-sm text-gray-500'>
												Processing time: <span className='font-semibold text-gray-700'>{service.processingTime}</span>
											</p>
										</div>
									)}
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			<section className='py-20 bg-secondary-gray'>
				<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<h2 className='text-3xl lg:text-4xl font-bold text-primary mb-6'>
						Don't see what you need?
					</h2>
					<p className='text-xl text-gray-600 mb-8'>
						Contact us today to discuss your specific licensing and certification needs.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Link
							href='/contact'
							className='bg-accent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-light transition-all duration-200 transform hover:-translate-y-1'>
							Get in Touch
						</Link>
						<Link
							href='tel:0754304433'
							className='border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary hover:text-white transition-all duration-200'>
							Call 075 430 4433
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
