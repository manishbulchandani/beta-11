import { Outlet, Route } from "react-router-dom"
import UserProfile from "./profile/UserProfile"
import TimelinePost from "./feed/TimelinePostCard"

const UserMain = () => {
  return (
    <>
    <Outlet/>
    {/* <UserProfile/> */}
    {/* <TimelinePost /> */}
      {/* <Route path="/profile/*" element={<UserProfile />} /> */}
      {/* <Route path="/feed" element={<TimelinePost />} /> */}
    </>
  )
}

export default UserMain
