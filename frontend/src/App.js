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
import Sidebar from './components/Sidebar';
import ChartList from "./pages/chartList";
import CreateChart from "./pages/CreateChart"
import EditChart from "./pages/EditChart"


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/home" exact Component={Home}/>
      <Route path="/" exact Component={ChartList} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forget" element={<ForgetPage />} />
        <Route path="/createChart" exact Component={CreateChart} />
        <Route path="/editChart" exact Component={EditChart}/>
    </Routes>
  </BrowserRouter>
)}

export default App;
