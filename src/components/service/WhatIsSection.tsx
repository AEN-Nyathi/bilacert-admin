
import { CheckCircle } from 'lucide-react';
import Icon from '@/components/Icon';

interface WhatIsSectionProps {
	title: string;
	content: string;
	checkpoints: string[];
    benefits: string[];
}

export function WhatIsSection({ title, content, checkpoints, benefits }: WhatIsSectionProps) {
	return (
		<section className='py-20'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
					<div>
						<h2 className='text-3xl lg:text-4xl font-bold text-primary mb-6'>{title}</h2>
						<div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4 mb-8">
                           {content.split('\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                           ))}
                        </div>
						<div className='space-y-4'>
							{checkpoints.map((checkpoint, index) => (
								<div
									key={index}
									className='flex items-center space-x-3'>
									<CheckCircle className='h-5 w-5 text-accent' />
									<span className='text-gray-700'>{checkpoint}</span>
								</div>
							))}
						</div>
					</div>

					<div className='bg-secondary-gray p-8 rounded-2xl'>
                        <h3 className='text-2xl font-bold text-primary mb-6'>Key Requirements</h3>
                        <div className='space-y-6'>
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className='flex items-start space-x-4'>
                                    <div className='bg-accent p-2 rounded-lg'>
                                        <Icon name="FileText" className='h-6 w-6 text-white' />
                                    </div>
                                    <div>
                                        <p className='text-gray-600'>{benefit}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
				</div>
			</div>
		</section>
	);
}
