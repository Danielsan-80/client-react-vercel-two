import {useState, useEffect} from 'react'
import PostCard from '../components/PostCard'
import {getPosts} from '../controllers/postController'
import styles from '../modules/blog.module.css'

const Blog = () => {

const [posts, setPosts] = useState([])

useEffect(()=>{
  
    const fetchPosts = async ()=>{
      const posts = await getPosts()
    setPosts(posts)
  }

  fetchPosts()
}, [])

  return (
    <div className={styles.container}>
      <h1>Posts</h1>
     
        <div className="posts">
          {posts && posts.map((post)=>(
            
            <PostCard key={post._id} post={post} />

           
          ))}
            
        </div>

    </div>
  )
}

export default Blog