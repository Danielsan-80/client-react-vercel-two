import Button from './Button'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { updatePost } from '../controllers/postController'
import {Editor} from '@tinymce/tinymce-react'

const UpdateForm = ({originalPost}) => {

  const navigate = useNavigate()

  const [title, setTitle] = useState(originalPost.title)
  const [body, setBody] = useState(null)
  const [category, setCategory] = useState(originalPost.category)
  const [tags, setTags] = useState( originalPost.tags)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  

  const handleUpdate = async (e)=>{
    e.preventDefault()
    
    const post = {
      title, body, category, tags
    }

    const res = await updatePost(originalPost._id, post)
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

        <Editor
        //  onInit={(evt, editor) => editorRef.current = editor}
        onChange={(evt, editor)=>setBody(editor.getContent())}
         initialValue={originalPost.body}
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
        <select name="category" onChange={(e)=>setCategory(e.target.value)} defaultValue={originalPost.category}>
          <option selected="selected">{originalPost.category}</option>
          <option value="travel">Travel</option>
          <option value="fashion">Fashion</option>
          <option value="art">Art</option>
          <option value="literature">Literature</option>
        </select>
        </div>
        <div className="form-fields">
        <label>Tags :</label>
        <input name="tags" onChange={(e)=>setTags(e.target.value)} defaultValue={originalPost.tags}>
        </input>
        </div>
        {error && <div className="error">{error}</div>}
        {message && <div className="message">{message}</div>}

        <Button text="Update"/>
       
    </form>

    <div className="btn" style={{display: 'inline-block', marginTop: '20px'}}>&larr; Go Back</div>
  
    </>
  )
}

export default UpdateForm