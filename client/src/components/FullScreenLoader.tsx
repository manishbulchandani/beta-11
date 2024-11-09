import { CircularProgress, Stack } from "@mui/material"

const FullScreenLoader = () => {
  return (
    <Stack width={"100%"} height={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <CircularProgress/>
    </Stack>
  )
}

export default FullScreenLoader
