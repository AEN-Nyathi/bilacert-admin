'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import { Button } from '@/components/ui/button';

export default function ContactForm() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		service: '',
		message: '',
	});

	const { isLoading, error, isSuccess, successMessage, handleSubmit, reset } =
		useFormSubmission();

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const result = await handleSubmit({
			formType: 'contact',
			fullName: formData.name,
			email: formData.email,
			phone: formData.phone || undefined,
			message: formData.message,
		});

		if (result?.success) {
			setFormData({
				name: '',
				email: '',
				phone: '',
				service: '',
				message: '',
			});
			setTimeout(reset, 5000);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<section className='relative text-white py-20'>
				<Image
					src="https://picsum.photos/seed/contact/1920/1080"
                    data-ai-hint="contact us"
					alt='Get in touch'
					fill
					priority
					className='object-cover'
				/>
				<div className='absolute inset-0 bg-black/40' />
				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center'>
						<h1 className='text-4xl lg:text-5xl font-bold mb-6'>Get in Touch</h1>
						<p className='text-xl text-gray-200 max-w-3xl mx-auto'>
							Ready to simplify your compliance journey? Contact our experts for a free consultation
							and discover how we can help your business navigate ICASA and NRCS requirements.
						</p>
					</div>
				</div>
			</section>

			{/* Contact Information */}
			<section className='py-20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16'>
						<div className='text-center'>
							<div className='bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
								<Phone className='h-8 w-8 text-accent' />
							</div>
							<h3 className='text-xl font-semibold text-primary mb-2'>Phone</h3>
							<p className='text-gray-600 mb-2'>075 430 4433</p>
							<p className='text-sm text-gray-500'>Mon-Fri 08:00 - 16:30</p>
						</div>

						<div className='text-center'>
							<div className='bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
								<Mail className='h-8 w-8 text-accent' />
							</div>
							<h3 className='text-xl font-semibold text-primary mb-2'>Email</h3>
							<p className='text-gray-600 mb-2'>info@bilacert.co.za</p>
							<p className='text-sm text-gray-500'>We&apos;ll respond within 24 hours</p>
						</div>

						<div className='text-center'>
							<div className='bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
								<Clock className='h-8 w-8 text-accent' />
							</div>
							<h3 className='text-xl font-semibold text-primary mb-2'>Business Hours</h3>
							<p className='text-gray-600 mb-2'>Monday - Friday</p>
							<p className='text-sm text-gray-500'>08:00 - 16:30</p>
						</div>
					</div>

					<div className='max-w-2xl mx-auto'>
						<div className='bg-white p-8 rounded-xl shadow-sm'>
							<h2 className='text-2xl font-bold text-primary mb-6 text-center'>
								Send us a Message
							</h2>

							{isSuccess && successMessage && (
								<div className='bg-green-50 border border-green-200 rounded-lg p-4 mb-6'>
									<div className='flex items-center'>
										<CheckCircle className='h-5 w-5 text-green-500 mr-2' />
										<p className='text-green-700'>{successMessage}</p>
									</div>
								</div>
							)}

							{error && (
								<div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6'>
									<div className='flex items-center'>
										<AlertCircle className='h-5 w-5 text-red-500 mr-2' />
										<p className='text-red-700'>{error}</p>
									</div>
								</div>
							)}

							<form
								onSubmit={onSubmit}
								className='space-y-6'>
								{/* Form fields here */}
								 <button
									type='submit'
									disabled={isLoading}
									className='w-full bg-primary text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'>
									{isLoading ? (
										'Sending...'
									) : (
										<><Send className='h-5 w-5 mr-2' />Send Message</>
									)}
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
