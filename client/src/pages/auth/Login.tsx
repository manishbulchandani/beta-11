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
import { loginThunk } from "../../features/user/userThunks";

const LoginPage: React.FC = () => {
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

  const handleSignIn = async (event?: React.FormEvent) => {
    event?.preventDefault();

    const resultAction = await dispatch(loginThunk(credentials));

    if (loginThunk.fulfilled.match(resultAction)) {
      navigate("/");
    } else {
      alert("SignUp failed");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        console.log(credentials);
        e.preventDefault();
        handleSignIn();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSignIn]);



  return (
    <Stack className="login-page" direction="row-reverse" width="100vw" height="100vh">
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
            Sign In
          </Typography>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignIn();
            }}
          >
            <Stack gap="2rem">
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
                    // label="Enter Password"
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
              Dont have an account?{" "}
              <Box
                component={"span"}
                color={"#0374e8"}
                sx={{ cursor: "pointer" }}
                onClick={()=>navigate("/sign-up")}
              >
                Sign Up
              </Box>
            </Typography>

            {/* {error && <Typography color={"#ff4545"}>{error}</Typography>} */}
            <Button
              variant="contained"
              type="submit"
              disabled={status === "loading"}
              sx={{ padding: "8px", marginTop: "1rem", width: "100%" }}
            >
              {status === "loading" ? "Loading..." : "Login"}
            </Button>
          </form>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LoginPage;