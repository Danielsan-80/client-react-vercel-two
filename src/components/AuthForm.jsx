import {useState} from 'react'
import Button from '../components/Button'
import {useSignupLogin} from '../hooks/useSignupLogin'
import {useLocation} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const AuthForm = () => {

  const navigate = useNavigate()
    const currLoc =  useLocation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, login, error, isLoading} = useSignupLogin()

      const handleSubmit = async (e)=> {
          e.preventDefault();
          if(currLoc.pathname === '/signup') {
          await signup(email, password)
          navigate('/blog')
          
      }

      if(currLoc.pathname === '/login') {
        await login(email, password)
        navigate('/blog')
        
      }
    }

  return (
    <form onSubmit={handleSubmit}>
    <div className="form-fields">
        <label>Email:</label>
        <input type="email" name="email"  onChange={(e)=>setEmail(e.target.value)} value={email}/>
        </div>

        <div className="form-fields password">
        <label>Password:</label>
        <input type="password" name="password"  onChange={(e)=>setPassword(e.target.value)} value={password}/>
        </div>

        <Button text="Submit"/>
        {error && <div className="error">{error}</div>}
    </form>
  )
}

export default AuthForm