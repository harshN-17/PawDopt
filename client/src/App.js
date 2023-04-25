import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import MyPostWidget from './Pages/Widgets/MyPostWidget';
import LandingPage from './Pages/LandingPage/LandingPage';
import SinglePost from './Pages/SinglePost/SinglePost';

function App() {

  const isAuth = Boolean(useSelector((state) => state.token));
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/' element={ <LandingPage /> } />

            <Route path='/Login' 
            element={ isAuth ? <Navigate to = '/home' /> : <Login />} />

            <Route 
              path='/home' 
              element={ isAuth ? <Home /> : <Navigate to = '/' /> } 
            />

            <Route 
              path='/profile/:userId' 
              element={ isAuth ? <Profile /> : <Navigate to='/' /> } 
            />

            <Route
              path='/cp'
              element={ isAuth ? <MyPostWidget /> : <Navigate to='/' /> }
            />
            
            <Route 
              path='/post/:id'
              element={< SinglePost />}
            />

          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
