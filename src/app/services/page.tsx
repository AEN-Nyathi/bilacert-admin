
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { getPublishedServices } from '@/lib/supabase/services';
import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

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
			{/* Hero Section */}
			<section className='relative text-white py-20'>
				<Image
					src="https://picsum.photos/seed/services/1920/1080"
                    data-ai-hint="compliance document"
					alt='Bilacert Services'
					fill
					priority
					className='object-cover'
				/>
				<div className='absolute inset-0 bg-black/40' />
				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='max-w-3xl'>
						<h1 className='text-4xl lg:text-5xl font-bold mb-6'>Our Services</h1>
						<p className='text-xl text-gray-200 mb-8'>
							Comprehensive licensing and certification services to help your business stay compliant and
							competitive in South Africa's regulated industries.
						</p>
					</div>
				</div>
			</section>

			{/* Services Grid */}
			<section className='py-20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch'>
						{services.map((service) => (
							<Link key={service.id} href={service.href} className="group block h-full">
                                <div className="flex h-full flex-col rounded-xl border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
                                    <div className="mb-4 flex-shrink-0 text-accent">
                                        <Icon name={service.icon || 'Shield'} className="h-8 w-8" />
                                    </div>
                                    <div className="flex flex-grow flex-col">
                                        <h3 className="text-xl font-bold text-primary mb-2">
                                            {service.title}
                                        </h3>
                                        <p className="mb-4 text-sm text-muted-foreground flex-grow">
                                            {service.description}
                                        </p>
                                        {service.includes && service.includes.length > 0 && (
                                            <div className="mb-4">
                                                <h4 className="mb-2 text-sm font-semibold text-card-foreground">Includes:</h4>
                                                <ul className="space-y-2 text-sm text-muted-foreground">
                                                    {service.includes.slice(0, 4).map((item: string, index: number) => (
                                                        <li key={index} className="flex items-center gap-2">
                                                            <CheckCircle className="h-4 w-4 text-accent" />
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-auto pt-6">
                                        {service.pricing && (
                                            <p className="mb-4 text-lg font-semibold text-primary">
                                                From R{service.pricing.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                            </p>
                                        )}
                                        <Button className="w-full bg-primary hover:bg-primary/90">
                                            Learn More
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </Link>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-20 bg-secondary-gray'>
				<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<h2 className='text-3xl lg:text-4xl font-bold text-primary mb-6'>
						Don't see what you need?
					</h2>
					<p className='text-xl text-gray-600 mb-8'>
						Contact us today to discuss your specific licensing and certification needs.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Button size="lg" asChild>
							<Link href='/contact'>Get in Touch</Link>
						</Button>
						<Button size="lg" variant="outline" asChild>
							<a href='tel:0754304433'>Call 075 430 4433</a>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
