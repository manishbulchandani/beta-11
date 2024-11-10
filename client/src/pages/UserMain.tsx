import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, IconButton, Stack } from "@mui/material";
import { Feed, Home, Timeline } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
// import Navbar from "./timelineSearch/SearchPage";
import Navbar from "../components/Navbar";
import TimelineFeed from "./timelineSearch/SearchPage";
import UserTimeline from "./userTimeline/UserTimeline";

const UserMain = () => {
  const user =useSelector((state:RootState)=>state.user.user)
  return (
    <>
     <Navbar user={user}/>
     <Stack marginTop={"12px"}>
      <Outlet/>
     </Stack>
      {/* <UserTimeline/> */}
      {/* <TimelinePost /> */}
      {/* <Route path="/profile/*" element={<UserProfile />} /> */}
      {/* <Route path="/feed" element={<TimelinePost />} /> */}
    </>
  );
};

export default UserMain;
