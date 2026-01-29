'use client';

import { useEffect, useState } from 'react';
import type { Testimonial } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';

declare global {
    interface Window {
        FB?: {
            XFBML: {
                parse: () => void;
            };
        };
    }
}

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setTestimonials(data.map(item => ({ id: item.id, postUrl: item.post_url, createdAt: item.created_at })));
            }
        };

        fetchTestimonials();
    }, []);

    useEffect(() => {
        if (testimonials.length > 0 && typeof window !== 'undefined' && window.FB) {
            window.FB.XFBML.parse();
        }
    }, [testimonials]);

    if (testimonials.length === 0) {
        return null;
    }

    return (
        <section className="py-20 bg-primary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                        Trusted by South African Businesses
                    </h2>
                    <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                        See what our clients say about our services
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
                    {testimonials.map((t) => (
                        <Card key={t.id} className="bg-white text-black w-full max-w-lg">
                            <CardContent className="p-4">
                                <div
                                    className="fb-post"
                                    data-href={t.postUrl}
                                    data-width="auto"
                                    data-show-text="true"
                                >
                                    <blockquote cite={t.postUrl} className="fb-xfbml-parse-ignore">
                                        <a href={t.postUrl}>Post</a>
                                    </blockquote>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
