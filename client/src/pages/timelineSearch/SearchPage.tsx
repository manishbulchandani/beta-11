import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TimelineNode from "../../components/TimelineNodeSearchPage";
import { useLocation, useNavigate } from "react-router-dom";
import { searchTimeline } from "../../features/timeline/timelineApi";

// Types
export interface TimelineNode {
  title: string;
  message: string;
  topics:string[];
  createdAt: string;
}

// interface UserInfo {
//   name: string;
//   avatar: string;
//   designation: string;
// }

interface TimelineData {
  userId: number;
  name: string;
  bio:string;
  timelineNodes: TimelineNode[][];
}

interface TimelineCardProps {
  data: TimelineData;
  query:string;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ data,query }) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const visibleNodes = data?.timelineNodes[0]?.slice(0, 3);
 const navigate=useNavigate()
  return (
    <>
      <Card
        sx={{ mb: 3, maxWidth: "100%", boxShadow: 3, borderRadius: "12px" }}
      >
        <CardContent>
            <Stack direction="row">
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Avatar
              src={"data.user.avatar"}
              sx={{ width: 56, height: 56, mr: 2 }}
            />
            <Box>
              <Typography variant="h6">{data?.name}</Typography>
              <Typography color="text.secondary">
                {data?.bio}
              </Typography>
            </Box>
          </Box>
          </Stack>

          <Box sx={{ position: "relative" }}>
            <Box
              ref={scrollContainerRef}
              sx={{
                display: "flex",
                overflowX: "auto",
                pb: 2,
                position: "relative",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                maskImage:
                  "linear-gradient(to right, black 80%, transparent 100%)",
              }}
            >
              {visibleNodes.map((node, index) => (
                <TimelineNode
                  key={index}
                  title={node.title}
                  message={node.message}
                  topics={node.topics}
                  createdAt={node.createdAt}
                  isLast={index === visibleNodes.length - 1}
                />
              ))}
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
                onClick={()=>navigate(`/timelines?q=${query}&user=${data.userId}`)}
              variant="contained"
              sx={{
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              View Full Timeline
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

const timelineData = [
  {
    id: 1,
    user: {
      name: "John Smith",
      avatar: "https://via.placeholder.com/40",
      designation: "Senior Project Manager",
    },
    timeline: [
      {
        title: "Project Kickoff",
        description: "Initiated the new client project with team allocation",
        date: "2024-03-15",
      },
      {
        title: "Requirements Gathering",
        description: "Completed initial requirements documentation",
        date: "2024-03-20",
      },
      {
        title: "Design Phase",
        description: "Started UI/UX design phase with the design team",
        date: "2024-03-25",
      },
      {
        title: "Development Sprint 1",
        description: "Began first development sprint",
        date: "2024-03-30",
      },
    ],
  },
  // Add more timeline entries as needed
];
const TimelineFeed: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get("q");
  const [timelineData,setTimelineData]=useState<any>()


  useEffect(() => {
    const fetchData=async()=>{
      const response=await searchTimeline(q||"")
      console.log("resposne",response)
      setTimelineData(response)
    }
    if(q){
        fetchData()
    }
  }, [q]);
  
  return (
    <Box key={q} sx={{ p: 3 }}>
      {timelineData?.map((data:any) => (
        // <></>
        <TimelineCard query={q||""} key={data.id} data={data} />
      ))}
    </Box>
  );
};

export { TimelineFeed as default, timelineData };
