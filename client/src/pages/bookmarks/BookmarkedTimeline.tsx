import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Chip,
  Typography,
  Paper,
  LinearProgress,
  Container,
  Grid,
  Card,
  CardContent,
  Divider,
  styled,
  Stack,
} from "@mui/material";
import { VerticalTimelineNode } from "./VerticalTimelineNode";

// Styled components
const RoadmapNode = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing(2),
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    left: "24px",
    top: "48px",
    bottom: "-24px",
    width: "2px",
    borderLeft: "2px dashed",
    borderColor: theme.palette.divider,
  },
  "&:last-child::after": {
    display: "none",
  },
}));

const NodeContent = styled(Card)(({ theme, selected }) => ({
  flex: 1,
  cursor: "pointer",
  transition: "all 0.3s ease",
  //   border: selected ? `2px solid ${theme.palette.primary.main}` : 'none',
  "&:hover": {
    transform: "translateX(8px)",
  },
}));

const BookmarkedTimelines = () => {
  // Sample data
  const roadmapData = [
    {
      id: 1,
      title: "Project Setup",
      message: "Initial project configuration and environment setup",
      topics: ["Git", "NPM", "Config"],
      date:"12 Nov, 2024",
      expandedInfo:
        "Detailed information about project setup including repository initialization, dependency management, and basic configuration files setup.",
    },
    {
      id: 2,
      title: "Core Features",
      message: "Implement the main functionality of the application",
      topics: ["API", "Database", "Auth"],
      date:"11 Nov, 2024",

      expandedInfo:
        "In-depth breakdown of core feature implementation including user authentication, database schema design, and API endpoint development.",
    },
    {
      id: 3,
      title: "Testing",
      message: "Unit tests and integration testing setup",
      topics: ["Jest", "Testing", "CI"],
      date:"05 Nov, 2024",

      expandedInfo:
        "Comprehensive testing strategy including unit tests, integration tests, and continuous integration setup using industry standard tools.",
    },
  ];

  const [completedNodes, setCompletedNodes] = useState(new Set());
  const [selectedNode, setSelectedNode] = useState(roadmapData[0]);

  const handleNodeToggle = (nodeId) => {
    const newCompleted = new Set(completedNodes);
    if (newCompleted.has(nodeId)) {
      newCompleted.delete(nodeId);
    } else {
      newCompleted.add(nodeId);
    }
    setCompletedNodes(newCompleted);
  };

  const progressPercentage = (completedNodes.size / roadmapData.length) * 100;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Left side - Roadmap nodes */}
        <Grid item xs={12} md={6}>
          <Stack gap="10px">
            {roadmapData.map((node, index) => (
              <RoadmapNode key={node.id}>
                <Checkbox
                  checked={completedNodes.has(node.id)}
                  onChange={() => handleNodeToggle(node.id)}
                  sx={{ mt: 1 }}
                />

                  <VerticalTimelineNode
                    node={node}
                    isSelected={false}
                    isLast={false}
                  />
              </RoadmapNode>
            ))}
          </Stack>
        </Grid>

        {/* Right side - Selected node details */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            {/* Progress bar */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Overall Progress: {Math.round(progressPercentage)}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progressPercentage}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            
            {/* Selected node details */}
            <Typography variant="h5" gutterBottom>
              {selectedNode.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {selectedNode.expandedInfo}
            </Typography>
            <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
              {selectedNode?.topics?.map((keyword, i) => (
                <Chip key={i} label={keyword} size="small" color="primary" />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookmarkedTimelines;
