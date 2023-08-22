import React, { useState, useEffect } from 'react';
import { api } from '../../network/api';
import { BiWorld } from "react-icons/bi";
import './MainPostRail.scss'; // SCSS 파일 임포트

const MainPostRail = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const apiUrl = '/api/v1/posts/all';

    api(apiUrl, 'GET')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="main-post-rail w-screen sm:w-full">
    <div className="w-screen sm:w-full">
      <div className="my-6 max-w-[25rem] sm:max-w-[33rem] mx-auto">
        {posts.map(post => (
          <div className="post" key={post.id}>
            <div className="bg-white">
              <div className="flex">
                <div className="w-12">
                  <img src={post.member.profilepath} />
                </div>
                <div className="ml-3">
                  <p className="font-bold">{post.member.nickName}</p>
                  <div className="flex">
                    <p className="text-xs">{post.CreateAt}</p>
                    <BiWorld className="ml-1" />
                  </div>
                </div>
              </div>
              <div className="my-3">
                <p> 제목 : {post.title} </p>
                <p> 주제 : {post.subject.name} </p>
                <p>{post.content}</p>
              </div>
              <div className="-mx-5">
                <img src={post.imgPaths} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default MainPostRail;
