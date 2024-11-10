import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { TimelineNode as ITimelineNode } from "../pages/timelineSearch/SearchPage";

interface TimelineNodeProps extends ITimelineNode {
  isLast: boolean;
}

const TimelineNode: React.FC<TimelineNodeProps> = ({
  title,
  message,
  createdAt,
  topics,
  isLast,
}) => {
  console.log(title,message,topics,createdAt,isLast)
  return (
    <Box
      sx={{
        minWidth: 300,
        maxWidth: 300,
        mr: isLast ? 0 : 4,
        position: "relative",
        perspective: "1000px",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          height: "100%",
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(0, 0, 0, 0.06)",
          transition: "all 0.3s ease-in-out",
          position: "relative",
          overflow: "hidden",
          "&:hover": {
            transform: "translateY(-8px) rotateX(2deg)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
            "&::before": {
              transform: "translateX(100%)",
            },
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "4px",
            background: "linear-gradient(90deg, #2196F3, #E91E63)",
            transition: "transform 0.5s ease-in-out",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(0, 0, 0, 0.04)",
            padding: "4px 12px",
            borderRadius: "12px",
            backdropFilter: "blur(4px)",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontSize: "0.75rem",
              color: "rgba(0, 0, 0, 0.6)",
              fontWeight: 500,
            }}
          >
            {new Date(createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "#1a1a1a",
              mb: 2,
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "rgba(0, 0, 0, 0.6)",
              lineHeight: 1.6,
              mb: 2,
              fontSize: "0.9rem",
            }}
          >
            {message}
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={"4px"}>
          {
            topics.map((topic,index)=>( <Chip
              key={index}
              label={topic}
              size="small"
              sx={{
                alignSelf: "flex-start",
                bgcolor: "#e3f2fd",
                color: "#1976d2",
                fontSize: "0.75rem",
                height: "24px",
              }}
            />))
          }
          </Stack>
          
        </Box>
      </Paper>

      {!isLast && (
        <Box
          sx={{
            position: "absolute",
            right: "-40px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "36px",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Box
            sx={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              backgroundColor: "#2196F3",
              opacity: 0.5,
            }}
          />
          <Box
            sx={{
              flex: 1,
              height: "2px",
              background:
                "linear-gradient(90deg, #2196F3 50%, transparent 50%)",
              backgroundSize: "8px 2px",
              backgroundRepeat: "repeat-x",
            }}
          />
          {/* <Box
          sx={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: '#E91E63',
            opacity: 0.5,
          }}
        /> */}
        </Box>
      )}
    </Box>
  );
};

export default TimelineNode;
