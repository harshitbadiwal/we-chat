
import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Login from './Auth/Login';
import Register from './Auth/Register';
import Home from './Home/Home';
import Chat from './wechatComponent/Chat';

function App() {
  return (
    <div className="App">
  <Router>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/register' element={<Register/>}/>
      <Route path='/home' element={< Home/>} />
      <Route path='/home/:id' element={ <Chat/>} />
    </Routes>
  </Router>
     
    </div>
  );
}

export default App;
