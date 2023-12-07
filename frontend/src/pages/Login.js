import Header from "../components/Header"
import Login from "../components/Login"
import login_icon from '../images/login_icon.png';

export default function LoginPage(){
    return(
        <>
            <img
                alt=""
                className="h-14 w-14 mx-auto"
                src={login_icon}/>

        <Header
                heading="Login to your account"
                paragraph="Don't have an account yet?"
                linkName="Signup"
                linkUrl="/signup"
                />
            <Login/>
        </>
    )
}
