// import "../../styles/Chat/NewChat.css";
// import { useState } from "react";
// import Modal from "react-modal";
// import Cookies from "js-cookie";

// const customStyles = {
//   overlay: {
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
// };

// const NewChat = ({ isOpen, closeModal, fetchChatRooms }) => {
//   const [selectedOption, setSelectedOption] = useState("");
//   const [chatName, setChatName] = useState("");
//   const [password, setPassword] = useState("");
//   const [hashtag, setHashtag] = useState("#"); // Initialize with #
//   const [nameError, setNameError] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);
//   const [hashtagError, setHashtagError] = useState(false); // New error state for hashtag

//   const validateField = (fieldName) => {
//     const value = document.getElementById(fieldName).value;
//     switch (fieldName) {
//       case "name":
//         setNameError(value.trim() === "");
//         break;
//       case "password":
//         setPasswordError(value.trim() === "");
//         break;
//       case "hashtag":
//         setHashtagError(value.trim() === "#" || value.trim() === ""); // Validate hashtag to ensure more than just #
//         break;
//       default:
//         break;
//     }
//   };

//   const handleChange = (e) => {
//     setSelectedOption(e.target.value);
//   };

//   const handleHashtagChange = (e) => {
//     const value = e.target.value;
//     if (value === "" || value === "#") {
//       setHashtag("#"); // Prevent user from deleting #
//     } else if (!value.startsWith("#")) {
//       setHashtag("#" + value); // Ensure # at the beginning
//     } else {
//       setHashtag(value);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (chatName.trim() === "") {
//       setNameError(true);
//       return;
//     }

//     if (selectedOption === "예" && password.trim() === "") {
//       setPasswordError(true);
//       return;
//     }

//     if (hashtag.trim() === "#" || hashtag.trim() === "") {
//       setHashtagError(true);
//       return;
//     }

//     const chatRoomData = {
//       roomName: chatName,
//       chatType: "GROUP_CHAT",
//       password: selectedOption === "예" ? password : null,
//       hashtag: hashtag, // Include hashtag
//     };

//     const token = Cookies.get("accessToken"); // Retrieve the token from cookies

//     try {
//       const response = await fetch("/api/chat/rooms", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//         },
//         body: JSON.stringify(chatRoomData),
//       });

//       if (response.ok) {
//         console.log("채팅방이 성공적으로 만들어졌습니다.");
//         closeModal();
//         fetchChatRooms(); // Fetch updated chat rooms list
//       } else {
//         console.error("채팅방을 만들지 못하였습니다.");
//       }
//     } catch (error) {
//       console.error("에러가 발생하였습니다.:", error);
//     }
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={closeModal}
//       style={customStyles}
//       shouldCloseOnOverlayClick={false}
//       className="new-chat__modal"
//     >
//       <div className="new-chat__wrapper">
//         <button className="new-chat__button" onClick={closeModal}>
//           나가기
//         </button>
//         <form className="new-chat__form" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             id="name"
//             placeholder="채팅방 이름을 입력해주세요." // Add placeholder here
//             value={chatName}
//             onChange={(e) => setChatName(e.target.value)}
//           />
//           {nameError && (
//             <p className="error-message">채팅방 이름을 입력하세요.</p>
//           )}
//           <p>비밀방으로 설정하시겠습니까?</p>
//           <div>
//             <input
//               type="radio"
//               name="privateRoom"
//               id="yes"
//               value="예"
//               checked={selectedOption === "예"}
//               onChange={handleChange}
//             />
//             <label htmlFor="yes">예</label>
//           </div>
//           <div>
//             <input
//               type="radio"
//               name="privateRoom"
//               id="no"
//               value="아니요"
//               checked={selectedOption === "아니요"}
//               onChange={handleChange}
//             />
//             <label htmlFor="no">아니요</label>
//           </div>
//           {selectedOption === "예" && (
//             <div>
//               <p>비밀번호 설정:</p>
//               <input
//                 type="password"
//                 name="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               {passwordError && (
//                 <p className="error-message">비밀번호를 입력하세요.</p>
//               )}
//             </div>
//           )}
//           <p>#해시태그로 채팅방을 소개해주세요</p>
//           <input
//             type="text"
//             name="hashtag"
//             id="hashtag"
//             value={hashtag}
//             onChange={handleHashtagChange}
//           />
//           {hashtagError && (
//             <p className="error-message">해시태그를 입력하세요.</p>
//           )}
//           <button className="new-chat__button" type="submit">
//             만들기
//           </button>
//         </form>
//       </div>
//     </Modal>
//   );
// };

