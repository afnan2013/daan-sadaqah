import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Slider from './components/Slider';

function App() {
  return (
    <Router>
      <Header />
      <Slider />
      <Footer />
    </Router>
  );
}

export default App;
