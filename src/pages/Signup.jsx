import AuthForm from "../components/AuthForm"
import styles from '../modules/create.module.css'

const Signup = () => {

  return (
     <div className={styles.container}>
        <h1>
            Register
        </h1>

        <AuthForm />
    </div>
    
  )
   
}

export default Signup