// export default NewChat;

import "../../styles/Chat/NewChat.css";
import { useState } from "react";
import Modal from "react-modal";
import Cookies from "js-cookie";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

const NewChat = ({ isOpen, closeModal, fetchChatRooms }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [chatName, setChatName] = useState("");
  const [password, setPassword] = useState("");
  const [hashtag, setHashtag] = useState("#"); // Initialize with #
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [hashtagError, setHashtagError] = useState(false); // New error state for hashtag

  const validateField = (fieldName) => {
    const value = document.getElementById(fieldName).value;
    switch (fieldName) {
      case "name":
        setNameError(value.trim() === "");
        break;
      case "password":
        setPasswordError(value.trim() === "");
        break;
      case "hashtag":
        setHashtagError(value.trim() === "#" || value.trim() === ""); // Validate hashtag to ensure more than just #
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleHashtagChange = (e) => {
    const value = e.target.value;
    if (value === "" || value === "#") {
      setHashtag("#"); // Prevent user from deleting #
    } else if (!value.startsWith("#")) {
      setHashtag("#" + value); // Ensure # at the beginning
    } else {
      setHashtag(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (chatName.trim() === "") {
      setNameError(true);
      return;
    }

    if (selectedOption === "예" && password.trim() === "") {
      setPasswordError(true);
      return;
    }

    if (hashtag.trim() === "#" || hashtag.trim() === "") {
      setHashtagError(true);
      return;
    }

    const chatRoomData = {
      roomName: chatName,
      chatType: "GROUP_CHAT",
      password: selectedOption === "예" ? password : null,
      hashtag: hashtag, // Include hashtag
      isSecret: selectedOption === "예", // Set isSecret based on selectedOption
    };

    const token = Cookies.get("accessToken"); // Retrieve the token from cookies

    try {
      const response = await fetch("/api/chat/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(chatRoomData),
      });

      if (response.ok) {
        console.log("채팅방이 성공적으로 만들어졌습니다.");
        closeModal();
        fetchChatRooms(); // Fetch updated chat rooms list
      } else {
        console.error("채팅방을 만들지 못하였습니다.");
      }
    } catch (error) {
      console.error("에러가 발생하였습니다.:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      shouldCloseOnOverlayClick={false}
      className="new-chat__modal"
    >
      <div className="new-chat__wrapper">
        <button className="new-chat__button" onClick={closeModal}>
          나가기
        </button>
        <form className="new-chat__form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="채팅방 이름을 입력해주세요." // Add placeholder here
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
          />
          {nameError && (
            <p className="error-message">채팅방 이름을 입력하세요.</p>
          )}
          <p>비밀방으로 설정하시겠습니까?</p>
          <div>
            <input
              type="radio"
              name="privateRoom"
              id="yes"
              value="예"
              checked={selectedOption === "예"}
              onChange={handleChange}
            />
            <label htmlFor="yes">예</label>
          </div>
          <div>
            <input
              type="radio"
              name="privateRoom"
              id="no"
              value="아니요"
              checked={selectedOption === "아니요"}
              onChange={handleChange}
            />
            <label htmlFor="no">아니요</label>
          </div>
          {selectedOption === "예" && (
            <div>
              <p>비밀번호 설정:</p>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <p className="error-message">비밀번호를 입력하세요.</p>
              )}
            </div>
          )}
          <p>#해시태그로 채팅방을 소개해주세요</p>
          <input
            type="text"
            name="hashtag"
            id="hashtag"
            value={hashtag}
            onChange={handleHashtagChange}
          />
          {hashtagError && (
            <p className="error-message">해시태그를 입력하세요.</p>
          )}
          <button className="new-chat__button" type="submit">
            만들기
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default NewChat;
