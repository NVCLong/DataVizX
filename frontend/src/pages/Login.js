import Header from "../components/Header"
import Login from "../components/Login"
import login_icon from '../images/login_icon.png';
import Logo from "./Logo";


export default function LoginPage(){
    return(
        <>
        <div className="grid grid-cols-2 h-screen">
        <div className="my-auto mx-auto transition duration-200 transform hover:scale-110">
          <Logo>
          </Logo>
        </div>
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md space-y-8">
            <img
                alt=""
                className="h-14 w-14 mx-auto"
                src={login_icon}/>

        <Header
                heading="Login to your account"
                paragraph="Don't have an account yet?"
                linkName="Signup"
                linkUrl="/register"
                />
            <Login/>
        </div>
        </div>
        </div>
        </>
    )
}
