import { useDispatch } from "react-redux";
import FullScreenLoader from "./components/FullScreenLoader";
import Main from "./pages/Main";
import { AppDispatch, } from "./features/store";
import { useEffect, useState } from "react";
import { getUserThunk } from "./features/user/userThunks";
import { setInitialized } from "./features/user/userSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  // const { isInitializing } = useSelector((state: RootState) => state.user);
  const [loading,setLoading]=useState(true)

  useEffect(() => {
    setTimeout(()=>{
      setLoading(false)
    },1000)
    const initializeUser = async () => {
      try {
        await dispatch(getUserThunk()).unwrap();
      } catch (error) {
        console.error('Failed to initialize user:', error);
      }
      finally{
        setLoading(false)
        dispatch(setInitialized())
      }
    };

    initializeUser();
  }, [dispatch]);

 if(loading){
  return <FullScreenLoader/>
 }
  return (
    <>
      <Main />
    </>
  );
}

export default App