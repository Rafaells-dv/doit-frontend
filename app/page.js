'use client';
import { useEffect, useState, useMemo } from "react";
import Task from "@/components/task/task";
import styles from "./page.module.css";
import axios from "axios";
import Search from "@/components/search/search";
import Button from "@/components/button/button";
import Form from "@/components/form/form";

export default function Home() {
  const url = "http://localhost:8080/tasks";

  const [tasks, setTasks] = useState([]);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [search, setSearch] = useState('');
  
  const filteredTasks = useMemo(() => {
    return search.length > 0 
        ? tasks.filter(task => task.title.toLowerCase().includes(search.toLowerCase()))
        : []
  }, [tasks, search]);

  function handleSearch (event) {
    event.preventDefault();
    setSearch(event.target.value)
  }

  function getTasks() {
    axios.get(url+"/all", {
      headers: {
        "Content-Type": "application/json",
      }
    }).then(response => {
      setTasks(response.data);
    })
  }

  useEffect(() => {
    getTasks();
  }, []);

  function addTask(e) {
    e.preventDefault();
    const form = e.target;
    const task = {
      title: form.title.value,
    }
    axios.post(url+"/newtask", task, {
      headers: {
        "Content-Type": "application/json",
      }
    }).then(response => {
      setTasks([...tasks, response.data]);
      setIsCreatingTask(false);
    })
  }

  return (
    <>
      {isCreatingTask && 
        <div className={styles.formModel}>
          <Form 
            title="Nova Tarefa"
            fields={[
              {
                label: "Título:",
                type: "text", 
                name: "title", 
                required: true
              }
            ]}
            buttons={[
              {
                text: "Criar",
                type: "submit", 
                onClick: false
              },
              {
                text: "Cancelar",
                type: "cancel", 
                onClick: () => setIsCreatingTask(false)
              }
            ]}
            handleSubmit={addTask} 
          />
        </div>
      }
      <main className={styles.main}>
        <h1>Suas tarefas</h1>
        <div>
          <Search placeholder={'Pesquisar tarefa...'} onChange={handleSearch} value={search}/>
          <Button onClick={() => setIsCreatingTask(true)}><p>Nova Tarefa</p></Button>
        </div>
        <article className={styles.article}>
          {search.length > 0 ? (
            filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <Task key={task.id} task={task} />
              ))
            ) : (
              <p>Nenhuma tarefa encontrada.</p>
            )
          ) : (
            tasks.map(task => (
              <Task key={task.id} task={task} />
            ))
          )}
        </article>
      </main>
    </>
  );
}
