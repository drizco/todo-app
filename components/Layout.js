import Head from 'next/head';
import styles from '@/styles/components/layout.module.scss';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>To Do App</title>
        <meta name="description" content="To do app with a rails backend" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.page_container}>{children}</div>
      </main>
    </div>
  );
};

export default Layout;
