import styles from './TaskItem.module.css'

import { Trash } from 'phosphor-react'
import { TTasks } from './Tasks'
import { useCallback } from 'react'

interface TTaskItemProps {
    tasks: TTasks[]
    taskId: string
    title: string
    isCompleted: boolean
    onDeleteTask: (id: string) => void
    onSetTasks: (list: TTasks[]) => void
}

export const TaskItem = ({ tasks, taskId, title, isCompleted, onDeleteTask, onSetTasks }: TTaskItemProps) => {

    const handleDeleteTask = () => {
        onDeleteTask(taskId)
    }

    const completedTask = useCallback((id: string) => {
        console.log(id)
        console.log(tasks)
        const checkIndex = tasks.findIndex(task => task.id === id)
        console.log(checkIndex)

        const newList = [...tasks]
        if(newList[checkIndex].isCompleted === false){
            newList[checkIndex].isCompleted = true
        } else {
            newList[checkIndex].isCompleted = false
        }
        console.log(newList)
        onSetTasks(newList)
    }, [isCompleted])

    return (
        <div className={styles.taskItem}>
            
            <div className={styles.round} onClick={() => completedTask(taskId)}>
                <input type="checkbox" checked={isCompleted}  id="checkbox" />
                <label htmlFor="checkbox"></label>
            </div>


            <p>{taskId}</p>
            <button 
                onClick={handleDeleteTask}
                title='Deletar Task'
            >
                <Trash />
            </button>
        </div>
    )
}