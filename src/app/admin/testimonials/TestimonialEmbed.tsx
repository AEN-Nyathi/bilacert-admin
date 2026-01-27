
'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    FB?: {
      XFBML: {
        parse: (element?: HTMLElement) => void;
      };
    };
  }
}

interface TestimonialEmbedProps {
  postUrl: string;
}

export default function TestimonialEmbed({ postUrl }: TestimonialEmbedProps) {
  useEffect(() => {
    // Re-parse the DOM for FB elements whenever the URL changes.
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, [postUrl]);

  return (
    <div className="p-4">
      <div
        key={postUrl} // Using key to help React remount the component on URL change
        className="fb-post"
        data-href={postUrl}
        data-show-text="true"
        data-adapt-container-width="true"
      />
    </div>
  );
}
