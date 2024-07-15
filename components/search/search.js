import styles from './search.module.css';

export default function Search({placeholder}) {
    return (
        <input className={styles.search} type="search" placeholder={placeholder}/>
    );
}