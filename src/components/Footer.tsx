import Link from 'next/link';
import { Phone, Mail, Clock } from 'lucide-react';
import { getPublishedServices } from '@/lib/supabase/services';
import Image from 'next/image';

export default async function Footer() {
	const currentYear = new Date().getFullYear();
    const services = await getPublishedServices();

	const quickLinks = [
		{ name: 'About Us', href: '/about' },
		{ name: 'Our Services', href: '/services' },
		{ name: 'Blog', href: '/blog' },
		{ name: 'FAQ', href: '/faq' },
		{ name: 'Contact', href: '/contact' },
	];

	return (
		<footer className='bg-primary text-primary-foreground'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{/* Company Info */}
					<div className='lg:col-span-1'>
						<Link href='/' className="flex items-center gap-2 font-bold text-xl mb-4 text-white">
                            <Image src="/logo.png" alt="Bilacert Logo" width={32} height={32} />
                            <span>Bilacert</span>
                        </Link>
						<p className='text-muted-foreground mb-6 text-primary-foreground/70'>
							Your trusted compliance partner, simplifying ICASA and NRCS approvals for South
							African businesses.
						</p>
						<div className='space-y-3'>
							<a href="tel:0754304433" className='flex items-center space-x-3 text-primary-foreground/70 hover:text-accent transition-colors'>
								<Phone className='h-5 w-5 text-accent' />
								<span>075 430 4433</span>
							</a>
							<a href="mailto:info@bilacert.co.za" className='flex items-center space-x-3 text-primary-foreground/70 hover:text-accent transition-colors'>
								<Mail className='h-5 w-5 text-accent' />
								<span>info@bilacert.co.za</span>
							</a>
							<div className='flex items-center space-x-3 text-primary-foreground/70'>
								<Clock className='h-5 w-5 text-accent' />
								<span>Mon - Fri: 8:00 - 16:30</span>
							</div>
						</div>
					</div>

					{/* Services */}
					<div>
						<h3 className='text-lg font-semibold mb-4'>Our Services</h3>
						<ul className='space-y-2'>
							{services.slice(0, 6).map((service) => (
								<li key={service.id}>
									<Link
										href={service.href}
										className='text-primary-foreground/70 hover:text-accent transition-colors duration-200'>
										{service.title}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
						<ul className='space-y-2'>
							{quickLinks.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className='text-primary-foreground/70 hover:text-accent transition-colors duration-200'>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Newsletter Signup */}
					<div>
						<h3 className='text-lg font-semibold mb-4'>Stay Updated</h3>
						<p className='text-primary-foreground/70 mb-4'>
							Subscribe to our newsletter for compliance updates and industry insights.
						</p>
						<form className='space-y-3'>
							<input
								type='email'
								placeholder='Enter your email'
								className='w-full px-4 py-2 rounded-lg bg-primary-foreground/5 border border-primary-foreground/20 text-primary-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent'
							/>
							<button
								type='submit'
								className='w-full bg-accent text-accent-foreground px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors duration-200'>
								Subscribe
							</button>
						</form>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className='border-t border-primary-foreground/20 mt-8 pt-8'>
					<div className='flex flex-col md:flex-row justify-between items-center'>
						<p className='text-primary-foreground/70 text-sm'>
							© {currentYear} Bilacert (Pty) Ltd. All rights reserved.
						</p>
						<div className='flex space-x-6 mt-4 md:mt-0'>
							<Link
								href='#'
								className='text-primary-foreground/70 hover:text-accent text-sm transition-colors duration-200'>
								Privacy Policy
							</Link>
							<Link
								href='#'
								className='text-primary-foreground/70 hover:text-accent text-sm transition-colors duration-200'>
								Terms of Service
							</Link>
                            <Link
                                href='/admin/login'
                                className='text-primary-foreground/70 hover:text-accent text-sm transition-colors duration-200'>
                                Admin
                            </Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
