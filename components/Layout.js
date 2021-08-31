import Head from 'next/head';
import styles from '@/styles/layout.module.scss';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>To Do App</title>
        <meta name="description" content="To do app with a rails backend" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
