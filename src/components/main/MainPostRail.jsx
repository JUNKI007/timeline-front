import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../network/api';
import { BiWorld } from 'react-icons/bi';
import { updateLikeThunk } from '../../feature/likeSlice';
import { fetchCommentsByPostId, addComment } from '../../feature/commentSlice';
import ProfileDropdownMenu from '../template/ProfileDropdownMenu';
import './MainPostRail.scss';

const MainPostRail = () => {
  const dispatch = useDispatch();
  const comments = useSelector(state => state?.comments?.commentsByPostId);
  const isPostionOpen = useSelector(state => state.openModal.postingModal_isOpen);
  const [posts, setPosts] = useState([]);
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [observer, setObserver] = useState(false);



  const fetchPosts = async () => {
    const apiUrl = '/api/v1/posts/all';
    try {
      const response = await api(apiUrl, 'GET');

      const data = response.data.map((post) => { return { ...post, isLiked: post.heart } })
      setPosts(data);

      console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    ;

    fetchPosts();
  }, [observer, isPostionOpen === false]);

  const handleOpenCommentModal = (postId) => {
    setCommentModalOpen(true);
    setCurrentPostId(postId);
    dispatch(fetchCommentsByPostId(postId));
  };

  const handleAddComment = () => {
    dispatch(addComment({ postId: currentPostId, comment: newComment }));
    setNewComment('');
  };

  const handleLike = async (postId) => {
    dispatch(updateLikeThunk(postId));
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
          ...post,
          heartCount: post.isLiked ? post.heartCount - 1 : post.heartCount + 1,
          isLiked: !post.isLiked,
        }
        : post
    );
    // setObserver(!observer);
    setPosts(updatedPosts);
  };

  const handleProfileMenu = (userId) => {
    setSelectedUserId(userId);
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <div className="main-post-rail w-screen sm:w-full">
      <div className="w-screen sm:w-full">
        <div className="my-6 max-w-[25rem] sm:max-w-[33rem] mx-auto">
          {posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="bg-white">
                <div className="flex">
                  <div
                    className="w-12"
                    onClick={() => handleProfileMenu(post.member.id)}
                  >
                    <div className="flex items-center position-relative">
                      {post.member.profilePath && <img
                        src={`http://192.168.0.226:4000/${post.member.profilePath}`}
                        alt="Profile"
                        className="mr-2"
                      />}

                      <p
                        className="font-bold profile-nickname"
                        onClick={() => handleProfileMenu(post.member.id)}
                      >
                        {post.member.nickName}
                      </p>
                      {isProfileMenuOpen && (
                        <ProfileDropdownMenu
                          selectedUserId={selectedUserId}
                        />
                      )}
                    </div>
                    <div className="flex">
                      <p className="text-xs">{formatDate(post.CreateAt)}</p>
                      <BiWorld className="ml-1" />
                    </div>
                  </div>
                </div>
                <div className="my-3">
                  <div className="title-box">
                    <p className="title"> 제목 | {post.title}</p>
                    <p> 주제 | {post.subject.name} </p>
                  </div>

                  <p>{post.content}</p>
                </div>
                <div className="-mx-5">
                  {post.imgPaths && <img
                    src={`http://192.168.0.226:4000/${post.imgPaths}`}
                    alt="Post"
                  />}

                </div>
                <div className="my-3">
                  <p><span className="icon">❤️</span> 좋아요: {post.heartCount}</p>
                  <div className="button-group">
                    {(post.heart | post.isLiked) ? (
                      <button className="button like-button"
                        style={{ color: '#0f2654' }}
                        onClick={() => handleLike(post.id)}>
                        <span className="icon">👌</span> 좋아요
                      </button>
                    ) : (
                      <button
                        className="button like-button"
                        onClick={() => handleLike(post.id)}
                      >
                        <span className="icon">👍</span> 좋아요
                      </button>
                    )}
                    <button className="button comment-button" onClick={() => handleOpenCommentModal(post.id)}>
                      <span className="icon">💬</span> 댓글 달기
                    </button>
                  </div>
                </div>

                {isCommentModalOpen && (
                  <div className="modal-overlay">
                    <div className="modal-content">
                      <div className="comments">
                        {comments[currentPostId]?.map(comment => (
                          <div key={comment.id} className="comment-item">
                            <div className="comment-author">
                              <img
                                src={`http://192.168.0.226:4000/${comment.member.profilePath}`}
                                alt={comment.member.nickName}
                                className="comment-author-image"
                              />
                              <p className="comment-author-name">{comment.member.nickName}</p>
                            </div>
                            <div className="comment-content">
                              <p>{comment.comment}</p>
                              <p className="comment-date">{formatDate(comment.createAt)}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="comment-input">
                        <input value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                        <button onClick={handleAddComment}>댓글 작성</button>
                      </div>
                      <button className="modal-close-btn" onClick={() => setCommentModalOpen(false)}>닫기</button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPostRail;
