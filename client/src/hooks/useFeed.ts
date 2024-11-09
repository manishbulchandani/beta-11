import { useState } from "react";
import apiClient from "../api/api";

const useFeed = () => {
  const [feed, setFeed] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchUserFeed = async () => {
    setLoading(true)
    try {
      const response = await apiClient.get("/timelineNodes/getFeed");
      setFeed(response.data);
    } catch (error) {
      console.log(error);
    }
    finally{
        setLoading(false)
    }
  };

  return { feed, handleFetchUserFeed, loading };
};

export default useFeed;
