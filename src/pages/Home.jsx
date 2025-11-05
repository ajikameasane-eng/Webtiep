import React, { useEffect, useState } from 'react';
import StoryCard from '../components/StoryCard';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

export default function Home(){
  const [stories, setStories] = useState([]);

  useEffect(()=>{
    const r = ref(db, 'stories');
    return onValue(r, snapshot => {
      const val = snapshot.val() || {};
      // val is { id1: {...}, id2: {...} }
      const arr = Object.keys(val).map(k => ({ id: k, ...val[k] })).sort((a,b)=> b.createdAt - a.createdAt);
      setStories(arr);
    });
  },[]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map(s => <StoryCard key={s.id} story={s} />)}
        {stories.length===0 && <div className="small">Chưa có truyện nào.</div>}
      </div>
    </div>
  );
}
