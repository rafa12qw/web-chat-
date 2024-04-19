import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import "../styles/Home.css"
import axios from "axios"
function Home() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(
                "http://localhost:3000/api/signup",
                { username, password }
            );
            //Stock of token JWT in localStorage
            localStorage.setItem("userToken",response.data.token);
            //Stock of user in localStorage
            localStorage.setItem("username",username);
            //navigate to chatPage
            navigate("/Chats");
        }
        catch(err){
            console.log(err);
            setErrorMessage(err.response.data.message);
        };
    }

    return (
        <div className="home-container">
            <h2>Welcome! </h2>
            Create an account to start chatting...
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

export default Home;