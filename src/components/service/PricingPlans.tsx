
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

interface PricingPlansProps {
	title: string;
	subtitle: string;
	plans: Array<{
		title: string;
		description: string;
		features: string[];
		price: string;
		popular: boolean;
	}>;
	formPath: string;
}

export function PricingPlans({ title, subtitle, plans, formPath }: PricingPlansProps) {
	return (
		<section className='py-20'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center mb-16'>
					<h2 className='text-3xl lg:text-4xl font-bold text-primary mb-4'>{title}</h2>
					<p className='text-xl text-gray-600 max-w-3xl mx-auto'>{subtitle}</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{plans.map((plan, index) => (
						<div
							key={index}
							className={`bg-white p-8 rounded-xl shadow-sm relative ${
								plan.popular ? 'ring-2 ring-accent' : ''
							}`}>
							{plan.popular && (
								<div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
									<span className='bg-accent text-white px-4 py-1 rounded-full text-sm font-medium'>
										Most Popular
									</span>
								</div>
							)}
							<h3 className='text-2xl font-bold text-primary mb-2'>{plan.title}</h3>
							<p className='text-gray-600 mb-6'>{plan.description}</p>
							<div className='text-3xl font-bold text-primary mb-6'>{plan.price}</div>
							<ul className='space-y-3 mb-8'>
								{plan.features.map((feature, featureIndex) => (
									<li
										key={featureIndex}
										className='flex items-center text-sm text-gray-600'>
										<CheckCircle className='h-4 w-4 text-accent mr-2 flex-shrink-0' />
										{feature}
									</li>
								))}
							</ul>
							<Link
								href={formPath}
								className={`w-full block px-4 py-3 rounded-lg font-medium text-center transition-colors duration-200 ${
									plan.popular
										? 'bg-accent text-white hover:bg-accent-light'
										: 'bg-primary text-white hover:bg-primary-light'
								}`}>
								Get Started
							</Link>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
