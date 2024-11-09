import {
    Box,
    Chip,
    Stack,
    TextField,
    Typography,
    Button,
    Paper,
    Stepper,
    Step,
    StepLabel,
    Avatar,
    IconButton,
    InputAdornment,
    Divider,
    Card,
    CardContent,
    CardActions,
  } from "@mui/material";
  import { useState } from "react";
  import AddIcon from "@mui/icons-material/Add";
  import CancelIcon from "@mui/icons-material/Cancel";
//   import PhotoCamera from "@mui/icons-material/PhotoCamera";
  import NavigateNextIcon from "@mui/icons-material/NavigateNext";
  import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
  import LocationOnIcon from "@mui/icons-material/LocationOn";
  import SchoolIcon from "@mui/icons-material/School";
  import WorkIcon from "@mui/icons-material/Work";
  import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
  import EditIcon from "@mui/icons-material/Edit";
import { doOnboarding } from "../../features/user/userApis";
import FullScreenLoader from "../../components/FullScreenLoader";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../features/store";
import { showAlert } from "../../features/appFeatures/alertSlice";
import { useNavigate } from "react-router-dom";
  
  const steps = ["Basic Info", "Education", "Experience"];
  
  interface Experience {
    id: string;
    position: string;
    company: string;
    description: string;
    // isCurrentlyWorking: boolean;
  }
  
  const Onboarding = () => {
    const dispatch=useDispatch<AppDispatch>()
    const navigate=useNavigate()
    const [activeStep, setActiveStep] = useState(0);
    const [details, setDetails] = useState<{
      firstName: string;
      lastName: string;
      // email: string;
      phone: string;
      address: string;
      collegeOrInstituteName: string;
      degree: string;
      graduationYear: string;
      bio: string;
      skills: string[];
      currentSkill: string;
    //   avatar: string | null;
    }>({
      firstName: "",
      lastName: "",
      // email: "",
      phone: "",
      address: "",
      collegeOrInstituteName: "",
      degree: "",
      graduationYear: "",
      bio: "",
      skills: [],
      currentSkill: "",
    //   avatar: null,
    });
  
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [currentExperience, setCurrentExperience] = useState<Experience>({
      id: "",
      position: "",
      company: "",
      description: "",
    //   isCurrentlyWorking: false,
    });
    const [isEditingExperience, setIsEditingExperience] = useState(false);
    const [loading,setLoading]=useState<boolean>(false)
  
    const handleNext = () => {
      setActiveStep((prevStep) => prevStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevStep) => prevStep - 1);
    };
  
    const handleAddSkill = () => {
      if (
        details.currentSkill.trim() !== "" &&
        !details.skills.includes(details.currentSkill.trim())
      ) {
        setDetails({
          ...details,
          skills: [...details.skills, details.currentSkill.trim()],
          currentSkill: "",
        });
      }
    };
  
    const handleRemoveSkill = (skillToRemove: string) => {
      setDetails({
        ...details,
        skills: details.skills.filter((skill) => skill !== skillToRemove),
      });
    };
  
    const handleAddExperience = () => {
      if (currentExperience.position && currentExperience.company) {
        if (isEditingExperience) {
          setExperiences(
            experiences.map((exp) =>
              exp.id === currentExperience.id ? currentExperience : exp
            )
          );
        } else {
          setExperiences([
            ...experiences,
            {
              ...currentExperience,
              id: Date.now().toString(),
            },
          ]);
        }
        setCurrentExperience({
          id: "",
          position: "",
          company: "",
          description: "",
        //   isCurrentlyWorking: false,
        });
        setIsEditingExperience(false);
      }
    };
  
    const handleEditExperience = (experience: Experience) => {
      setCurrentExperience(experience);
      setIsEditingExperience(true);
    };
  
    const handleRemoveExperience = (id: string) => {
      setExperiences(experiences.filter((exp) => exp.id !== id));
    };
  
    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAddSkill();
      }
    };

    const handleSubmit=async()=>{
        setLoading(true)
        try {
            const data={...details,currentSkill:undefined,professionalExperiences:experiences}
            await doOnboarding(data)
            navigate("/")
            dispatch(showAlert({alertText:"Onboarding Successful!",alertSeverity:"success"}))
        } catch (error) {
            dispatch(showAlert({alertText:"Something Went Wrong! Please try again",alertSeverity:"error"}))
            console.log(error)
        }
        finally{
            setLoading(false)
        }
        
    }
  
    const renderExperienceForm = () => (
      <Stack spacing={3} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Position"
          variant="outlined"
          value={currentExperience.position}
          onChange={(e) =>
            setCurrentExperience({ ...currentExperience, position: e.target.value })
          }
        />
  
        <TextField
          fullWidth
          label="Company"
          variant="outlined"
          value={currentExperience.company}
          onChange={(e) =>
            setCurrentExperience({ ...currentExperience, company: e.target.value })
          }
        />
  
        {/* <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            label="Start Date"
            type="month"
            variant="outlined"
            value={currentExperience.startDate}
            onChange={(e) =>
              setCurrentExperience({
                ...currentExperience,
                startDate: e.target.value,
              })
            }
            InputLabelProps={{ shrink: true }}
          />
  
          <TextField
            fullWidth
            label="End Date"
            type="month"
            variant="outlined"
            value={currentExperience.endDate}
            disabled={currentExperience.isCurrentlyWorking}
            onChange={(e) =>
              setCurrentExperience({
                ...currentExperience,
                endDate: e.target.value,
              })
            }
            InputLabelProps={{ shrink: true }}
          />
        </Stack> */}
  
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Description"
          variant="outlined"
          value={currentExperience.description}
          onChange={(e) =>
            setCurrentExperience({
              ...currentExperience,
              description: e.target.value,
            })
          }
        />
  
        <Button
          variant="contained"
          onClick={handleAddExperience}
          startIcon={<AddIcon />}
        >
          {isEditingExperience ? "Update Experience" : "Add Experience"}
        </Button>
      </Stack>
    );
  
    const renderExperienceCards = () => (
      <Stack spacing={2}>
        {experiences.map((experience) => (
          <Card
            key={experience.id}
            sx={{
              bgcolor: "#f8fafc",
              border: "1px solid #e2e8f0",
              boxShadow: "none",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {experience.position}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {experience.company}
              </Typography>
              {/* <Typography variant="body2" color="text.secondary" gutterBottom>
                {`${experience.startDate} - ${
                  experience.isCurrentlyWorking ? "Present" : experience.endDate
                }`}
              </Typography> */}
              <Typography variant="body2">{experience.description}</Typography>
            </CardContent>
            <CardActions>
              <IconButton
                size="small"
                onClick={() => handleEditExperience(experience)}
                sx={{ color: "#1976d2" }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => handleRemoveExperience(experience.id)}
                sx={{ color: "#ef4444" }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Stack>
    );
  
    const renderStepContent = (step: number) => {
      switch (step) {
        case 0:
          // Basic Info section remains the same
          return (
            <Stack spacing={3}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <Stack alignItems="center" spacing={2}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: "#e3f2fd",
                    color: "#1976d2",
                  }}
                >
                  {details.firstName.charAt(0)}
                </Avatar>
                {/* <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input hidden accept="image/*" type="file" />
                  <PhotoCamera />
                </IconButton> */}
              </Stack>
            </Box>

            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                value={details.firstName}
                onChange={(e) =>
                  setDetails({ ...details, firstName: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                value={details.lastName}
                onChange={(e) =>
                  setDetails({ ...details, lastName: e.target.value })
                }
              />
            </Stack>

            {/* <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={details.email}
              onChange={(e) => setDetails({ ...details, email: e.target.value })}
            /> */}

            <TextField
              fullWidth
              label="Phone"
              variant="outlined"
              value={details.phone}
              onChange={(e) => setDetails({ ...details, phone: e.target.value })}
            />

            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              value={details.address}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon color="action" />
                  </InputAdornment>
                ),
              }}
              onChange={(e) =>
                setDetails({ ...details, address: e.target.value })
              }
            />

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Profile Bio"
              placeholder="Tell us about yourself..."
              variant="outlined"
              value={details.bio}
              onChange={(e) =>
                setDetails({ ...details, bio: e.target.value })
              }
            />
          </Stack>
          );
  
        case 1:
          // Education section remains the same
          return (
            <Stack spacing={3}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <SchoolIcon sx={{ color: "#1976d2", mr: 1 }} />
              <Typography variant="h6" color="primary">
                Educational Background
              </Typography>
            </Box>

            <TextField
              fullWidth
              label="College or Institute Name"
              variant="outlined"
              value={details.collegeOrInstituteName}
              onChange={(e) =>
                setDetails({ ...details, collegeOrInstituteName: e.target.value })
              }
            />

            <TextField
              fullWidth
              label="Degree"
              variant="outlined"
              value={details.degree}
              onChange={(e) =>
                setDetails({ ...details, degree: e.target.value })
              }
            />

            <TextField
              fullWidth
              type="number"
              label="Graduation Year"
              variant="outlined"
              value={details.graduationYear}
              onChange={(e) =>
                setDetails({ ...details, graduationYear: e.target.value })
              }
            />
          </Stack>
          );
  
        case 2:
          return (
            <Stack spacing={3}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <WorkIcon sx={{ color: "#1976d2", mr: 1 }} />
                <Typography variant="h6" color="primary">
                  Professional Experience
                </Typography>
              </Box>
  
              {renderExperienceForm()}
  
              <Divider sx={{ my: 2 }} />
  
              {experiences.length > 0 && (
                <>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Added Experiences
                  </Typography>
                  {renderExperienceCards()}
                </>
              )}
  
              <Divider sx={{ my: 2 }} />
  
              <Typography variant="subtitle1" color="primary" gutterBottom>
                Skills
              </Typography>
  
              <Stack direction="row" spacing={1}>
                <TextField
                  fullWidth
                  label="Add Skills"
                  variant="outlined"
                  value={details.currentSkill}
                  onChange={(e) =>
                    setDetails({ ...details, currentSkill: e.target.value })
                  }
                  onKeyPress={handleKeyPress}
                />
                <Button
                  variant="contained"
                  onClick={handleAddSkill}
                  sx={{
                    minWidth: "48px",
                    height: "56px",
                  }}
                >
                  <AddIcon />
                </Button>
              </Stack>
  
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {details.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    onDelete={() => handleRemoveSkill(skill)}
                    deleteIcon={<CancelIcon />}
                    sx={{
                      bgcolor: "#e3f2fd",
                      color: "#1976d2",
                      "& .MuiChip-deleteIcon": {
                        color: "#1976d2",
                        "&:hover": {
                          color: "#d32f2f",
                        },
                      },
                    }}
                  />
                ))}
              </Box>
            </Stack>
          );
  
        default:
          return null;
      }
    };
  
    if(loading){
        return <FullScreenLoader/>
    }
    return (
      <Box
        sx={{
          bgcolor: "#f8fafc",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            bgcolor: "#fff",
            p: 4,
            borderRadius: 3,
            width: "100%",
            maxWidth: "800px",
            boxShadow: "0 0 20px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 600,
              color: "#1a1a1a",
              textAlign: "center",
            }}
          >
            Complete Your Profile
          </Typography>
  
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
  
          {renderStepContent(activeStep)}
  
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<NavigateBeforeIcon />}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={
                activeStep === steps.length - 1 ? handleSubmit : handleNext
              }
              endIcon={<NavigateNextIcon />}
            >
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  };
  
  export default Onboarding;