import Header from "../components/Header";
import Register from "../components/Register";
import Register_icon from '../images/Register_icon.png';
import Logo from "./Logo";


export default function SignupPage(){
    return(
        <>
            <div className="grid grid-cols-2 h-screen">
            <div className="my-auto mx-auto">
            <Logo>
            </Logo>
            </div>
              <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md space-y-8">
            <img
                alt=""
                className="h-14 w-14 mx-auto"
                src={Register_icon}/>

            <Header
              heading="Signup to create an account"
              paragraph="Already have an account?"
              linkName="Login"
              linkUrl="/"
            />
            <Register/>
            </div>
            </div>
            </div>
        </>
    )
}
