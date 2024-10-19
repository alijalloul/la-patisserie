import Script from "next/script";

const Head = () => {
  return (
    <head>
      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-65E07LKQJ0"
      ></Script>
      <Script id="" strategy="lazyOnload">
        {`  window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-65E07LKQJ0');`}
      </Script>
    </head>
  );
};

export default Head;
