import {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import PostCard from '../components/PostCard'
import styles from '../modules/blog.module.css'

const Search = () => {
  const location = useLocation()

  const [posts, setPosts] = useState([])

useEffect(()=>{
    
  
    const fetchPosts = ()=>{
      
      const posts = location?.state
      setPosts(posts)
      window.history.replaceState({}, document.title)
  }

  fetchPosts()
}, [location?.state])

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

export default Search