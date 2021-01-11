import Head from "next/head";
import Link from "next/link";
import styles from "./Layout.module.css";
import React from "react";

const Layout = ({ children, title = "🍽 Gold Medal Meals 🍽" }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Link href="/">
          <img src="logo5.png" alt="logo"></img>
        </Link>
      </header>
      <br></br>
      <br></br>
      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>Powered by React</footer>
    </div>
  );
};

export default Layout;
