'use client';
import { useEffect, useState } from 'react';
import Item from '../item/item';
import styles from './task.module.css';
import saveIcon from '@/assets/icons/save_w.svg';
import plusIcon from "@/assets/icons/plus.svg";
import xIcon from "@/assets/icons/x.svg";
import Image from 'next/image';
import axios from 'axios';
import Options from '../options/options';
import Popup from '../popup/popup';

export default function Task({task, getTasks}) {
    const urlItem = "http://localhost:8080/items";
    const urlTask = "http://localhost:8080/tasks";

    const [deletePopup, setDeletePopup] = useState(false);
    const [items, setItems] = useState([]);
    const [isAddingItem, setIsAddingItem] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({});


    function getItems() {
        axios.get(urlItem+`/all?taskId=${task.id}`, {
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

    function editTask() {
        axios.put(urlTask+`/att/${task.id}`, JSON.stringify({
            title: form.title
        }), {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(() => {
            setIsEditing(false);
            getTasks();
        }).catch(error => {
            console.error("There was an error editing the task:", error);
        });
    }

    function deleteTask() {
        console.log("Delete task id:", task.id);
        axios.delete(urlTask+`/delete/${task.id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(() => {
            console.log("Task deleted");
            setDeletePopup(false);
            getTasks(); // Chama getTasks após a conclusão bem-sucedida da requisição DELETE
        }).catch(error => {
            console.error("There was an error deleting the task:", error);
            // Tratar erro aqui, se necessário
        })
    }

    function addItem(event) {  
        event.preventDefault();
        console.log(form);
        axios.post(urlItem+`/additem?taskId=${task.id}`, JSON.stringify({
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
            {deletePopup && 
                <Popup 
                    title={`Deseja excluir a tarefa "${task.title}"?`} 
                    setDeletePopup={setDeletePopup} 
                    func={deleteTask}
                />
            }
            <div className={styles.head}>
                {isEditing ? 
                    <>
                        <input 
                            name="title" 
                            type="text" 
                            value={form.title}
                            placeholder={task.title} 
                            onChange={handleChange}
                        />
                        <Image 
                            src={saveIcon} 
                            alt="pen edit icon" 
                            width={20} 
                            height={20} 
                            onClick={editTask} 
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
                    <h2>{task.title}</h2>
                }
                <Options 
                    options={
                        [
                            {
                                text: "Editar",
                                onClick: () => setIsEditing(true)
                            },
                            {   
                                text: "Excluir",
                                onClick: () => setDeletePopup(true)
                            }
                        ]
                    }
                />
            </div>
            <div className={styles.items}>
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