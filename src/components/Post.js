import React from 'react';

const Post = () => {
    return (
        <div className="post">
            <img src="../assets/images/피드 메이지 예시.png" alt="Post Image" className="main-img" />
            <div className="description">들어갈 내용</div>
            <div className="meta">
                <span>💬 2 comments</span>
                <span className="like-count">5 likes</span>
            </div>
            <div className="comments"></div>
            <div className="comment-input">
                <img src="../assets/images/고양이 프로필.png" alt="User Profile" className="profile-pic" />
                <input type="text" placeholder="댓글을 입력하세요..." className="comment-textbox" />
                <button className="comment-button">Post</button>
            </div>
        </div>
    );
};

export default Post;
