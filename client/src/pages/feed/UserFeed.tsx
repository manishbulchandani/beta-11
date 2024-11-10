import { CircularProgress, Stack } from "@mui/material"
import useFeed from "../../hooks/useFeed"
import { useEffect } from "react"
import TimelinePost from "./TimelinePostCard"
// import NewDoubtPost from "../../components/NewDoubtPost"

const UserFeed = () => {
  const {loading,userFeed,handleFetchUserFeed}=useFeed()

  useEffect(()=>{
    handleFetchUserFeed()
  },[])

  if(loading){
    <Stack width={"100%"} justifyContent={"center"} alignItems={"center"}><CircularProgress/></Stack>
  }
  return (
    <Stack direction={"row"}>
      {/* <TimelinePost/> */}
      <Stack margin={"auto"}>
      {userFeed?.map((feedPost:any,index:number)=>(
        <TimelinePost key={index} feedPost={feedPost}/>
      ))}
      </Stack>
    </Stack>
  )
}

export default UserFeed
