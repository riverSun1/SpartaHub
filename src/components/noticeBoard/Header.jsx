import styled from 'styled-components'
import "../noticeBoard/designToken.css"
import { useEffect, useState } from 'react';
import supabase from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
export const BoardSection = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 50px;
  align-items: center;
  width: 100%;
`;
export const Title = styled.h1`
  font-size: 4em;
  margin-bottom: 50px;
  
  `;

export const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
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
const DivBar = styled.div`
width:100%;
display:flex;
flex-direction:row;
gap:20px;
justify-content:flex-end;
cursor:pointer;
`
const Button = styled.button`
background-color:var(--pink-50);
color:var(--purple-90);
margin-bottom:5px;
width:10%;
height:30px;
border-radius:5px;
cursor:pointer;
&:hover{
    background-color:var(--white);
    color:var(--blue-10);
}
`
const Pdiv= styled.div`
display:flex;
p{
text-align:center;
line-height: 20px;

}


`



const Header = () => {
    const [userData, setUserData] = useState([])
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchData = async()=>{
        
            const {data, error} = await supabase.from("board").select("*")
            if(error){
                console.log("select_error", error)
            }else{
                setUserData(data)
                
            } 
        }
        fetchData();
    },[]) 
    const handleChange = ()=>{
        navigate(`/job/1`)
    }
    
   const TitleDiv=styled.div`
    width: 100%;
  height: 250px;
  h1{
    font-size: 4em;
    text-align: center;  
    line-height: 200px;

  }
  
  
   `

     console.log(userData)
  return (
    <>
    <Container>
  
    <BoardSection>
    <TitleDiv>
    <h1>취업공유Page</h1>
    </TitleDiv>
    <DivBar>
        <Pdiv>
            <p>Sort</p>
        </Pdiv>
        <Pdiv>
            <p>Search</p>
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
        {userData.map((data)=>{
           return <>
           <TableRow >
            <TableData>{data.id}</TableData>
            <TableData>{data.title}</TableData>
            <TableData><a href={data.url} >링크</a></TableData>
            <TableData>{data.created_at}</TableData>
            </TableRow>
            </>
        })}
          
           
      </tbody>
    </Table>
    
  </BoardSection>
</Container>
</>
  )
}

export default Header
