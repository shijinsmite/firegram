import React from 'react';
import logo from './assets/images/logo.PNG';
import './Post.css';
import { Avatar } from '@material-ui/core';

const Post = ({username, caption, imageUrl}) => {
  return (
    <div className="post">
        
      <div className="post__header">
        <Avatar className="post__avatar" alt="avatar" src={logo}></Avatar>
        <h3>{username}</h3>
      </div>

      <img src={imageUrl} alt="post" className="post__image"/>
      <h4 className="post__text">
        <strong>{username}: </strong>{caption}
      </h4>
    </div>
  );
};

export default Post;
