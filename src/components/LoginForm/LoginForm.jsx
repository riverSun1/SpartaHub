import { useState } from "react";
//import { useDispatch } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../../redux/slices/userSlice";
import supabase from "../../supabaseClient";
import {
  Button, 
  Container, 
  Form, 
  Label, 
  Input, 
  Title, 
  Span, 
  Select,
  HubImg,
  FlexDiv,
  ImgContainer
} from "./LoginForm.styled";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [track, setTrack] = useState("");
  const dispatch = useDispatch();

  // 유효성 검사
  const isValidPassword = (password) => {
    return password.length >= 6;
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isValidUsername = (username) => {
    return username.length >= 2;
  };

  // 회원가입
  const handleSignup = async () => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      alert("유효한 이메일 주소를 입력해주세요.");
      return;
    }
    if (!isValidPassword(password)) {
      alert("비밀번호는 6자 이상이어야 합니다.");
      return;
    }
    if (!isValidUsername(username)) {
      alert("닉네임은 2자 이상이여야 합니다.");
      return;
    }

    try {
      const { data: user, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
        },
      });

      console.log(user);
      console.log(error);

      if (error) throw error;

      if (user) {
        // 사용자 데이터 `users` 커스텀 테이블에 추가
        const { error: insertError } = await supabase
          .from("users")
          .insert([{ id: user.user.id, username, track }]);

        if (insertError) throw insertError;

        setUser(user);
        setUsername(username);
        // dispatch(login({ currentUser: user }));

        alert(
          "회원가입 성공! 환영합니다, " +
            (user?.email ?? "사용자") +
            " (" +
            username +
            ")"
        );
        // setTimeout(() => {
        //   navigate("/");
        // }, 3000);
      } else {
        throw new Error("회원가입 후 사용자 데이터가 정의되지 않았습니다");
      }
    } catch (error) {
      console.log("회원가입 오류:", error.message);
    }
  };

  // 로그인
  const handleLogin = async () => {
    event.preventDefault();

    // 유효성 검사
    if (!isValidEmail(email)) {
      alert("유효한 이메일 주소를 입력해주세요.");
      return;
    }
    if (!isValidPassword(password)) {
      alert("비밀번호를 확인해주세요.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log(data);
      console.log(error);
      if (error) {
        console.log("로그인 오류:", error.message);
        throw error;
      }

      if (data.user) {
        dispatch(login(data.user));
        navigate("/mypage");
      }
    } catch (error) {
      console.log("로그인 오류:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setUsername("");
      dispatch(logout());
    } catch (error) {
      console.log("로그아웃 오류:", error.message);
    }
  };

  if (user) {
    return (
      <Container>
        <Title>
          환영합니다, {user.email} ({username})
        </Title>
        <Button onClick={handleLogout}>로그아웃</Button>
      </Container>
    );
  } else {
    return (
      <Container>
        {isLogin ? (
          <Form>
            <FlexDiv>
              <div>
                <Title style={{ fontSize: '32px', marginBottom: '8px' }}>환영합니다!</Title>
                <h1 style={{ marginTop: '0', marginBottom: '24px' }}>아이디와 비밀번호를 입력하세요.</h1>
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                <Button onClick={handleLogin}>로그인</Button>
                <p style={{ marginTop: '16px' }}>
                  계정이 없으신가요?{" "}
                  <Span onClick={() => setIsLogin(false)}>회원가입</Span>
                </p>
              </div>
              <ImgContainer>
                <HubImg src="public/spartahub_logo.png" alt="홈 로고" />
              </ImgContainer>
            </FlexDiv>
            
          </Form>
        ) : (
          <Form>
            <FlexDiv>
              <div>
                <Title style={{ fontSize: '16px', marginBottom: '24px' }}>스파르타에 다시 돌아온 것을 환영합니다!</Title>
                <Label htmlFor="email">Email address</Label>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Label htmlFor="track">Track</Label>
                <Select value={track} onChange={(e) => setTrack(e.target.value)}>
                  <option value="">트랙 선택</option>
                  <option value="React">React</option>
                  <option value="UX/UI">UX/UI</option>
                  <option value="Node">Node</option>
                  <option value="Java, Spring">Java, Spring</option>
                  <option value="Game">Game</option>
                  <option value="Android">Android</option>
                  <option value="ios">ios</option>
                </Select>
                <Button onClick={handleSignup}>회원가입</Button>
                <p style={{ marginTop: '16px' }}>
                  이미 계정이 있으신가요?{" "}
                  <Span onClick={() => setIsLogin(true)}>로그인</Span>
                </p>
              </div>
              <ImgContainer>
                <HubImg src="public/spartahub_logo.png" alt="홈 로고" />
              </ImgContainer>
            </FlexDiv>
          </Form>
        )}
      </Container>
    );
  }
};

export default LoginForm;
