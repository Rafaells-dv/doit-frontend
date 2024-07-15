'use client';
import { useEffect, useState } from 'react';
import Item from '../item/item';
import styles from './task.module.css';
import plusIcon from "@/assets/icons/plus.svg";
import xIcon from "@/assets/icons/x.svg";
import Image from 'next/image';
import axios from 'axios';

export default function Task({task}) {
    const url = "http://localhost:8080/items";

    const [items, setItems] = useState([]);
    const [isAddingItem, setIsAddingItem] = useState(false);
    const [form, setForm] = useState({});

    function getItems() {
        axios.get(url+`/all?taskId=${task.id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => {
            setItems(response.data);
        })
    }

    useEffect(() => {
        getItems();
    }, []);

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    function addItem(event) {  
        event.preventDefault();
        console.log(form);
        axios.post(url+`/additem?taskId=${task.id}`, JSON.stringify({
            description: form.description
        }), {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(() => {
            setIsAddingItem(false);
            getItems(); // Chama getItems após a conclusão bem-sucedida da requisição POST
        }).catch(error => {
            console.error("There was an error adding the item:", error);
            // Tratar erro aqui, se necessário
        });
    }

    function cancelAdd() {
        setIsAddingItem(false);
    }

    return (
        <div className={styles.card}>
            <div>
                <h2>{task.title}</h2>
            </div>
            <div>
                {items.map((item, index) => (
                    <Item key={item.id} item={item} index={index} getItems={getItems}/>
                ))}
            </div>
            {isAddingItem ? 
                <div>
                    <form onSubmit={addItem}>
                        <Image src={xIcon} alt="exclude item button" width={18} height={18} onClick={cancelAdd} />
                        <input type="text" name="description" placeholder="Novo item"  onChange={handleChange}/>
                        <button type="submit"><Image src={plusIcon} alt="confirm plus icon" width={20} height={20}  /></button>
                    </form>
                </div>
            :
                <div className={styles.buttonAdd} onClick={() => (setIsAddingItem(true))} >
                    <Image src={plusIcon} alt="plus icon" width={20} height={20}  />
                </div>
            }
            
        </div>
    );
} 