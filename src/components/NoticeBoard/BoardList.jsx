import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import supabase from "../../supabaseClient";

export const BoardSection = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  width: 90%;
`;
const TitleDiv = styled.div`
  width: 100%;
  height: 100px;
  h1 {
    font-size: large;
    text-align: start;
    line-height: 150px;
  }
`;
export const Title = styled.h1`
  font-size: 45px;
  text-align: center;
`;

const Section = styled.section`
  border-top: 2px solid var(--black-90);
  padding: 10px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    margin-top: 30px;
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 27px;
  padding-left: 5px;
  outline: none;
  border: 1px solid var(--black-80);
  border-radius: 5px;
  &:hover {
    border: 1px solid var(--red-30);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: end;
  margin-left: 570px;
`;

const CreateBtn = styled.button`
  margin: auto;
  padding: 13px 23px;
  background-color: var(--pink-50);
  color: var(--pink-90);
  cursor: pointer;
  font-size: smaller;
  border: none;
  border-radius: 7px;
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

const TextAreaContent = styled.textarea`
  width: 98%;
  height: 150px;
  padding: 10px;
  padding-left: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: large;
  outline: none;
  &:focus {
    border-color: var(--red-30);
  }
`;

const EditLabel = styled.label`
  margin-top: 20px;
  display: flex;
  font-size: medium;
`;

const BoardList = () => {
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const user = useSelector((state) => state.user.user);

  const handleAdd = async () => {
    const { data, error } = await supabase.from("board").insert({
      user_id: user.id,
      title,
      content,
      url
    });
    console.log(user);
    if (error) {
      console.log("error => ", error);
    } else {
      alert("작성 완료!");
      console.log(data);
    }
  };

  return (
    <BoardSection>
      <TitleDiv>
        <h1>취업공유 등록</h1>
      </TitleDiv>
      <Section>
        <div>
          <EditLabel>제 목</EditLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <EditLabel>URL</EditLabel>
          <Input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
          <EditLabel>내 용</EditLabel>
          <TextAreaContent
            type="text"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
        <ButtonContainer>
          <CreateBtn onClick={handleAdd}>등 록</CreateBtn>
        </ButtonContainer>
      </Section>
    </BoardSection>
  );
};

export default BoardList;
