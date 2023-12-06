import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import ForgetPage from "./pages/Forget";

function App() {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div>
          <h1 className="text-10xl font-black text-white relative inset-y-1/2 inset-x-1/2 drop-shadow-lg">DataVizX</h1>
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
