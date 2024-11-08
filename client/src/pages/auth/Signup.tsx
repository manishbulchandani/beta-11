import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
// import useAuth from "../../hooks/useAuth";
import "./login.css";
// import { validateEmail, validatepassword } from "../../utils/loginValidation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { setError } from "../../services/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../features/store";
import { signUpThunk } from "../../features/user/userThunks";

const SignUpPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  // const { handleLogin, status, error } = useAuth();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordRevealed, setPasswordRevealed] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // dispatch(setError(""));
    const { name, value } = e.target;
    if (name === "email") {
      setEmailError(null);
    } else if (name === "password") {
      setPasswordError(null);
    }
    setCredentials({ ...credentials, [name]: value });
  };

  // const handleSignIn = () => {
  //   const emailValidation = validateEmail(credentials.email);
  //   const passwordValidation = validatepassword(credentials.password);
  //   if (!emailValidation.success) {
  //     setEmailError(emailValidation.error);
  //   } else if (!passwordValidation.success) {
  //     setPasswordError(passwordValidation.error);
  //   } else if (emailValidation.success && passwordValidation.success) {
  //     handleLogin(credentials.email, credentials.password);
  //   }
  // };

  const handleSignUp = async (event?: React.FormEvent) => {
    event?.preventDefault();

    const resultAction = await dispatch(signUpThunk(credentials));

    if (signUpThunk.fulfilled.match(resultAction)) {
      navigate("/home");
    } else {
      alert("SignUp failed");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        console.log(credentials);
        e.preventDefault();
        handleSignUp();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSignUp]);

  return (
    <Stack className="login-page" direction="row" width="100vw" height="100vh">
      <Stack
        justifyContent={"center"}
        flexShrink={3}
        sx={{
          flex: "1.2",
          height: "100%",
          background: "linear-gradient(to bottom, #001a34, #003366)",
          [theme.breakpoints.down("lg")]: {
            flex: "1",
          },
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
        }}
      >
        <Typography
          color={"#fff"}
          fontSize={"4rem"}
          textAlign={"center"}
          fontWeight={"bold"}
        >
          Path Partners
        </Typography>
        {/* <Typography color={"#fff"} fontSize={"2rem"} textAlign={"center"}>
          <i>Dosti hai to beesi hai</i>
        </Typography> */}
      </Stack>
      <Stack
        height={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        flex={1}
      >
        <Stack
          padding={"20px"}
          borderRadius={"1rem"}
          maxWidth={"400px"}
          width={"100%"}
          gap={"2rem"}
          sx={{
            bgcolor: "#ffffff",
            boxShadow: "0 0 40px #0000002d",
            [theme.breakpoints.down("md")]: {
              maxWidth: "315px",
            },
          }}
        >
          <Typography
            variant="h4"
            fontWeight={"900"}
            gutterBottom
            color="#2c2c2c"
            textAlign={"center"}
          >
            Sign Up
          </Typography>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignUp();
            }}
          >
            <Stack gap="1rem">
              <Stack>
                <TextField
                  id="filled-size-small"
                  name="email"
                  variant="outlined"
                  label="Enter Email"
                  value={credentials.email}
                  onChange={handleChange}
                />
                <Typography
                  sx={{
                    color: "#ff4545",
                    fontWeight: "400",
                    fontSize: "14px",
                    marginLeft: "0.5rem",
                  }}
                >
                  {emailError}
                </Typography>
              </Stack>
              <Stack>
                <Stack
                  direction={"row"}
                  position={"relative"}
                  width={"100%"}
                  alignItems={"center"}
                >
                  <TextField
                    id="password"
                    fullWidth
                    name="password"
                    value={credentials.password}
                    label="Enter Password"
                    type={passwordRevealed ? "text" : "password"}
                    variant="outlined"
                    // autoComplete="current-password"
                    onChange={handleChange}
                  />
                  <IconButton
                    sx={{ position: "absolute", right: "15px" }}
                    onClick={() => {
                      setPasswordRevealed(!passwordRevealed);
                    }}
                  >
                    {passwordRevealed ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </Stack>
                <Typography
                  sx={{
                    color: "#ff4545",
                    fontWeight: "400",
                    fontSize: "14px",
                    marginLeft: "0.5rem",
                  }}
                >
                  {passwordError}
                </Typography>
              </Stack>
            </Stack>
            <Typography margin={"4px 0"} fontSize={"0.9rem"}>
              Already have an account?{" "}
              <Box
                component={"span"}
                color={"#0374e8"}
                sx={{ cursor: "pointer" }}
                onClick={()=>navigate("/login")}
              >
                Login
              </Box>
            </Typography>
            {/* {error && <Typography color={"#ff4545"}>{error}</Typography>} */}
            <Button
              variant="contained"
              type="submit"
              disabled={status === "loading"}
              sx={{ padding: "8px", marginTop: "1rem", width: "100%" }}
            >
              {status === "loading" ? "Loading..." : "Sign Up"}
            </Button>
          </form>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SignUpPage;

// import React, { useState } from 'react';
// import {
//   Container,
//   Box,
//   Avatar,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Link,
//   Paper,
// } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { AppDispatch } from '../../features/store';
// import { signUpThunk } from '../../features/user/userThunks';

// const SignUpPage: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignUp = async (event: React.FormEvent) => {
//     event.preventDefault();
//     const resultAction = await dispatch(signUpThunk({ email, password }));

//     if (signUpThunk.fulfilled.match(resultAction)) {
//       navigate('/home');
//     } else {
//       alert('SignUp failed');
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign Up
//           </Typography>
//           <Box component="form" onSubmit={handleSignUp} sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="email"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign In
//             </Button>
//             <Grid container>
//               <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link href="#" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default SignUpPage;
