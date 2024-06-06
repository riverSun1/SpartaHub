import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/userSlice";
import supabase from "../../supabaseClient";
import {
  Button,
  IconNavLink,
  LoginIcon,
  LogoContainer,
  LogoImg,
  NavItem,
  NavLink,
  NavList,
  Navbar
} from "./NavigationBar.styled";
const NavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const handlelogin = () => {
    {
      isAuthenticated ? handleLogout() : navigate("/login");
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      dispatch(logout());
      alert("로그아웃 되었습니다.");
      navigate("/");
    } catch (error) {
      console.log("로그아웃 오류:", error.message);
    }
  };

  const moveToMypage = () => {
    if (isAuthenticated) {
      navigate("/mypage");
    } else {
      alert("로그인을 해주세요.");
      navigate("/login");
    }
  };

  return (
    <Navbar>
      <LogoContainer>
        <NavLink to="/">
          <LogoImg src="src/assets/images/spartahub_logo.png" alt="홈 로고" />
        </NavLink>
      </LogoContainer>
      <NavList>
        <NavItem>
          <NavLink to="/noticeboard">취업공유</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/study">스터디/프로젝트</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/board">자유게시판</NavLink>
        </NavItem>
      </NavList>
      <IconNavLink>
        <Button onClick={handlelogin}>{isAuthenticated ? "로그아웃" : "로그인"}</Button>
        <LoginIcon src="src/assets/images/login_icon.png" onClick={moveToMypage} alt="로그인 아이콘" />
      </IconNavLink>
    </Navbar>
  );
};

export default NavigationBar;
