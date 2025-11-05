import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function Header({ user }){
  return (
    <header className="flex items-center justify-between container mx-auto px-4 py-4">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center text-xl font-bold text-yellow-300">LN</div>
        <div>
          <div className="text-lg font-bold">Đọc LN Free</div>
          <div className="small">Dark anime • Read & Publish</div>
        </div>
      </Link>
      <div className="flex items-center gap-3">
        <Link to="/editor" className="btn">➕ Đăng truyện</Link>
        <Link to="/profile" className="btn">Hồ sơ</Link>
        {user ? (
          <button className="btn" onClick={()=>signOut(auth)}>Đăng xuất</button>
        ) : (
          <Link to="/" className="btn">Đăng nhập</Link>
        )}
      </div>
    </header>
  );
}
