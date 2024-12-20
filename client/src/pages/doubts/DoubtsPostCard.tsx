import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Divider,
  TextField,
  Button,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { addThread } from "../../features/user/userApis";

const DoubtsPost = ({ feedPost }: { feedPost: any }) => {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [displayedComments, setDisplayedComments] = useState(2);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addThread(feedPost._id, comment);
    setComment("");
  };

  const loadMoreComments = () => {
    setDisplayedComments((prev) => prev + 3);
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "1200px",
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
        <Avatar src={feedPost?.user?.avatar} sx={{ width: 48, height: 48 }} />
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle1"
            onClick={() => navigate(`/profile?id=${feedPost?.userId?._id}`)}
            sx={{
              fontWeight: 600,
              cursor: "pointer",
              "&:hover": { color: "#3fa2ff" },
            }}
          >
            {feedPost?.username}
          </Typography>
          <Typography fontSize={"0.9rem"} color="text.secondary">
            {feedPost?.userId?.title} • {feedPost?.createdAt}
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ pt: 1 }}>
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            lineHeight: 1.6,
          }}
        >
          {feedPost?.content}
        </Typography>
        {feedPost?.fileUrl && (
          <Box
            component="img"
            src={feedPost.fileUrl}
            sx={{
              width: "100%",
              height: 300,
              borderRadius: "12px",
              objectFit: "cover",
            }}
          />
        )}
      </CardContent>

      <Divider />

      {/* Comments Section */}
      <Box sx={{ p: 2 }}>
        {/* Comment Input */}
        <Box
          component="form"
          onSubmit={handleCommentSubmit}
          sx={{
            display: "flex",
            gap: 2,
            mb: 3,
            alignItems: "flex-start",
          }}
        >
          <Avatar src="/api/placeholder/32/32" sx={{ width: 32, height: 32 }} />
          <TextField
            fullWidth
            size="small"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />
          <IconButton
            type="submit"
            disabled={!comment.trim()}
            color="primary"
            sx={{
              bgcolor: "primary.main",
              color: "white",
              "&:hover": {
                bgcolor: "primary.dark",
              },
              "&.Mui-disabled": {
                bgcolor: "rgba(0, 0, 0, 0.12)",
                color: "rgba(0, 0, 0, 0.26)",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>

        {/* Comments List */}
        <Stack spacing={2}>
          {feedPost?.threads
            ?.slice(0, displayedComments)
            .map((comment: any, index: number) => (
              <Box key={index} sx={{ display: "flex", gap: 2 }}>
                <Avatar
                  src={comment.user?.avatar || "/api/placeholder/32/32"}
                  alt={comment.user?.name}
                  sx={{ width: 32, height: 32 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1.5,
                      bgcolor: "grey.50",
                      borderRadius: 2,
                    }}
                  >
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Typography
                        variant="subtitle2"
                        onClick={() =>
                          navigate(`/profile?id=${comment.user?._id}`)
                        }
                        sx={{
                          cursor: "pointer",
                          "&:hover": { color: "primary.main" },
                        }}
                      >
                        {comment.username}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 0.5, display: "block" }}
                      >
                        {new Date(comment.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </Typography>
                    </Stack>
                    <Typography fontSize={"0.9rem"}>
                      {comment.content}
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            ))}
        </Stack>

        {feedPost?.threads?.length > displayedComments && (
          <Button
            onClick={loadMoreComments}
            sx={{ mt: 2, textTransform: "none" }}
            color="primary"
          >
            View more comments ({feedPost.threads.length - displayedComments}{" "}
            remaining)
          </Button>
        )}
      </Box>
    </Card>
  );
};

export default DoubtsPost;
