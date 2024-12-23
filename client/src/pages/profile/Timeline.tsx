import {
  Stack,
  Typography,
  Paper,
  Chip,
  useTheme,
  Button,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AddToTimelineModal from "./AddToTimelineModal";
import { useState } from "react";
import { Add } from "@mui/icons-material";

const Timeline = ({timelineNodes,handlePushTimeline}:{timelineNodes:any,handlePushTimeline:(item:any)=>void}) => {
  const theme = useTheme();
  const [timelineModal, setTimelineModal] = useState<boolean>(false);
  // const timelineNodes = [
  //   {
  //     title: "Learning Web Development",
  //     category: "Web Development",
  //     content:
  //       "Today I learned web development from code with harry. We covered many topics including HTML, CSS, JavaScript, and React. It was a very productive session with lots of hands-on practice.,Today I learned web development from code with harry. We covered many topics including HTML, CSS, JavaScript, and React. It was a very productive session with lots of hands-on practice.,Today I learned web development from code with harry. We covered many topics including HTML, CSS, JavaScript, and React. It was a very productive session with lots of hands-on practice.",
  //     date: "2 hours ago",
  //   },
  //   {
  //     title: "Learning Web Development",
  //     category: "Web Development",
  //     content:
  //       "Today I learned web development from code with harry. We covered many topics including HTML, CSS, JavaScript, and React. It was a very productive session with lots of hands-on practice.",
  //     date: "1 day ago",
  //   },
  //   {
  //     title: "Learning Web Development",
  //     category: "Web Development",
  //     content:
  //       "Today I learned web development from code with harry. We covered many topics including HTML, CSS, JavaScript, and React. It was a very productive session with lots of hands-on practice.",
  //     date: "3 days ago",
  //   },
  // ];

  return (
    <Stack sx={{ p: 3 }}>
      <Stack direction="row" justifyContent={"space-between"}>
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            fontWeight: 600,
            color: "#1a1a1a",
          }}
        >
          USER TIMELINE
        </Typography>
        <Button
          variant="contained"
          endIcon={<Add />}
          onClick={()=>setTimelineModal(true)}
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            px: 2,
            height:"max-content",
          }}
        >
          Add to timeline
        </Button>
      </Stack>

      <Stack gap={0}>
        {timelineNodes?.map((node:any, index:number) => (
          <Stack
            key={index}
            direction="row"
            sx={{ position: "relative", cursor: "pointer" }}
          >
            {/* Timeline Line and Dot */}
            <Stack
              sx={{
                alignItems: "center",
                pr: 3,
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 24,
                  bottom: index === timelineNodes.length - 1 ? 0 : -16,
                  right: "50%",
                  width: 2,
                  background:
                    "linear-gradient(to bottom, #e0e0e0 50%, transparent 50%)",
                  backgroundSize: "10px 10px",
                  display:
                    index === timelineNodes.length - 1 ? "none" : "block",
                },
              }}
            >
              <FiberManualRecordIcon
                sx={{
                  color: "#1976d2",
                  fontSize: 16,
                  bgcolor: "white",
                  borderRadius: "50%",
                  zIndex: 1,
                }}
              />
            </Stack>

            {/* Content Card */}
            <Paper
              elevation={1}
              sx={{
                flex: 1,
                p: 2,
                mb: 2,
                borderRadius: "12px",
                bgcolor: "#fff",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 3,
                },
              }}
            >
              <Stack spacing={1}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: "#1a1a1a",
                    }}
                  >
                    {node.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#666",
                    }}
                  >
                    {node.createdAt}
                  </Typography>
                </Stack>

                <Chip
                  label={node.category}
                  size="small"
                  sx={{
                    alignSelf: "flex-start",
                    bgcolor: "#e3f2fd",
                    color: "#1976d2",
                    fontSize: "0.75rem",
                    height: "24px",
                  }}
                />

                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    fontWeight: "400",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: 1.5,
                  }}
                >
                  {node.message}
                </Typography>
              </Stack>
            </Paper>
          </Stack>
        ))}
      </Stack>
      <AddToTimelineModal
        open={timelineModal}
        handleClose={() => setTimelineModal(false)}
        handlePushTimeline={handlePushTimeline}
      />
    </Stack>
  );
};

export default Timeline;
