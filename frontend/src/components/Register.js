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
    setRegisterState({ ...registerState, [e.target.name]: e.target.value });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(registerState.password.length <8) {
      alert("Please enter password more than 8 characters")
    }
    else if(registerState.password.length>=8) {
      try {
        await register(
            registerState.username,
            registerState["email"],
            registerState.password
        );
        alert("Registration successfully!");
        navigate("/login");
      } catch (error) {
        console.error(error);

        if (error.response.status === 409) {
          alert("User already logged in!");
        }
        // handle failed registration
        alert("Registration failed. Please try again.");
      }
    }
  };

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
