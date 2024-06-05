import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, ProfileSection, ProfileLogo, ProfileImg, ProfileName, ProfileBtn } from "./MyProfile.styled";
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

const itemsPerPage = 10;

const MyPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts.posts);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleProfileEdit = () => {
    navigate("/mypage/1");
  };

  const handlePostClick = (id) => {
    navigate(`/posts/${id}/edit`);
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
        <ProfileBtn onClick={handleProfileEdit}>내정보변경</ProfileBtn>
      </ProfileSection>
      <BoardSection>
        {" "}
        <Title>내 게시물</Title>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>게시물 번호</TableHeader>
              <TableHeader>제목</TableHeader>
              <TableHeader>일자</TableHeader>
              <TableHeader>닉네임</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {currentPagePosts.map((post) => (
              <TableRow key={post.id} onClick={() => handlePostClick(post.id)}>
                <TableData>{post.id}</TableData>
                <TableData>{post.title}</TableData>
                <TableData>{post.date}</TableData>
                <TableData>{post.nickname}</TableData>
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
