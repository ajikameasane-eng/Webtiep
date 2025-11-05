
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function StoryCard({ story }){
  const nav = useNavigate();
  return (
    <div className="story-card card cursor-pointer" onClick={()=> nav(`/read/${story.id}`)}>
      <div className="story-cover">
        {story.coverURL ? <img src={story.coverURL} alt="cover" /> : <div className="small">No cover</div>}
      </div>
      <div className="story-body">
        <div className="flex justify-between items-start">
          <div>
            <div className="story-title font-bold">{story.title}</div>
            <div className="small">{story.authorName} • {new Date(story.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
        <div className="small">{story.summary}</div>
        <div className="mt-3 flex gap-2">
          <button className="btn">📖 Read</button>
        </div>
      </div>
    </div>
  );
}
