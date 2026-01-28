
import Link from 'next/link';

interface CTASectionProps {
	heading: string;
	description: string;
	primaryCTA: {
		label: string;
		href: string;
	};
	secondaryCTA: {
		label: string;
		href: string;
	};
}

export function CTASection({ heading, description, primaryCTA, secondaryCTA }: CTASectionProps) {
	return (
		<section className='py-20 bg-gradient-to-r from-primary to-primary-light text-white'>
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
				<h2 className='text-3xl lg:text-4xl font-bold mb-6'>{heading}</h2>
				<p className='text-xl mb-8 text-gray-200'>{description}</p>
				<div className='flex flex-col sm:flex-row gap-4 justify-center'>
					<Link
						href={primaryCTA.href}
						className='bg-accent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-light transition-all duration-200 transform hover:-translate-y-1'>
						{primaryCTA.label}
					</Link>
					<Link
						href={secondaryCTA.href}
						className='border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-all duration-200'>
						{secondaryCTA.label}
					</Link>
				</div>
			</div>
		</section>
	);
}
