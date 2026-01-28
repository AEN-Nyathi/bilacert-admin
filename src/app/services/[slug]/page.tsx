
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getAllPublishedServiceSlugs } from '@/lib/services';
import { ServiceHero } from '@/components/service/ServiceHero';
import { WhatIsSection } from '@/components/service/WhatIsSection';
import { PricingPlans } from '@/components/service/PricingPlans';
import { ProcessSteps } from '@/components/service/ProcessSteps';
import { CTASection } from '@/components/service/CTASection';
import { SuccessStory } from '@/components/service/SuccessStory';

interface ServicePageProps {
	params: {
		slug: string;
	};
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
	const service = await getServiceBySlug(params.slug);

	if (!service) {
		return {
			title: 'Service Not Found',
		}
	}

	return {
		title: service.seoTitle || service.title,
		description: service.seoDescription || service.description,
		keywords: service.seoKeywords ? service.seoKeywords.split(',').map(k => k.trim()) : [service.title],
		openGraph: {
			title: `${service.seoTitle || service.title} - Bilacert`,
			description: service.seoDescription || service.description,
			url: service.href,
			type: 'website',
            images: service.image ? [{ url: service.image }] : [],
		},
		alternates: {
			canonical: service.href,
		},
	};
}

export async function generateStaticParams() {
	const slugs = await getAllPublishedServiceSlugs();
	return slugs.map(({ slug }) => ({
		slug,
	}));
}

export default async function ServicePage({ params }: ServicePageProps) {
	const service = await getServiceBySlug(params.slug);

	if (!service) {
		notFound();
	}

	return (
		<div className='min-h-screen'>
			<ServiceHero
				title={service.title}
				subtitle={service.shortDescription || service.description}
				iconName={service.icon || 'Shield'}
				imageSrc={service.image || '/herosetion/Services.jpg'}
                processingTime={service.processingTime || 'N/A'}
				formPath={service.href.replace('/services/', '/forms/')}
			/>

			<WhatIsSection
				title={`What is ${service.title}?`}
				content={service.content || service.description}
				checkpoints={service.features || []}
				benefits={service.requirements || []}
			/>
            
			{service.pricingPlans && service.pricingPlans.length > 0 && (
                <PricingPlans
                    title='Pricing Plans'
                    subtitle='Flexible plans to suit businesses of all sizes'
                    plans={service.pricingPlans}
                    formPath={service.href.replace('/services/', '/forms/')}
                />
            )}
            
            {service.processSteps && service.processSteps.length > 0 && (
                <ProcessSteps
                    title='Our 5-Step Process'
                    subtitle={`A proven process for ${service.title.toLowerCase()} approval`}
                    steps={service.processSteps}
                />
            )}

            {service.successStory && (
                <SuccessStory
                    scenario={service.successStory.scenario}
                    challenge={service.successStory.challenge}
                    solution={service.successStory.solution}
                    result={service.successStory.result}
                />
            )}

			<CTASection
				heading={`Ready to Get Started with ${service.title}?`}
				description={`Ensure your business stays compliant. Let us handle the process so you can focus on delivering exceptional services.`}
				primaryCTA={{
					label: 'Get Free Consultation',
					href: service.href.replace('/services/', '/forms/'),
				}}
				secondaryCTA={{
					label: `Call 075 430 4433`,
					href: `tel:0754304433`,
				}}
			/>
		</div>
	);
}
