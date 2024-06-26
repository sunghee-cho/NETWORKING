import React, { useState } from 'react';
import '../styles/post.css';
import postImage from '../assets/images/피드 메이지 예시.png';
import postprofileImage from '../assets/images/고양이 프로필.png';

const PostHeader = ({ username, onDelete }) => {
    return (
        <div className="post-header">
            <div className="user-info">
                <img src={postprofileImage} alt="Profile Picture" className="profile-pic" />
                <div className="username">{username}</div>
            </div>
            <button className="delete-button" onClick={onDelete}>×</button>
        </div>
    );
};

const Post = () => {
    const [posts, setPosts] = useState([
        { id: 1, username: '사용자 이름', content: '테스트용 포스트.', comments: [], likes: 5 }
    ]);
    const [newPostContent, setNewPostContent] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [commentText, setCommentText] = useState('');

    const handleAddPost = () => {
        if (newPostContent.trim() !== '') {
            const newPost = {
                id: posts.length + 1,
                username: '사용자 이름',
                content: newPostContent,
                comments: [],
                likes: 0
            };
            setPosts([newPost, ...posts]);
            setNewPostContent('');
            setShowPopup(false);
        }
    };

    const handleDeletePost = (postId) => {
        setPosts(posts.filter(post => post.id !== postId));
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleCommentChange = (event) => {
        setCommentText(event.target.value);
    };

    const handleCommentSubmit = (postId) => {
        if (commentText.trim() !== '') {
            setPosts(posts.map(post => 
                post.id === postId 
                    ? { ...post, comments: [...post.comments, commentText] } 
                    : post
            ));
            setCommentText('');
        }
    };

    return (
        <div className="post-container">
            <button onClick={togglePopup} className="add-post-button">새 포스트 작성</button>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="new-post-popup">
                        <div className="popup-content">
                            <div className="popup-header">
                                <span>새 포스트 작성</span>
                                <button onClick={togglePopup} className="close-popup-button">✕</button>
                            </div>
                            <textarea
                                placeholder="나누고 싶은 생각이 있으세요?"
                                value={newPostContent}
                                onChange={(e) => setNewPostContent(e.target.value)}
                                className="new-post-textarea"
                            />
                            <button onClick={handleAddPost} className="popup-add-post-button">업데이트</button>
                        </div>
                    </div>
                </div>
            )}

            {posts.map(post => (
                <div key={post.id} className="post">
                    <PostHeader username={post.username} onDelete={() => handleDeletePost(post.id)} />
                    <img src={postImage} alt="Post Image" className="main-img" />
                    <div className="description">{post.content}</div>
                    <div className="meta">
                        <span>💬 {post.comments.length} comments</span>
                        <span className="like-count">{post.likes} likes</span>
                    </div>
                    <div className="comments">
                        {post.comments.map((comment, index) => (
                            <div key={index} className="comment">{comment}</div>
                        ))}
                    </div>
                    <div className="comment-input">
                        <img src={postprofileImage} alt="User Profile" className="profile-pic" />
                        <input
                            type="text"
                            placeholder="댓글을 입력하세요..."
                            className="comment-textbox"
                            value={commentText}
                            onChange={handleCommentChange}
                        />
                        <button className="comment-button" onClick={() => handleCommentSubmit(post.id)}>Post</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Post;
