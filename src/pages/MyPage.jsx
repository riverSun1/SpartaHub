import styled from "styled-components";
import "../styles/designToken.css";

const Container = styled.div`
  background-color: var(--red-70);
  height: 100vh;
  width: 30vw;
`;

const MyPage = () => {
  return (
    <Container>
      <div>MyPage</div>
    </Container>
  );
};

export default MyPage;
