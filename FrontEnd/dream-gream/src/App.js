import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PostSubject from './pages/Posting/postSubject';
import PostViewImage from './pages/Posting/postViewImage';
import PostDetail from './pages/Posting/postDetail';
import LogIn from './pages/members/Login';
import OAuth2RedirectHandler from './pages/members/OAuth2RedirectHandler';
import ProfileEdit from './pages/members/ProfileEdit';
import SignupGenderBirth from './pages/members/SiguUp';
import MyFeed from './pages/MyFeed/MyFeed';
import TwoSolidButton from './components/Button/TwoSolidButton';
import Navbar from './components/Common/Navbar';

function App() {
  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/Siginupgenderbirth" element={<SignupGenderBirth />} />
          <Route path="/TwoSolidButton" element={<TwoSolidButton />} />
        </Routes>
      </div>
      <div className="content">
        <Routes>
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
          <Route path="/profileedit" element={<ProfileEdit />} />
          <Route path="/follow" element={<followUser />} />
          <Route path="/following" element={<followingUser />} />
          <Route path="/findmember" element={<findMember />} />
          <Route path="/cheerupfeed" element={<cheerUpFeed />} />
          <Route path="/acheivefeed" element={<acheiveFeed />} />
          <Route path="/feedid" element={<feedDetail />} />
          <Route path="/post" element={<PostSubject />} />
          <Route path="/postdetail" element={<PostDetail />} />
          <Route path="/image" element={<PostViewImage />} />
          <Route path="/myfeed" element={<MyFeed />} />
          <Route path="/about" element={<viewAbout />} />
        </Routes>
      </div>
      <Navbar />
    </div>
  );
}

export default App;
