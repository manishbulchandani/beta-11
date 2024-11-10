import {  CircularProgress, Stack } from "@mui/material"
import useFeed from "../../hooks/useFeed"
import { useEffect } from "react"
import DoubtsPost from "./DoubtsPostCard"
import NewDoubtPost from "../../components/NewDoubtPost"

const DoubtsFeed = () => {
  const {loading,doubtsFeed,handleFetchDoubtsFeed}=useFeed()

  useEffect(()=>{
    handleFetchDoubtsFeed()
  },[])

  if(loading){
    <Stack width={"100%"} justifyContent={"center"} alignItems={"center"}><CircularProgress/></Stack>
  }
  return (
    <Stack gap={"12px"}>
        <NewDoubtPost/>
      {/* <TimelinePost/> */}
      <Stack margin={"auto"}>
      {doubtsFeed?.map((feedPost:any,index:number)=>(
        <DoubtsPost key={index} feedPost={feedPost}/>
      ))}
      </Stack>
    </Stack>
  )
}

export default DoubtsFeed
