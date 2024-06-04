import styled from "styled-components";
import "../../styles/designToken.css";

export const Container = styled.div`
  width: 100%;
  height: 90%;
  margin: 0 auto;
`;

export const EditSection = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
`;

export const Title = styled.h1`
  margin-top: 70px;
  margin-bottom: 50px;
  font-size: 2em;
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  margin: 0 auto;
`;

export const EditField = styled.div`
  margin-bottom: 20px;
`;

export const EditLabel = styled.label`
  display: flex;
  margin-bottom: 17px;
  font-weight: bold;
  font-size: large;
`;

export const EditInputTitle = styled.input`
  width: 100%;
  padding: 10px 0;
  padding-left: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: medium;
  outline: none;
  &:focus {
    border-color: var(--red-30);
  }
`;

export const EditInputContent = styled.input`
  width: 100%;
  padding: 100px 0;
  padding-left: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: medium;
  outline: none;
  &:focus {
    border-color: var(--red-30);
  }
`;

export const EditButton = styled.button`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 4px 10px -2px, rgba(0, 0, 0, 0.3) 0px 2px 6px -2px;
  padding: 10px 35px;
  font-size: medium;
  background-color: var(--pink-40);
  color: white;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: var(--red-30);
    color: var(--red-99);
  }
  &:active {
    box-shadow: none;
    transform: translateY(1px);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  gap: 10px;
  margin-top: 20px;
`;
