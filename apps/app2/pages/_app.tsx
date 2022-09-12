import type { AppProps } from 'next/app';
import type { App2Router } from '@nx-trpc-nextjs/trpc-router';
import Head from 'next/head';
import { withTRPC } from '@trpc/next';
import superjson from 'superjson';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to app2!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default withTRPC<App2Router>({
  config() {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:4200/api/trpc';
    return {
      url,
      transformer: superjson,
    };
  },
  ssr: true,
})(CustomApp);
