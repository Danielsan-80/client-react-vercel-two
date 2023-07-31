import {useState} from 'react'
import {FaSearch} from 'react-icons/fa'

import { useNavigate } from 'react-router-dom'


const SearchForm = () => {
  const navigate = useNavigate()

    const [searchTerm, setSearchTerm] = useState('')
    const handleSearch = async (e)=>{
        
      e.preventDefault()
        
      e.target.reset()
      navigate('/search?term='+searchTerm)
        
    }

  return (
    <form onSubmit={handleSearch} className="searchform">
        
        
        <input type="text" name="search" onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search"/>
        <i><FaSearch style={{color: 'rgb(0, 209, 87)'}} /></i>
        
        
    </form>
  )
}

export default SearchForm