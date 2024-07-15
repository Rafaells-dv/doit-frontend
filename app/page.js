'use client';
import { useEffect, useState } from "react";
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

  useEffect(() => {
    axios.get(url+"/all", {
      headers: {
        "Content-Type": "application/json",
      }
    }).then(response => {
      setTasks(response.data);
    })
  }, []);

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
          />
        </div>
      }
      <main className={styles.main}>
        <h1>Suas tarefas</h1>
        <div>
          <Search placeholder={'Pesquisar tarefa...'}/>
          <Button onClick={() => setIsCreatingTask(true)}><p>Nova Tarefa</p></Button>
        </div>
        <article className={styles.article}>
          {tasks.map(task => (
            <Task key={task.id} task={task} />
          ))}
        </article>
      </main>
    </>
  );
}
