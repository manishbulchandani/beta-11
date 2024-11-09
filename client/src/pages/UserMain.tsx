import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, IconButton, Stack } from "@mui/material";
import { Feed, Home } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import Navbar from "../components/Navbar";

const UserMain = () => {
  const navigate=useNavigate()
  const user =useSelector((state:RootState)=>state.user.user)
  return (
    <>
     <Navbar user={user}/>
     <Stack marginTop={"12px"}>
      <Outlet/>
     </Stack>
      {/* <UserProfile/> */}
      {/* <TimelinePost /> */}
      {/* <Route path="/profile/*" element={<UserProfile />} /> */}
      {/* <Route path="/feed" element={<TimelinePost />} /> */}
    </>
  );
};

export default UserMain;
