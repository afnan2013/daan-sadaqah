import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AboutScreen from './screens/footerScreens/AboutScreen';
import UsefullLinksScreen from './screens/footerScreens/UsefullLinksScreen';
import WhatWeDoScreen from './screens/footerScreens/WhatWeDoScreen';
import PressReleaseScreen from './screens/footerScreens/PressReleaseScreen';
import PhotoGalleryScreen from './screens/footerScreens/PhotoGalleryScreen';
import CareerScreen from './screens/footerScreens/CareerScreen';
import ContactUsScreeen from './screens/footerScreens/ContactUsScreeen';
import HowtoUseScreen from './screens/footerScreens/HowtoUseScreen';
import VideoTutorialScreen from './screens/footerScreens/VideoTutorialScreen';
import SupportScreen from './screens/footerScreens/SupportScreen';
import MobileAppScreen from './screens/footerScreens/MobileAppScreen';
import OnlineSupportScreen from './screens/footerScreens/OnlineSupportScreen';
import ProfileScreen from './screens/ProfileScreen';
import PostScreen from './screens/PostScreen';
import ForgetPassScreen from './screens/ForgetPassScreen';
import MyAccount from './components/profile/MyAccount';
import Identity from './components/profile/myaccount/Identity';
import NameAndAddresses from './components/profile/myaccount/NameAndAddresses';
import Nominee from './components/profile/myaccount/Nominee';
import PaymentMethod from './components/profile/myaccount/PaymentMethod';
import MyPosts from './components/profile/MyPosts';
import MyPostsLists from './components/profile/myposts/MyPostsLists';
import SinglePost from './components/profile/myposts/SinglePost';
import FeesAndDues from './components/profile/FeesAndDues';
import CreatePost from './components/profile/CreatePost';
import PostRules from './components/profile/createpost/PostRules';
import PostForm from './components/profile/createpost/PostForm';
import DonateScreen from './screens/DonateScreen';
import PostReviewScreen from './screens/PostReviewScreen';
import PostApproveScreen from './screens/PostApproveScreen';
import PostDisburseScreen from './screens/PostDisburseScreen';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Header />
        <Routes>
          {/* Footer Routes */}
          <Route path="/mobileapp" element={<MobileAppScreen />} />
          <Route path="/onlinesupport" element={<OnlineSupportScreen />} />
          <Route path="/support" element={<SupportScreen />} />
          <Route path="/videotutorial" element={<VideoTutorialScreen />} />
          <Route path="/howtouse" element={<HowtoUseScreen />} />
          <Route path="/contactus" element={<ContactUsScreeen />} />
          <Route path="/career" element={<CareerScreen />} />
          <Route path="/photogallery" element={<PhotoGalleryScreen />} />
          <Route path="/pressrelease" element={<PressReleaseScreen />} />
          <Route path="/whatwedo" element={<WhatWeDoScreen />} />
          <Route path="/usefulLinks" element={<UsefullLinksScreen />} />
          <Route path="/about" element={<AboutScreen />} />

          <Route path="/posts" element={<PostScreen />} />
          <Route path="/donate/:id" element={<DonateScreen />} />
          <Route path="/reviewpostlist" element={<PostReviewScreen />} />
          <Route path="/approvepostlist" element={<PostApproveScreen />} />
          <Route path="/disbursependings" element={<PostReviewScreen />} />

          {/* User Routes */}
          <Route path="/forgetpassword" element={<ForgetPassScreen />} />
          <Route path="/profile" element={<ProfileScreen />}>
            <Route path="myaccount" element={<MyAccount />}>
              <Route path="identity" element={<Identity />}></Route>
              <Route
                path="nameandaddress"
                element={<NameAndAddresses />}
              ></Route>
              <Route path="paymentmethod" element={<PaymentMethod />}></Route>
              <Route path="nominee" element={<Nominee />}></Route>
            </Route>
            <Route path="myposts" element={<MyPosts />}>
              <Route path="lists" element={<MyPostsLists />}></Route>
              <Route path=":id" element={<SinglePost />}></Route>
            </Route>
            <Route path="feesanddues" element={<FeesAndDues />}></Route>
            <Route path="createpost" element={<CreatePost />}>
              <Route path="rules" element={<PostRules />}></Route>
              <Route path="form" element={<PostForm />}></Route>
            </Route>
          </Route>
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />

          <Route path="/" element={<HomeScreen />} />
        </Routes>
        <Footer />
      </Router>
    );
  }
}

export default App;
