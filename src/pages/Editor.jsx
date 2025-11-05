import React, { useState } from 'react';
import { ref as sref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { push, ref as dbRef, set } from 'firebase/database';
import { db, storage } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

export default function Editor({ user }){
  const [title,setTitle]=useState('');
  const [summary,setSummary]=useState('');
  const [coverFile,setCoverFile]=useState(null);
  const nav = useNavigate();

  async function ensureAuth(){
    if(!user){
      await signInWithPopup(auth, provider);
    }
  }

  async function create(){
    await ensureAuth();
    if(!title) return alert('Tiêu đề rỗng');
    let coverURL='';
    if(coverFile){
      const path = `covers/${auth.currentUser.uid}/${Date.now()}_${coverFile.name}`;
      const r = sref(storage, path);
      await uploadBytes(r, coverFile);
      coverURL = await getDownloadURL(r);
    }
    const newRef = push(dbRef(db,'stories'));
    await set(newRef, {
      title,
      summary,
      coverURL,
      authorId: auth.currentUser.uid,
      authorName: auth.currentUser.displayName || auth.currentUser.email.split('@')[0],
      createdAt: Date.now(),
      volumes: [
        { id: 'v1', title: 'Tập 1', chapters: [ { id: 'c1', title: 'Chương 1', content: '' } ] }
      ]
    });
    alert('Tạo truyện xong');
    nav('/');
  }

  return (
    <div className="card p-6">
      <h2 className="font-bold text-xl mb-4">Tạo truyện mới</h2>
      <input className="input mb-2" placeholder="Tiêu đề" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea className="input mb-2" placeholder="Tóm tắt" value={summary} onChange={e=>setSummary(e.target.value)} />
      <input type="file" accept="image/*" onChange={e=>setCoverFile(e.target.files[0])} />
      <div className="mt-4">
        <button className="btn-primary" onClick={create}>Tạo truyện</button>
      </div>
    </div>
  );
}
