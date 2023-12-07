import Header from "../components/Header";
import Signup from "../components/Signup";
import signup_icon from '../images/signup_icon.png';

export default function SignupPage(){
    return(
        <>
            <img
                alt=""
                className="h-14 w-14 mx-auto"
                src={signup_icon}/>

            <Header
              heading="Signup to create an account"
              paragraph="Already have an account?"
              linkName="Login"
              linkUrl="/"
            />
            <Signup/>
        </>
    )
}
