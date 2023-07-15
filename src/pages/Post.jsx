import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Badge from '../components/Badge'
import {getPost} from '../controllers/postController'

import styles from '../modules/post.module.css'


const Post = () => {

    const {id} = useParams()
    const [post, setPost] = useState({})
    const [featuredImg, setFeaturedImg] = useState('')
    
    function arrayBufferToBase64(buffer) {
      let binary = '';
      let bytes = new Uint8Array(buffer);
      let len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
  }
  
    
    useEffect(()=>{
        const fetchPost = async ()=>{
            const post = await getPost(id)
            setPost(post)
            setFeaturedImg(post.featuredImg)
        }
        fetchPost()
        console.log(post.featuredImg)
    },[])

    

  return (
    <div className={styles.container}>
   
    <div className="single-post">
        <div className="post-image">
        <img src={`data:image/jpg;base64,${arrayBufferToBase64(featuredImg.data)}`} />
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