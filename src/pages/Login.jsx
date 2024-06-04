// import { useState } from "react";
// import { createClient } from '@supabase/supabase-js';

// // 본인 것 사용하기
// const supabaseUrl = 'https://hprhdyqwygxnybacmqct.supabase.co'; 
// // vite에서 env 사용하는 법
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [user, setUser] = useState(null);

//   const onChangeEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const onChangePassword = (e) => {
//     setPassword(e.target.value);
//   };

//   const signUpNewUser = async (e) => {
//     e.preventDefault();
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//     });
//     console.log("signup: ", { data, error }); // data에 뭐 들어있는지 확인하기
//     setUser(data.user);
//   }

//   if (!user) {
//     return (
//       <form>
//         <input
//           type="text"
//           placeholder="이메일"
//           value={email}
//           onChange={onChangeEmail}
//         />
//         <input
//           type="password"
//           placeholder="비밀번호"
//           value={password}
//           onChange={onChangePassword}
//         />
//         <button>로그인</button>
//         <button>회원가입</button>
//         <button>구글 계정으로 로그인</button>
//         <button>카카오 계정으로 로그인</button>
//       </form>
//     );
//   } else {
//     return (
//       <div>
//         Logged in!
//         <button>로그아웃</button>
//       </div>
//     );
//   }
// }

// export default Login;