import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getAllPublishedServiceSlugs } from '@/lib/services';
import { ServiceHero } from '@/components/service/ServiceHero';
import { WhatIsSection } from '@/components/service/WhatIsSection';
import { PricingPlans } from '@/components/service/PricingPlans';
import { ProcessSteps } from '@/components/service/ProcessSteps';
import { CTASection } from '@/components/service/CTASection';
import { SuccessStory } from '@/components/service/SuccessStory';
import { ServicesGrid } from '@/components/service/ServicesGrid';
import { Service } from '@/lib/types';

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
		description: service.seoDescription || service.shortDescription,
		keywords: service.seoKeywords ? service.seoKeywords.split(',').map(k => k.trim()) : [service.title],
		openGraph: {
			title: `${service.seoTitle || service.title} - Bilacert`,
			description: service.seoDescription || service.shortDescription,
			url: `https://bilacert.co.za/services/${service.slug}`,
			type: 'website',
            images: service.image ? [{ url: service.image }] : [],
		},
		alternates: {
			canonical: `https://bilacert.co.za/services/${service.slug}`,
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
	const service: Service | null = await getServiceBySlug(params.slug);

	if (!service) {
		notFound();
	}

    // For services with additional offerings
	const serviceOfferings = (service.pricingPlans || []).slice(0, 3).map(plan => ({
        icon: 'CheckCircle',
        title: plan.title,
        description: plan.description,
    }));
    if (serviceOfferings.length < 4) {
        serviceOfferings.push({
            icon: 'Award',
			title: 'Ongoing Support',
			description: 'Comprehensive support throughout your entire journey with us',
        });
    }

	return (
		<div className='min-h-screen'>
			<ServiceHero
				title={service.title}
				subtitle={service.shortDescription || service.description || ""}
				iconName={service.icon || 'Shield'}
				imageSrc={service.image || '/herosetion/Services.jpg'}
                processingTime={service.processingTime || 'N/A'}
				formPath={`/forms/${service.slug}`}
			/>

			{service.content && (
				<WhatIsSection
					title={`What is ${service.title}?`}
					content={service.content}
					checkpoints={service.features || []}
					benefits={service.requirements || []}
				/>
			)}
            
            <ServicesGrid
				title={`Our ${service.title} Services`}
				subtitle={`We offer a full-service approach to obtaining and maintaining your ${service.title.toLowerCase()}`}
				items={serviceOfferings}
				bgColor='bg-secondary-gray'
			/>
            
			{service.pricingPlans && service.pricingPlans.length > 0 && (
                <PricingPlans
                    title='Pricing Plans'
                    subtitle='Flexible plans to suit businesses of all sizes'
                    plans={service.pricingPlans}
                    formPath={`/forms/${service.slug}`}
                />
            )}
            
            {service.processSteps && service.processSteps.length > 0 && (
                <ProcessSteps
                    title='Our Process'
                    subtitle={`A proven ${service.processSteps.length}-step process for ${service.title.toLowerCase()} approval`}
                    steps={service.processSteps}
                />
            )}

            {service.successStory && service.successStory.scenario && (
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
					href: `/forms/${service.slug}`,
				}}
				secondaryCTA={{
					label: `Call 075 430 4433`,
					href: `tel:0754304433`,
				}}
			/>
		</div>
	);
}
