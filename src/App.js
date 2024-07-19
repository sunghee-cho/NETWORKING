import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Chat from "./pages/Chat";
import Social from "./pages/Social";
import Notifications from "./pages/Notification";
import Joblist from "./pages/Joblist";
import Login from "./pages/Login";
import Join from "./pages/Join";
import LoginContextProvider from "./contexts/LoginContextProvider";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const storedToken = Cookies.get("accessToken");
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setCurrentUser(decodedToken.id);
      setIsLoggedin(true);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <LoginContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Social />} />
            <Route
              path="/chat"
              element={
                <Chat
                  currentUser={currentUser}
                  isLoggedin={isLoggedin}
                  setIsLoggedin={setIsLoggedin}
                />
              }
            />
            <Route path="/joblist" element={<Joblist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
          <Footer />
        </LoginContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
