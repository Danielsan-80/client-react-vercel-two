import {useState} from 'react'
import Button from './Button'
import {FaSearch} from 'react-icons/fa'



const SearchForm = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const handleSearch = async (e)=>{
        e.preventDefault()
        console.log(searchTerm)
    }

  return (
    <form onSubmit={handleSearch} className="searchform">
        
        
        <input type="text" name="search" onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search"/>
        <i><FaSearch style={{color: 'rgb(0, 209, 87)'}} /></i>
        
        
        
    </form>
  )
}

export default SearchForm