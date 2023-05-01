import { useAuthContext } from './hooks/useAuthContext'
import Blog from './pages/Blog'
import Create from './pages/Create'
import Update from './pages/Update'
import Landing from './pages/Landing'
import Layout from './components/Layout'
import Post from './pages/Post'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { Route, Routes, Navigate } from "react-router-dom";

function App() {

  const {user}= useAuthContext();

  return (
    <Layout>
    <Routes>
      
        <Route path="/" element={<Landing />} />
        <Route path="/blog" exact element={<Blog />} />
        <Route path="/create" exact element={user?<Create />:<Navigate to="/login" replace />} /> 
        <Route path="/signup" exact element={!user?<Signup />: <Navigate to="/dashboard" replace />} /> 
        <Route path="/login" exact element={!user?<Login />: <Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" exact element={user ? <Dashboard /> : <Navigate to="/login" replace/>} />
        
        <Route path="/posts/:id"  element={<Post />} /> 
        <Route path="/update/:id"  element={user?<Update />:<Navigate to="/login" />} /> 
        
    </Routes>
   
    </Layout>
   
  )
}

export default App
