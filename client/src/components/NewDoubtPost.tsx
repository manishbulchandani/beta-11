// Import necessary dependencies
import { useState } from 'react';
import {
  Stack,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  Paper
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import { addDoubt } from '../features/user/userApis';

const NewDoubtPost = () => {
  const [open, setOpen] = useState(false);
  const [doubt, setDoubt] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDoubt('');
    setImage(null);
    setPreviewUrl('');
  };

  const handleImageDrop = (e:any) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleImageSelect = (e:any) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('content', doubt);
    if (image) {
      formData.append('file', image);
    }
    await addDoubt(formData);
    handleClose();
  };

  return (
    <>
      <Card
        sx={{
          width: 280,
          cursor: 'pointer',
          background: 'linear-gradient(to bottom right, #ffffff, #f5f5f5)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: (theme) => `0 8px 24px ${theme.palette.primary.light}25`,
          }
        }}
        onClick={handleClickOpen}
      >
        <CardContent sx={{ p: 2 }}>
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ py: 1 }}
          >
            <HelpOutlineIcon
              sx={{
                fontSize: 28,
                color: 'primary.main',
                backgroundColor: (theme) => theme.palette.primary.light + '20',
                p: 1,
                borderRadius: '50%'
              }}
            />
            <Box>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{
                  fontWeight: 600,
                  mb: 0.5
                }}
              >
                Have a doubt?
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '0.875rem' }}
              >
                Ask your peers for help
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: (theme) => theme.shadows[8]
          }
        }}
      >
        <DialogTitle sx={{
          pb: 1,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <HelpOutlineIcon color="primary" />
            <Typography variant="h6">Post Your Doubt</Typography>
          </Stack>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'text.secondary'
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: '24px !important' }}>
          <TextField
            autoFocus
            margin="dense"
            id="doubt"
            label="Explain your doubt"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={doubt}
            onChange={(e:any) => setDoubt(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              textAlign: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
              borderStyle: 'dashed'
            }}
            onDrop={handleImageDrop}
            onDragOver={(e:any) => e.preventDefault()}
          >
            <input
              type="file"
              accept="image/*"
              id="image-input"
              hidden
              onChange={handleImageSelect}
            />
            <label htmlFor="image-input">
              <Button
                component="span"
                startIcon={<ImageIcon />}
                sx={{
                  mb: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                Drag & Drop or Click to Upload Image
              </Button>
            </label>
            {previewUrl && (
              <Box sx={{ mt: 2, position: 'relative' }}>
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: 200,
                    borderRadius: 4
                  }}
                />
                <IconButton
                  onClick={() => {
                    setImage(null);
                    setPreviewUrl('');
                  }}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 1)'
                    }
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Paper>
        </DialogContent>
        <DialogActions sx={{
          p: 2.5,
          borderTop: '1px solid',
          borderColor: 'divider'
        }}>
          <Button
            onClick={handleClose}
            sx={{
              color: 'text.secondary',
              px: 3
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!doubt.trim()}
            sx={{
              px: 3,
              borderRadius: 1.5
            }}
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewDoubtPost;
