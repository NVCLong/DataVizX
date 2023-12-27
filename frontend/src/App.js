import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import React from 'react';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import ForgetPage from './pages/Forget';
import Home from './Comp/pages/Home';
// import ChartList from "./pages/chartList";



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" exact Component={Home} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/forget" element={<ForgetPage/>} />
         {/*<Route path="/chartList" element={<ChartList/>} />*/}
    </Routes>
  </BrowserRouter>
)}

export default App;
