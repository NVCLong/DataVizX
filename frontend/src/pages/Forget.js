import React from "react";
import Header from "../components/Header";
import Forget from "../components/Forget";
import forgot_icon from '../images/forgot_icon.png';

export default function ForgetPage() {
    return (
        <>
            <img
                alt=""
                className="h-14 w-14 mx-auto"
                src={forgot_icon}/>

            <Header heading="Forget your account?"
              paragraph="Already have an account?"
              linkName="Login"
              linkUrl="/"
              />
            <Forget />
        </>
    );
}
