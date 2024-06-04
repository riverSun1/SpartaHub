import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavigationBar from "../NavigationBar/NavigationBar.jsx";
import { updatePost, deletePost } from "../../redux/slices/postsSlice";
import {
  Container,
  Title,
  EditSection,
  EditForm,
  EditField,
  EditLabel,
  EditInputTitle,
  EditInputContent,
  EditButton,
  ButtonContainer
} from "../MyBoardEdit/MyBoardEdit.style";

const MyBoardEdit = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.posts.find((post) => post.id === parseInt(id)));

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setContent(post.content || "");
    }
  }, [post, setTitle, setContent]);

  const handleUpdate = () => {
    dispatch(updatePost({ id: parseInt(id), title, content }));
    navigate("/mypage");
  };

  const handleDelete = () => {
    dispatch(deletePost({ id: parseInt(id) }));
    navigate("/mypage");
  };

  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <Container>
      <NavigationBar />
      <EditSection>
        <Title>내 게시물 수정</Title>
        <EditForm>
          <EditField>
            <EditLabel>제 목</EditLabel>
            <EditInputTitle id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </EditField>
          <EditField>
            <EditLabel>내 용</EditLabel>
            <EditInputContent id="content" type="text" value={content} onChange={(e) => setContent(e.target.value)} />
          </EditField>
          <ButtonContainer>
            <EditButton onClick={handleUpdate}>수 정</EditButton>
            <EditButton onClick={handleDelete}>삭 제</EditButton>
          </ButtonContainer>
        </EditForm>
      </EditSection>
    </Container>
  );
};

export default MyBoardEdit;
