import { Route } from "react-router-dom"
import UserProfile from "./profile/UserProfile"

const UserMain = () => {
  return (
    <>
    <UserProfile/>
      {/* <Route path="/profile/*" element={<UserProfile />} /> */}
    </>
  )
}

export default UserMain
