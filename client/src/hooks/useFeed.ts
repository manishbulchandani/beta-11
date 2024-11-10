import { useState } from "react";
import apiClient from "../api/api";

const useFeed = () => {
  const [userFeed, setUserFeed] = useState<any>(null);
  const [doubtsFeed,setDoubtsFeed]=useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchUserFeed = async () => {
    setLoading(true)
    try {
      const response = await apiClient.get("/timelineNodes/getFeed");
      setUserFeed(response.data);
    } catch (error) {
      console.log(error);
    }
    finally{
        setLoading(false)
    }
  };

  const handleFetchDoubtsFeed=async()=>{
    setLoading(true)
    try {
      const response = await apiClient.get("/timelineNodes/getFeed");
      setDoubtsFeed(response.data);
    } catch (error) {
      console.log(error);
    }
    finally{
        setLoading(false)
    }
  }

  return { userFeed,doubtsFeed, handleFetchUserFeed,handleFetchDoubtsFeed, loading };
};

export default useFeed;
