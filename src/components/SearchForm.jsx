import {useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import { searchPost } from '../controllers/postController'
import { useNavigate } from 'react-router-dom'


const SearchForm = () => {
  const navigate = useNavigate()

    const [searchTerm, setSearchTerm] = useState('')
    const handleSearch = async (e)=>{
        
        e.preventDefault()
        const posts = await searchPost(searchTerm)
        e.target.reset()
        navigate('/search', {state: posts})
        
    }

  return (
    <form onSubmit={handleSearch} className="searchform">
        
        
        <input type="text" name="search" onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search"/>
        <i><FaSearch style={{color: 'rgb(0, 209, 87)'}} /></i>
        
        
    </form>
  )
}

export default SearchForm