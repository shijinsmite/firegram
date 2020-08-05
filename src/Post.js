import React from 'react';
import logo from './assets/images/logo.PNG';
import './Post.css';
import { Avatar } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { db } from './Firebase';

const Post = ({ postId, username, caption, imageUrl }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscibe = db
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt="avatar" src={null}></Avatar>
        <h3>{username}</h3>
      </div>

      <img src={imageUrl} alt="post" className="post__image" />
      <h4 className="post__text">
        <strong>{username}: </strong>
        {caption}
      </h4>
    </div>
  );
};

export default Post;
