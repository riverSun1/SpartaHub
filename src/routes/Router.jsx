import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyBoardEdit from "../components/MyBoardEdit/MyBoardEdit";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyPage from "../pages/MyPage";
import NoticeBoard from "../pages/NoticeBoard";
import NoticeboardModify from "../pages/NoticeboardModify";
import ProfileEdit from "../pages/ProfileEdit";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/posts/:id/edit" element={<MyBoardEdit />} />
        <Route path="/noticeboard" element={<NoticeBoard />} />
        <Route path="/job/:id" element={<NoticeboardModify />} />
        <Route path="/mypage/:id" element={<ProfileEdit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
