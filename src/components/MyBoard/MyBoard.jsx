import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const posts = [
  { id: 1, title: "1 번째 게시물", date: "2024-06-01", nickname: "사용자1" },
  { id: 2, title: "2 번째 게시물", date: "2024-06-02", nickname: "사용자1" },
  { id: 3, title: "3 번째 게시물", date: "2024-06-03", nickname: "사용자1" },
  { id: 4, title: "4 번째 게시물", date: "2024-06-03", nickname: "사용자1" },
  { id: 5, title: "5 번째 게시물", date: "2024-06-03", nickname: "사용자1" },
  { id: 6, title: "6 번째 게시물", date: "2024-06-03", nickname: "사용자1" },
  { id: 7, title: "7 번째 게시물", date: "2024-06-03", nickname: "사용자1" },
  { id: 8, title: "8 번째 게시물", date: "2024-06-03", nickname: "사용자1" },
  { id: 9, title: "9 번째 게시물", date: "2024-06-03", nickname: "사용자1" },
  { id: 10, title: "10 번째 게시물", date: "2024-06-03", nickname: "사용자1" },
  { id: 11, title: "11 번째 게시물", date: "2024-06-03", nickname: "사용자1" },
  { id: 12, title: "12 번째 게시물", date: "2024-06-03", nickname: "사용자1" },
  { id: 13, title: "13 번째 게시물", date: "2024-06-03", nickname: "사용자1" }
];

const itemsPerPage = 10;

const MyPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleProfileEdit = () => {
    navigate("/mypage/1");
  };

  const offset = currentPage * itemsPerPage;
  const currentPagePosts = posts.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(posts.length / itemsPerPage);

  return (
    <Container>
      <ProfileSection>
        <ProfileLogo src="/spartahub_logo.PNG" alt="로고" />
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
              <TableRow key={post.id}>
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
