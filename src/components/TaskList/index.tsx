// interfaces
import { ITask } from '../../interfaces/Task'

// modules
import styles from './index.module.css'

interface Props {
  taskList: ITask[]
  handleEdit(task: ITask): void
  handleDelete(id: string): void
  handleCheck(id: string): void
}

const TaskList = ({ taskList, handleEdit, handleDelete, handleCheck }: Props) => {
  return (
    <>
      {taskList.length > 0 ? (
        <>
          <h2 className={styles.title}>Tasks in progress:</h2>
          {taskList.map(
            (task) =>
              task.done === false && (
                <div key={task.id} className={styles.task}>
                  <div key={task.id} className={styles.details}>
                    <h4>{task.title}</h4>
                  </div>
                  <div className={styles.actions}>
                    <i
                      className={`bi bi-check-lg ${task.done ? styles.checked : ''}`}
                      onClick={() => handleCheck(task.id)}
                    ></i>
                    <i className="bi bi-pencil-fill" onClick={() => handleEdit(task)}></i>
                    <i className="bi bi-trash-fill" onClick={() => handleDelete(task.id)}></i>
                  </div>
                </div>
              )
          )}
          <h2 className={styles.title}>Tasks done:</h2>
          {taskList.map(
            (task) =>
              task.done === true && (
                <div key={task.id} className={`${styles.task} ${styles.checked}`}>
                  <div key={task.id} className={styles.details}>
                    <h4>{task.title}</h4>
                  </div>
                  <div className={styles.actions}>
                    <i className="bi bi-check-lg" onClick={() => handleCheck(task.id)}></i>
                    <i className="bi bi-pencil-fill" onClick={() => handleEdit(task)}></i>
                    <i className="bi bi-trash-fill" onClick={() => handleDelete(task.id)}></i>
                  </div>
                </div>
              )
          )}
        </>
      ) : (
        <p className={styles.noTasks}>No tasks added</p>
      )}
    </>
  )
}

export default TaskList
