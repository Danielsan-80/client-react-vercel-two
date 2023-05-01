import styles from '../modules/loading.module.css'

const Loading = () => {
  return (
    <div className={styles.container}>
        
       <h3>Loading...</h3>
       <span className={styles.dotOne}>.</span><span className={styles.dotTwo}>.</span><span className={ styles.dotThree}>.</span>

    </div>
  )
}

export default Loading