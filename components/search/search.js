import styles from './search.module.css';

export default function Search({placeholder, onChange, search}) {
    return (
        <input className={styles.search} type="search" placeholder={placeholder} onChange={onChange} value={search}/>
    );
}