//StyleSheets
import './App.css';
import './stylesheets/colors.css'
import './stylesheets/spacing.css'
import './stylesheets/Post.css'

import { ReactLenis } from '@studio-freight/react-lenis';

import { Routes , Route } from "react-router-dom";

import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';

import RegularUserRoute from './routes/regularUserRoute';
import VerifiedUserRoute from './routes/verifiedUserRoute';
import AdminRoute from './routes/adminRoute';

import RegularUserFeed from './pages/Regular User/RegularUserFeed';
import RegularUserHome from './pages/Regular User/Home';
import RegularUserProfile from './pages/Regular User/Profile';
import RegularUserMessage from './pages/Regular User/Message';
import RegularUserMyConnects from './pages/Regular User/MyConnects';
import RegularUserJob from './pages/Regular User/Job';
import RegularUserSettings from './pages/Regular User/Settings';

import GetAllPosts from './components/Post Components/GetAllPosts';
import PostDetails from './components/Post Components/PostDetails';

import GetAllBlogs from './components/Blog Components/GetAllBlogs'
import BlogDetails from './components/Blog Components/BlogDetails';

import GetAllProjects from './components/Project Components/GetAllProjects';
import ProjectDetails from './components/Project Components/ProjectDetails';

import GetAllNewsletter from './components/Newsletter Components/GetAllNewsletter';
import NewsletterDetails from './components/Newsletter Components/NewsletterDetails';

import VerifiedUserFeed from './pages/Verified User/VerifiedUserFeed';
import VerifiedUserHome from './pages/Verified User/Home';
import VerifiedUserProfile from './pages/Verified User/Profile';
import VerifiedUserMessage from './pages/Verified User/Message';
import VerifiedUserMyConnects from './pages/Verified User/MyConnects';
import VerifiedUserJob from './pages/Verified User/Job';
import VerifiedUserNewsletter from './pages/Verified User/Newsletter';
import VerifiedUserSettings from './pages/Verified User/Settings';


import AdminFeed from './pages/Admin/AdminFeed';
import AdminHome from './pages/Admin/Home';
import AdminProfile from './pages/Admin/Profile';
import AdminMessage from './pages/Admin/Message';
import AdminMyConnects from './pages/Admin/MyConnects';
import AdminJob from './pages/Admin/Job';
import AdminNewsletter from './pages/Admin/Newsletter';
import AdminModeratorDashboard from './pages/Admin/ModeratorDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminSettings from './pages/Admin/Settings';
import ProfileDetails from './components/Profile Components/ProfileDetails';



function App() {
  return (
    <ReactLenis root>
      <div className='App'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path='/regular-user' element={<RegularUserRoute/>}>
            <Route path='feed' element={<RegularUserFeed/>}>
              <Route index element={<RegularUserHome/>}></Route>
              <Route path='home' element={<RegularUserHome/>}>
                <Route index element={<GetAllPosts />}></Route>
                <Route path='post' element={<GetAllPosts />}></Route>
                <Route path='post/:_id' element={<PostDetails />}></Route>
                <Route path='blog' element={<GetAllBlogs />}></Route>
                <Route path='blog/:_id' element={<BlogDetails />}></Route>
                <Route path='project' element={<GetAllProjects />}></Route>
                <Route path='project/:_id' element={<ProjectDetails />}></Route>
                <Route path='newsletter' element={<GetAllNewsletter />}></Route>
                <Route path='newsletter/:_id' element={<NewsletterDetails />}></Route>
              </Route>
              <Route path='profile' element={<RegularUserProfile/>}></Route>
              <Route path='message' element={<RegularUserMessage/>}></Route>
              <Route path='my-connects' element={<RegularUserMyConnects/>}></Route>
              <Route path='my-connects/:_id' element={<ProfileDetails />}></Route>
              <Route path='job' element={<RegularUserJob/>}></Route>
              <Route path='settings' element={<RegularUserSettings/>}></Route>
            </Route>
          </Route>

          <Route path='/verified-user' element={<VerifiedUserRoute/>}>
            <Route path='feed' element={<VerifiedUserFeed/>}>
              <Route index element={<VerifiedUserHome/>}></Route>
              <Route path='home' element={<VerifiedUserHome/>}>
                <Route index element={<GetAllPosts />}></Route>
                <Route path='post' element={<GetAllPosts />}></Route>
                <Route path='post/:_id' element={<PostDetails />}></Route>
                <Route path='blog' element={<GetAllBlogs />}></Route>
                <Route path='blog/:_id' element={<BlogDetails />}></Route>
                <Route path='project' element={<GetAllProjects />}></Route>
                <Route path='project/:_id' element={<ProjectDetails />}></Route>
                <Route path='newsletter' element={<GetAllNewsletter />}></Route>
                <Route path='newsletter/:_id' element={<NewsletterDetails />}></Route>
              </Route>
              <Route path='profile' element={<VerifiedUserProfile/>}></Route>
              <Route path='message' element={<VerifiedUserMessage/>}></Route>
              <Route path='my-connects' element={<VerifiedUserMyConnects/>}></Route>
              <Route path='job' element={<VerifiedUserJob/>}></Route>
              <Route path='newsletter' element={<VerifiedUserNewsletter/>}></Route>
              <Route path='settings' element={<VerifiedUserSettings/>}></Route>
            </Route>
          </Route>

          <Route path='/admin' element={<AdminRoute/>}>
            <Route path='feed' element={<AdminFeed/>}>
              <Route index element={<AdminHome/>}></Route>
              <Route path='home' element={<AdminHome/>}>
                <Route path='post' element={<GetAllPosts />}></Route>
                <Route path='post/:_id' element={<PostDetails />}></Route>
                <Route path='blog' element={<GetAllBlogs />}></Route>
                <Route path='blog/:_id' element={<BlogDetails />}></Route>
                <Route path='project' element={<GetAllProjects />}></Route>
                <Route path='project/:_id' element={<ProjectDetails />}></Route>
                <Route path='newsletter' element={<GetAllNewsletter />}></Route>
                <Route path='newsletter/:_id' element={<NewsletterDetails />}></Route>
              </Route>
              <Route path='profile' element={<AdminProfile/>}></Route>
              <Route path='message' element={<AdminMessage/>}></Route>
              <Route path='my-connects' element={<AdminMyConnects/>}></Route>
              <Route path='my-connects/:_id' element={<ProfileDetails />}></Route>
              <Route path='job' element={<AdminJob/>}></Route>
              <Route path='newsletter' element={<AdminNewsletter/>}></Route>
              <Route path='moderator-dashboard' element={<AdminModeratorDashboard/>}></Route>
              <Route path='admin-dashboard' element={<AdminDashboard/>}></Route>
              <Route path='settings' element={<AdminSettings/>}></Route>
            </Route>
          </Route>

          <Route path='profile/:_id' element={<ProfileDetails />}></Route>
        </Routes>
      </div>
    </ReactLenis>
  );
}

export default App;
