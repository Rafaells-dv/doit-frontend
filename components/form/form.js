'use client';
import {useState} from 'react';
import styles from './form.module.css';
import Button from '../button/button';
import Input from '../input/input';

export default function Form({title, handleSubmit, fields, buttons}) {
    
    const [form, setForm] = useState({});

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h1>{title}</h1>
            {fields.map((field, index) => {
                return (
                    <div className={styles.fields} key={index}>
                        <label>{field.label}</label>
                        <Input 
                            type={field.type} 
                            name={field.name} 
                            value={form[field.name] || ''} 
                            onChange={handleChange} 
                            required={field.required}
                        />
                    </div>
                )
            })}
            <div className={styles.buttons}>
                {buttons.map((button, index) => {
                    return (
                        <Button key={index} type={button.type} onClick={button.onClick}>{button.text}</Button>
                    )
                })}
            </div>
        </form>
    )
}