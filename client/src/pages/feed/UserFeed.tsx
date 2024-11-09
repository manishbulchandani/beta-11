import { CircularProgress, Stack } from "@mui/material"
import useFeed from "../../hooks/useFeed"
import { useEffect } from "react"
import TimelinePost from "./TimelinePostCard"

const UserFeed = () => {
  const {loading,feed,handleFetchUserFeed}=useFeed()

  useEffect(()=>{
    handleFetchUserFeed()
  },[])

  if(loading){
    <Stack width={"100%"} justifyContent={"center"} alignItems={"center"}><CircularProgress/></Stack>
  }
  return (
    <Stack>
      {/* <TimelinePost/> */}
      {feed?.map((feedPost:any,index:number)=>(
        <TimelinePost key={index} feedPost={feedPost}/>
      ))}
    </Stack>
  )
}

export default UserFeed
