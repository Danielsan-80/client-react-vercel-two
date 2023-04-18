//import styles from '../modules/dashboard.module.css'
import {Link} from 'react-router-dom'
import {useAuthContext} from '../hooks/useAuthContext'
import {getPosts} from '../controllers/postController'
import {useState, useEffect} from 'react'
import Loading from '../components/Loading'


const Dashboard = () => {
  const {user} = useAuthContext()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const filteredPosts = posts.filter(post=>
    post.author.name===user.name)
  
  useEffect(()=>{
    const fetchPosts = async ()=>{
      
      const posts = await getPosts()
     
    setPosts(posts)
  }

  fetchPosts()
  setLoading(false);
  }, [posts])


  const handleDelete = async(id)=>{
    await fetch('/api/posts/'+id, {
      method: 'DELETE'
    })
  }

  return (
    <div style={{color:"white"}}>
    <h1> Dashboard</h1>

    
    {filteredPosts.length != 0 ?  
    <table>
      <thead>
    <tr>
      <th>Title</th>
      <th>Description</th>
      <th>Published</th>
    </tr>
    </thead>
    <tbody >
      {filteredPosts.map(post=>(
        <tr key={post._id}>
        <td>{post.title} - {post.author.name}</td>
        <td>{post.body.substring(0,20)+'...'}</td>
        <td>{Intl.DateTimeFormat("it-IT", {weekday: "long", month: "short", year: "numeric", day: "numeric"}).format(new Date(post.updatedAt))}</td>
        <td>       
        
        <Link to={'/update/'+post._id}>
            <button>
            Update
            </button>
          </Link>
            
        </td>
        <td>
          <button onClick={()=>handleDelete(post._id)}>Delete</button>
        </td>
      </tr>
      ))}
    </tbody>
    </table>
    
    :

    <div>
    {loading ? <Loading />
    : 
    <>
    <h1>You have no posts yet !</h1>
    <p>Time to write something...</p>
    </>
      }
  </div>
    }

    <Link to="/create">
      Add new Post
    </Link>
    </div>
  )
}

export default Dashboard