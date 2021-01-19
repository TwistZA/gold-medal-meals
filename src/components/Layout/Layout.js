import Head from "next/head";
import Link from "next/link";
import styles from "./Layout.module.css";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 1,
    }}
  />
);

const Layout = ({ children, title = "🍽 Gold Medal Meals 🍽" }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet"></link>
      </Head>

      <header className={styles.header}>
        <Link href="/">
          <img src="/logo5.png" alt="logo"></img>
        </Link>
      </header>
      <ColoredLine color="yellow" />
      <br></br>
      <main className={styles.main}>{children}</main>
      <br></br>
      <ColoredLine color="yellow" />
      <footer className={styles.footer}>
        Powered by React, Next JS, Vercel, TheMealDB.com
      </footer>
    </div>
  );
};

export default Layout;
