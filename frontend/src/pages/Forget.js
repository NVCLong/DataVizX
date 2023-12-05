import React from "react";
import Header from "../components/Header";
import Forget from "../components/Forget";

export default function ForgetPage() {
    return (
        <>
            <Header heading="Forget your account?"
              paragraph="Already have an account?"
              linkName="Login"
              linkUrl="/"
              />
            <Forget />
        </>
    );
}
