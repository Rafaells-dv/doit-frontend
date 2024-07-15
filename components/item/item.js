'use client';
import styles from './item.module.css';
import Image from 'next/image';
import deleteIcon from '@/assets/icons/delete.svg';
import editIcon from '@/assets/icons/edit.svg';
import saveIcon from '@/assets/icons/save.svg';
import xIcon from '@/assets/icons/x.svg';
import { useState } from 'react';
import Popup from '../popup/popup';
import axios from 'axios';

export default function Item({item, getItems}) {
    const url = "http://localhost:8080/items";

    const [isChecked, setIsChecked] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [form, setForm] = useState({});

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    function check() {
        setIsChecked(!isChecked);
    }

    function editItem() {
        axios.put(url+`/att?itemId=${item.id}`, JSON.stringify({
            description: form.description
        }), {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(() => {
            setIsEditing(false);
            getItems();
        }).catch(error => {
            console.error("There was an error editing the item:", error);
        });
    }

    function deleteItem() {
        console.log("Deleting item...");
        axios.delete(url+`/delete/${item.id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => {
            console.log(response) 
            getItems()
        })
    }

    function callConfirm() {
        setDeletePopup(true);
    }

    return (
        <div className={styles.item}>
            {deletePopup && 
                <Popup 
                    title={`Deseja excluir "${item.description}" da tarefa?`} 
                    setDeletePopup={setDeletePopup} 
                    func={deleteItem}
                />
            }
            <div>
                {isEditing ? 
                    <input 
                        name="description" 
                        type="text" 
                        value={form.description || item.description} 
                        onChange={handleChange}
                    />
                :  
                    <>
                        <input 
                            type="checkbox" 
                            id={`chk${item.id}`} 
                            name="chk" 
                            onClick={check}
                        />
                        <label 
                            htmlFor={`chk${item.id}`}>
                                <p style={isChecked ? 
                                                {textDecoration : "line-through"} 
                                            : 
                                                {}
                                            }>
                                    {item.description}
                                </p>
                        </label>
                    </>
                }
            </div>
            <div>
                {isEditing ? 
                    <>
                        <Image 
                            src={saveIcon} 
                            alt="pen edit icon" 
                            width={20} 
                            height={20} 
                            onClick={editItem} 
                        />
                        <Image 
                            src={xIcon} 
                            alt="exclude item button" 
                            width={18} 
                            height={18} 
                            onClick={() => setIsEditing(false)} 
                        />
                    </>
                :
                    <>
                        <Image 
                            src={editIcon} 
                            alt="pen edit icon" 
                            width={20} 
                            height={20} 
                            onClick={() => setIsEditing(true)} 
                        />
                        <Image 
                            src={deleteIcon} 
                            alt="trash delete icon" 
                            width={20} 
                            height={20} 
                            onClick={() => callConfirm()}
                        />
                    </>
                }
                
            </div>
        </div>
    );
}