
interface SuccessStoryProps {
	scenario: string;
	challenge: string;
	solution: string;
	result: string;
}

export function SuccessStory({ scenario, challenge, solution, result }: SuccessStoryProps) {
	return (
		<section className='py-20'>
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='bg-white p-8 rounded-xl shadow-sm'>
					<h2 className='text-2xl font-bold text-primary mb-6'>Success Story</h2>
					<div className='prose prose-lg max-w-none space-y-4'>
						<p className='text-gray-600'>
							<strong>Scenario:</strong> {scenario}
						</p>
						<p className='text-gray-600'>
							<strong>Challenge:</strong> {challenge}
						</p>
						<p className='text-gray-600'>
							<strong>Solution:</strong> {solution}
						</p>
						<p className='text-gray-600'>
							<strong>Result:</strong> {result}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
