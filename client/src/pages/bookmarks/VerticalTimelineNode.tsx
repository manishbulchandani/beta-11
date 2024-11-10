import { CalendarToday } from "@mui/icons-material";
import { Box, Paper, Typography, useTheme, alpha, Chip } from "@mui/material";
import { useState } from "react";

export const VerticalTimelineNode = ({
  node,
  isSelected,
  isLast,
}: {
  node: any;
  isSelected: boolean;
  isLast: boolean;
}) => {
    const [selectedNode,setSelectedNode]=useState()
  const theme = useTheme();
  selectedNode
  
  return (
    <Box sx={{ position: "relative", mb: isLast ? 0 : 3 }}>
      {/* {!isLast && (
        // <Box
        //   sx={{
        //     position: "absolute",
        //     left: "20px",
        //     top: "40px",
        //     bottom: "-20px",
        //     width: "2px",
        //     background: `linear-gradient(to bottom, ${
        //       theme.palette.primary.main
        //     }, ${alpha(theme.palette.primary.light, 0.3)})`,
        //     zIndex: 1,
        //   }}
        // />
      )} */}

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: isSelected
              ? `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
              : `linear-gradient(45deg, ${theme.palette.grey[300]}, ${theme.palette.grey[400]})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            flexShrink: 0,
            transition: "all 0.3s ease",
            transform: isSelected ? "scale(1.1)" : "scale(1)",
            boxShadow: isSelected ? "0 4px 8px rgba(0,0,0,0.2)" : "none",
          }}
        >
          <School />
        </Box> */}

        <Paper
          sx={{
            flex: 1,
            ml: 2,
            p: 2,
            cursor: "pointer",
            borderRadius: 2,
            transition: "all 0.3s ease",
            transform: isSelected ? "translateX(8px)" : "translateX(0)",
            backgroundColor: isSelected
              ? alpha(theme.palette.primary.light, 0.1)
              : "#fff",
            borderLeft: isSelected
              ? `4px solid ${theme.palette.primary.main}`
              : "4px solid transparent",
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.light, 0.1),
              transform: "translateX(8px)",
            },
          }}
          onClick={() => setSelectedNode(node)}
          elevation={isSelected ? 2 : 1}
        >
          <Typography
            variant="h6"
            sx={{
              color: isSelected
                ? theme.palette.primary.main
                : theme.palette.text.primary,
              transition: "color 0.3s ease",
            }}
          >
            {node?.title}
          </Typography>
          <Typography
          fontSize={"0.8rem"}
          >
            {node?.message}
          </Typography>
          <Box sx={{ mb: 2, display: "flex", gap: 1, flexWrap: "wrap" ,marginTop:"12px"}}>
            {node?.topics?.map((topic: any, index: number) => (
              <Chip
                key={index}
                label={topic}
                size="small"
                sx={{
                  bgcolor: "primary.50",
                  color: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.100",
                  },
                  fontWeight: 500,
                }}
              />
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1,
              color: theme.palette.text.secondary,
            }}
          >
            <CalendarToday sx={{ fontSize: 16, mr: 1 }} />
            <Typography variant="caption">
              {node.date}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
