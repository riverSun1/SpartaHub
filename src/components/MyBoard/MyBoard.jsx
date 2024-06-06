import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../../redux/slices/authSlice";
import supabase from "../../supabaseClient";
import {
  BoardSection,
  Pagination,
  PaginationContainer,
  Table,
  TableData,
  TableHeader,
  TableRow,
  Title
} from "./MyBoard.styled";
import {
  ButtonContainer,
  Container,
  ProfileBtn,
  ProfileImg,
  ProfileLogo,
  ProfileName,
  ProfileSection
} from "./MyProfile.styled";

const itemsPerPage = 10;

const MyPage = () => {
  const dispatch = useDispatch();
  const [boards, setBoards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("board")
        .select("id, title, content, created_at, url, user_id, users:users!board_user_id_fkey(username, track)")
        .order("id", { ascending: true });
      if (error) {
        console.log("error => ", error);
      } else {
        const formattedData = data.map((item) => ({
          ...item,
          created_at: new Date(item.created_at).toLocaleString()
        }));
        setBoards(formattedData);
      }
    };
    fetchData();
  }, []);

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
  const currentPagePosts = boards.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(boards.length / itemsPerPage);

  return (
    <Container>
      <ProfileSection>
        <ProfileLogo src="src/assets/images/spartahub_logo.png" alt="로고" />
        <ProfileImg src="/default_profile.png" alt="프로필이미지" />
        <ProfileName>{user.user_metadata.username}님</ProfileName>
        <ButtonContainer>
          <ProfileBtn onClick={handleProfileEdit}>내정보변경</ProfileBtn>
          <ProfileBtn onClick={handleClickLogout}>로그아웃</ProfileBtn>
        </ButtonContainer>
      </ProfileSection>
      <BoardSection>
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
            {currentPagePosts.map((board) => (
              <TableRow key={board.id} onClick={() => handlePostClick(board.id)}>
                <TableData>{board.id}</TableData>
                <TableData>{board.title}</TableData>
                <TableData>{board.url}</TableData>
                <TableData>{board.created_at}</TableData>
                <TableData>{board.users.username}</TableData>
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
