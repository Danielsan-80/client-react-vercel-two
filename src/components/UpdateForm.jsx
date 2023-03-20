import Button from './Button'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { updatePost } from '../controllers/postController'

const UpdateForm = ({id, cancelUpdate, originalPost}) => {

  const navigate = useNavigate()

  const [title, setTitle] = useState(originalPost.title)
  const [body, setBody] = useState(originalPost.body)
  const [category, setCategory] = useState( originalPost.category)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])


  const handleUpdate = async (e)=>{
    e.preventDefault()

    const post = {
      title, body, category
    }

    const res = await updatePost(id, post)
    const json = await res.json()

    if(!res.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
      setMessage(null)
      console.log(error, emptyFields)
    }

    if(res.ok){
      
      setError(null)
      setEmptyFields([])
      setMessage(json.message)
      setTimeout(()=>{
        navigate('/blog')
      }, 3000)
    }

  }


  return (
    <>
    <h1>Update Post</h1>
    <form onSubmit={handleUpdate}>
        <div className="form-fields">
        <label>Title:</label>
        <input type="text" name="title"  onChange={(e)=>setTitle(e.target.value)} defaultValue={originalPost.title} />
        </div>
        <div className="form-fields">
        <label>Body:</label>
        <textarea name="body" cols="18" onChange={(e)=>setBody(e.target.value)} defaultValue={originalPost.body}>
        </textarea>
        </div>
        <div className="form-fields select">
        <label>Category:</label>
        <select name="category" onChange={(e)=>setCategory(e.target.value)} defaultValue={originalPost.category}>
          <option value="travel">Travel</option>
          <option value="fashion">Fashion</option>
          <option value="art">Art</option>
          <option value="literature">Literature</option>
        </select>
        </div>
        {error && <div className="error">{error}</div>}
        {message && <div className="message">{message}</div>}

        <Button text="Update"/>
       
    </form>

    <div className="btn" style={{display: 'inline-block', marginTop: '20px'}} onClick={cancelUpdate}>&larr; Go Back</div>
  
    </>
  )
}

export default UpdateForm