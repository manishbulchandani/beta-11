import { Alert, Snackbar } from "@mui/material";
import { AppDispatch, RootState } from "../features/store";
import { useDispatch, useSelector } from "react-redux";
import { closeAlert } from "../features/appFeatures/alertSlice";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./auth/Login";
import SignUpPage from "./auth/Signup";
import Onboarding from "./auth/Onboarding";
import UserMain from "./UserMain";
import UserProfile from "./profile/UserProfile";
import TimelinePost from "./feed/TimelinePostCard";

const Main = () => {
  const { alertText, alertSeverity, alertVisible } = useSelector(
    (state: RootState) => state.alert
  );
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );
  const onboarding = user?.onboarding;

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/feed" /> : <LoginPage />}
        />
        <Route
          path="/sign-up"
          element={isAuthenticated ? <Navigate to="/feed" /> : <SignUpPage />}
        />
        <Route
          path="/onboarding"
          element={
            !isAuthenticated ? (
              <Navigate to="/login" />
            ) : onboarding ? (
              <Navigate to="/feed" />
            ) : (
              <Onboarding />
            )
          }
        />

        <Route
          path={"/"}
          element={
            !isAuthenticated ? (
              <Navigate to={"/login"} />
            ) : !onboarding ? (
              <Navigate to="/onboarding" />
            ) : (
              <UserMain />
            )
          }
        >
          <Route path="/feed" element={<TimelinePost />} />
          <Route path="/profile/*" element={<UserProfile />} />
        </Route>

        {/* <Route
          path="/home"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        /> */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      <Snackbar
        open={alertVisible}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={() => dispatch(closeAlert())}
      >
        <Alert
          onClose={() => dispatch(closeAlert())}
          variant="filled"
          severity={alertSeverity ? alertSeverity : "success"}
          sx={{ width: "100%", fontSize: "1rem" }}
        >
          {alertText}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Main;
