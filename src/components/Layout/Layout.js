import Head from "next/head";
import Link from "next/link";
import styles from "./Layout.module.css";
import React from "react";

const Layout = ({ children, title = "Meals A La Carte" }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Link href="/">
          <img src="logo2.png" alt="logo"></img>
        </Link>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>Powered by React</footer>
    </div>
  );
};

export default Layout;
