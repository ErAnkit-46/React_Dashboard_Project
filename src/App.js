import Appbar from './Appbar.js'
import './App.css';
import Login from './login.js'
import Registration from './Registration.js'
import Forget from './Forget.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import SettingsPopup from './SettingsPopup';
import SwitchAccountContent from './SwitchAccountContent';
import { UserProvider } from './MyProfileContent';
import { MyProfileContent } from './MyProfileContent';


function App() {
  return (
    <LanguageProvider>
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dash" element={<Appbar />} />
        <Route path="/forget" element={<Forget />} />
	<Route path="/" element={<SettingsPopup open={true} onClose={() => {}} />} />
	<Route path="/profile" element={<MyProfileContent />} />

      </Routes>
    </BrowserRouter>
    </UserProvider>
    </LanguageProvider>
  );
}


export default App;

