import { 
    Chip, 
    Stack, 
    TextField, 
    Typography, 
    Button, 
    Paper,
    IconButton
  } from "@mui/material";
  import { useState } from "react";
  import AddIcon from '@mui/icons-material/Add';
  import CancelIcon from '@mui/icons-material/Cancel';
  
  const Onboarding = () => {
    const [details, setDetails] = useState<{
      collegeName: string;
      profileBio: string;
      skills: string[];
      currentSkill: string;
    }>({
      collegeName: "",
      profileBio: "",
      skills: [],
      currentSkill: ""
    });
  
    const handleAddSkill = () => {
      if (
        details.currentSkill.trim() !== "" && 
        !details.skills.includes(details.currentSkill.trim())
      ) {
        setDetails({
          ...details,
          skills: [...details.skills, details.currentSkill.trim()],
          currentSkill: ""
        });
      }
    };
  
    const handleRemoveSkill = (skillToRemove: string) => {
      setDetails({
        ...details,
        skills: details.skills.filter(skill => skill !== skillToRemove)
      });
    };
  
    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddSkill();
      }
    };
  
    return (
      <Stack
        sx={{
          bgcolor: "#f5f5f5",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "20px"
        }}
      >
        <Paper
          elevation={3}
          sx={{
            bgcolor: "#fff",
            padding: "32px",
            borderRadius: "16px",
            width: "100%",
            maxWidth: "500px"
          }}
        >
          <Typography
            variant="h5"
            sx={{
              marginBottom: "24px",
              fontWeight: "600",
              color: "#1a1a1a"
            }}
          >
            Complete Your Profile
          </Typography>
  
          <Typography
            sx={{
              marginBottom: "8px",
              color: "#424242",
              fontWeight: "500"
            }}
          >
            Profile Bio
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Tell us about yourself..."
            variant="outlined"
            value={details.profileBio}
            onChange={(e) => setDetails({...details, profileBio: e.target.value})}
            sx={{ marginBottom: "20px" }}
          />
  
          <Typography
            sx={{
              marginBottom: "8px",
              color: "#424242",
              fontWeight: "500"
            }}
          >
            College or Institute Name
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter your institution name"
            variant="outlined"
            value={details.collegeName}
            onChange={(e) => setDetails({...details, collegeName: e.target.value})}
            sx={{ marginBottom: "20px" }}
          />
  
          <Typography
            sx={{
              marginBottom: "8px",
              color: "#424242",
              fontWeight: "500"
            }}
          >
            Skills
          </Typography>
          <Stack direction="row" spacing={1} sx={{ marginBottom: "12px" }}>
            <TextField
              fullWidth
              placeholder="Add your skills"
              variant="outlined"
              value={details.currentSkill}
              onChange={(e) => setDetails({...details, currentSkill: e.target.value})}
              onKeyPress={handleKeyPress}
            />
            <Button
              variant="contained"
              onClick={handleAddSkill}
              sx={{
                minWidth: "48px",
                height: "56px",
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1565c0"
                }
              }}
            >
              <AddIcon />
            </Button>
          </Stack>
  
          <Stack
            direction="row"
            spacing={1}
            sx={{
              flexWrap: "wrap",
              gap: "8px"
            }}
          >
            {details.skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={() => handleRemoveSkill(skill)}
                deleteIcon={<CancelIcon />}
                sx={{
                  backgroundColor: "#e3f2fd",
                  color: "#1976d2",
                  "& .MuiChip-deleteIcon": {
                    color: "#1976d2",
                    "&:hover": {
                      color: "#d32f2f"
                    }
                  }
                }}
              />
            ))}
          </Stack>
        </Paper>
      </Stack>
    );
  };
  
  export default Onboarding;