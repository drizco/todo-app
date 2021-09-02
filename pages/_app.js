import Layout from '@/components/Layout';
import { ErrorProvider } from '@/context/ErrorContext';
import '@/styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <ErrorProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ErrorProvider>
  );
}

export default MyApp;
