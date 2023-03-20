import Button from './Button'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { createPost } from '../controllers/postController'
import {useAuthContext} from '../hooks/useAuthContext'


const Form = () => {

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState( 'fashion')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const {user} = useAuthContext()


  const handleSubmit = async (e)=>{
    e.preventDefault()

    const post = {
      title, body, category
    }

    const res = await createPost(post, user.token);
    const json = await res.json()

    if(!res.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
      setMessage(null)
      console.log(error, emptyFields)
    }

    if(res.ok){
      setTitle('')
      setBody('')
      setCategory('fashion')
      setError(null)
      setEmptyFields([])
      setMessage(json.message)
      setTimeout(()=>{
        navigate('/blog')
      }, 3000)
    }

   

  }


  return (
    <form onSubmit={handleSubmit}>
        <div className="form-fields">
        <label>Title:</label>
        <input type="text" name="title"  onChange={(e)=>setTitle(e.target.value)} value={title}/>
        </div>
        <div className="form-fields">
        <label>Body:</label>
        <textarea name="body" cols="18" onChange={(e)=>setBody(e.target.value)} value={body}>
        </textarea>
        </div>
        <div className="form-fields select">
        <label>Category:</label>
        <select name="category" onChange={(e)=>setCategory(e.target.value)} value={category}>
          <option value="travel">Travel</option>
          <option value="fashion">Fashion</option>
          <option value="art">Art</option>
          <option value="literature">Literature</option>
        </select>
        </div>
        {error && <div className="error">{error}</div>}
        {message && <div className="message">{message}</div>}

        <Button text="Submit"/>
        
 
       
    </form>
  )
}

export default Form