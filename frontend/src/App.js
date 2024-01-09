import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import React from 'react';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import ForgetPage from './pages/Forget';
import Home from './pages/Home';
import ChartList from "./pages/chartList";
import Feedback from "./pages/Feedback";
import Note from "./pages/Note";
import User from "./pages/User";
import ChatDVX from "./pages/ChatDVX";
import CreateChart from "./pages/CreateChart"
import ChartDetail from "./pages/ChartDetail"



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/forget" element={<ForgetPage/>} />
        <Route path="/chartList" element={<ChartList/>} />
        <Route path="/feedback" element={<Feedback/>} />
        <Route path="/note" element={<Note/>} />
        <Route path="/user" element={<User/>} />
        <Route path="/chatDVX" element={<ChatDVX/>} />
        <Route path="/createChart" element={<CreateChart/>}/>
        <Route path="/chartDetail" element={<ChartDetail/>}/>
    </Routes>
  </BrowserRouter>
)}

export default App;
