import NavBar from './NavBar'
import Footer from './Footer'


const Layout = ({children}) => {

  return (
    <div className="layout">
      <NavBar/>
    
      {children}
     
      <Footer />
    </div>
  )
}

export default Layout