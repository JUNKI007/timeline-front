
import React, { useState } from 'react';
import MainLeftRail from './MainLeftRail';
import RemoteController from '../template/RemoteController';
import MainPostRail from './MainPostRail';
import PostModal from '../post/Post';

const Main = () => {
    //post 쓰기 모달창
    const [postModalOpen, setPostModalOpen] = useState(false);

    return <div>
        <MainLeftRail></MainLeftRail>
        <MainPostRail postModalOpen={postModalOpen}></MainPostRail>
        <RemoteController setPostModalOpen={setPostModalOpen}></RemoteController>
        {postModalOpen && (<PostModal setPostModalOpen={setPostModalOpen} />)}
    </div>;
};

export default Main;
