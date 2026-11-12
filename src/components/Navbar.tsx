"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <h1 className="brand-text">CyberPhoenix</h1>
      </Link>
      
      <div className={`${styles.navElement} ${isOpen ? styles.navElementOpen : ""}`}>
        <button className="btn-glow"><Link className={styles.navLink} href="/" onClick={() => setIsOpen(false)}>Home</Link></button>
        <button className="btn-glow"><Link className={styles.navLink} href="/events" onClick={() => setIsOpen(false)}>Our Events</Link></button>
        <button className="btn-glow"><Link className={styles.navLink} href="/blogs" onClick={() => setIsOpen(false)}>Hacklogs</Link></button>
        <button className="btn-glow"><Link className={styles.navLink} href="/about" onClick={() => setIsOpen(false)}>About Us</Link></button>
      </div>

      <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </div>
    </nav>
  );
}
