import {ShopPayButton, Metafield, useMoney} from '@shopify/hydrogen-react';
import {useLoaderData} from '@remix-run/react';
import {type LoaderArgs, json} from '@remix-run/server-runtime';
import {graphql} from '../../gql/gql';
import {request} from 'graphql-request';
import {shopClient} from '../shopify-client';

export async function loader({}: LoaderArgs) {
  try {
    const response = await request({
      url: shopClient.getStorefrontApiUrl(),
      document: query,
      requestHeaders: shopClient.getPublicTokenHeaders(),
    });

    // @TODO I don't love how we do this with 'errors' and 'data'
    return json({data: response, errors: null});
  } catch (err) {
    return json({data: {products: null}, errors: [(err as Error).toString()]});
  }
}

export default function Index() {
  const {data} = useLoaderData();
  const {products} = data;
  const product = products.nodes[0];
  const variant = product.variants.nodes[0];

  const money = useMoney({
    ...variant.price,
    locale: 'fr-ca',
  });

  return (
    <div style={{fontFamily: 'system-ui, sans-serif', lineHeight: '1.4'}}>
      <h1>Welcome to Remix</h1>

      <p>Demonstrates components working without ShopifyProvider/useShop</p>

      <div>
        <p>Metafield:</p>
        <Metafield data={product.metafield} locale="EN-US" />
      </div>

      <p>useMoney: {money.withoutTrailingZeros}</p>

      <ShopPayButton
        variantIdsAndQuantities={[{id: variant.id, quantity: 1}]}
        storeDomain="hydrogen-preview"
      />
    </div>
  );
}

const query = graphql(/* GraphQL */ `
  query IndexQuery {
    shop {
      name
      id
    }
    products(first: 1) {
      nodes {
        # if you uncomment 'blah', it should have a GraphQL validation error in your IDE if you have a GraphQL plugin. It should also give an error during 'npm run dev'
        # blah
        id
        title
        publishedAt
        handle
        metafield(namespace: "metafields-tests", key: "list_integer") {
          key
          value
        }
        variants(first: 1) {
          nodes {
            id
            price {
              amount
              currencyCode
            }
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  }
`);
