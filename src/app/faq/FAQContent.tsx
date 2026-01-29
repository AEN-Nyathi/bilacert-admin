
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';
import StructuredData from '@/components/StructuredData';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FAQContent() {
	const faqCategories = [
		{
			title: 'General Questions',
			questions: [
				{
					question: 'What is Bilacert and what services do you provide?',
					answer:
						'Bilacert is a specialized compliance consultancy that simplifies ICASA and NRCS LOA approvals for South African businesses. We provide expert guidance for type approvals, licensing, and regulatory compliance across telecommunications and electronic communications sectors.',
				},
				{
					question: 'How long does the compliance process typically take?',
					answer:
						'Processing times vary by service type. ICASA type approvals typically take 30 Days, NRCS LOA applications also take 30 - 90 working days, while licensing applications can take 30-60 working days. We work to expedite these processes and keep you informed throughout.',
				},
				{
					question: 'Do you work with businesses of all sizes?',
					answer:
						'Yes, we work with businesses of all sizes, from startups and SMEs to large corporations. Our services are tailored to meet the specific needs and budgets of each client, ensuring everyone can access professional compliance support.',
				},
			],
		},
		{
			title: 'ICASA Type Approvals',
			questions: [
				{
					question: 'What types of devices require ICASA type approval?',
					answer:
						'All telecommunications and radio frequency devices require ICASA type approval before being sold or used in South Africa. This includes wireless routers, mobile phones, radio equipment, Bluetooth devices, and other electronic communication equipment.',
				},
			],
		},
	];

	// Prepare FAQ data for structured data
	const faqData = {
		questions: faqCategories.flatMap((category) =>
			category.questions.map((q) => ({
				question: q.question,
				answer: q.answer,
			}))
		),
	};

	return (
		<div className='min-h-screen'>
			<StructuredData
				type='FAQ'
				data={faqData}
			/>
			{/* Hero Section */}
			<section className='relative text-white py-20'>
				<Image
					src="https://picsum.photos/seed/faq/1920/1080"
                    data-ai-hint="question mark"
					alt='Frequently Asked Questions'
					fill
					priority
					className='object-cover'
				/>
				<div className='absolute inset-0 bg-black/40' />
				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center'>
						<h1 className='text-4xl lg:text-5xl font-bold mb-6'>Frequently Asked Questions</h1>
						<p className='text-xl text-gray-200 max-w-3xl mx-auto'>
							Find answers to common questions about ICASA and NRCS compliance, type approvals,
							licensing, and regulatory requirements in South Africa.
						</p>
					</div>
				</div>
			</section>

			{/* FAQ Content */}
			<section className='py-20'>
				<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
					{faqCategories.map((category, categoryIndex) => (
						<div key={categoryIndex} className="mb-12">
							<h2 className='text-3xl font-bold text-primary mb-6'>{category.title}</h2>
							<Accordion type="single" collapsible className="w-full">
								{category.questions.map((item, itemIndex) => (
									<AccordionItem value={`item-${categoryIndex}-${itemIndex}`} key={itemIndex}>
										<AccordionTrigger className="text-lg text-left">{item.question}</AccordionTrigger>
										<AccordionContent className="text-muted-foreground">
											{item.answer}
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</div>
					))}
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-20 bg-secondary-gray'>
				<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<h2 className='text-3xl font-bold text-primary mb-6'>Still Have Questions?</h2>
					<p className='text-xl text-gray-600 mb-8'>
						Can&apos;t find the answer you&apos;re looking for? Our compliance experts are here to
						help.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Button asChild size="lg">
							<Link href='/contact'>Contact Us</Link>
						</Button>
						<Button asChild variant="outline" size="lg">
							<a href='tel:0754304433'>Call 075 430 4433</a>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}

    