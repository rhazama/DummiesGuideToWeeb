import logo from './assets/images/logo.png';
import react from 'react';
import Homepage from './pages/Homepage.js';
// import User from './pages/User.js';
// import Anime from './pages/Anime.js';
import './App.css';
// import { appNavbar } from './components/Navbar';
function App() {
  return (
    <div className="App">
      {/* <appNavbar/> */}
      <h1>Project3</h1>
      <Homepage/>
    </div>
  );
}

export default App;
