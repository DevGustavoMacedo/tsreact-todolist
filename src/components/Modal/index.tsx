import { MouseEvent, ReactNode } from 'react'
import styles from './index.module.css'

interface Props {
  children: ReactNode
}

const Modal = ({ children }: Props) => {

  const closeModal = (e: MouseEvent): void => {
    const modal = document.querySelector('#modal')
    modal!.classList.add('hide')
  }

  return (
    <div id="modal" className='hide'>
      <div className={styles.fade} onClick={closeModal}></div>
      <div className={styles.modal}>
        {children}
      </div>
    </div>
  )
}

export default Modal