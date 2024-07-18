'use client';
import styles from './item.module.css';
import Image from 'next/image';
import deleteIcon from '@/assets/icons/delete.svg';
import editIcon from '@/assets/icons/edit.svg';
import saveIcon from '@/assets/icons/save.svg';
import xIcon from '@/assets/icons/x.svg';
import { useState } from 'react';
import { toast } from 'react-toastify';
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
        axios.put(url+`?itemId=${item.id}`, JSON.stringify({
            description: form.description
        }), {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(() => {
            setIsEditing(false);
            getItems();
            toast.success("Item editado com sucesso!");
        }).catch(error => {
            toast.error(error.response.data.message);
        });
    }

    function deleteItem() {
        axios.delete(url+`?itemId=${item.id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(() => {
            getItems()
            toast.success("Item excluído com sucesso!");
        }).catch(error => {
            toast.error(error.response.data.message);
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
                        value={form.description || ''}
                        placeholder={item.description}
                        onChange={handleChange}
                        className={styles.fadeIn}
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
                            className={styles.fadeIn}
                        />
                        <Image 
                            src={xIcon} 
                            alt="exclude item button" 
                            width={18} 
                            height={18} 
                            onClick={() => setIsEditing(false)} 
                            className={styles.fadeIn}
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