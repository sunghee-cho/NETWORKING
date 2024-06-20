import React, { useState } from 'react';
import postImage from '../assets/images/피드 메이지 예시.png';
import postprofileImage from '../assets/images/고양이 프로필.png';

const Post = () => {
        //댓글 수
        const [comments, setComments] = useState(0); //처음
        const [likes, setLikes] = useState(5); //처음
        const [commentText, setCommentText] = useState(''); 
        const [commentList, setCommentList] = useState([]); 
    
      
        const handleCommentChange = (event) => {
            setCommentText(event.target.value);
        };
    
        
        const handleCommentSubmit = () => {
            if (commentText.trim() !== '') {
                setCommentList([...commentList, commentText]); 
                setCommentText(''); 
                setComments(comments + 1); 
            }
        };
    
        return (
            <div className="post">
                <img src={postImage} alt="Post Image" className="main-img" />
                <div className="description">들어갈 내용</div>
                <div className="meta">
                    <span>💬 {comments} comments</span>
                    <span className="like-count">{likes} likes</span>
                </div>
                <div className="comments">
                    {commentList.map((comment, index) => (
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
                    <button className="comment-button" onClick={handleCommentSubmit}>Post</button>
                </div>
            </div>
        );
};

export default Post;
