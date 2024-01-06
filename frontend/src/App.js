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
import ChartList from "./pages/chartList";
import Feedback from "./pages/Feedback";
import Note from "./pages/Note";
import User from "./pages/User";



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" exact Component={Home} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/forget" element={<ForgetPage/>} />
        <Route path="/chartList" element={<ChartList/>} />
        <Route path="/feedback" element={<Feedback/>} />
        <Route path="/note" element={<Note/>} />
        <Route path="/user" element={<User/>} />
    </Routes>
  </BrowserRouter>
)}

export default App;
