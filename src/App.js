import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Chat from "./pages/Chat";
import Social from "./pages/Social";
import Notifications from "./pages/Notification";
import Joblist from "./pages/Joblist";
import Login from "./pages/Login";
import Join from "./pages/Join";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Social />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/joblist" element={<Joblist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
