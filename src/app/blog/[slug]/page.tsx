import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { getBlogPostBySlug, getAllPublishedBlogSlugs } from '@/lib/blog';
import type { BlogPost } from '@/lib/types';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
    const slugs = await getAllPublishedBlogSlugs();
    return slugs.map(({ slug }) => ({ slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="bg-card border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>

      <section className="py-12 bg-secondary-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {post.category && (
              <div className="inline-block bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
                {post.category}
              </div>
            )}
            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              {post.title}
            </h1>
            {post.excerpt && (
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                    {post.excerpt}
                </p>
            )}
            <div className="flex items-center justify-center space-x-6 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Bilacert Team</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>
                  {format(new Date(post.createdAt), 'PP')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {post.image && (
        <div className="relative h-64 md:h-96 max-w-5xl mx-auto my-8 rounded-lg overflow-hidden">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
        </div>
      )}

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-xl shadow-sm p-8 lg:p-12">
            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-secondary-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-xl shadow-sm p-8 text-center">
            <h3 className="text-2xl font-bold text-primary mb-4">Found this helpful?</h3>
            <div className="flex justify-center space-x-4 mb-8">
              <Button>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
            <div className="border-t pt-8">
              <Button asChild size="lg">
                <Link href="/contact">
                    Get Free Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
