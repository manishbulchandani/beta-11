import { Outlet, Route, useNavigate } from "react-router-dom";
import UserProfile from "./profile/UserProfile";
import TimelinePost from "./feed/TimelinePostCard";
import { Avatar, IconButton, Stack } from "@mui/material";
import { Feed, Home } from "@mui/icons-material";

const UserMain = () => {
  const navigate=useNavigate()
  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"} bgcolor={"#ffffff"} boxShadow={"0 0 10px #48484874"} height={"56px"} alignItems={"center"} padding={"0 40px"}>
        <Avatar
          onClick={()=>navigate("/profile")}
          sx={{
            width: 50,
            height: 50,
            border: "4px solid white",
            cursor:"pointer",
          }}
          alt="Jeremy Rose"
          src="/path-to-image.jpg"
        />
        <Stack direction={"row"} alignItems={"center"}>
          <IconButton onClick={()=>navigate("/feed")}><Home/></IconButton>
          <IconButton onClick={()=>navigate("/feed")}><Feed/></IconButton>
        </Stack>
        <Stack></Stack>
      </Stack>
      <Stack marginTop={"12px"}>
      <Outlet />
      </Stack>
      {/* <UserProfile/> */}
      {/* <TimelinePost /> */}
      {/* <Route path="/profile/*" element={<UserProfile />} /> */}
      {/* <Route path="/feed" element={<TimelinePost />} /> */}
    </>
  );
};

export default UserMain;
