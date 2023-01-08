import React from "react"
import styles from './Loader.module.css'
import loader from './loader.svg'

export function Loader() {
  return (
    <div className={styles.container}>
        <img src={loader} alt='loading...'/>
    </div>
  )
}