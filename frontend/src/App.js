import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import ForgetPage from './pages/Forget';
import Logo from './pages/Logo';


function App() {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="my-auto mx-auto">
          <Logo>
          </Logo>
      </div>

      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md space-y-8">
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<LoginPage/>} />
                  <Route path="/signup" element={<SignupPage/>} />
                  <Route path="/forget" element={<ForgetPage/>} />
              </Routes>
            </BrowserRouter>
          </div>
      </div>
    </div>

  );
}

export default App;
