import { useLocation, useNavigate } from "react-router-dom";
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
  const navigate=useNavigate()

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

  const handlePushTimeline=(item:any)=>{
    setProfileDetails((prev:any)=>({...prev,nodes:[item,...prev.nodes]}))
  }


  if (loading) {
    return <FullScreenLoader />;
  }
  return (
    <Box
      sx={{
        maxWidth: "1200px",
        width:"100%",
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
            alt={profileDetails?.name}
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
                  <Typography color="text.secondary">
                    {profileDetails?.collegeOrInstituteName	}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <WorkIcon color="action" />
                  <Typography color="text.secondary" width={"max-content"}>
                    {profileDetails?.professionalExperiences && profileDetails?.professionalExperiences[0]?.position}
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
            <Typography variant="h3" fontWeight="600" color="primary.main" onClick={()=>navigate("/profile?id=672efc4c74620c4588c396e5")}>
              1,234
            </Typography>
            <Typography color="text.secondary">
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
            <Stack direction={"row"} gap="12px" flexWrap={"wrap"}>

              {profileDetails?.skills?.map((skill:string,index:number) => (
                <Box key={index}>
                  {/* <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  > */}
                    <Chip
                      label={skill}
                      size="small"
                      sx={{
                        alignSelf: "flex-start",
                        bgcolor: "#e3f2fd",
                        color: "#1976d2",
                        fontSize: "0.75rem",
                        height: "24px",
                      }}
                    />
                  {/* </Stack> */}
                  {/* <Box
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
                  </Box> */}
                </Box>
              ))}
            </Stack>
          </Paper>
          <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '16px',
        border: '1px solid',
        borderColor: 'divider',
        mb: 3
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} mb={3}>
        <WorkIcon color="primary" />
        <Typography variant="h6">Professional Experience</Typography>
      </Stack>

      <Stack spacing={3}>
        {profileDetails?.professionalExperiences?.map((exp:any, index:number) => (
          <Box key={index}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Avatar
                sx={{
                  bgcolor: 'primary.light',
                  width: 45,
                  height: 45,
                  fontSize: '1.2rem',
                  fontWeight: 600
                }}
              >
                {exp.company[0]}
              </Avatar>
              
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 0.5
                  }}
                >
                  {exp.role}
                </Typography>
                
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: '0.95rem',
                    color: 'primary.main',
                    fontWeight: 500,
                    mb: 1
                  }}
                >
                  {exp.company}
                </Typography>
                
                <Typography
                  fontSize={"0.8rem"}
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6
                  }}
                >
                  {exp.description}
                </Typography>
              </Box>
            </Stack>
            
            {index < profileDetails?.professionalExperiences?.length - 1 && (
              <Divider sx={{ mt: 3 }} />
            )}
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
              {activeTab === 0 && <Timeline timelineNodes={profileDetails?.nodes} handlePushTimeline={handlePushTimeline} />}
              {activeTab === 1 && <ContactInfo />}
            </Box>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default UserProfile;