import type {Story} from '@ladle/react';
import {
  ShopifyProvider,
  useShop,
  type ShopifyContextProps,
} from './ShopifyProvider.js';

const Template: Story<{
  storeDomain: string;
  storefrontToken: string;
  version: string;
}> = ({storeDomain, storefrontToken, version}) => {
  const config: ShopifyContextProps = {
    storeDomain,
    storefrontToken,
    storefrontApiVersion: version,
    country: {
      isoCode: 'CA',
    },
    language: {
      isoCode: 'EN',
    },
    locale: 'en-CA',
  };
  return (
    <ShopifyProvider shopifyConfig={config}>
      <TemplateChildren />
    </ShopifyProvider>
  );
};

const TemplateChildren = () => {
  const shopValues = useShop();
  return (
    <>
      Use the Controls tab change these values on the fly
      {/* @ts-expect-error -  we know useShop() doesn't return null as it's wrapped in a ShopifyProvider */}
      {(Object.keys(shopValues) as Array<keyof typeof shopValues>).map(
        (key) => {
          return (
            <p key={key}>
              <>
                <strong>{key}: </strong>
                these tests
                {/* @ts-expect-error -  we know useShop() doesn't return null as it's wrapped in a ShopifyProvider */}
                {typeof shopValues[key] === 'string'
                  ? // @ts-expect-error - we know useShop() doesn't return null as it's wrapped in a ShopifyProvider
                    shopValues[key]
                  : // @ts-expect-error - we know useShop() doesn't return null as it's wrapped in a ShopifyProvider
                    JSON.stringify(shopValues[key])}
              </>
            </p>
          );
        }
      )}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  storeDomain: 'notashop.myshopify.com',
  storefrontToken: 'abc123',
  version: '2022-10',
};
