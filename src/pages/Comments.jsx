import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { push, ref as dbRef, onValue } from 'firebase/database';

export default function Comments({ storyId, chapter, user }){
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  useEffect(()=> {
    if(!storyId) return;
    const r = dbRef(db, `comments/${storyId}`);
    return onValue(r, snap=>{
      const val = snap.val() || {};
      const arr = Object.keys(val).map(k=> ({ id:k, ...val[k] })).sort((a,b)=> a.createdAt - b.createdAt);
      setComments(arr);
    });
  },[storyId]);

  async function post(){
    if(!user) return alert('Đăng nhập để bình luận');
    if(!chapter) return alert('Chọn chương');
    if(!text.trim()) return;
    const node = dbRef(db, `comments/${storyId}`);
    await push(node, {
      volId: chapter.volId,
      chId: chapter.chId,
      authorId: user.uid,
      authorName: user.displayName || user.email.split('@')[0],
      text,
      createdAt: Date.now()
    });
    setText('');
  }

  const visible = comments.filter(c=> c.volId === chapter?.volId && c.chId === chapter?.chId );

  return (
    <div>
      <h4 className="font-bold">Bình luận</h4>
      {user ? (
        <div>
          <textarea value={text} onChange={e=>setText(e.target.value)} className="input" placeholder="Viết bình luận..." />
          <button className="btn-primary mt-2" onClick={post}>Gửi</button>
        </div>
      ) : (<div className="small">Đăng nhập để bình luận</div>)}

      <div className="mt-4">
        {visible.map(c=> (
          <div key={c.id} className="border-t border-white/5 pt-2">
            <div className="font-bold">{c.authorName} <span className="small">• {new Date(c.createdAt).toLocaleString()}</span></div>
            <div className="mt-1">{c.text}</div>
          </div>
        ))}
        {visible.length===0 && <div className="small">Chưa có bình luận</div>}
      </div>
    </div>
  );
}
