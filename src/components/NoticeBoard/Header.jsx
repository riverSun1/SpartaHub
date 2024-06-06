import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../../styles/designToken.css";
import supabase from "../../supabaseClient";

export const BoardSection = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  width: 100%;
`;

export const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
`;

const Ptag = styled.p`
  font-size: 13px;
  margin: 0;
  padding-top: 10px;
`;

export const Table = styled.table`
  width: 100%;
  text-align: center;
  font-size: smaller;
  font-weight: normal;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  background-color: var(--white);
  color: var(--black);
  padding: 10px;
  border-top: 1.7px solid var(--black-30);
  border-bottom: 1.7px solid var(--black-30);
  text-align: center;
`;

export const TableRow = styled.tr`
  &:hover {
    cursor: pointer;
    background-color: var(--red-99);
  }
`;

export const TableData = styled.td`
  padding: 10px;
  border-bottom: 1px solid var(--black-60);
`;

// ReactPaginate
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

export const Pagination = styled(ReactPaginate).attrs({
  activeClassName: "active"
})`
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    display: inline-block;
    margin: 0 5px;

    &.active a {
      background-color: var(--red-90);
      color: var(--pink-90);
      border-radius: 3px;
    }

    &:hover:not(.active) a {
      color: var(--pink-50);
    }

    a {
      cursor: pointer;
      padding: 3px 5px;
      color: var(--black);
      text-decoration: none;
    }
  }
`;

const DivBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: flex-end;
  cursor: pointer;
`;
const Button = styled.button`
  background-color: var(--pink-50);
  color: var(--purple-90);
  margin-bottom: 5px;
  width: 8%;
  height: 30px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: var(--red-30);
    color: var(--red-99);
  }
`;

const Pdiv = styled.div`
  display: flex;
  p {
    text-align: center;
    line-height: 20px;
  }
`;

const TitleDiv = styled.div`
  width: 100%;
  height: 40px;
  h1 {
    font-size: 4em;
    text-align: center;
    line-height: 200px;
  }
`;

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  // 컴포넌트가 처음 마운트될 때 로그인 상태 체크.
  useEffect(() => {
    if (!isAuthenticated) {
      alert("로그인을 해주세요.");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("board")
        .select("id, title, content,created_at, url, user_id, users:users!board_user_id_fkey(username, track)")
        .order("created_at", { ascending: false }); // 리스트최신글순
      if (error) {
        console.log("error => ", error);
      } else {
        const formattedData = data.map((item) => ({
          ...item,
          created_at: new Date(item.created_at).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
          })
        }));
        setBoards(formattedData);
      }
    };
    fetchData();
  }, []);

  const handleChange = () => {
    navigate(`/job/1`);
  };
  const offset = currentPage * itemsPerPage;
  const currentPagePosts = boards.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(boards.length / itemsPerPage);

  const handleRowClick = (id) => {
    navigate(`/post/${id}`);
  };

  if (!isAuthenticated) {
    return null; // 로그인하지 않은 경우 아무것도 렌더링하지 않음
  } else {
    return (
      <Container>
        <BoardSection>
          <TitleDiv>
            <h2>채용공고 공유</h2>
          </TitleDiv>
          <DivBar>
            <Pdiv>
              <Ptag>Sort</Ptag>
            </Pdiv>
            <Pdiv>
              <Ptag>Search</Ptag>
            </Pdiv>
            <Button onClick={handleChange}>New +</Button>
          </DivBar>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>게시물 번호</TableHeader>
                <TableHeader>제목</TableHeader>
                <TableHeader>URL</TableHeader>
                <TableHeader>일자</TableHeader>
                <TableHeader>닉네임</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {currentPagePosts.map((board) => (
                <TableRow key={board.id}>
                  <TableData>{board.id}</TableData>
                  <TableData>{board.title}</TableData>
                  <TableData>
                    <a href={board.url}>{board.url}</a>
                  </TableData>
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
  }
};

export default Header;
