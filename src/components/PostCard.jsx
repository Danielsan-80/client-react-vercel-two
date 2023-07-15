import Badge from './Badge'
import {Link} from 'react-router-dom'

const PostCard = ({post}) => {

  const featuredImg = post.featuredImg
  
  function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

  return (  
      <div className="post-card">
        {featuredImg ? <img src={`data:image/jpg;base64,${arrayBufferToBase64(featuredImg.data)}`} /> : <img src="//unsplash.it/700/700" alt="" />}
        
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