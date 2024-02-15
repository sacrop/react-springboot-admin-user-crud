import './App.css';
import { Route,Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage';
import AdminHome from './components/pages/AdminHome';
import UserHome from './components/pages/UserHome';
import AdminMan from './components/pages/AdminMan';
import CreateUser from './components/pages/CreateUser';
import AdminProfilePage from './components/pages/AdminProfilePage';
import UserProfilePage from './components/pages/UserProfilePage';


function App() {
  return (
      <div className="App">
     <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/user' element={<UserHome/>}/>
      <Route path='/admin' element={<AdminHome/>}/>
      <Route path='/admin/profile' element={<AdminProfilePage/>}/>
      <Route path='/admin/userman' element={<AdminMan/>}/>
      <Route path='/admin/createUser' element={<CreateUser/>}/>
      <Route path='/profile' element={<UserProfilePage/>}/>
     </Routes>
    </div>

  );
}


export default App;
