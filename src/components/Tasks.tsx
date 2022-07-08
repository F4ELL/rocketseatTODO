import styles from './Tasks.module.css'
import { v4 as uuidv4 } from 'uuid';

import plus from '../assets/plus.svg'
import file from '../assets/file.svg'

import { TaskItem } from './TaskItem'

import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'

export interface TTasks {
    id: string
    title: string
    isCompleted: boolean
}

export const Tasks = () => {

    const [ tasks, setTasks ] = useState<TTasks[]>([])
    const [ newTaskText, setNewTaskText ] = useState('')
    const [ currentCompletedTasks, setCurrentCompletedTasks ] = useState(0)

    useEffect(() => {
        currentTasksCompleted()
    }, [tasks])

    const handleCreateNewTask = (event: FormEvent) => {
        event.preventDefault()

        setTasks([...tasks, {
            id: uuidv4(),
            title: newTaskText,
            isCompleted: false
        }])

        console.log(tasks)
        setNewTaskText('')
    }

    const deleteTask = (id: string) => {
        const listFiltered = tasks.filter(task => {
            return task.id !== id
        })

        setTasks(listFiltered)
    }

    const currentTasksCompleted = () => {
        const amount = tasks.reduce((acc, task) => {
            if(task.isCompleted){
                acc++
            }
            return acc            
        }, 0)
        setCurrentCompletedTasks(amount) 
    }

    


    return (
        <main className={styles.tasks}>
            <form onSubmit={handleCreateNewTask}>
                <input 
                    type="text"
                    placeholder='Adicione uma nova tarefa'
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)} 
                />
                <button type="submit">
                    <span>Criar</span>
                    <img src={plus} alt="Create task" />
                </button>
            </form>

            <div className={styles.counter}>
                <div className={styles.createdTasks}>
                    <span>Tarefas Criadas</span>
                    <strong>{tasks.length}</strong>
                </div>
                <div className={styles.completedTasks}>
                    <span>Concluídas</span>
                    <strong>{tasks.length === 0 ? 0 : `${currentCompletedTasks} de ${tasks.length}`}</strong>
                </div>
            </div>

            {tasks.length === 0 &&
                <div className={styles.emptyList}>
                    <img src={file} alt="Lista vazia" />
                    <strong>Você ainda não tem tarefas cadastradas</strong>
                    <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
            }
        
            {tasks.length > 0 &&
                <div className={styles.listTasks}>
                    {tasks.map((task) => (
                        <TaskItem 
                            key={task.id}
                            tasks={tasks} 
                            taskId={task.id} 
                            title={task.title} 
                            isCompleted={task.isCompleted}
                            onDeleteTask={deleteTask}
                            onSetTasks={setTasks} 
                        />
                    ))}
                </div>
            }            
        </main>
    )
}