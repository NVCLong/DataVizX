import Header from "../components/Header";
import Register from "../components/Register";
import Register_icon from "../images/Register_icon.png";
import Logo from "./Logo";

export default function SignupPage() {
  return (
    <>
      <div className="grid h-screen grid-cols-2">
        <div className="mx-auto my-auto transition duration-200 transform hover:scale-110">
          <Logo></Logo>
        </div>
        <div className="flex items-center justify-center h-screen min-h-full px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-md space-y-8">
            <img alt="" className="mx-auto h-14 w-14" src={Register_icon} />
            <Header
              heading="Signup to create an account"
              paragraph="Already have an account?"
              linkName="Login"
              linkUrl="/login"
            />
            <Register />
          </div>
        </div>
      </div>
    </>
  );
}
