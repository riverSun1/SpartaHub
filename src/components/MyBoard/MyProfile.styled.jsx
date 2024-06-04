import styled from "styled-components";
import "../../styles/designToken.css";

export const Container = styled.main`
  display: flex;
  height: 100vh;
`;

export const ProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--red-90);
  height: 100vh;
  width: 35vw;
`;

export const ProfileLogo = styled.img`
  background-image: url("/spartahub_logo.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 80px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 50px;
  margin-bottom: 20px;
`;

export const ProfileImg = styled.img`
  background-image: url("/default_profile.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 150px;
`;

export const ProfileName = styled.p`
  margin-top: 80px;
  font-size: 25px;
  text-align: center;
`;

export const ProfileBtn = styled.button`
  margin-top: 20px;
  padding: 13px 23px;
  background-color: var(--pink-50);
  color: var(--pink-90);
  cursor: pointer;
  font-size: smaller;
  border: 3px solid white;
  border-radius: 15px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--red-30);
    color: var(--red-99);
  }

  &:active {
    box-shadow: none;
    transform: translateY(2px);
  }
`;
