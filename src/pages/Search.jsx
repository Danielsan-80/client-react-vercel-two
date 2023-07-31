import {useState, useEffect} from 'react'
import { useSearchParams } from 'react-router-dom'
import PostCard from '../components/PostCard'
import styles from '../modules/blog.module.css'
import { searchPosts } from '../controllers/postController'

const Search = () => {
  const [searchParams] = useSearchParams()  
  const [posts, setPosts] = useState(null)
  const [error, setError] = useState(null)

  useEffect(()=>{
    const getSearchPosts = async ()=> {
      const res = await searchPosts(searchParams.get('term'))
  
      if(!res.ok){
        const error = await res.json()
        setPosts(null)
        setError(error)
        return
     
      } else {
    
      const posts = await res.json()
      setPosts(posts)
      setError(null)}
    }
  
    getSearchPosts()
    
  }, [searchParams])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search Results for: {searchParams.get('term')}</h1>
      {error && <p className="message">{error.error}</p>}
      <div className={styles.container}>
       {posts && posts.map((post)=>(
       <PostCard key={post._id} post={post} />
      ))}
      </div>

    </div>
  )
}

export default Search