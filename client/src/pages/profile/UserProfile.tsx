import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Stack,
  Avatar,
  useTheme,
  Tabs,
  Tab,
  Paper,
  Chip,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import WorkIcon from '@mui/icons-material/Work';
import ContactInfo from "./ContactInfo";
import { useEffect, useState } from "react";
import Timeline from "./Timeline";
import { fetchUserProfile } from "../../features/user/userApis";
import FullScreenLoader from "../../components/FullScreenLoader";

const UserProfile = () => {
  const location = useLocation();
  const theme = useTheme();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [profileDetails, setProfileDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState(0);

  const skills = [
    { name: "React.js", level: "Advanced" },
    { name: "Node.js", level: "Intermediate" },
    { name: "TypeScript", level: "Advanced" },
    { name: "UI/UX Design", level: "Intermediate" },
    { name: "MongoDB", level: "Advanced" },
  ];

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchUserProfile(id);
        setProfileDetails(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileDetails();
  }, [id]);

  if (loading) {
    return <FullScreenLoader />;
  }
  return (
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      {/* Header Card */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          mb: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* Cover Image */}
        <Box
          sx={{
            height: "200px",
            bgcolor: "primary.light",
            opacity: 0.8,
          }}
        />
        
        <Box sx={{ p: 3, position: "relative" }}>
          {/* Profile Avatar */}
          <Avatar
            sx={{
              width: 150,
              height: 150,
              border: "4px solid white",
              boxShadow: theme.shadows[2],
              position: "absolute",
              top: -75,
              left: 40,
            }}
            alt="Jeremy Rose"
            src="/path-to-image.jpg"
          />
          
          {/* Profile Info */}
          <Stack 
            direction="row" 
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{ ml: "200px" }}
          >
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                {profileDetails?.name}
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ mb: 2, fontSize: "1.1rem" }}
              >
               {profileDetails?.bio}
              </Typography>
              
              <Stack direction="row" spacing={3} alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <SchoolIcon color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Massachusetts Institute of Technology
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <WorkIcon color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Software Engineer at Google
                  </Typography>
                </Stack>
              </Stack>
            </Box>
            
            <Stack direction="row" spacing={2}>
              <Button 
                variant="outlined" 
                startIcon={<EmailIcon />}
                sx={{
                  borderRadius: "8px",
                  textTransform: "none",
                  px: 3,
                }}
              >
                Message
              </Button>
              <Button 
                variant="contained" 
                startIcon={<PersonAddIcon />}
                sx={{
                  borderRadius: "8px",
                  textTransform: "none",
                  px: 3,
                }}
              >
                Connect
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        {/* Left Column */}
        <Stack spacing={3} sx={{ width: { xs: "100%", md: "320px" } }}>
          {/* Stats Card */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "16px",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <GroupIcon color="primary" />
              <Typography variant="h6">Connections</Typography>
            </Stack>
            <Typography variant="h3" fontWeight="600" color="primary.main">
              1,234
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Growing your network by 15% this month
            </Typography>
          </Paper>

          {/* Skills Card */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "16px",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Top Skills
            </Typography>
            <Stack spacing={2}>
              {skills.map((skill) => (
                <Box key={skill.name}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
                    <Typography variant="body1" fontWeight="500">
                      {skill.name}
                    </Typography>
                    <Chip
                      label={skill.level}
                      size="small"
                      sx={{
                        bgcolor: "#7fbed5",
                        color: theme.palette.primary.main,
                        fontWeight: 500,
                      }}
                    />
                  </Stack>
                  <Box
                    sx={{
                      height: 6,
                      bgcolor: "grey.100",
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        bgcolor: "primary.main",
                        width: skill.level === "Advanced" ? "90%" : "65%",
                        borderRadius: 3,
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Stack>

        {/* Right Column */}
        <Box sx={{ flex: 1 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: "16px",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Tabs 
              value={activeTab} 
              onChange={(_, value) => setActiveTab(value)}
              sx={{
                px: 2,
                pt: 2,
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                  minWidth: "120px",
                }
              }}
            >
              <Tab value={0} label="Timeline" />
              <Tab value={1} label="Contact" />
            </Tabs>
            <Divider sx={{ mt: 2 }} />
            <Box sx={{ p: 3 }}>
              {activeTab === 0 && <Timeline />}
              {activeTab === 1 && <ContactInfo />}
            </Box>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default UserProfile;