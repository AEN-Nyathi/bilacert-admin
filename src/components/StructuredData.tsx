import Script from 'next/script';

interface StructuredDataProps {
	type: 'Organization' | 'Service' | 'FAQ' | 'BreadcrumbList';
	data: Record<string, unknown>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
	const getStructuredData = () => {
		switch (type) {
			case 'Organization':
				return {
					'@context': 'https://schema.org',
					'@type': 'Organization',
					'name': 'Bilacert (Pty) Ltd',
					'alternateName': 'Bilacert',
					'url': 'https://bilacert.co.za',
					'logo': 'https://bilacert.co.za/logo.png',
					'description':
						'Bilacert simplifies ICASA and NRCS LOA compliance for South African businesses. Expert guidance for type approvals, licensing, and regulatory compliance.',
					'address': {
						'@type': 'PostalAddress',
						'addressCountry': 'ZA',
						'addressRegion': 'South Africa',
					},
					'contactPoint': {
						'@type': 'ContactPoint',
						'telephone': '+27-75-430-4433',
						'contactType': 'customer service',
						'email': 'info@bilacert.co.za',
					},
					'sameAs': ['https://bilacert.co.za'],
					'foundingDate': '2024',
					'numberOfEmployees': '1-10',
					'industry': 'Compliance Consulting',
					'serviceArea': {
						'@type': 'Country',
						'name': 'South Africa',
					},
				};

			case 'Service':
				return {
					'@context': 'https://schema.org',
					'@type': 'Service',
					'name': data.name,
					'description': data.description,
					'provider': {
						'@type': 'Organization',
						'name': 'Bilacert (Pty) Ltd',
						'url': 'https://bilacert.co.za',
					},
					'serviceType': data.serviceType,
					'areaServed': {
						'@type': 'Country',
						'name': 'South Africa',
					},
					'offers': {
						'@type': 'Offer',
						'price': data.price,
						'priceCurrency': 'ZAR',
						'availability': 'https://schema.org/InStock',
					},
				};

			case 'FAQ':
				return {
					'@context': 'https://schema.org',
					'@type': 'FAQPage',
					'mainEntity': (data.questions as Array<{ question: string; answer: string }>).map(
						(q) => ({
							'@type': 'Question',
							'name': q.question,
							'acceptedAnswer': {
								'@type': 'Answer',
								'text': q.answer,
							},
						})
					),
				};

			case 'BreadcrumbList':
				return {
					'@context': 'https://schema.org',
					'@type': 'BreadcrumbList',
					'itemListElement': (data.items as Array<{ name: string; url: string }>).map(
						(item, index: number) => ({
							'@type': 'ListItem',
							'position': index + 1,
							'name': item.name,
							'item': item.url,
						})
					),
				};

			default:
				return {};
		}
	};

	return (
		<Script
			id={`structured-data-${type.toLowerCase()}`}
			type='application/ld+json'
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(getStructuredData(), null, 2),
			}}
		/>
	);
}
