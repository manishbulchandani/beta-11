import { useLocation } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    Rating,
    Stack,
    Chip,
    Avatar,
    Link,
    IconButton,
    useTheme,
    Tabs,
    Tab
  } from '@mui/material';
  import EmailIcon from '@mui/icons-material/Email';
  import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ContactInfo from "./ContactInfo";
import { useState } from "react";
import Timeline from "./Timeline";


const UserProfile = () => {
  const location = useLocation();
  const theme=useTheme()
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const [activeTab,setActiveTab]=useState(0)
    
  const skills = ['Branding', 'UI/UX', 'Web - Design', 'Packaging', 'Print & Editorial'];

  return (
    <Box
      sx={{
        maxWidth: '1200px',
        margin: '40px auto',
        padding: '20px',
        bgcolor: '#fff',
        borderRadius: '12px',
        minHeight:"100vh",
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
      }}
    >
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
        {/* Left Column */}
        <Box sx={{ flex: '0 0 200px' }}>
          <Avatar
            sx={{
              width: 180,
              height: 180,
              borderRadius: '12px',
              mb: 3
            }}
            alt="Jeremy Rose"
            src="/path-to-image.jpg"
          />
          
          {/* <Typography variant="h6" sx={{ mb: 2, color: '#666', fontSize: '14px' }}>
            WORK
          </Typography>

          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Spotify New York
              </Typography>
              <Typography variant="body2" color="text.secondary">
                170 William Street
              </Typography>
              <Typography variant="body2" color="text.secondary">
                New York, NY 10038 78.212.332.51
              </Typography>
              <Chip 
                label="Primary" 
                size="small" 
                sx={{
                  mt: 1,
                  bgcolor: '#e3f2fd',
                  color: '#1976d2',
                  fontSize: '12px'
                }}
              />
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Metropolitan Museum
              </Typography>
              <Typography variant="body2" color="text.secondary">
                525 E 68th Street
              </Typography>
              <Typography variant="body2" color="text.secondary">
                New York, NY 10651-78 156-187-60
              </Typography>
              <Chip 
                label="Secondary" 
                size="small" 
                sx={{
                  mt: 1,
                  bgcolor: '#f5f5f5',
                  color: '#666',
                  fontSize: '12px'
                }}
              />
            </Box>

            
          </Stack> */}
          <Box>
              <Typography variant="h6" sx={{ mb: 1, fontSize: '14px' }}>
               TOP SKILLS
              </Typography>
              <Stack spacing={1}>
                {skills.map((skill) => (
                  <Typography key={skill} color={theme.palette.text.secondary}>
                    {skill}
                  </Typography>
                ))}
              </Stack>
            </Box>
        </Box>

        {/* Right Column */}
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Jeremy Rose
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                Software Developer | Building Scalable web applications
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h6">8,6</Typography>
                <Rating value={4.3} readOnly precision={0.5} />
              </Stack>
            </Box>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" startIcon={<EmailIcon />}>
                Send message
              </Button>
              {/* <Button 
                variant="contained" 
                sx={{
                  bgcolor: '#e3f2fd',
                  color: '#1976d2',
                  '&:hover': {
                    bgcolor: '#bbdefb'
                  }
                }}
              >
                Contacts
              </Button> */}
              {/* <IconButton>
                <BookmarkBorderIcon />
              </IconButton> */}
            </Stack>
          </Stack>

          <Tabs value={activeTab} onChange={(_,value)=>setActiveTab(value)}>
            <Tab value={0} label="Timeline" />
            <Tab value={1} label="Contact"/>
          </Tabs>

         <Stack marginTop={"12px"}>
          {activeTab===0 && <Timeline/>}
          {activeTab===1 && <ContactInfo/>}


         </Stack>
          
         
        </Box>
      </Stack>
    </Box>
  );
};

export default UserProfile;
