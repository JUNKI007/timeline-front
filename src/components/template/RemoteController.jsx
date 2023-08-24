import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RemoteController.scss';
import Post from '../post/Post';


const RemoteController = ({ setPostModalOpen }) => {
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const RemoteControllerWritePost = () => {
    setPostModalOpen(true);
  };

  return (
    <div className="remote-controller">
      <div className="remote-controller-inner">
        <button onClick={() => handleScrollToTop()}>Top</button>
        <Link to="/user">My Post</Link>
        <Link to="/timeline">Timeline</Link>
        <button onClick={() => RemoteControllerWritePost()}>Write Post</button>
      </div>
    </div>
  );
};

export default RemoteController;
