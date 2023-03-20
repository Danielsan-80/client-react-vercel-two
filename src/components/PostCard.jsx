import Badge from './Badge'
import {Link} from 'react-router-dom'

const PostCard = ({post}) => {

  return (  
      <div className="post-card">
        <img src="//unsplash.it/700/700" alt="" />
      <div>
        <Link to={'/posts/'+post._id}><h2>{post.title}</h2></Link>
        <div className="post-details">
        Published: <Badge content={new Date(post.createdAt).toLocaleDateString()}/>
        Category: <Badge content={post.category}/>
        </div>
        <Link to={'/posts/'+post._id}><p>{post.body.slice(0, 200)}... &rarr;</p></Link>
        
      </div>
      </div>

  )
}

export default PostCard