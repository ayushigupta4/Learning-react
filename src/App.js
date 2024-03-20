import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import { useState } from 'react';
import Alert from './components/Alert';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light'); //Whether dark mode is enabled or not
  const [alert, setAlert] = useState(null);
  const [colorMode, setColorMode] = useState('success');

  const changeColorMode = (clr) => {
    if(clr === 'success'){
      setColorMode('success');
    }
    else if(clr === 'warning') {
      setColorMode('warning');
    }
    else if(clr === 'info') {
      setColorMode('info');
    }
    else if(clr === 'danger') {
      setColorMode('danger');
    }
  }


  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(()=> {
      setAlert(null);
    }, 1500);
  }


  const toggleMode = () => {
    if(mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#454545';
      showAlert("Dark mode has been enabled", "success");
      //document.title = 'Texter - Dark Mode';
      // setInterval(() => {
      //   document.title = 'Intall Texter Now';
      // }, 2000);
      // setInterval(() => {
      //   document.title = 'Texter';
      // }, 1500);
    }  
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled", "success");
    }
      
  }
  return (
    <>
      <BrowserRouter>
      <Navbar title="Texter" home="Home" about="About Us" mode={mode} toggleMode={toggleMode} changeColorMode={changeColorMode}/>
      <Alert alert={alert}/>
      <div className="container my-3">
          <Routes>
          <Route exact path='/about' element={<About mode={mode} />} />
          <Route exact path='/' element={<TextForm showAlert={showAlert} heading="Try Texter - Word Counter, Character Counter, Listen" mode={mode} colorMode={colorMode} />} />
          </Routes>
      </div>

      </BrowserRouter>
    </>
  );
}

export default App;
