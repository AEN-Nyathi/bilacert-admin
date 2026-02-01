import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ArrowRight, User } from 'lucide-react';
import Image from 'next/image';
import { getPublishedBlogPosts } from '@/lib/supabase/blog';
import type { BlogPost } from '@/lib/types';
import { format } from 'date-fns';

export const metadata: Metadata = {
	title: 'Blog',
	description:
		'Stay updated with the latest ICASA and NRCS compliance news, guides, and insights. Expert articles on type approvals, licensing, and regulatory changes in South Africa.',
	keywords: [
		'ICASA compliance blog',
		'NRCS LOA news',
		'compliance articles South Africa',
		'type approval guides',
		'licensing updates',
		'regulatory compliance news',
		'ICASA NRCS insights',
	],
	openGraph: {
		title: 'Blog - ICASA & NRCS Compliance Insights',
		description:
			'Stay updated with the latest ICASA and NRCS compliance news, guides, and insights. Expert articles on type approvals, licensing, and regulatory changes in South Africa.',
		url: 'https://bilacert.co.za/blog',
		type: 'website',
	},
	alternates: {
		canonical: 'https://bilacert.co.za/blog',
	},
};

export default async function BlogPage() {
	const categories = [
		'All',
		'ICASA Approvals',
		'NRCS Compliance',
		'Licensing',
		'Telecom Licensing',
		'Business Strategy',
		'Marine Compliance',
	];

    const blogPosts = await getPublishedBlogPosts();

	if (blogPosts.length === 0) {
		return <div className="min-h-screen text-center py-20">No blog posts found.</div>;
	}
    
    const featuredPost = blogPosts[0];
    const otherPosts = blogPosts.slice(1);

	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<section className='relative text-white py-20'>
				<Image
					src="https://picsum.photos/seed/blog/1920/1080"
                    data-ai-hint="library books"
					alt='Compliance Insights & Updates'
					fill
					priority
					className='object-cover'
				/>
				<div className='absolute inset-0 bg-black/40' />
				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center'>
						<h1 className='text-4xl lg:text-5xl font-bold mb-6'>Compliance Insights & Updates</h1>
						<p className='text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto'>
							Stay informed with the latest compliance news, regulatory updates, and expert insights
							to keep your business ahead of the curve.
						</p>
					</div>
				</div>
			</section>

			{/* Featured Post */}
			<section className='py-16 bg-secondary-gray'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='bg-card rounded-2xl shadow-lg overflow-hidden'>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-0'>
							<div className='bg-gradient-to-br from-primary to-primary/80 p-8 lg:p-12 flex items-center'>
								<div>
									<div className='inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium mb-4'>
										Featured Article
									</div>
									<h2 className='text-3xl lg:text-4xl font-bold text-white mb-4'>
										{featuredPost.title}
									</h2>
									<p className='text-xl text-gray-200 mb-6'>{featuredPost.excerpt}</p>
									<div className='flex items-center space-x-4 text-gray-200 mb-6'>
										<div className='flex items-center space-x-2'>
											<User className='h-4 w-4' />
											<span>Bilacert Team</span>
										</div>
										<div className='flex items-center space-x-2'>
											<Calendar className='h-4 w-4' />
											<span>
												{format(new Date(featuredPost.createdAt), 'PP')}
											</span>
										</div>
									</div>
									<Link
										href={`/blog/${featuredPost.slug}`}
										className='inline-flex items-center bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors duration-200'>
										Read Article
										<ArrowRight className='h-4 w-4 ml-2' />
									</Link>
								</div>
							</div>
							<div className='relative min-h-[300px] lg:min-h-0'>
								<Image
									src={featuredPost.image || `https://picsum.photos/seed/${featuredPost.id}/800/600`}
									alt={featuredPost.title}
									fill
									className='object-cover'
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Blog Posts Grid */}
			<section className='py-20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl lg:text-4xl font-bold text-primary mb-4'>Latest Articles</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							Expert insights and practical guidance to help you navigate South African compliance
							requirements
						</p>
					</div>

					{/* Category Filter - Non-functional for now */}
					<div className='flex flex-wrap justify-center gap-4 mb-12'>
						{categories.map((category) => (
							<button
								key={category}
								className='px-6 py-2 rounded-full border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-200'>
								{category}
							</button>
						))}
					</div>

					{/* Posts Grid */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{otherPosts.map((post: BlogPost) => (
							<Link
								key={post.id}
								href={`/blog/${post.slug}`}
								className='bg-card rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col'>
								<div className='relative h-48 bg-gray-200 flex items-center justify-center overflow-hidden'>
									<Image
										src={post.image || `https://picsum.photos/seed/${post.id}/600/400`}
										alt={post.title}
										fill
										style={{ objectFit: 'cover' }}
										className='transition-transform duration-300 group-hover:scale-105'
									/>
								</div>
								<div className='p-6 flex flex-col flex-grow'>
									<div className='flex items-center justify-between mb-3'>
										<span className='bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium'>
											{post.category}
										</span>
									</div>
									<h3 className='text-xl font-semibold text-primary mb-3 line-clamp-2'>
										{post.title}
									</h3>
									<p className='text-muted-foreground mb-4 line-clamp-3 flex-grow'>{post.excerpt}</p>
									<div className='flex items-center justify-between text-sm text-muted-foreground mt-auto'>
										<div className='flex items-center space-x-2'>
											<User className='h-4 w-4' />
											<span>Bilacert Team</span>
										</div>
										<div className='flex items-center space-x-2'>
											<Calendar className='h-4 w-4' />
											<span>
												{format(new Date(post.createdAt), 'dd MMM, yyyy')}
											</span>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Newsletter Signup */}
			<section className='py-20 bg-primary text-white'>
				<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<h2 className='text-3xl lg:text-4xl font-bold mb-6'>Stay Updated</h2>
					<p className='text-xl mb-8 text-gray-200'>
						Subscribe to our newsletter for the latest compliance insights, regulatory updates, and
						expert guidance delivered to your inbox.
					</p>
					<form className='max-w-md mx-auto flex gap-4'>
						<input
							type='email'
							placeholder='Enter your email'
							className='flex-1 px-4 py-3 rounded-lg bg-primary-foreground/5 border border-primary-foreground/20 text-primary-foreground placeholder-gray-300 focus:outline-none focus:border-accent'
						/>
						<button
							type='submit'
							className='bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors duration-200'>
							Subscribe
						</button>
					</form>
				</div>
			</section>
		</div>
	);
}
