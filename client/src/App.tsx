import { useEffect } from "react";
import "./App.css";

import Main from "./pages/Main";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./features/store";
import { getUserThunk } from "./features/user/userThunks";

function App() {
  const dispatch=useDispatch<AppDispatch>()

  
  useEffect(()=>{
    dispatch(getUserThunk())
  },[])


  return (
    <>
      <Main />
    </>
  );
}

export default App;
