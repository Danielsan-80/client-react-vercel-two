import Form from '../components/Form'
import styles from '../modules/create.module.css'
import { Navigate } from 'react-router-dom'
import {useAuthContext} from '../hooks/useAuthContext'


const Create = () => {

  const {user} = useAuthContext()
  if(!user){
    return <Navigate to="/login" replace />
  }

  return (
    <div className={styles.container}>
        <h1>
            Create Blog Post
        </h1>

        <Form />
    </div>
  )
}

export default Create