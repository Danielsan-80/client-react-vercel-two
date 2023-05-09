import styles from '../modules/dashboard.module.css'
import {Link} from 'react-router-dom'
import {useAuthContext} from '../hooks/useAuthContext'
import {getPosts, deletePost} from '../controllers/postController'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Loading from '../components/Loading'


const Dashboard = () => {
  const navigate = useNavigate();
  const {user} = useAuthContext()
  const [posts, setPosts] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  
  const filteredPosts = posts.filter(post=>
    post.author.name===user.name)
  
  
  useEffect(()=>{
    const fetchPosts = async ()=>{
      
      const posts = await getPosts()
     
    setPosts(posts)
    setLoading(false);
  }

  fetchPosts()
  
  }, [posts])


  const handleDelete = async (id) =>{
     
    const json = await deletePost(id)

    setMessage(json.message)
    setTimeout(()=>{
      navigate('/blog')
  }, 3000)

  }

  return (
 
    <div className={styles.container}>
    <h1>{user.name}'s Dashboard</h1>

    {filteredPosts.length !== 0 ?  
    <table className='dashboardTable'>
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
        <td className='dashboard-post-title'><Link to={'/posts/'+post._id}>{post.title}</Link>
        </td>
        <td>{post.body.substring(0,20)+'...'}</td>
        <td>{Intl.DateTimeFormat("it-IT", {weekday: "long", month: "short", year: "numeric", day: "numeric"}).format(new Date(post.updatedAt))}</td>
        <td>       
        
        <Link to={'/update/'+post._id}>
            <button className='btn'>
            <i className='fa fa-pen'></i>
            </button>
          </Link>
            
        </td>
        <td>
          <button onClick={()=>handleDelete(post._id)}className='btn'><i className='fa fa-trash'></i></button>
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
    <button className='btn btn-create'>
            Add New
    </button>
    </Link>
    {message && <p>{message}</p>}
    </div>
  )
}

export default Dashboard