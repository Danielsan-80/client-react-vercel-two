import {useParams, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Badge from '../components/Badge'
import UpdateForm from '../components/UpdateForm'
import {getPost, deletePost} from '../controllers/postController'
import styles from '../modules/post.module.css'




const Post = () => {

    const navigate = useNavigate()
    

    const {id} = useParams()
    const [post, setPost] = useState({})
    const [isUpdating, setIsUpdating] = useState(false)
    const [message, setMessage] = useState(null)

    useEffect(()=>{
        const fetchPost = async ()=>{
            const post = await getPost(id)
            setPost(post)
        }
        fetchPost()
    },[])

    const cancelUpdate= ()=> {
      setIsUpdating(false)
    }

    const handleDelete = async () =>{
     
      const json = await deletePost(id)

      setMessage(json.message)
      setTimeout(()=>{
        navigate('/blog')
    }, 3000)

    }

  return (
    <div className={styles.container}>
    {isUpdating ? <UpdateForm cancelUpdate={cancelUpdate} id={id} originalPost={post}/> :

    <div className="single-post">
        <div className="post-image">
        <img src="//unsplash.it/730/380" alt=""/>
        </div>
        <h1>{post.title}</h1>
        <div className="post-details">
        Category: <Badge content={post.category} />
        Published: <Badge content={new Date(post.createdAt).toLocaleDateString()}/>
        </div>
        <p className="post-body">{post.body}</p>

        <div className="buttons">
        <div className="btn" onClick={()=>setIsUpdating(true)}>Update</div>
       
        <div className="btn" onClick={handleDelete}>Delete</div>

        </div>

    </div>

  }
  {message && <p className="message">{message}</p>}

    </div>
  )
}

export default Post