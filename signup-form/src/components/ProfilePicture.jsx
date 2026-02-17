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
// import { useState, useEffect } from "react";
// import { Avatar, Button, Box, CircularProgress } from "@mui/material";
// import { toast } from "react-toastify";
// import { useAuth } from "../store/AuthContext"; 
// import api from "../api/axios"; // Aapka custom axios instance

// const ProfilePicture = () => {
//   const { user, updateProfileState } = useAuth(); 
//   const [loading, setLoading] = useState(false);
  
//   // Local preview state: Pehle check karega user ki existing photo, varna null
//   const [preview, setPreview] = useState(user?.profilePic || "");

//   // Agar user ki photo backend se update ho kar aaye, toh preview sync karein
//   useEffect(() => {
//     if (user?.profilePic) {
//       setPreview(user.profilePic);
//     }
//   }, [user?.profilePic]);

//   const handleUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Frontend par temporary preview dikhayein
//     const objectUrl = URL.createObjectURL(file);
//     setPreview(objectUrl);

//     const formData = new FormData();
//     formData.append("image", file); // Backend 'image' field expect karta hai

//     setLoading(true);
//     try {
//       // ✅ Custom api instance use karein taaki token headers automatically chale jayein
//       const res = await api.put("/auth/update-profile-pic", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
      
//       // ✅ Success: Context state update karein
//       // res.data.user mein updated user object hona chahiye (jisme naya profilePic URL ho)
//       updateProfileState(res.data.user); 
      
//       toast.success("Profile updated successfully!");
//     } catch (err) {
//       console.error("Upload error:", err);
//       toast.error(err.response?.data?.message || "Upload failed");
//       // Error par purani photo wapas set karein
//       setPreview(user?.profilePic || "");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, my: 2 }}>
//       <Avatar 
//         src={preview} 
//         sx={{ 
//           width: 120, 
//           height: 120, 
//           border: '3px solid #1976d2',
//           boxShadow: 3 
//         }} 
//       />
      
//       <Button 
//         variant="contained" 
//         component="label" 
//         disabled={loading}
//         sx={{ borderRadius: '20px', textTransform: 'none' }}
//       >
//         {loading ? <CircularProgress size={24} color="inherit" /> : "Change Profile Photo"}
//         <input 
//           type="file" 
//           hidden 
//           accept="image/*" 
//           onChange={handleUpload} 
//         />
//       </Button>
//     </Box>
//   );
// };

// export default ProfilePicture;
import { useState, useEffect } from "react";
import { Avatar, Button, Box, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useAuth } from "../store/AuthContext"; 
import api from "../api/axios";

const ProfilePicture = () => {
  const { user, updateProfileState } = useAuth(); 
  const [loading, setLoading] = useState(false);
  
  // Preview state
  const [preview, setPreview] = useState(user?.profilePic || "");

  // Jab user change ho toh preview update karein
  useEffect(() => {
    if (user?.profilePic) {
      setPreview(user.profilePic);
    }
  }, [user?.profilePic]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Temporary local preview (for instant UI feedback)
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    const formData = new FormData();
    formData.append("image", file); 

    setLoading(true);
    try {
      // ✅ ENDPOINT CHECK: Make sure this matches your authRoutes.js exactly
      const res = await api.put("/auth/update-profile-pic", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      if (res.data.user) {
        // ✅ Caching fix: Browser ko force karein nayi image fetch karne ke liye
        const updatedUser = {
          ...res.data.user,
          profilePic: `${res.data.user.profilePic}?t=${new Date().getTime()}`
        };

        updateProfileState(updatedUser); // Update Global Auth Context
        toast.success("Profile photo updated successfully!");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err.response?.data?.message || "Upload failed");
      setPreview(user?.profilePic || ""); // Revert on error
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
          boxShadow: 3,
          bgcolor: '#3b82f6',
          fontSize: '3rem'
        }} 
      >
        {/* Fallback if no image */}
        {!preview && user?.email?.charAt(0).toUpperCase()}
      </Avatar>
      
      <Button 
        variant="contained" 
        component="label" 
        disabled={loading}
        sx={{ borderRadius: '20px', textTransform: 'none', px: 4 }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Change Photo"}
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
