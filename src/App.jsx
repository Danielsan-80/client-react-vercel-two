
import Blog from './pages/Blog'
import Create from './pages/Create'
import Landing from './pages/Landing'
import Layout from './components/Layout'
import Post from './pages/Post'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <Layout>
    <Routes>
      
        <Route path="/" element={<Landing />} />
        <Route path="/blog" exact element={<Blog />} />
        <Route path="/create" exact element={<Create />} /> 
        <Route path="/signup" exact element={<Signup />} /> 
        <Route path="/login" exact element={<Login />} /> 
        <Route path="/posts/:id"  element={<Post />} /> 
        
    </Routes>
   
    </Layout>
   
  )
}

export default App
