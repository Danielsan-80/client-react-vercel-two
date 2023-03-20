import AuthForm from "../components/AuthForm"
import styles from '../modules/create.module.css'


const Login = () => {

  return (
     <div className={styles.container}>
        <h1>
            Login
        </h1>

        <AuthForm />
        
    </div>
    
  )
   
}

export default Login