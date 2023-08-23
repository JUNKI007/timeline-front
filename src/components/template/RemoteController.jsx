import React from 'react';
import { Link } from 'react-router-dom';
import './RemoteController.scss';

const RemoteController = () => {
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="remote-controller">
      <div className="remote-controller-inner">
      <button onClick={handleScrollToTop}>Top</button>
        <Link to="/user">My Post</Link>
        <Link to="/timeline">Timeline</Link>
        <Link to="/post">Write Post</Link>
      </div>
    </div>
  );
};

export default RemoteController;
