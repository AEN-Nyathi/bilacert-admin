
import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
	title: 'Contact Us',
	description:
		'Get in touch with Bilacert for expert ICASA and NRCS compliance guidance. Call 075 430 4433 or email info@bilacert.co.za for a free consultation.',
	keywords: [
		'contact Bilacert',
		'ICASA compliance consultation',
		'NRCS LOA consultation',
		'compliance expert South Africa',
		'regulatory approval consultation',
		'free compliance consultation',
	],
	openGraph: {
		title: 'Contact Bilacert - Get Expert Compliance Guidance',
		description:
			'Get in touch with Bilacert for expert ICASA and NRCS compliance guidance. Call 075 430 4433 or email info@bilacert.co.za for a free consultation.',
		url: 'https://bilacert.co.za/contact',
		type: 'website',
	},
	alternates: {
		canonical: 'https://bilacert.co.za/contact',
	},
};

export default function ContactPage() {
	return <ContactForm />;
}
    