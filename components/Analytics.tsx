"use client";
import Script from "next/script";

export default function Analytics() {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-49LRV2QE6S"
        strategy="afterInteractive"
      />
      <Script id="ga4-script" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-49LRV2QE6S');
        `}
      </Script>
    </>
  );
}
