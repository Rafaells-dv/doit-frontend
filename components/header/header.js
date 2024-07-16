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
                </ul>
            </nav>        
        </header>
    );
}