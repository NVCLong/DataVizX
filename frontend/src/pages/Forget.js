import React from "react";
import Header from "../components/Header";
import Forget from "../components/Forget";
import forgot_icon from '../images/forgot_icon.png';
import Logo from "./Logo";

export default function ForgetPage() {
    return (
        <>
        <div className="grid h-screen grid-cols-2">
        <div className="mx-auto my-auto">
          <Logo>
          </Logo>
        </div>
        <div className="flex items-center justify-center h-screen min-h-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md space-y-8">
            <img
                alt=""
                className="mx-auto h-14 w-14"
                src={forgot_icon}/>

            <Header heading="Forget your account?"
              paragraph="Already have an account?"
              linkName="Login"
              linkUrl="/login"
              />
            <Forget />
            </div>
            </div>
            </div>
        </>
    );
}
