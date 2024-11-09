import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Chip,
  Box,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  SelectChangeEvent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import LinkIcon from "@mui/icons-material/Link";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { addNodeToTimeline } from "../../features/timeline/timelineApi";
import { categories } from "../../provider/nodeCategories";

// export enum Categories {
//   WEB = "WEB DEVELOPMENT",
//   APP = "APP DEVELOPMENT",
//   AIML = "AI & ML",
// }

interface Resource {
  contentType: "URL" | "FILE";
  content: string | File;
  displayName?: string; // Added for file names
}

interface AddToTimelineModalProps {
  open: boolean;
  handleClose: () => void;
  handlePushTimeline: (item: TimelineItem) => void;
}

interface TimelineItem {
  title: string;
  message: string;
  resources: Resource[];
  category: string;
  topics: string[];
  createdAt: string;
}

const AddToTimelineModal: React.FC<AddToTimelineModalProps> = ({
  open,
  handleClose,
  handlePushTimeline,
}) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState<string>("");
  const [newTopic, setNewTopic] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [resourceType, setResourceType] = useState<"URL" | "FILE">("URL");
  const [resourceValue, setResourceValue] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleTopicAdd = () => {
    if (newTopic.trim()) {
      setTopics([...topics, newTopic.trim()]);
      setNewTopic("");
    }
  };

  const handleTopicDelete = (topicToDelete: string) => {
    setTopics(topics.filter((topic) => topic !== topicToDelete));
  };

  const handleResourceAdd = () => {
    if (resourceValue.trim()) {
      if (resourceType === "URL" && !isValidUrl(resourceValue.trim())) {
        alert("Please enter a valid URL.");
        return;
      }
      setResources([
        ...resources,
        { 
          contentType: resourceType, 
          content: resourceValue.trim(),
          displayName: resourceValue.trim()
        }
      ]);
      setResourceValue("");
    }
  };

  const handleResourceDelete = (index: number) => {
    setResources(resources.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    const newResources: Resource[] = files.map(file => ({
      contentType: "FILE",
      content: file,
      displayName: file.name
    }));
    setResources(prev => [...prev, ...newResources]);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !message.trim()) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("message", message);
    formData.append("category", category);
    topics.forEach((topic, i) => {
      formData.append(`topics[${i}]`, topic);
    });


    resources.forEach((resource, i) => {
      if (resource.contentType === "FILE" && resource.content instanceof File) {
        formData.append(`files`, resource.content);
      } else if (resource.contentType === "URL") {
        formData.append(`resources[${i}][contentType]`, "URL");
        formData.append(`resources[${i}][content]`, resource.content as string);
      }
    });

    try {
      console.log("formData",JSON.stringify(formData))
      await addNodeToTimeline(formData);
      handlePushTimeline({
        title,
        message,
        resources,
        category,
        topics,
        createdAt: "Just Now",
      });
      handleClose();
      // Reset form
      setTitle("");
      setMessage("");
      setCategory("");
      setTopics([]);
      setResources([]);
    } catch (error) {
      console.error("Error adding timeline node:", error);
      alert("Failed to add timeline node.");
    }
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const getResourceDisplayName = (resource: Resource): string => {
    if (resource.contentType === "FILE" && resource.content instanceof File) {
      return resource.content.name;
    }
    return resource.displayName || resource.content as string;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 2,
          p: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          pb: 1,
        }}
      >
        Add to Timeline
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            sx={{ mt: 2 }}
          />

          <TextField
            label="Message"
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="outlined"
          />

          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={handleCategoryChange}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "medium" }}>
              Topics Learned
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField
                size="small"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="Add a topic"
                onKeyPress={(e) => e.key === "Enter" && handleTopicAdd()}
                sx={{ flex: 1 }}
              />
              <Button
                variant="contained"
                onClick={handleTopicAdd}
                startIcon={<AddIcon />}
                sx={{ minWidth: 100 }}
              >
                Add
              </Button>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {topics.map((topic, index) => (
                <Chip
                  key={index}
                  label={topic}
                  onDelete={() => handleTopicDelete(topic)}
                  sx={{
                    m: 0.5,
                    borderRadius: "4px",
                    bgcolor: "primary.light",
                    color: "primary.dark",
                  }}
                />
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "medium" }}>
              Resources
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={resourceType}
                  label="Type"
                  onChange={(e) => setResourceType(e.target.value as "URL" | "FILE")}
                >
                  <MenuItem value="URL">URL</MenuItem>
                  <MenuItem value="FILE">File</MenuItem>
                </Select>
              </FormControl>
              <TextField
                size="small"
                value={resourceValue}
                onChange={(e) => setResourceValue(e.target.value)}
                placeholder={resourceType === "URL" ? "Enter URL" : "Enter file name"}
                sx={{ flex: 1 }}
              />
              <Button
                variant="contained"
                onClick={handleResourceAdd}
                startIcon={resourceType === "URL" ? <LinkIcon /> : <UploadFileIcon />}
                sx={{ minWidth: 100 }}
              >
                Add
              </Button>
            </Box>

            <Box
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              sx={{
                p: 3,
                mb: 2,
                border: "2px dashed",
                borderColor: isDragging ? "primary.main" : "grey.300",
                bgcolor: isDragging ? "primary.light" : "background.paper",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <UploadFileIcon sx={{ fontSize: 40, color: isDragging ? "primary.main" : "grey.500" }} />
              <Typography>Drag and drop files here</Typography>
            </Box>

            <Stack spacing={1}>
              {resources.map((resource, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    p: 1,
                    bgcolor: "grey.100",
                    borderRadius: 1,
                  }}
                >
                  {resource.contentType === "URL" ? <LinkIcon /> : <UploadFileIcon />}
                  <Typography sx={{ flex: 1 }}>{getResourceDisplayName(resource)}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleResourceDelete(index)}
                    sx={{ color: "error.main" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!title.trim() || !message.trim()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToTimelineModal;