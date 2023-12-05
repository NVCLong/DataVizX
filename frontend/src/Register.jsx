import React, {useState} from 'react';
import { Login } from './Login';

export const Register = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [userName, setUserName] = useState("");


    const handleSubmit = (e) => {
        // Prevents default behaviour of submit button
        e.preventDefault();
        console.log("Email: " + email);
    }

    return (
    <div className='auth-form-container'>
        <form className='register-form' onSubmit={handleSubmit}>

        <label htmlhtmlFor="userName">User name</label>
        <input value={userName} onChange={(e) => setUserName(e.target.value)} type="text" placeholder="thanhduy1706" id="userName" name="userName"/>

        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="studentID@hcmiu.edu.vn" id="email" name="email"/>

        <label htmlFor="password">Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="***************" id="password" name="password"/>
        <label htmlFor="retypePassword">Retype Password</label>
        <input value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)} type="password" placeholder="***************" id="retypePassword" name="retypePassword"/>


        <button type="submit">Register</button>
    </form>

    <button onClick={ () => props.onFormSwitch('Login')}>Already have an account? Login here.</button>

    </div>
    )
}
