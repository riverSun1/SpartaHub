import { LoginIcon, LogoContainer, LogoImg, NavItem, NavLink, NavList, Navbar } from "./NavigationBar.styled";

const NavigationBar = () => {
  return (
    <Navbar>
      <LogoContainer>
        <NavLink to="/">
          {/* <LogoImg src="public/spartahub_logo.png" alt="홈 로고" /> */}
          {/* NavigationBar import로 쓸 때 이미지가 불러와 지지 않아서 경로 부분 수정했습니다 */}
          <LogoImg src="/public/spartahub_logo.png" alt="홈 로고" />
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
      <NavLink to="/login">
        {/* <LoginIcon src="public/login_icon.png" alt="로그인 아이콘" /> */}
        {/* NavigationBar import로 쓸 때 이미지가 불러와 지지 않아서 경로 부분 수정했습니다 */}
        <LoginIcon src="/public/login_icon.png" alt="로그인 아이콘" />
      </NavLink>
    </Navbar>
  );
};

export default NavigationBar;
