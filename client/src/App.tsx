import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/auth/Login'
import { RootState } from './features/store';
import { useSelector } from 'react-redux';
import HomePage from './pages/Home';
import SignUpPage from './pages/auth/Signup';

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/home" element={isAuthenticated?<HomePage/>:<Navigate to="/login"/>}/>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  )
}

export default App
