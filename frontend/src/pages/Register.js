import Header from "../components/Header";
import Register from "../components/Register";
import Register_icon from '../images/Register_icon.png';

export default function SignupPage(){
    return(
        <>
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
        </>
    )
}
