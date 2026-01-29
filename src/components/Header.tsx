'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

	const navigation = [
		{ name: 'Home', href: '/' },
		{ name: 'Services', href: '/services' },
		{ name: 'Blog', href: '/blog' },
		{ name: 'About', href: '/about' },
		{ name: 'FAQ', href: '/faq' },
		{ name: 'Contact', href: '/contact' },
	];

	return (
		<header className='bg-card shadow-sm sticky top-0 z-50'>
			{/* Top bar with contact info */}
			<div className='bg-primary text-primary-foreground py-2'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between items-center text-sm'>
						<div className='flex items-center space-x-6'>
							<a href="tel:0754304433" className='flex items-center space-x-2 hover:text-accent transition-colors'>
								<Phone className='h-4 w-4' />
								<span>075 430 4433</span>
							</a>
							<a href="mailto:info@bilacert.co.za" className='flex items-center space-x-2 hover:text-accent transition-colors'>
								<Mail className='h-4 w-4' />
								<span>info@bilacert.co.za</span>
							</a>
						</div>
						<div className='hidden md:block'>
							<span>Your Compliance Partner.</span>
						</div>
					</div>
				</div>
			</div>

			{/* Main navigation */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center py-4'>
					{/* Logo */}
					<Link href='/' className="flex items-center gap-2 font-bold text-lg">
                        <Image src="/logo.png" alt="Bilacert Logo" width={40} height={40} />
                        <span className="text-primary hidden sm:inline">Bilacert</span>
                    </Link>

					{/* Desktop Navigation */}
					<nav className='hidden md:flex space-x-6'>
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={cn(
                                    'font-medium transition-colors duration-200 text-sm',
                                    pathname === item.href ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                                )}
                            >
								{item.name}
							</Link>
						))}
					</nav>

					{/* CTA Button */}
					<div className='hidden md:block'>
						<Button asChild>
                            <Link href='/contact'>
                                Get Free Consultation
                            </Link>
                        </Button>
					</div>

					{/* Mobile menu button */}
					<div className='md:hidden'>
						<Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
							{isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
                            <span className="sr-only">Toggle menu</span>
						</Button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<div className='md:hidden pb-4'>
						<nav className='px-2 pt-2 pb-3 space-y-1 bg-card border-t'>
							{navigation.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={cn(
                                        'block px-3 py-2 rounded-md',
                                        pathname === item.href ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:bg-secondary/50'
                                    )}
									onClick={() => setIsMenuOpen(false)}>
									{item.name}
								</Link>
							))}
							<div className='px-3 py-2'>
								<Button asChild className="w-full">
                                    <Link href='/contact' onClick={() => setIsMenuOpen(false)}>
                                        Get Free Consultation
                                    </Link>
                                </Button>
							</div>
						</nav>
					</div>
				)}
			</div>
		</header>
	);
}
