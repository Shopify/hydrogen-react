import {
  sendShopifyAnalytics,
  getClientBrowserParameters,
  AnalyticsEventName,
} from '@shopify/storefront-kit-react';
import {useRouter} from 'next/router';

function sendPageView(analyticsPageData) {
  const payload = {
    ...getClientBrowserParameters(),
    ...analyticsPageData,
  };
  sendShopifyAnalytics({
    eventName: AnalyticsEventName.PAGE_VIEW,
    payload,
  });
}

// Hook into your router's page change events to fire this analytics event:
// for example, in NextJS:

export default function App({Component, pageProps}) {
  const router = useRouter();

  const analytics = {
    hasUserConsent,
    ...analyticsShopData,
    ...pageProps.analytics,
  };
  const pagePropsWithAppAnalytics = {
    ...pageProps,
    analytics,
  };

  useEffect(() => {
    const handleRouteChange = () => {
      sendPageView(analytics);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [analytics, router.events]);

  return <Component {...pagePropsWithAppAnalytics} />;
}
