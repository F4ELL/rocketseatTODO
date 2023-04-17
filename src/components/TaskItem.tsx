import styles from './TaskItem.module.css'
import * as Checkbox from '@radix-ui/react-checkbox';

import { Check, Trash } from 'phosphor-react'
import { TTasks } from './Tasks'

interface TTaskItemProps {
    taskId: string
    title: string
    isCompleted: boolean
    onDeleteTask: (id: string) => void
    onCompletedTask: (id: string) => void
}

export const TaskItem = ({ taskId, title, isCompleted, onDeleteTask, onCompletedTask }: TTaskItemProps) => {

    const handleDeleteTask = () => {
        onDeleteTask(taskId)
    }

    const HandleCompletedTask = () => {
        onCompletedTask(taskId)
    }

    console.log(isCompleted)

    return (
        <div className={styles.taskItem}>
            <Checkbox.Root 
                asChild 
                onCheckedChange={HandleCompletedTask}
            >
                <div className={styles.check}>
                    <Checkbox.Indicator asChild>
                        <Check size={12} color='#FFF' />
                    </Checkbox.Indicator>
                </div>
            </Checkbox.Root>

            <p className={isCompleted ? styles.completedTitle : styles.titleTask}>{title}</p>
            <button
                onClick={handleDeleteTask}
                title='Deletar Task'
            >
                <Trash />
            </button>
        </div>
    )
}