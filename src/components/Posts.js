import React, { useState } from 'react';

import { AiOutlineClose, AiOutlineHeart, AiFillHeart } from "react-icons/ai";


const Posts = ({ posts, removePost, savePost }) => {

  const [savedIds, setSavedIds] = useState([]);

  const handleSave = id => {
    savePost(id);
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter(savedId => savedId !== id))
    } else {
      setSavedIds([id, ...savedIds])
    }
  }

  return (
    <>
      {posts.length === 0 && <p>So empty here...</p>}
      {posts.map(post => (
        <div className="post" key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          {savedIds.includes(post.id) ?
            <AiFillHeart onClick={() => handleSave(post.id)} /> :
            <>
              <AiOutlineHeart onClick={() => handleSave(post.id)} />
              <AiOutlineClose onClick={() => removePost(post.id)} />
            </>
          }
        </div>
      ))}
    </>)
}

export default Posts;