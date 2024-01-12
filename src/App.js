import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Header from './components/Header'
import Home from './pages/Home';
import ProfilePic from './pages/ProfilePic';

function App() {
  const navigate = useNavigate();

  const renderHeader = () => {
    const excludedRoutes = ['/chat', '/profilePic']
    if (!excludedRoutes.includes(window.location.pathname)) {
      return <Header />;
    }
    return null;
  };
  return (
    <>
      {renderHeader()} 
       <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/register' element={<Register/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/chat' element={<Chat/>}/>
       <Route path='/profilePic' element={<ProfilePic/>}/>
      </Routes>
    </>
  );
}

export default App;
