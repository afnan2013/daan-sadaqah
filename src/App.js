import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';

import HomeScreen from './screens/HomeScreen';
import Slider from './components/Slider';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
