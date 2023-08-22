
import React from 'react';
import MainLeftRail from './MainLeftRail';
import RemoteController from '../template/RemoteController';
import MainPostRail from './MainPostRail';

const Main = () => {
  return <div>
    <MainLeftRail></MainLeftRail>
    <MainPostRail></MainPostRail>
    <RemoteController></RemoteController>
  </div>;
};

export default Main;
