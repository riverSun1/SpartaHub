import { useState, useRef, useEffect } from "react";
import {
  ProfileEditContainer,
  Form,
  Input,
  ProfileImageButton,
  CircularImage,
  EditButton,
  Select
} from "./ProfileEdit.styled";
import supabase from "../../src/supabaseClient";

const ProfileEdit = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [track, setTrack] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const defaultProfileImage = "/default_profile.png";

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
        error
      } = await supabase.auth.getUser();
      if (error) {
        console.log("error => ", error);
      } else if (user) {
        const userId = user.id;
        const { data, error } = await supabase.from("users").select("email, username, track").eq("id", userId).single();
        if (error) {
          console.log("error => ", error);
        } else {
          console.log("data => ", data);
          setEmail(data.email);
          setUsername(data.username);
          setTrack(data.track);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (user) {
      const userId = user.id;
      const updates = {
        email,
        password,
        username,
        track
      };

      const { data, error } = await supabase.from("users").update(updates).eq("id", userId);

      if (error) {
        console.log("error => ", error);
      } else {
        console.log("data => ", data);
        alert("수정이 완료되었습니다.");
      }
    }
  };

  return (
    <ProfileEditContainer>
      {imagePreview ? (
        <CircularImage src={imagePreview} alt="Preview" />
      ) : (
        <CircularImage src={defaultProfileImage} alt="Default" />
      )}
      <ProfileImageButton onClick={handleButtonClick}>프로필 사진 변경</ProfileImageButton>
      <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageChange} />
      <Form onSubmit={handleSubmit}>
        <Input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Select value={track} onChange={(e) => setTrack(e.target.value)}>
          <option value="">Your track</option>
          <option value="React 5기">React 5기</option>
          <option value="React 4기">React 4기</option>
          <option value="React 3기">React 3기</option>
          <option value="React 2기">React 2기</option>
          <option value="React 1기">React 1기</option>
        </Select>
        <EditButton type="submit">수정</EditButton>
      </Form>
    </ProfileEditContainer>
  );
};

export default ProfileEdit;
