import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import Header from './Component/Header';
import Footer from './Component/Footer';


function App() {
  return (
    <>
    <Header/>
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/sign-in' element={<Signin/>}/>
      <Route path='/sign-up' element={<Signup/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/contactus' element={<Projects/>}/>
    </Routes>
     </>
     <Footer/>
     </>
  );
}

export default App;
