import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyPage from "../pages/MyPage";
import NoticeBoard from "../pages/NoticeBoard";
import ProfileEdit from "../pages/ProfileEdit";
import MyBoardEdit from "../components/MyBoardEdit/MyBoardEdit";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/posts/:id/edit" element={<MyBoardEdit />} />
        <Route path="/noticeboard" element={<NoticeBoard />} />
        <Route path="/mypage/:id" element={<ProfileEdit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
