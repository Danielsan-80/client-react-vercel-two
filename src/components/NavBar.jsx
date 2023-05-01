import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';
import {useNavigate} from 'react-router-dom'



const NavBar = () => {

  const [lastPos, setLastPos] = useState(0);
  const [showNav, setShowNav] = useState(true)
  const {logout} = useLogout()
  const {user} = useAuthContext()
  const navigate = useNavigate()

  const handleLogout = ()=> {
    logout()
    navigate('/login')
  }

  useEffect(()=>{
   
    const handleScroll = e => {
    setLastPos(window.scrollY)
    if(lastPos < window.scrollY){
      setShowNav(false)
   }
   else 
   setShowNav(true)} 

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };


  }, [lastPos])

  

  return (
    
   <nav className={showNav ? '' : 'navslideUp'}>
  
    <div className="logo">
    <Link to='/'><p><span>Web</span>Dev</p></Link>
    </div>
    <div className="nav-links">
        <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/blog'>Blog</Link></li>

        {!user && (
          <>
          <li className='auth'><Link to='/login'><i className="fa-solid fa-sign-in" aria-hidden="true"></i>Login</Link></li>
          <li className='auth'><Link to='/signup'><i className="fa-solid fa-envelope" aria-hidden="true"></i>Signup</Link></li>
          </>
        )}
       
        {user && (
          <>
           <li className='auth'><Link to='/dashboard'><i className="fa-solid fa-user" aria-hidden="true"></i>{user.name}</Link></li>
          <li className='auth' onClick={handleLogout}><a><i className="fa-solid fa-sign-out" aria-hidden="true"></i>Logout</a></li>
          </>
        )}
       
        </ul>
    </div>

   </nav>
  
  )
}

export default NavBar