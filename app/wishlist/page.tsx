"use client"

import { useContext } from "react";
import { SelectedContext } from "../context";
import Gallery from "../gallery";
import styles from "../page.module.css";

export default function Wishlist() {
    const { selected, setSelected } = useContext(SelectedContext)
    return <main className={styles.main}>
        <h1 className={styles.center}>Your Wish List</h1>
        <Gallery breeds={selected} />
    </main>
}