import React, { useState} from 'react'
import styled from "styled-components";
import supabase from '../../supabaseClient';
import { useSelector } from 'react-redux';
export const BoardSection = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;

  align-items: center;
  width: 90%;

`;
const TitleDiv=styled.div`
width: 100%;
height: 300px;
h1{
font-size: 4em;
text-align: center;  
line-height: 300px;

}


`
export const Title = styled.h1`
  font-size: 45px;
  text-align:center;
  line-height:300px;
`;

const Section = styled.section`
padding:10px;
border: 1px solid #999;
border-radius: 10px;
width:100%;
height:50vh;
display:flex;
flex-direction:column;
align-items:center;
justify-content: center;


gap:10px;
div{
    display:flex;
    flex-direction:column;
    gap:10px;
    
}



` 
const Input = styled.input`
width:300px;
height:50px;
border-radius:10px;
&:hover{
    border:3px solid var(--pink-50);
}
`
const Button = styled.button`
background-color:var(--pink-50);
color:var(--purple-90);
width:300px;
height:50px;
border-radius:5px;
cursor:pointer;
&:hover{
    background-color:var(--white);
    color:var(--blue-10);
}
margin-top:40px;
`
const ButtonDiv = styled.div`
width:100%;
height:200px;
display:flex;
justify-content: center;

`
const Detail = () => {
    
    const [nickname, setNickname]= useState("");
    const [url,setUrl] = useState("")
    const [name,setName]= useState("")
    const getId = async()=>{
      const{data
    ,error} = await supabase.auth.getSession();
    if(error){
      console.log("get sesion error", error)
    }else{
      const user = data.session.user.id
      console.log(user)
      }

  }
  const users = useSelector((state)=>state.user.user)
  console.log(users)
  getId()
    const handleAdd = ()=>{
       
      
          const supabaseInsert = async()=>{
          
              const {error} = await supabase.from("board").insert({
                title:nickname,
                url, 
              })
              if(error){
                  console.log("select_error", error)
              }else{
                alert("등록")
              }
          }
          supabaseInsert();
     }


      return (
          <>

          <BoardSection>
          <TitleDiv>
          <h1>취업공유등록page</h1>
          </TitleDiv>
          <Section>
          <div>
          <p>제목:</p>
          <Input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>
          <p>닉네임:</p>
          <Input type="text" value={nickname} onChange={(e)=>{setNickname(e.target.value)}}/>
          <p>URL:</p>
          <Input type="text" value={url} onChange={(e)=>{setUrl(e.target.value)}}/>
          </div>
          </Section>
          <ButtonDiv>
          <Button onClick={handleAdd}>등록</Button>
          </ButtonDiv>
          </BoardSection>
          </>
      )
}

export default Detail
