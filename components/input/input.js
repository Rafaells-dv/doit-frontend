import styles from './input.module.css';

export default function Input({type, name, value, onChange, required}) {
    return (
        <input className={styles.input}
            type={type} 
            name={name} 
            value={value} 
            onChange={onChange} 
            required={required}
        />
    )
}