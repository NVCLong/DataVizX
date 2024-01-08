import { useState } from "react";
import { registerFields } from "../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import { register } from "../api/api";
import { useNavigate } from "react-router-dom";

const fields = registerFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.name] = ""));

export default function Register() {
  const [registerState, setRegisterState] = useState(fieldsState);
  // const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(registerState.userName);
    // console.log(registerState['email']);
    // console.log(registerState.password);
    // console.log(e.target.name + e.target.value);
    setRegisterState({...registerState, [e.target.name]: e.target.value});
    // console.log(registerState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(
        registerState.userName,
        registerState["email"],
        registerState.password
      );
      console.log(data);
      // handle successful registration
      alert("Registration successfully!");
      // redirect the user to the login page
      navigate("/login");
    } catch (error) {
      console.error(error);

      if (error.response.status === 409) { alert('User already logged in!'); }
      // handle failed registration
      alert("Registration failed. Please try again.");
      // console.log(registerState.userName);
      // console.log(registerState['email']);
      // console.log(registerState.password);
    }
  };
  //  console.log(registerState.userName);
  //  console.log(registerState['email']);
  //  console.log(registerState.password);
  //  console.log(registerState);

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={registerState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text="SIGNUP" />
      </div>
    </form>
  );
}
