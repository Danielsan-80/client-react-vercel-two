import Button from './Button'
import {useState, useEffect, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import { createPost } from '../controllers/postController'
import {useAuthContext} from '../hooks/useAuthContext'
import { Editor } from '@tinymce/tinymce-react'


const Form = () => {
  
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState( 'fashion')
  const [tags, setTags] = useState('')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const {user} = useAuthContext()
  const editorRef = useRef(null);
  

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const postTags = tags.split(',');
    const post = {
      title, body: editorRef.current.getContent(), category, tags:postTags
    }
   
    const res = await createPost(post, user);
    
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
      setTags('')
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
       
        <Editor
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue="<p>This is the initial content of the editor.</p>"
         init={{
           height: 500,
           menubar: true,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Montserrat, sans-serif; font-size:16px }'
         }}
       />
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
        <div className="form-fields">
        <label>Tags :</label>
        <input name="tags" onChange={(e)=>setTags(e.target.value)} value={tags}>
        </input>
        </div>
        {error && <div className="error">{error}</div>}
        {message && <div className="message">{message}</div>}

        <Button text="Submit"/>
        
 
       
    </form>
  )
}

export default Form