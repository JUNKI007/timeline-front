import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './RemoteController.scss';
import Post from '../post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { setBool } from '../../feature/postingModalOpen';

const RemoteController = () => {
  const user = useSelector((state) => state.me);
  const dispatch = useDispatch();
  const openPostingModal = useSelector(state => state.openPostingModal.isOpen);

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleScrollToBottom = () => {
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    window.scrollTo(0, fullHeight - windowHeight);
  };

  const RemoteControllerWritePost = () => {
    dispatch(setBool(!openPostingModal));
  };

  useEffect(() => {
    console.log("openpostingmodal", openPostingModal);
  }, [openPostingModal]);

  return (
    <div className="remote-controller">
      <div className="remote-controller-inner">
        <button onClick={() => handleScrollToTop()}>Top</button>
        <button onClick={() => handleScrollToBottom()}>Bottom</button>
        <Link to={`/mypage/${user.id}`}>My Post</Link>
        <Link to="/timeline">Timeline</Link>
        <Link to={`/user/${user.id}`}>UserPage</Link>
        <button onClick={() => RemoteControllerWritePost()}>Write Post</button>
      </div>
    </div>
  );
};

export default RemoteController;
