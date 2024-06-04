import React, { useState, useRef } from "react";
import {
  ProfileEditContainer,
  Form,
  Input,
  ProfileImageButton,
  CircularImage,
  EditButton,
  Select
} from "./ProfileEdit.styled";

const ProfileEdit = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Username, setUsername] = useState("");
  const [track, setTrack] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const defaultProfileImage = "/default_profile.png";

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <ProfileEditContainer>
      {/* <h2>회원정보 수정</h2> */}
      {/* Profile Image */}
      {imagePreview ? (
        <CircularImage src={imagePreview} alt="Preview" />
      ) : (
        <CircularImage src={defaultProfileImage} alt="Default" />
      )}
      {/* Profile Image Change Button */}
      <ProfileImageButton onClick={handleButtonClick}>프로필 사진 변경</ProfileImageButton>
      {/* File input (hidden) */}
      <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageChange} />
      {/* Form */}
      <Form onSubmit={handleSubmit}>
        {/* Email Input */}
        <Input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        {/* Password Input */}
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {/* Username Input */}
        <Input type="text" placeholder="Username" value={Username} onChange={(e) => setUsername(e.target.value)} />
        {/* Track Selection */}
        <Select value={track} onChange={(e) => setTrack(e.target.value)}>
          <option value="">Your track</option>
          <option value="React 5기">React 5기</option>
          <option value="React 4기">React 4기</option>
          <option value="React 3기">React 3기</option>
          <option value="React 2기">React 2기</option>
          <option value="React 1기">React 1기</option>
        </Select>
        {/* Submit Button */}
        <EditButton type="submit">수정</EditButton>
      </Form>
    </ProfileEditContainer>
  );
};

export default ProfileEdit;
