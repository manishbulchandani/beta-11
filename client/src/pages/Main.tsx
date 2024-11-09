import { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { AppDispatch, RootState } from "../features/store";
import { useDispatch, useSelector } from "react-redux";
import { closeAlert } from "../features/appFeatures/alertSlice";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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

  const [hasRedirected, setHasRedirected] = useState(
    localStorage.getItem("hasRedirected") === "true"
  );
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated && !hasRedirected) {
      // Redirect to /feed only on initial login
      setHasRedirected(true);
      localStorage.setItem("hasRedirected", "true");
    }
  }, [isAuthenticated, hasRedirected]);

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to={onboarding ? "/feed" : "/onboarding"} replace />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/sign-up"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <SignUpPage />
          }
        />

        {/* Onboarding Route */}
        <Route
          path="/onboarding"
          element={
            !isAuthenticated ? (
              <Navigate to="/login" replace />
            ) : onboarding ? (
              <Navigate to="/" replace />
            ) : (
              <Onboarding />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              onboarding ? (
                hasRedirected ? (
                  <UserMain />
                ) : (
                  <Navigate to="/feed" replace />
                )
              ) : (
                <Navigate to="/onboarding" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route path="/feed" element={<TimelinePost />} />
          <Route path="/profile/*" element={<UserProfile />} />
        </Route>

        {/* Fallback for undefined routes */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? location.pathname : "/login"} replace />}
        />
      </Routes>

      {/* Snackbar for alerts */}
      <Snackbar
        open={alertVisible}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={() => dispatch(closeAlert())}
      >
        <Alert
          onClose={() => dispatch(closeAlert())}
          variant="filled"
          severity={alertSeverity || "success"}
          sx={{ width: "100%", fontSize: "1rem" }}
        >
          {alertText}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Main;
