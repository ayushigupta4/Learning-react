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
      //document.title = 'TextUtils - Dark Mode';
      // setInterval(() => {
      //   document.title = 'Intall TextUtils Now';
      // }, 2000);
      // setInterval(() => {
      //   document.title = 'TextUtils';
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
      <Navbar title="TextUtils" home="Home" about="About Us" mode={mode} toggleMode={toggleMode}/>
      <Alert alert={alert}/>
      <div className="container my-3">
          <Routes>
          <Route exact path='/about' element={<About mode={mode} />} />
          <Route exact path='/' element={<TextForm showAlert={showAlert} heading="Try TextUtils - Word Counter, Character Counter, Listen" mode={mode} />} />
          </Routes>
      </div>

      </BrowserRouter>
    </>
  );
}

export default App;
