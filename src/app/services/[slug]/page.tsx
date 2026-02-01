import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getAllPublishedServiceSlugs } from '@/lib/supabase/services';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Icon from '@/components/Icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { PricingPlan, ProcessStep, SuccessStory } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

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
		};
	}

	return {
		title: service.seoTitle || service.title,
		description: service.seoDescription || service.description,
		keywords: service.seoKeywords ? service.seoKeywords.split(',') : [service.title, service.category],
		openGraph: {
			title: service.seoTitle || service.title,
			description: service.seoDescription || service.description,
			url: `https://bilacert.co.za${service.href}`,
			type: 'website',
			images: service.image ? [{ url: service.image }] : [],
		},
		alternates: {
			canonical: `https://bilacert.co.za${service.href}`,
		},
	};
}

export async function generateStaticParams() {
	const slugs = await getAllPublishedServiceSlugs();
	return slugs;
}


const renderPricingPlans = (plans: PricingPlan[] | undefined, formPath: string) => {
    if (!plans || plans.length === 0) return null;
    return (
        <section className='py-20'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center mb-16'>
                    <h2 className='text-3xl lg:text-4xl font-bold text-primary mb-4'>Pricing Plans</h2>
                    <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                        Flexible plans to suit businesses of all sizes
                    </p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {plans.map((plan, index) => (
                        <Card key={index} className={`flex flex-col ${plan.popular ? 'border-accent ring-2 ring-accent' : ''}`}>
                            <CardHeader>
                                {plan.popular && <Badge className="absolute -top-3 right-4">Most Popular</Badge>}
                                <CardTitle>{plan.title}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col">
                                <p className="text-4xl font-bold mb-6">{plan.price}</p>
                                <ul className="space-y-3 mb-8 flex-grow">
                                    {Array.isArray(plan.features) && plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button asChild className="w-full mt-auto" variant={plan.popular ? 'default' : 'secondary'}>
                                    <Link href={formPath || '/contact'}>Get Started</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
};

const renderProcessSteps = (steps: ProcessStep[] | undefined) => {
    if (!steps || steps.length === 0) return null;
    return (
        <section className="py-20 bg-secondary-gray">
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center mb-16'>
                    <h2 className='text-3xl lg:text-4xl font-bold text-primary mb-4'>Our Process</h2>
                    <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                        A proven {steps.length}-step process for successful approval.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className='text-center'>
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
    )
};

const renderSuccessStory = (story: SuccessStory | undefined) => {
    if (!story || !story.scenario) return null;
    return (
        <section className="py-20">
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
                <Card>
                    <CardHeader>
                        <CardTitle>Success Story</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold">Scenario</h4>
                            <p className="text-muted-foreground">{story.scenario}</p>
                        </div>
                         <div>
                            <h4 className="font-semibold">Challenge</h4>
                            <p className="text-muted-foreground">{story.challenge}</p>
                        </div>
                         <div>
                            <h4 className="font-semibold">Solution</h4>
                            <p className="text-muted-foreground">{story.solution}</p>
                        </div>
                         <div>
                            <h4 className="font-semibold">Result</h4>
                            <p className="text-muted-foreground font-medium">{story.result}</p>
                        </div>
                    </CardContent>
                 </Card>
            </div>
        </section>
    )
};


export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
	const service = await getServiceBySlug(slug);

	if (!service) {
		notFound();
	}

	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<section className='relative text-white py-20'>
				<Image
					src={service.image || `https://picsum.photos/seed/${service.id}/1920/1080`}
                    data-ai-hint="paperwork compliance"
					alt={service.title}
					fill
					priority
					className='object-cover'
				/>
				<div className='absolute inset-0 bg-black/50' />
				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10'>
                    <Button variant="ghost" asChild className="mb-8 hover:bg-white/10 text-white">
                        <Link href="/services"><ArrowLeft className="mr-2 h-4 w-4"/>Back to Services</Link>
                    </Button>
					<div className='max-w-3xl'>
                        <div className="flex items-center gap-4 mb-4">
                            <Icon name={service.icon || 'Shield'} className="h-8 w-8 text-accent" />
                            <p className="text-accent font-semibold">{service.category}</p>
                        </div>
						<h1 className='text-4xl lg:text-5xl font-bold mb-4'>{service.title}</h1>
						<p className='text-xl text-gray-200 mb-8'>{service.shortDescription || service.description}</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" asChild><Link href={service.href.replace('/services/', '/forms/')}>Get a Quote</Link></Button>
                            <Button size="lg" variant="outline" asChild><a href="tel:0754304433">Call Now</a></Button>
                        </div>
					</div>
				</div>
			</section>

			{/* Main Content */}
			<section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                     <h2 className="text-3xl font-bold text-primary mb-6">Service Overview</h2>
                     <div className='prose prose-lg max-w-none text-gray-700 leading-relaxed'>
                        {service.content ||
                            service.description.split('\n').map((para: string, idx: number) => (
                                <p key={idx}>{para}</p>
                            ))}
                    </div>

                    {(service.features && service.features.length > 0) && (
                        <div className="mt-12">
                            <h3 className="text-2xl font-bold text-primary mb-4">What's Included</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-accent mr-3 mt-1 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </section>

			{renderPricingPlans(service.pricingPlans, service.href.replace('/services/', '/forms/'))}
			{renderProcessSteps(service.processSteps)}
			{renderSuccessStory(service.successStory)}
		</div>
	);
}
