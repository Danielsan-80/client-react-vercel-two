import UpdateForm from '../components/UpdateForm'
import styles from '../modules/create.module.css'
import {getPost} from '../controllers/postController'
import { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import {useAuthContext} from '../hooks/useAuthContext'


const Update = () => {

  const {user} = useAuthContext()
  const {id} = useParams()
  const [originalPost, setOriginalPost] = useState({})

  useEffect(()=>{
    const fetchPost = async ()=>{
        const post = await getPost(id)
        setOriginalPost(post)
        
    }
    fetchPost()
  },[])

  return (
    <div className={styles.container}>
        
        <UpdateForm originalPost={originalPost}/>
    </div>
  )
}

export default Update