import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyPage from "../pages/MyPage";
import NoticeBoard from "../pages/NoticeBoard";
import ProfileEdit from "../pages/ProfileEdit";
import NoticeboardModify from "../pages/NoticeboardModify";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/job" element={<NoticeBoard />} />
        <Route path="/job/:id" element={<NoticeboardModify />} />
        <Route path="/mypage/:id" element={<ProfileEdit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
