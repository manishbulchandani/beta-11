import apiClient from "../../api/api";
import { TimelineNode } from "./timelineTypes";

export const addNodeToTimeline = async (timelineDetails: TimelineNode): Promise<any> => {
    const response = await apiClient.post("/timelineNodes/addTimelineNode",timelineDetails);
    return response.data; 
  };
  