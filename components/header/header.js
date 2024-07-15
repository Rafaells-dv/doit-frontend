import styles from "./header.module.css";
import Link from "next/link";

export default function Header() {
    return (
        <header className={styles.header}>
            <h1>
                Doit
            </h1>
            <nav>
                <ul>
                    <li>
                        <Link href="/">
                            <p>Home</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/about">
                            <p>About</p>
                        </Link>
                    </li>
                </ul>
            </nav>        
        </header>
    );
}