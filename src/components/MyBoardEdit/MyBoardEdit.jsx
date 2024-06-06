import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import NavigationBar from "../NavigationBar/NavigationBar.jsx";
import { updatePost, deletePost } from "../../redux/slices/postsSlice";
import supabase from "../../supabaseClient";
import {
  Container,
  Title,
  EditSection,
  EditForm,
  EditField,
  EditLabel,
  EditInputTitle,
  EditTextAreaContent,
  EditButton,
  ButtonContainer
} from "../MyBoardEdit/MyBoardEdit.style";

const MyBoardEdit = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase.from("board").select("*").eq("id", parseInt(id)).single();

        if (error) {
          console.error("게시물을 불러오는 중 오류가 발생했습니다:", error);
        } else {
          if (!data) {
            console.error("게시물을 찾을 수 없습니다.");
            navigate("/mypage");
            return;
          }
          setTitle(data.title || "");
          setContent(data.content || "");
          setUrl(data.url || "");
        }
      } catch (error) {
        console.error("게시물을 불러오는 중 오류가 발생했습니다:", error);
      }
    };
    fetchPost();
  }, [id, navigate]);

  const handleUpdate = async () => {
    try {
      const { error } = await supabase.from("board").update({ title, url, content }).eq("id", parseInt(id));

      if (error) {
        console.error("게시물 업데이트 중 오류가 발생했습니다:", error);
      } else {
        dispatch(updatePost({ id: parseInt(id), title, url, content }));
        navigate("/mypage");
      }
    } catch (error) {
      console.error("게시물 업데이트 중 오류가 발생했습니다:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase.from("board").delete().eq("id", parseInt(id));

      if (error) {
        console.error("게시물 삭제 중 오류가 발생했습니다:", error);
      } else {
        dispatch(deletePost({ id: parseInt(id) }));
        navigate("/mypage");
      }
    } catch (error) {
      console.error("게시물 삭제 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <Container>
      <NavigationBar />
      <EditSection>
        <Title>내 게시물 수정</Title>
        <EditForm onSubmit={(e) => e.preventDefault()}>
          <EditField>
            <EditLabel>제 목</EditLabel>
            <EditInputTitle id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </EditField>
          <EditField>
            <EditLabel>URL</EditLabel>
            <EditInputTitle id="title" type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
          </EditField>
          <EditField>
            <EditLabel>내 용</EditLabel>
            <EditTextAreaContent id="content" value={content} onChange={(e) => setContent(e.target.value)} />
          </EditField>
          <ButtonContainer>
            <EditButton type="button" onClick={handleUpdate}>
              수 정
            </EditButton>
            <EditButton type="button" onClick={handleDelete}>
              삭 제
            </EditButton>
          </ButtonContainer>
        </EditForm>
      </EditSection>
    </Container>
  );
};

export default MyBoardEdit;
