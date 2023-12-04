import React, {useState} from 'react';
import { Login } from './Login';

export const Register = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");


    const handleSubmit = (e) => {
        // Prevents default behaviour of submit button
        e.preventDefault();
        console.log("Email: " + email);
    }

    return (
    <div className='auth-form-container'>
        <form className='register-form' onSubmit={handleSubmit}>

        <label htmlhtmlFor="firstName">First Name</label>
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="Duy" id="firstName" name="firstName"/>

        <label htmlFor="lastName">Last Name</label>
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Nguyen" id="lastName" name="lastName"/>

        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="studentID@hcmiu.edu.vn" id="email" name="email"/>

        <label htmlFor="password">Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="***************" id="password" name="password"/>
        <label htmlFor="retypePassword">Retype Password</label>
        <input value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)} type="password" placeholder="***************" id="retypePassword" name="retypePassword"/>


        <button type="submit">Login</button>
    </form>

    <button onClick={ () => props.onFormSwitch('Login')}>Already have an account? Login here.</button>

    </div>
    )
}
