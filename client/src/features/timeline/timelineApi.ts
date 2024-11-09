import apiClient from "../../api/api";

export const addNodeToTimeline = async (formData: FormData): Promise<any> => {
  const response = await apiClient.post(
    "/timelineNodes/addTimelineNode",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const searchTimeline = async (query: string): Promise<any> => {
  try {
    const response = await apiClient.post("/timelineNodes/searchTimelineNode", {
      category: query,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return {message:"Something went wrong!"}
  }
};
