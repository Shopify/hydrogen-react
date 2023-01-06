import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import {graphql} from '../gql/gql';
import {request} from 'graphql-request';
import type {GetServerSideProps} from 'next';
import {shopClient} from '../src/shopify-client';
import type {IndexQueryQuery} from '../gql/graphql';
import {
  Image as ShopifyImage,
  type StorefrontApiResponseOk,
  useShop,
  AnalyticsPageType,
} from '@shopify/hydrogen-react';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps = async () => {
  // @TODO figure out how to get the client's IP address correctly and accurately.
  // const buyerIp =
  //   req.headers["x-real-ip"] ??
  //   req.headers["x-forwarded-for"] ??
  //   req.socket.remoteAddress;

  try {
    const response = await request({
      url: shopClient.getStorefrontApiUrl(),
      document: query,
      // @TODO: convert to 'getPrivateTokenHeaders({buyerIp})'
      requestHeaders: shopClient.getPublicTokenHeaders(),
    });

    // @TODO I don't love how we do this with 'errors' and 'data'
    return {props: {data: {
      pageType: AnalyticsPageType.home,
      ...response
    }, errors: null}};
  } catch (err) {
    console.error(err);
    return {props: {data: null, errors: [(err as Error).toString()]}};
  }
};

export default function Home({
  data,
  errors,
}: StorefrontApiResponseOk<IndexQueryQuery>) {
  const {storeDomain} = useShop();

  if (!data || errors) {
    console.error(errors);
    return <div>Whoops there was an error! Please refresh and try again.</div>;
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Welcome to {data?.shop.name} on NextJS</h1>

        {/* @TODO Using hydrogen-react's <Image/> is nice, but we should also provide our 'loader' so you can used NextJS' Image component as well */}
        <ShopifyImage
          data={data.products.nodes[0].variants.nodes[0].image ?? {}}
          width={500}
          loading="eager"
        />
        <div>Storefront API Domain: {storeDomain}</div>
        <Link href="/test">Go to Test</Link>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=hydrogen-react-monorepo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

const query = graphql(`
  query IndexQuery {
    shop {
      name
    }
    products(first: 1) {
      nodes {
        # if you uncomment 'blah', it should have a GraphQL validation error in your IDE if you have a GraphQL plugin. It should also give an error during 'npm run dev'
        # blah
        id
        title
        publishedAt
        handle
        variants(first: 1) {
          nodes {
            id
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
