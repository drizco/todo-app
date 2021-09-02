import Head from 'next/head';
import styles from '@/styles/components/layout.module.scss';
import ErrorMessage from '@/components/ErrorMessage';
import Header from '@/components/Header';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Death Star Corp To-dos</title>
        <meta name="description" content="To do app with a rails backend" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className={styles.main}>
        <div className={styles.page_container}>{children}</div>
        <ErrorMessage />
      </main>
    </div>
  );
};

export default Layout;
