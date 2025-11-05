import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Reader from './pages/Reader';
import Editor from './pages/Editor';
import Profile from './pages/Profile';
import Header from './components/Header';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function App(){
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u);
    });
    return ()=> unsub();
  },[]);

  return (
    <div className="min-h-screen">
      <Header user={user} />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/read/:id" element={<Reader user={user} />} />
          <Route path="/editor" element={<Editor user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
        </Routes>
      </div>
    </div>
  )
}
