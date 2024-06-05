import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  ProfileSection,
  ProfileLogo,
  ProfileImg,
  ProfileName,
  ProfileBtn,
  ButtonContainer
} from "./MyProfile.styled";
import {
  BoardSection,
  Table,
  TableRow,
  TableHeader,
  Title,
  TableData,
  PaginationContainer,
  Pagination
} from "./MyBoard.styled";
import supabase from "../../supabaseClient";
import { setPosts } from "../../redux/slices/postsSlice";
import { clearAuth } from "../../redux/slices/authSlice";

const itemsPerPage = 10;

const MyPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    getLists();
  }, []);

  async function getLists() {
    const { data, error } = await supabase.from("board").select();
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      dispatch(setPosts(data));
    }
  }
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleProfileEdit = () => {
    navigate("/mypage/1");
  };

  const handlePostClick = (id) => {
    navigate(`/posts/${id}/edit`);
  };

  const handleClickLogout = () => {
    dispatch(clearAuth());
    navigate(`/`);
  };

  const offset = currentPage * itemsPerPage;
  const currentPagePosts = posts.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(posts.length / itemsPerPage);

  return (
    <Container>
      <ProfileSection>
        <ProfileLogo src="/spartahub_logo.png" alt="로고" />
        <ProfileImg src="/default_profile.png" alt="프로필이미지" />
        <ProfileName>르탄이 님</ProfileName>
        <ButtonContainer>
          <ProfileBtn onClick={handleProfileEdit}>내정보변경</ProfileBtn>
          <ProfileBtn onClick={handleClickLogout}>로그아웃</ProfileBtn>
        </ButtonContainer>
      </ProfileSection>
      <BoardSection>
        {" "}
        <Title>내 게시물</Title>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>게시물 번호</TableHeader>
              <TableHeader>제목</TableHeader>
              <TableHeader>링크</TableHeader>
              <TableHeader>작성일</TableHeader>
              <TableHeader>닉네임</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {currentPagePosts.map((post) => (
              <TableRow key={post.id} onClick={() => handlePostClick(post.id)}>
                <TableData>{post.id}</TableData>
                <TableData>{post.title}</TableData>
                <TableData>{post.url}</TableData>
                <TableData>{post.created_at}</TableData>
                <TableData>{post.user_id}</TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>
        <PaginationContainer>
          <Pagination
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
          />
        </PaginationContainer>
      </BoardSection>
    </Container>
  );
};

export default MyPage;
