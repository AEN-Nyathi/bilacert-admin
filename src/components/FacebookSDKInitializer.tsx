'use client';

import Script from 'next/script';

export default function FacebookSDKInitializer() {
  return (
    <>
      <div id="fb-root"></div>
      <Script
        id="facebook-sdk"
        strategy="afterInteractive"
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0"
        onLoad={() => {
          if ((window as any).FB) {
            (window as any).FB.init({
              xfbml: true,
              version: 'v19.0',
            });
          }
        }}
      />
    </>
  );
}
