import { useDispatch, useSelector } from "react-redux";
import FullScreenLoader from "./components/FullScreenLoader";
import Main from "./pages/Main";
import { AppDispatch, RootState } from "./features/store";
import { useEffect } from "react";
import { getUserThunk } from "./features/user/userThunks";
import { setInitialized } from "./features/user/userSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { isInitializing } = useSelector((state: RootState) => state.user);
  
  useEffect(() => {
    const initializeUser = async () => {
      try {
        await dispatch(getUserThunk()).unwrap();
      } catch (error) {
        console.error('Failed to initialize user:', error);
      }
      finally{
        console.log("sdf")
        dispatch(setInitialized())
      }
    };

    initializeUser();
  }, [dispatch]);

  if (isInitializing) {
    return <FullScreenLoader />;
  }

  return (
    <>
      <Main />
    </>
  );
}

export default App