import './App.css';
import { Route,Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage';
import AdminHome from './components/pages/AdminHome';
import UserHome from './components/pages/UserHome';
import UserProfile from './components/pages/UserProfile';
import AdminProfile from './components/pages/AdminProfile';
import AdminMan from './components/pages/AdminMan';

function App() {
  return (
      <div className="App">
     <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/user' element={<UserHome/>}/>
      <Route path='/admin' element={<AdminHome/>}/>
      <Route path='/admin/profile' element={<AdminProfile/>}/>
      <Route path='/admin/userman' element={<AdminMan/>}/>
      <Route path='/profile' element={<UserProfile/>}/>
     </Routes>
    </div>

  );
}


export default App;
