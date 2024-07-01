import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Chat from "./pages/Chat";
import Social from "./pages/Social";
import Notifications from "./pages/Notification";
import Joblist from "./pages/Joblist";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Social />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/joblist" element={<Joblist />} />
          {/* <Route path="/member" element={<Member />} /> */}
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
