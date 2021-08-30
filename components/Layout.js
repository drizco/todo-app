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

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          by Ryan
        </a>
      </footer>
    </div>
  );
};

export default Layout;
