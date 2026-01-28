
interface ProcessStepsProps {
	title: string;
	subtitle: string;
	bgColor?: string;
}

export function ProcessSteps({ title, subtitle, bgColor = 'bg-secondary-gray' }: ProcessStepsProps) {
	const steps = [
        {
            step: '1',
            title: 'Consultation & Pre-Assessment',
            description: 'We evaluate your product and determine the most efficient approval pathway.',
        },
        {
            step: '2',
            title: 'Documentation',
            description: 'We compile and review all required documentation for accuracy and completeness.',
        },
        {
            step: '3',
            title: 'Testing & Submission',
            description: 'We coordinate testing if needed and submit the application to the regulatory body.',
        },
        {
            step: '4',
            title: 'Liaison & Tracking',
            description: 'We manage all communications and track the progress of your application.',
        },
        {
            step: '5',
            title: 'Approval & Support',
            description: 'We ensure timely approval and provide ongoing compliance support.',
        },
    ];

	return (
		<section className={`py-20 ${bgColor}`}>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center mb-16'>
					<h2 className='text-3xl lg:text-4xl font-bold text-primary mb-4'>{title}</h2>
					<p className='text-xl text-gray-600 max-w-3xl mx-auto'>{subtitle}</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-5 gap-8'>
					{steps.map((step, index) => (
						<div
							key={index}
							className='text-center'>
							<div className='bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4'>
								{step.step}
							</div>
							<h3 className='text-lg font-semibold text-primary mb-2'>{step.title}</h3>
							<p className='text-gray-600 text-sm'>{step.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
