import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './RemoteController.scss';
import Post from '../post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { setBool } from '../../feature/postingModalOpen';


const RemoteController = () => {
  const dispatch = useDispatch();
  const openPostingModal = useSelector(state => state.openPostingModal.isOpen);

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const RemoteControllerWritePost = () => {
    dispatch(setBool(!openPostingModal));
    console.log("openpostingmodal", openPostingModal);
  };

  useEffect(() => {
    console.log("openpostingmodal", openPostingModal);
  }, [openPostingModal]);

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
