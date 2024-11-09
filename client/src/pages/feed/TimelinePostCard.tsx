import { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  IconButton,
  Avatar,
  Collapse,
  Link,
  Tooltip,
  Divider,
  Paper
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Comment,
  BookmarkBorder,
  Bookmark,
  Share,
  Link as LinkIcon,
  Code,
  NavigateNext,
  NavigateBefore,
  PictureAsPdf,
  Download,
  Image as ImageIcon
} from '@mui/icons-material';

const TimelinePost = () => {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Enhanced hardcoded data with images and PDFs
  const post = {
    user: {
      name: "John Developer",
      avatar: "/api/placeholder/40/40",
      title: "Frontend Engineer"
    },
    timestamp: "2 hours ago",
    title: "Learning Web Development",
    content: "Today I learned Next.js fundamentals including routing, data fetching, and server-side rendering. The architectural patterns in Next.js are fascinating and provide a great foundation for building modern web applications.",
    topics: [
      "Next.js Apis",
      "Redux Toolkit usage in react",
    ],
    resources: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1719937206098-236a481a2b6d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8',
        title: 'Architecture Diagram'
      },
      {
        type: 'image',
        url: 'https://plus.unsplash.com/premium_photo-1686090450800-d6ca456243c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8',
        title: 'Component Structure'
      },
      {
        type: 'pdf',
        url: 'example.pdf',
        title: 'Next.js Documentation.pdf',
        size: '2.4 MB'
      },
      {
        type: 'url',
        title: 'Next.js Documentation',
        url: 'https://github.com/example'
      },
      {
        type: 'code',
        title: 'Code Repository',
        url: 'https://github.com/example'
      }
    ],
    stats: {
      likes: 42,
      comments: 8
    }
  };

  const images = post.resources.filter(resource => resource.type === 'image');
  const pdfs = post.resources.filter(resource => resource.type === 'pdf');
  const links = post.resources.filter(resource => resource.type === 'url' || resource.type === 'code');

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Card
      sx={{
        maxWidth: 700,
        mx: 'auto',
        mb: 3,
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
          transform: 'translateY(-2px)',
        },
        transition: 'all 0.2s ease-in-out'
      }}
    >
      {/* Header Section */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          src={post.user.avatar}
          sx={{ width: 48, height: 48 }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {post.user.name}
          </Typography>
          <Typography fontSize={"0.8rem"} color="text.secondary">
            {post.user.title} • {post.timestamp}
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
            color: 'primary.main'
          }}
        >
          {post.title}
        </Typography>

        {/* Content */}
        <Typography
          sx={{
            mb: 2,
            // color: 'text.primary',
            lineHeight: 1.6
          }}
        >
          {post.content}
        </Typography>

        {/* Topics */}
        <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {post.topics.map((topic, index) => (
            <Chip
              key={index}
              label={topic}
              size="small"
              sx={{
                bgcolor: 'primary.50',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.100',
                },
                fontWeight: 500
              }}
            />
          ))}
        </Box>

        {/* Resources Section */}
        <Box
          sx={{
            mt: 2,
            display: expanded ? 'flex' : 'none',
            flexDirection: 'column',
            gap: 2
          }}
        >
          {/* Image Carousel */}
          {images.length > 0 && (
            <Paper 
              elevation={0} 
              sx={{ 
                position: 'relative',
                bgcolor: 'grey.100',
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              <Box
                component="img"
                src={images[currentImageIndex].url}
                alt={images[currentImageIndex].title}
                sx={{
                  width: '100%',
                  height: 300,
                  objectFit: 'cover',
                }}
              />
              {images.length > 1 && (
                <>
                  <IconButton
                    onClick={handlePrevImage}
                    sx={{
                      position: 'absolute',
                      left: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      bgcolor: 'background.paper',
                      '&:hover': { bgcolor: 'background.paper' },
                    }}
                  >
                    <NavigateBefore />
                  </IconButton>
                  <IconButton
                    onClick={handleNextImage}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      bgcolor: 'background.paper',
                      '&:hover': { bgcolor: 'background.paper' },
                    }}
                  >
                    <NavigateNext />
                  </IconButton>
                </>
              )}
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  left: 8,
                  bgcolor: 'rgba(0,0,0,0.6)',
                  color: 'white',
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
          {pdfs.length > 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {pdfs.map((pdf, index) => (
                <Paper
                  key={index}
                  sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    bgcolor: 'grey.50',
                    '&:hover': { bgcolor: 'grey.100' }
                  }}
                >
                  <PictureAsPdf color="error" />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2">{pdf.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {pdf.size}
                    </Typography>
                  </Box>
                  <IconButton
                    sx={{
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'primary.50' }
                    }}
                  >
                    <Download />
                  </IconButton>
                </Paper>
              ))}
            </Box>
          )}

          {/* Links */}
          {links.length > 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {links.map((resource, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 1,
                    bgcolor: 'grey.50',
                    borderRadius: 1,
                    border: 1,
                    borderColor: 'grey.200'
                  }}
                >
                  {resource.type === 'url' ? <LinkIcon /> : <Code />}
                  <Link
                    href={resource.url}
                    underline="hover"
                    sx={{ flex: 1 }}
                  >
                    {resource.title}
                  </Link>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </CardContent>

      <Divider />

      {/* Actions Section */}
      <CardActions sx={{ px: 2, py: 1, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={() => setLiked(!liked)}
              sx={{ color: liked ? 'error.main' : 'inherit' }}
            >
              {liked ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {post.stats.likes}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton>
              <Comment />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {post.stats.comments}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Show Resources">
            <IconButton onClick={() => setExpanded(!expanded)}>
              {expanded ? <ImageIcon /> : <ImageIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Save">
            <IconButton onClick={() => setSaved(!saved)}>
              {saved ? <Bookmark /> : <BookmarkBorder />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Share">
            <IconButton>
              <Share />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
};

export default TimelinePost;