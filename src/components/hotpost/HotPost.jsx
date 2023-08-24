import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../network/api';
import { BiWorld } from "react-icons/bi";
import { updateLikeThunk } from '../../feature/likeSlice';
import { fetchCommentsByPostId, addComment } from '../../feature/commentSlice';
import './HotPost.scss';

const HotPost = () => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const comments = useSelector(state => state?.comments?.commentsByPostId);

  const handleLike = (postId) => {
    dispatch(updateLikeThunk(postId));
  };

  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchHotPosts = async () => {
      const apiUrl = '/api/v1/posts/all';
      try {
        const response = await api(apiUrl, 'GET');
        const sortedPosts = response.data.sort((a, b) => b.heartCount - a.heartCount); // 좋아요 많은 순으로 정렬
        setPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchHotPosts();
  }, [dispatch]);

  const handleOpenCommentModal = (postId) => {
    setCommentModalOpen(true);
    setCurrentPostId(postId);
    dispatch(fetchCommentsByPostId(postId));
  };

  const handleAddComment = () => {
    dispatch(addComment({ postId: currentPostId, comment: newComment }));
    setNewComment("");
  };

  return (
    <div className="hot-post-rail w-screen sm:w-full">
          <div className="w-screen sm:w-full">
            <div className="my-6 max-w-[25rem] sm:max-w-[33rem] mx-auto">
              {posts.map(post => (
                <div className="post" key={post.id}>
                  <div className="bg-white">
                    <div className="flex">
                      <div className="w-12">
                        <img src={`http://192.168.0.226:4000/${post.member.profilePath}`} alt="Profile" />
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
                      <img src={`http://192.168.0.226:4000/${post.imgPaths}`} alt="Post" />
                    </div>
                    <div className="my-3">
                      <p>좋아요: {post.heartCount}</p>
                      <div className="button-group">
                        <button className="button like-button" onClick={() => handleLike(post.id)}>
                          <span className="icon">👍</span> 좋아요
                        </button>
                        <button className="button comment-button" onClick={() => handleOpenCommentModal(post.id)}>
                          <span className="icon">💬</span> 댓글 달기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
    
          {isCommentModalOpen && (
            <div className="comment-modal"> 
              <div className="comments">
                {comments[currentPostId]?.map(comment => (
                  <p key={comment.id}>{comment.comment}</p>
                ))}
              </div>
              <div className="comment-input">
                <input value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <button onClick={handleAddComment}>댓글 작성</button>
              </div>
              <button onClick={() => setCommentModalOpen(false)}>닫기</button>
            </div>
          )}
        </div>
      );
    };
    
    export default HotPost;
    