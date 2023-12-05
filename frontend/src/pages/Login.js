import Header from "../components/Header"
import Login from "../components/Login"
import Background from "../components/Background"

export default function LoginPage(){
    return(
        <>
        <Background>
        <Header
                heading="Login to your account"
                paragraph="Don't have an account yet?"
                linkName="Signup"
                linkUrl="/signup"
                />
            <Login/>
        </Background>

        </>
    )
}
