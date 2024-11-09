import apiClient from "../../api/api";

export const addNodeToTimeline = async (formData: FormData): Promise<any> => {
  const response = await apiClient.post("/timelineNodes/addTimelineNode", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
