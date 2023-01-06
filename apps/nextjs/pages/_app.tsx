import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {
  ShopifyProvider,
  CartProvider,
  ShopifyCookies,
  sendShopifyAnalytics,
  getClientBrowserParameters,
  AnalyticsEventName,
  type ShopifyPageViewPayload,
} from '@shopify/hydrogen-react';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

const analyticsShopData = {
  shopId: 55145660472,
  currency: 'USD',
  storefrontId: '9928760',
};
let isInit = false;

export default function App({Component, pageProps}: AppProps) {
  const router = useRouter()
  const hasUserConsent = true;
  const analyticsPageData = {
    hasUserConsent,
    pageType: pageProps.data.pageType,
  }

  useEffect(() => {
    const handleRouteChange = () => {
      sendPageView(analyticsPageData);
    }

    router.events.on('routeChangeComplete', handleRouteChange);

    // First load event guard
    if (!isInit) {
      isInit = true;
      sendPageView(analyticsPageData);
    }

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [analyticsPageData])

  return (
    <ShopifyProvider
      shopifyConfig={{
        storeDomain: `hydrogen-preview`,
        storefrontToken: '3b580e70970c4528da70c98e097c2fa0',
        storefrontApiVersion: '2022-10',
        locale: 'EN-US',
      }}
    >
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
      <ShopifyCookies domain='' hasUserConsent={hasUserConsent}/>
    </ShopifyProvider>
  );
}

function sendPageView(analyticsPageData: Partial<ShopifyPageViewPayload>) {
  sendShopifyAnalytics({
    eventName: AnalyticsEventName.PAGE_VIEW,
    payload: {
      ...getClientBrowserParameters(),
      ...analyticsShopData,
      ...analyticsPageData,
    } as ShopifyPageViewPayload
  })
}
