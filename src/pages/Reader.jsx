import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../firebase';
import Comments from './_Comments';

export default function Reader({ user }){
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [chapter, setChapter] = useState(null);

  useEffect(()=>{
    const r = ref(db, `stories/${id}`);
    return onValue(r, snap=>{
      const val = snap.val();
      setStory(val);
      // set first chapter if none
      if(val?.volumes?.[0]?.chapters?.[0] && !chapter){
        setChapter({ volId: val.volumes[0].id, chId: val.volumes[0].chapters[0].id });
      }
    });
  },[id]);

  if(!story) return <div className="small">Đang tải...</div>;

  const chapters = [];
  (story.volumes || []).forEach(v=>{
    v.chapters?.forEach(c=>{
      chapters.push({ volId: v.id, chId: c.id, title: `${v.title} • ${c.title}`, content: c.content });
    });
  });

  const cur = chapters.find(x=> x.volId===chapter?.volId && x.chId===chapter?.chId) || chapters[0];

  return (
    <div>
      <div className="card p-4 mb-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{story.title}</h2>
            <div className="small">{story.summary}</div>
          </div>
          <div style={{width:220}}>
            {story.coverURL && <img src={story.coverURL} className="rounded-md" alt="cover" />}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-3 card p-4">
          <div dangerouslySetInnerHTML={{__html: (cur?.content || 'Chưa có nội dung').replace(/\n/g,'<br/>')}} />
        </div>
        <aside className="card p-4">
          <h3 className="font-bold mb-2">Danh sách chương</h3>
          <div className="flex flex-col gap-2">
            {chapters.map(ch=> (
              <button key={ch.chId} className="chap-btn" onClick={()=> setChapter({volId: ch.volId, chId: ch.chId})}>{ch.title}</button>
            ))}
          </div>
        </aside>
      </div>

      <div className="card p-4 mt-4">
        <Comments storyId={id} chapter={chapter} user={user} />
      </div>
    </div>
  );
}
