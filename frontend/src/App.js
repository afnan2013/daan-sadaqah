import './App.css';
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

function App() {
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

        {/* User Routes */}
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />

        <Route path="/" element={<HomeScreen />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
