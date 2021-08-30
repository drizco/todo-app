import Layout from '@/components/Layout';
import { DataProvider } from '@/context/DataContext';
import '@/styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  );
}

export default MyApp;
