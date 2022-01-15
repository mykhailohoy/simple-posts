import React, { useState, useEffect } from 'react';

import API from "./API";

import './styles/Timeline.scss';

import Posts from './components/Posts';
import Tabs from './components/Tabs';
import { AiOutlineReload } from 'react-icons/ai';

const Timeline = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [saved, setSaved] = useState([]);
  const [showSaved, setShowSaved] = useState(false);

  const fetchPosts = async (limit) => {
    setLoading(true);
    const [posts, error] = await API.fetchPosts(limit);
    if (error) {
      setError(true);
      setLoading(false);
    } else {
      setPosts(posts);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchPosts(10);
  }, [])

  const removePost = id => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    const updatedSaved = saved.filter(post => post.id !== id);
    setSaved(updatedSaved);
  }

  const savePost = id => {
    const postToSave = posts.filter(post => post.id === id)[0];
    if (saved.includes(postToSave)) {
      setSaved(saved.filter(post => post.id !== id))
    } else {
      setSaved([postToSave, ...saved]); 
    }
  }

  if (error) return <p>Oops. There was an error fetching posts!</p>

  return (
    <div className="timeline">
      {loading && <p>Loading...</p>}
      <div className="headline">
        <h1 className="heading">My timeline</h1>
        <AiOutlineReload onClick={() => fetchPosts(10)} />
        <Tabs tabNames={['All', 'Saved']} callbacks={[
          () => setShowSaved(false),
          () => setShowSaved(true)
        ]} />
      </div>
      <Posts posts={showSaved ? saved : posts} removePost={removePost} savePost={savePost} />
      {!showSaved &&
      <button onClick={() => fetchPosts(posts.length + 10)}>Load more</button>}
    </div>
  )
}

export default Timeline;