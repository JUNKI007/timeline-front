import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBool } from "../../feature/postingModalOpen";
import './RemoteController.scss';
import Clock from "../template/DigitalClock";

const RemoteController = () => {
  const user = useSelector((state) => state.me);
  const dispatch = useDispatch();
  const openPostingModal = useSelector(state => state.openPostingModal.isOpen);
  const myId = useSelector(state => state.me.email);

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleScrollToBottom = () => {
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    window.scrollTo(0, fullHeight - windowHeight);
  };

  const RemoteControllerWritePost = () => {
    dispatch(setBool(true));
  };

  return (

    <div className="remote-controller">
      <div className="remote-controller-inner">
        <div className="button-row">
          <button onClick={handleScrollToTop}>Top</button>
          <button onClick={handleScrollToBottom}>Bottom</button>
        </div>
        {myId && <div className="remote-controller-inner">
          <div className="button-row">
            <Link to="/mypage/:userId">My Post</Link>
            <Link to="/timeline/:userId">TimeLine</Link>
          </div>
          <div className="button-row">
            <Link to="/user/:userId">UserPage</Link>
            <button onClick={RemoteControllerWritePost}>Write Post</button>
          </div>
        </div>}
      </div>
      <Clock />
    </div>

  );
};

export default RemoteController;
