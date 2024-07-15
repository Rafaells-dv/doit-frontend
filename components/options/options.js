'use client';
import styles from './options.module.css';
import {useState} from 'react';

export default function Options({options}) {

    const [isOpen, setIsOpen] = useState(false);
    const [animation, setAnimation] = useState();

    async function menuToggle() {
        if (isOpen) {
            setAnimation(styles.fadeOut);
            setIsOpen(!isOpen);
        } else {
            setAnimation(styles.fadeIn);
            setIsOpen(!isOpen);
        }
    }

    return (
        <div className={styles.menu} onClick={() => menuToggle()}> 
            <div className={styles.dot}/>
            <div className={styles.dot}/>
            <div className={styles.dot}/>

            <div style={{display: isOpen ?  'block' : 'none'}} className={animation}>
                <div className={styles.arrowUp}/>
                <div className={styles.options}>
                    {options.map( (option, index) => {
                        return (
                            <p onClick={option.onClick} key={index}>{option.text}</p>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}