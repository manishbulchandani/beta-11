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
import UserFeed from "./feed/UserFeed";

const Main = () => {
  const { alertText, alertSeverity, alertVisible } = useSelector(
    (state: RootState) => state.alert
  );
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );
  const location = useLocation();

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!user?.onboarding) {
      return <Navigate to="/onboarding" replace />;
    }

    return <>{children}</>;
  };

  const AuthRoute = ({ children }: { children: React.ReactNode }) => {
    if (isAuthenticated) {
      if (!user?.onboarding) {
        return <Navigate to="/onboarding" replace />;
      }
      return <Navigate to={(location.state?.from?.pathname || "/feed")} replace />;
    }

    return <>{children}</>;
  };

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <AuthRoute>
              <SignUpPage />
            </AuthRoute>
          }
        />

        {/* Onboarding Route */}
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              user?.onboarding ? (
                <Navigate to="/feed" replace />
              ) : (
                <Onboarding />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <UserMain />
            </ProtectedRoute>
          }
        >
          <Route path="/feed" element={<UserFeed />} />
          <Route path="/profile/*" element={<UserProfile />} />
        </Route>

        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to="/feed" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
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