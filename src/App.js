import './App.css';
import { Routes , Route } from "react-router-dom";

import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';

import UserRoute from './routes/userRoute';
import UserFeed from './pages/RegularUser/RegularUserFeed';
import UserProfile from './pages/RegularUser/RegularUserProfile';

import AdminRoute from './routes/adminRoute';
import AdminFeed from './pages/Admin/AdminFeed';
import AdminProfile from './pages/Admin/AdminProfile';

import AdministratorRoute from './routes/administratorRoute';

import VerifiedUserRoute from './routes/verifiedUserRoute';


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<HomePage />} />      
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path='/feed' element={<UserRoute />}>
          <Route path='user-feed' element={<UserFeed />} />
          <Route path='user-profile' element={<UserProfile />} />
        </Route>

        <Route path='/feed' element={<AdminRoute />}>
          <Route path='admin-feed' element={<AdminFeed />} />
          <Route path='admin-profile' element={<AdminProfile />} />
        </Route>

        <Route path='/feed' element={<VerifiedUserRoute /> }>
        </Route>

        <Route path='/feed' element={<AdministratorRoute/> }>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
