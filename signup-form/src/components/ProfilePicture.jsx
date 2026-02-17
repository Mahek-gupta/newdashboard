import { useState } from "react";
import { Avatar, Button, Box, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

const ProfilePicture = ({ currentImage }) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(currentImage);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Frontend par turant preview dikhane ke liye
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file); // 'image' wahi naam hai jo backend multer mein hai

    setLoading(true);
    try {
      const res = await axios.put("/auth/update-profile-pic", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Avatar src={preview} sx={{ width: 100, height: 100, border: '2px solid #ccc' }} />
      
      <Button variant="contained" component="label" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Change Photo"}
        <input type="file" hidden accept="image/*" onChange={handleUpload} />
      </Button>
    </Box>
  );
};

export default ProfilePicture;
