import styled from "styled-components";
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';

// 본인 것 사용하기
const supabaseUrl = 'https://hprhdyqwygxnybacmqct.supabase.co'; 
// vite에서 env 사용하는 법
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const Button = styled.button`
  background-color: black;
  color: white;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUpNewUser = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    console.log("signup: ", { data, error }); // data에 뭐 들어있는지 확인하기
    setUser(data.user);
  }

  const signInUser = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log("signin: ", { data, error });
    setUser(data.user);
  };

  const signOutUser = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signOut();
    console.log("signout: ", { data, error }); // data는 딱히 필요없을 듯
    setUser(null);
  };

  if (!user) {
    return (
      <Form>
        <input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={onChangeEmail}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={onChangePassword}
        />
        <Button onClick={signInUser}>로그인</Button>
        <button onClick={signUpNewUser}>회원가입</button>
        <button>구글 계정으로 로그인</button>
        <button>카카오 계정으로 로그인</button>
      </Form>
    );
  } else {
    return (
      <div>
        <p>{user.email}</p>
        <button onClick={signOutUser}>로그아웃</button>
      </div>
    );
  }
}

export default Login;