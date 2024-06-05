import React from "react";
import {
    LoginIcon,
    LogoContainer,
    LogoImg,
    NavItem,
    NavLink,
    NavList,
    Navbar,
  } from "./NavBars.styled"
  
  const NavBars = () => {
    
    return (
      <Navbar>
        <LogoContainer>
          <NavLink to="/">
            <LogoImg src="/public/spartahub_logo.PNG" alt="홈 로고" />
          </NavLink>
        </LogoContainer>
        <NavList>
          <NavItem>
            <NavLink to="/job">취업공유</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/study">스터디/프로젝트</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/board">자유게시판</NavLink>
          </NavItem>
        </NavList>
        <NavLink to="/login">
          <LoginIcon src="/public/login_icon.png" alt="로그인 아이콘" />
        </NavLink>
      </Navbar>
    );
  };
  export default NavBars;