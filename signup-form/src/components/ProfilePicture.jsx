// import { useState } from "react";
// import { Avatar, Button, Box, CircularProgress } from "@mui/material";
// import { toast } from "react-toastify";
// import axios from "axios";

// const ProfilePicture = ({ currentImage }) => {
//   const [loading, setLoading] = useState(false);
//   const [preview, setPreview] = useState(currentImage);

//   const handleUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Frontend par turant preview dikhane ke liye
//     setPreview(URL.createObjectURL(file));

//     const formData = new FormData();
//     formData.append("image", file); // 'image' wahi naam hai jo backend multer mein hai

//     setLoading(true);
//     try {
//       const res = await axios.put("/auth/update-profile-pic", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success("Profile updated successfully!");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
//       <Avatar src={preview} sx={{ width: 100, height: 100, border: '2px solid #ccc' }} />
      
//       <Button variant="contained" component="label" disabled={loading}>
//         {loading ? <CircularProgress size={24} /> : "Change Photo"}
//         <input type="file" hidden accept="image/*" onChange={handleUpload} />
//       </Button>
//     </Box>
//   );
// };

// export default ProfilePicture;
import { useState, useEffect } from "react";
import { Avatar, Button, Box, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useAuth } from "../store/AuthContext"; 
import api from "../api/axios"; // Aapka custom axios instance

const ProfilePicture = () => {
  const { user, updateProfileState } = useAuth(); 
  const [loading, setLoading] = useState(false);
  
  // Local preview state: Pehle check karega user ki existing photo, varna null
  const [preview, setPreview] = useState(user?.profilePic || "");

  // Agar user ki photo backend se update ho kar aaye, toh preview sync karein
  useEffect(() => {
    if (user?.profilePic) {
      setPreview(user.profilePic);
    }
  }, [user?.profilePic]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Frontend par temporary preview dikhayein
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    const formData = new FormData();
    formData.append("image", file); // Backend 'image' field expect karta hai

    setLoading(true);
    try {
      // ✅ Custom api instance use karein taaki token headers automatically chale jayein
      const res = await api.put("/auth/update-profile-pic", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      // ✅ Success: Context state update karein
      // res.data.user mein updated user object hona chahiye (jisme naya profilePic URL ho)
      updateProfileState(res.data.user); 
      
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err.response?.data?.message || "Upload failed");
      // Error par purani photo wapas set karein
      setPreview(user?.profilePic || "");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, my: 2 }}>
      <Avatar 
        src={preview} 
        sx={{ 
          width: 120, 
          height: 120, 
          border: '3px solid #1976d2',
          boxShadow: 3 
        }} 
      />
      
      <Button 
        variant="contained" 
        component="label" 
        disabled={loading}
        sx={{ borderRadius: '20px', textTransform: 'none' }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Change Profile Photo"}
        <input 
          type="file" 
          hidden 
          accept="image/*" 
          onChange={handleUpload} 
        />
      </Button>
    </Box>
  );
};

export default ProfilePicture;
