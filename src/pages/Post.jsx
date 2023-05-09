import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Badge from '../components/Badge'
import {getPost} from '../controllers/postController'
import styles from '../modules/post.module.css'




const Post = () => {

    const {id} = useParams()
    const [post, setPost] = useState({})
  
    
    useEffect(()=>{
        const fetchPost = async ()=>{
            const post = await getPost(id)
            setPost(post)
        }
        fetchPost()
        
    },[])

    

  return (
    <div className={styles.container}>
   
    <div className="single-post">
        <div className="post-image">
        <img src="//unsplash.it/730/380" alt=""/>
        </div>
        <h1>{post.title}</h1>
        <div className="post-details">
        Category: <Badge content={post.category} />
        Published: <Badge content={new Date(post.createdAt).toLocaleDateString()}/>
        </div>
        <span dangerouslySetInnerHTML={{ __html: post.body}} />
        <div className="post-body"></div>

    </div>
    
    </div>
  )
}

export default Post