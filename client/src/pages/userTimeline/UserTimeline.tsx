import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Paper,
  Chip,
  Link,
  Fade,
  IconButton,
  useTheme,
  alpha,
  Card,
  CardContent,
  Stack,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import {
  School,
  Launch,
  CalendarToday,
  BookmarkBorder,
  Timeline as TimelineIcon,
  NavigateBefore,
  NavigateNext,
  PictureAsPdf,
  Download,
  Link as LinkIcon,
  Code,
  LinkOff,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { searchSingleTimeline } from "../../features/timeline/timelineApi";
import TimelinePost from "../feed/TimelinePostCard";

const UserTimeline = () => {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const theme = useTheme();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const user = queryParams.get("user");
  const category = queryParams.get("q");
  const [data, setData] = useState<any>();
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await searchSingleTimeline(category ?? "", user ?? "");
      setSelectedNode(response?.timeline[0]);
      setData(response);
    };

    if (category && user) {
      fetchData();
    }
  }, [category, user]);

  const TimelineNode = ({
    node,
    isSelected,
    isLast,
  }: {
    node: any;
    isSelected: boolean;
    isLast: boolean;
  }) => (
    <Box sx={{ position: "relative", mb: isLast ? 0 : 3 }}>
      {!isLast && (
        <Box
          sx={{
            position: "absolute",
            left: "20px",
            top: "40px",
            bottom: "-20px",
            width: "2px",
            background: `linear-gradient(to bottom, ${
              theme.palette.primary.main
            }, ${alpha(theme.palette.primary.light, 0.3)})`,
            zIndex: 1,
          }}
        />
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box
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
        </Box>

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
              {new Date(node.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );

  const NodeDetail = ({ node }: { node: any }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();

    const images = node?.resources.filter(
      (resource: any) =>
        resource.contentType === "FILE" && !resource.content.endsWith(".pdf")
    );
    const pdfs = node?.resources.filter(
      (resource: any) =>
        resource.contentType === "FILE" && resource.content.endsWith(".pdf")
    );
    const links = node?.resources.filter(
      (resource: any) =>
        resource.contentType === "URL" || resource.contentType === "code"
    );

    const handleNextImage = () => {
      setCurrentImageIndex((prev) => (prev + 1) % images?.length);
    };

    const handlePrevImage = () => {
      setCurrentImageIndex(
        (prev) => (prev - 1 + images?.length) % images?.length
      );
    };

    return (
      <Card
        sx={{
          maxWidth: 700,
          width: "100%",
          mx: "auto",
          mb: 3,
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          "&:hover": {
            boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
            transform: "translateY(-2px)",
          },
          transition: "all 0.2s ease-in-out",
        }}
      >
        {/* Header Section */}
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar src={node?.user?.avatar} sx={{ width: 48, height: 48 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle1"
              onClick={() => navigate(`/profile?id=${node?.userId?._id}`)}
              sx={{
                fontWeight: 600,
                cursor: "pointer",
                "&:hover": { color: "#3fa2ff" },
              }}
            >
              {node?.userId?.name}
            </Typography>
            <Typography fontSize={"0.8rem"} color="text.secondary">
              {node?.userId?.title} • {node?.createdAt}
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ pt: 1 }}>
          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: "primary.main",
            }}
          >
            {node?.title}
          </Typography>

          {/* Content */}
          <Typography
            sx={{
              mb: 2,
              // color: 'text.primary',
              lineHeight: 1.6,
            }}
          >
            {node?.message}
          </Typography>

          {/* Topics */}
          <Box sx={{ mb: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
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

          {/* Resources Section */}
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* Image Carousel */}
            {images?.length > 0 && (
              <Paper
                elevation={0}
                sx={{
                  position: "relative",
                  bgcolor: "grey.100",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={images[currentImageIndex].content}
                  alt={images[currentImageIndex].content}
                  sx={{
                    width: "100%",
                    height: 300,
                    objectFit: "cover",
                  }}
                />
                {images?.length > 1 && (
                  <>
                    <IconButton
                      onClick={handlePrevImage}
                      sx={{
                        position: "absolute",
                        left: 8,
                        top: "50%",
                        transform: "translateY(-50%)",
                        bgcolor: "background.paper",
                        "&:hover": { bgcolor: "background.paper" },
                      }}
                    >
                      <NavigateBefore />
                    </IconButton>
                    <IconButton
                      onClick={handleNextImage}
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: "50%",
                        transform: "translateY(-50%)",
                        bgcolor: "background.paper",
                        "&:hover": { bgcolor: "background.paper" },
                      }}
                    >
                      <NavigateNext />
                    </IconButton>
                  </>
                )}
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    left: 8,
                    bgcolor: "rgba(0,0,0,0.6)",
                    color: "white",
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                  }}
                >
                  {images[currentImageIndex].title}
                </Typography>
              </Paper>
            )}

            {/* PDFs */}
            {pdfs?.length > 0 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {pdfs?.map((pdf: any, index: number) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      bgcolor: "grey.50",
                      "&:hover": { bgcolor: "grey.100" },
                    }}
                  >
                    <PictureAsPdf color="error" />
                    <Stack
                      direction="row"
                      alignItems={"center"}
                      sx={{ flex: 1 }}
                    >
                      <Typography
                        fontSize="0.8rem"
                        sx={{
                          width: "70%",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {pdf.content}
                      </Typography>
                      {/* <Typography variant="caption" color="text.secondary">
                        {pdf.size}
                      </Typography> */}
                      <IconButton
                        onClick={() => window.open(pdf.content)}
                        sx={{
                          color: "primary.main",
                          "&:hover": { bgcolor: "primary.50" },
                        }}
                      >
                        <Download />
                      </IconButton>
                    </Stack>
                  </Paper>
                ))}
              </Box>
            )}

            {/* Links */}
            {links?.length > 0 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {links?.map((resource: any, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      p: 1,
                      bgcolor: "grey.50",
                      borderRadius: 1,
                      border: 1,
                      borderColor: "grey.200",
                    }}
                  >
                    {resource.contentType === "URL" ? <LinkOff /> : <Code />}
                    <Link
                      href={resource.url}
                      underline="hover"
                      sx={{ flex: 1, fontFamily: "sans-serif" }}
                    >
                      {resource.content}
                    </Link>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </CardContent>

        <Divider />
      </Card>
    );
  };

  return (
    <Box sx={{ maxWidth: 1200, width: "100%", mx: "auto", p: 3 }}>
      <Paper
        sx={{
          mb: 4,
          p: 4,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${
            theme.palette.background.paper
          }, ${alpha(theme.palette.primary.light, 0.1)})`,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Avatar
            src={""}
            sx={{
              width: 120,
              height: 120,
              //   border: `4px solid ${theme.palette.background.paper}`,
              //   boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
            }}
          />
          <Box>
            <Typography
              variant="h3"
              sx={{
                mb: 1,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontWeight: "bold",
              }}
            >
              {data?.user?.name}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <School />
              {data?.user?.bio}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Tabs value={tabValue} onChange={(_, n) => setTabValue(n)} sx={{ my: 4 }}>
        <Tab value={0} label="Overview" />
        <Tab value={1} label="Links" />
        <Tab value={2} label="Images" />
      </Tabs>

      {tabValue === 0 && (
        <Box sx={{ display: "flex", gap: 4 }}>
          <Box
            sx={{
              flex: "0 0 40%",
              maxHeight: "calc(100vh - 250px)",
              overflowY: "auto",
              pr: 2,
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: alpha(theme.palette.primary.light, 0.1),
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: alpha(theme.palette.primary.main, 0.3),
                borderRadius: "3px",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.5),
                },
              },
            }}
          >
            {data?.timeline?.map((node: any, index: number) => (
              <TimelineNode
                key={index}
                node={node}
                isSelected={selectedNode && selectedNode._id === node._id}
                isLast={selectedNode && index === data.nodes?.length - 1}
              />
            ))}
          </Box>

          <Box sx={{ flex: "1 1 60%" }}>
            <NodeDetail node={selectedNode} />
          </Box>
        </Box>
      )}

      {tabValue === 1 && (
        <Stack>
          {data?.timeline.map((node: any) => (
            <Stack key={node._id} spacing={2}>
              {node?.resources.filter((item:any)=>item.contentType==="URL").map((item: any,index:number) => (
                <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 1,
                  bgcolor: "grey.50",
                  borderRadius: 1,
                  border: 1,
                  borderColor: "grey.200",
                }}
              >
                {item.contentType === "URL" ? <LinkIcon /> : <Code />}
                <Link
                  href={item.url}
                  underline="hover"
                  sx={{ flex: 1, fontFamily: "sans-serif" }}
                >
                  {item.content}
                </Link>
              </Box>
              ))}
            </Stack>
          ))}
        </Stack>
      )}


      {tabValue === 2 && (
        <Stack direction={"row"} gap="12px">
          {data?.timeline.map((node: any) => (
            <Stack key={node._id} spacing={2} >
              {node?.resources?.filter((item:any)=>item.contentType==="FILE").map((item: any,index:number) => (
               <img src={item.content} style={{maxWidth:"480px"}}/>
              ))}
            </Stack>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default UserTimeline;
