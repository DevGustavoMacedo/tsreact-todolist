import { useEffect, useState } from 'react'

// css modules
import styles from './App.module.css'

// components
import Footer from './components/Footer'
import Header from './components/Header'
import Modal from './components/Modal'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

// interfaces
import { ITask } from './interfaces/Task'

const App = () => {
  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  useEffect(() => {
    const getStorage = localStorage.getItem('tasks')

    if (getStorage !== null) {
      const tasksStorage: ITask[] = JSON.parse(getStorage)
      setTaskList(tasksStorage)
    }
  }, [])

  const deleteTask = (id: string) => {
    const newTasks = taskList.filter((task) => task.id !== id)

    taskList.length === 1
      ? localStorage.clear()
      : localStorage.setItem('tasks', JSON.stringify(newTasks))

    setTaskList(newTasks)
  }

  const toggleModal = () => {
    const modal = document.querySelector('#modal')

    modal!.classList.toggle('hide')
  }

  const editTask = (task: ITask): void => {
    toggleModal()
    setTaskToUpdate(task)
  }

  const updateTask = (newTask: ITask) => {
    const updatedItems = taskList.map((task) => {
      return newTask.id === task.id ? newTask : task
    })

    localStorage.setItem('tasks', JSON.stringify(updatedItems))

    setTaskList(updatedItems)

    toggleModal()
  }

  const checkTask = (id: string) => {
    const updatedItems = taskList.map((task) => {
      return id === task.id ? { ...task, done: !task.done } : task
    })

    localStorage.setItem('tasks', JSON.stringify(updatedItems))

    setTaskList(updatedItems)
  }

  return (
    <div>
      <Modal
        children={
          <TaskForm
            btnText="EDIT"
            titleTxt='Change your task'
            taskList={taskList}
            task={taskToUpdate}
            handleUpdate={updateTask}
          />
        }
      />
      <Header />
      <main className={styles.main}>
        <TaskForm btnText="ADD" titleTxt='What you gonna do?' taskList={taskList} setTaskList={setTaskList} />
        <TaskList
          taskList={taskList}
          handleDelete={deleteTask}
          handleEdit={editTask}
          handleCheck={checkTask}
        />
      </main>
      <Footer />
    </div>
  )
}

export default App
