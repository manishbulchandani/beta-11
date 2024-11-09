import React, { useState } from 'react';
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
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import LinkIcon from '@mui/icons-material/Link';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { addNodeToTimeline } from '../../features/timeline/timelineApi';

interface Resource {
  type: 'url' | 'file';
  value: string;
}

const AddToTimelineModal = ({ open, handleClose }: { open: boolean; handleClose: () => void }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [resourceType, setResourceType] = useState<'url' | 'file'>('url');
  const [resourceValue, setResourceValue] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleTopicAdd = () => {
    if (newTopic.trim()) {
      setTopics([...topics, newTopic.trim()]);
      setNewTopic('');
    }
  };

  const handleTopicDelete = (topicToDelete: string) => {
    setTopics(topics.filter(topic => topic !== topicToDelete));
  };

  const handleResourceAdd = () => {
    if (resourceValue.trim()) {
      setResources([...resources, { type: resourceType, value: resourceValue.trim() }]);
      setResourceValue('');
    }
  };

  const handleResourceDelete = (index: number) => {
    setResources(resources.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => {
      setResources(prev => [...prev, { type: 'file', value: file.name }]);
    });
  };

  const handleSubmit = () => {
    // Handle form submission here
    const formData = {
      title,
      message,
      topics,
      resources
    };
    console.log(formData);
    
    addNodeToTimeline(formData)


    handleClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
          p: 2
        }
      }}
    >
      <DialogTitle sx={{ 
        fontSize: '1.5rem', 
        fontWeight: 'bold',
        pb: 1
      }}>
        Add to Timeline
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Title Input */}
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            sx={{ mt: 2 }}
          />

          {/* Message Input */}
          <TextField
            label="Message"
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="outlined"
          />

          {/* Topics Section */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
              Topics Learned
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                size="small"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="Add a topic"
                onKeyPress={(e) => e.key === 'Enter' && handleTopicAdd()}
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
            <Stack sx={{ gap: 1 }}>
              {topics.map((topic, index) => (
                <Chip
                  key={index}
                  label={topic}
                  onDelete={() => handleTopicDelete(topic)}
                  sx={{
                    width:"max-content",
                    borderRadius:"4px",
                    bgcolor: '#b8e1fc',
                    // color: 'primary.contrastText',
                    '& .MuiChip-deleteIcon': {
                      // color: 'primary.contrastText'
                    }
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Resources Section */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={resourceType}
                  label="Type"
                  onChange={(e) => setResourceType(e.target.value as 'url' | 'file')}
                >
                  <MenuItem value="url">URL</MenuItem>
                  <MenuItem value="file">File</MenuItem>
                </Select>
              </FormControl>
              <TextField
                size="small"
                value={resourceValue}
                onChange={(e) => setResourceValue(e.target.value)}
                placeholder={resourceType === 'url' ? 'Enter URL' : 'Enter file name'}
                sx={{ flex: 1 }}
              />
              <Button
                variant="contained"
                onClick={handleResourceAdd}
                startIcon={resourceType === 'url' ? <LinkIcon /> : <UploadFileIcon />}
                sx={{ minWidth: 100 }}
              >
                Add
              </Button>
            </Box>

            {/* Drag and Drop Area */}
            <Stack 
              alignItems={"center"}
              gap="12px"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              sx={{
                p: 3,
                mb: 2,
                border: '2px dashed',
                backgroundColor: isDragging ? "#c7dce7" : "#fff",
                  borderColor: isDragging ? "#1c6c9a" : "#ccc",
                  scale: isDragging ? "0.97" : "1",
                // borderColor: isDragging ? 'primary.main' : 'grey.300',
                // bgcolor: isDragging ? 'primary.light' : 'background.paper',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <UploadFileIcon sx={{ fontSize: 40, color: isDragging ? 'primary.main' : 'grey.500' }} />
              <Typography>
                Drag and drop files here
              </Typography>
            </Stack>

            {/* Resources List */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {resources.map((resource, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 1,
                    bgcolor: 'grey.100',
                    borderRadius: 1
                  }}
                >
                  {resource.type === 'url' ? <LinkIcon /> : <UploadFileIcon />}
                  <Typography sx={{ flex: 1 }}>{resource.value}</Typography>
                  <IconButton 
                    size="small" 
                    onClick={() => handleResourceDelete(index)}
                    sx={{ color: 'error.main' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
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