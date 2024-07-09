import Appbar from './Appbar.js'
import './App.css';
import Login from './login.js'
import Registration from './Registration.js'
import Forget from './Forget.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dash" element={<Appbar />} />
        <Route path="/forget" element={<Forget />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;

