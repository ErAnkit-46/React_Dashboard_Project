import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Appbar from './Appbar.js';
import './App.css';
import Login from './login.js';
import Registration from './Registration.js';
import Forget from './Forget.js';
import SettingsPopup from './SettingsPopup';
import { UserProvider } from './MyProfileContent';
import { MyProfileContent } from './MyProfileContent';
import { LanguageProvider } from './LanguageContext';
import { ThemeProvider, ThemeSettings } from './ThemeSettings';

function App() {
  return (
    <ThemeProvider>
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
            <ThemeSettings />
          </BrowserRouter>
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App; 

