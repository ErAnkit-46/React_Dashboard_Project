import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  return (
    <UserContext.Provider value={{ email, setEmail, profilePicture, setProfilePicture }}>
      {children}
    </UserContext.Provider>
  );
};

const MyProfileContent = () => {
  const { email, profilePicture, setProfilePicture } = useContext(UserContext);

  const [file, setFile] = useState(null);

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = 'http://localhost:3000/uploadFile';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
      setProfilePicture(response.data.fileUrl);
    });
  }

  return (
    <div className="profile-content">
      <p>Email: {email}</p>
      {profilePicture && (
        <img src={profilePicture} alt="Profile" className="profile-picture" />
      )}
      <input type="file" onChange={handleChange} />
      <button type="submit" onClick={handleSubmit}>Upload Profile Picture</button>
    </div>
  );
};

export { UserProvider, UserContext, MyProfileContent };
