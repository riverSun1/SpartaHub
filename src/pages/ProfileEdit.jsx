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
import supabase from "../supabaseClient";

const ProfileEdit = () => {
  const [username, setUsername] = useState("");
  const [track, setTrack] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const fileInputRef = useRef(null);
  const defaultProfileImage = "/default_profile.png";

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: userData, error } = await supabase.from("users").select("*").eq("id", session.user.id).single();
        if (error) {
          console.error("Error fetching user data:", error.message);
          setNotification("An error occurred while fetching user data.");
        } else {
          setUser(userData);
          setUsername(userData.username);
          setTrack(userData.track);
          if (userData.image) {
            setImagePreview(userData.image);
          }
        }
      }
    };
    fetchUser();
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
    try {
      let profileImageUrl = user?.avatars || "";
      if (image) {
        const { data: imageData, error: imageError } = await supabase.storage
          .from("avatars")
          .upload(`${user.id}/${crypto.randomUUID()}.jpg`, image, {
            upsert: true
          });
        console.log(imageData);
        if (imageError) {
          throw imageError;
        }
        // profileImageUrl = supabase.storage.from("avatars").getPublicUrl(imageData.path).publicURL;
        profileImageUrl = imageData;
        console.log(profileImageUrl);
      }
      const updatedData = {
        username: username || user.username,
        track: track || user.track,
        image: `https://eilpbictlqbnuqnikudq.supabase.co/storage/v1/object/public/avatars/${profileImageUrl.path}`
      };
      const { data, error } = await supabase.from("users").update(updatedData).eq("id", user.id);
      if (error) {
        throw error;
      }
      setNotification("프로필이 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error("프로필 업데이트 중 오류가 발생했습니다:", error.message);
      setNotification("프로필 업데이트 중 오류가 발생했습니다.");
    }
  };

  return (
    <ProfileEditContainer>
      {notification && <div>{notification}</div>}
      {imagePreview ? (
        <CircularImage src={imagePreview} alt="Preview" />
      ) : (
        <CircularImage src={defaultProfileImage} alt="Default" />
      )}
      <ProfileImageButton onClick={handleButtonClick}>프로필 사진 변경</ProfileImageButton>
      <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageChange} />
      <Form onSubmit={handleSubmit}>
        <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Select value={track} onChange={(e) => setTrack(e.target.value)}>
          <option value="">Your track</option>
          <option value="React">React</option>
          <option value="ux/ui">ux/ui</option>
          <option value="spring">spring</option>
          <option value="game">game</option>
          <option value="ios">ios</option>
        </Select>
        <EditButton type="submit">수정</EditButton>
      </Form>
    </ProfileEditContainer>
  );
};

export default ProfileEdit;
