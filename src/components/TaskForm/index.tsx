// react modules
import { useState, useEffect, ChangeEvent, FormEvent, Dispatch, SetStateAction } from 'react'

// css modules
import styles from './index.module.css'

// interfaces
import { ITask } from '../../interfaces/Task'

interface Props {
  btnText: string
  titleTxt: string
  taskList: ITask[]
  setTaskList?: Dispatch<SetStateAction<ITask[]>>
  task?: ITask | null
  handleUpdate?(task: ITask): void
}

const TaskForm = ({ btnText, titleTxt, taskList, setTaskList, task, handleUpdate }: Props) => {
  const [form, setForm] = useState<ITask>({
    id: '0',
    title: '',
    done: false,
  })

  useEffect(() => {
    if (task) {
      setForm({
        id: task.id,
        title: task.title,
        done: task.done,
      })
    }
  }, [task])

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (handleUpdate) {
      handleUpdate(form)
    } else {
      const newId = Math.floor(Date.now() * Math.random()).toString(36)

      const newTask: ITask = {
        id: newId,
        title: form.title,
        done: false,
      }

      localStorage.setItem('tasks', JSON.stringify([newTask, ...taskList]))

      setTaskList!([newTask, ...taskList])

      setForm({ id: '0', title: '', done: false })
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm((prevState) => {
      return {
        ...prevState,
        title: e.target.value,
      }
    })

  return (
    <>
      <h2 className={styles.title}>{titleTxt}</h2>

      <form className={styles.form} onSubmit={addTaskHandler}>
        <label htmlFor="title" className={styles['sr-only']}>
          Title:
        </label>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input type="submit" value={btnText} />
      </form>
    </>
  )
}

export default TaskForm
