import TextEditor from './components/TextEditor'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom'
import {v4 as uuidV4} from 'uuid'
import Login from './components/Login'
import './App.css'
import Home from './components/Home'

function Header() {
  const location = useLocation();
  const hideOnPaths = ['/documents/'];
  console.log(location.pathname)
  if (hideOnPaths.some(path => location.pathname.startsWith(path))) {
    return null;
  }
  return (
    <div className='home-root'>
      <h2 className='home-header'>Shared Drive</h2>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path= "/" element ={<Login/>}/>
        <Route path= "/home" element={<Home/>}></Route>
        <Route path= "/documents/:id" element={<TextEditor/>} />
      </Routes>
    </Router>
  );
}

export default App;