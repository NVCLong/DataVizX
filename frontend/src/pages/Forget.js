import React from "react";
import Header from "../components/Header";
import Forget from "../components/Forget";
import forgot_icon from '../images/forgot_icon.png';
import Logo from "./Logo";

export default function ForgetPage() {
    return (
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
                src={forgot_icon}/>

            <Header heading="Forget your account?"
              paragraph="Already have an account?"
              linkName="Login"
              linkUrl="/"
              />
            <Forget />
            </div>
            </div>
            </div>
        </>
    );
}
