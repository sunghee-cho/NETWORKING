import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import postprofileImage from "../../assets/images/고양이 프로필.png";
import LikeButton from "../LikeButton";
import Cookies from "js-cookie";
import { LoginContext } from "../../contexts/LoginContextProvider";
import {
  isPostLikedByUser,
  countLikesByPostId,
} from "../../apis/notificationApi";
import "../../styles/Social/Post.css";

const PostHeader = ({ username, userId, onDelete }) => {
  return (
    <div className="post-header">
      <div className="user-info">
        <img src={postprofileImage} alt="Profile" className="profile-pic" />
        <div className="username">
          {username} ({userId})
        </div>
      </div>
      <button className="delete-button" onClick={onDelete}>
        ×
      </button>
    </div>
  );
};

const Post = () => {
  const { userInfo, isLogin } = useContext(LoginContext);
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [userInfo]);

  const fetchPosts = async () => {
    const token = Cookies.get("accessToken");
    console.log("Token in fetchPosts:", token);
    try {
      const response = await axios.get(`http://localhost:8080/api/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const postsData = response.data;

      if (!Array.isArray(postsData)) {
        throw new Error("Invalid data format");
      }

      // 각 포스트의 좋아요 상태와 총 좋아요 수를 가져오기
      const updatedPosts = await Promise.all(
        postsData.map(async (post) => {
          console.log("포스트:" + post);
          if (!post || !post.userId) {
            console.error("Invalid post data:", post);
            return null;
          }
          const liked = await isPostLikedByUser(post.id, userInfo.userId);
          const likes = await countLikesByPostId(post.id);
          return { ...post, liked, likes };
        })
      );

      setPosts(updatedPosts.filter((post) => post !== null));
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  const handleAddPost = async () => {
    if (newPostContent.trim() !== "") {
      const formData = new FormData();
      formData.append("contentPost", newPostContent);
      if (newPostImage) {
        formData.append("imagePost", newPostImage);
      }
      formData.append("userId", userInfo.userId.toString());

      const token = Cookies.get("accessToken");

      try {
        const response = await axios.post(`http://localhost:8080/api/posts`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Post created:", response.data);
        setNewPostContent("");
        setNewPostImage(null);
        setShowPopup(false);
        fetchPosts();
      } catch (error) {
        console.error("Error creating post", error);
      }
    } else {
      console.error("Post content is empty");
    }
  };

  const handleDeletePost = async (postId) => {
    const token = Cookies.get("accessToken");
    console.log("Token in handleDeletePost:", token);
    try {
      await axios.delete(`http://localhost:8080/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewPostImage(e.target.files[0]);
    }
  };

  const togglePopup = () => {
    if (showPopup) {
      setNewPostContent("");
      setNewPostImage(null);
    }
    setShowPopup(!showPopup);
  };

  const handleCommentChange = (postId, event) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, commentText: event.target.value } : post
    );
    setPosts(updatedPosts);
  };

  const handleCommentSubmit = async (postId) => {
    const post = posts.find((post) => post.id === postId);
    if (post && post.commentText.trim() !== "") {
      const newComment = {
        postId: postId,
        userId: userInfo.userId.toString(),
        contentComment: post.commentText,
      };

      const token = Cookies.get("accessToken");

      try {
        await axios.post("http://localhost:8080/api/comments", newComment, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchPosts();
      } catch (error) {
        console.error("Error adding comment", error);
      }
    }
  };

  const handleLike = async (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const liked = post.liked === 1 ? 0 : 1;
        const likes = liked === 1 ? post.likes + 1 : post.likes - 1;
        return { ...post, liked, likes };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <div className="post-container">
      <button onClick={togglePopup} className="add-post-button">
        새 포스트 작성
      </button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="new-post-popup">
            <div className="popup-content">
              <div className="popup-header">
                <span>새 포스트 작성</span>
                <button onClick={togglePopup} className="close-popup-button">
                  ✕
                </button>
              </div>
              <textarea
                placeholder="나누고 싶은 생각이 있으세요?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="new-post-textarea"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <button onClick={handleAddPost} className="popup-add-post-button">
                업데이트
              </button>
            </div>
          </div>
        </div>
      )}

      {posts.map((post) => (
        <div key={post.id} className="post">
          <PostHeader
            username={post.username}
            userId={post.userId}
            onDelete={() => handleDeletePost(post.id)}
          />
          {post.imagePost && (
            <img src={post.imagePost} alt="Post" className="post-image" />
          )}
          <div className="post-content">{post.contentPost}</div>
          <div className="post-footer">
            <span className="comments-count">
              💬 {post.comments?.length || 0} comments
            </span>
            <LikeButton
              targetUser={post.userId}
              postId={post.id}
              initialLiked={post.liked === 1}
              likes={post.likes}
              onClick={() => handleLike(post.id)}
            />
          </div>
          <div className="comments">
            {post.comments &&
              post.comments.map((comment, index) => (
                <div key={index} className="comment">
                  {comment.contentComment}
                </div>
              ))}
          </div>
          <div className="comment-input">
            <img
              src={postprofileImage}
              alt="User Profile"
              className="profile-pic"
            />
            <input
              type="text"
              placeholder="댓글을 입력하세요..."
              className="comment-textbox"
              value={post.commentText || ""}
              onChange={(e) => handleCommentChange(post.id, e)}
            />
            <button
              className="comment-button"
              onClick={() => handleCommentSubmit(post.id)}
            >
              Post
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;