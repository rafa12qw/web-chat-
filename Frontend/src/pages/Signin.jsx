import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(
                "http://localhost:3000/api/signin",
                { username, password }
            );
            //Stock of token JWT in localStorage
            localStorage.setItem("userToken",response.data.token);
            //Stock of id in localStorage
            localStorage.setItem("user",user);
            //navigate to chatPage
            navigate("/Chats");
        }
        catch(err){
            console.log(err);
            setErrorMessage("error in signUp");
        };
    }

    return (
        <div className="signin-container">
            Log in with your acccount
            <form onSubmit={handleSignUp}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="User"
                    minLength={4}
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    minLength={4}
                    required
                />
                <button type="submit">Sign up</button>
            </form>
            <Link to="/Signin">Do you have an account already?</Link>
            {/* if errorMessage is set, add a <p> with its content */}
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}
export default SignIn;