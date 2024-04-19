import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const handlelogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("username");
        navigate("/");
    }

    return (
        <div className='navbar'>
            <span className='logo'>Whatsapp wannabe</span>
            <div className='user'>
                <img src='' alt=''/>
                <span>{username}</span>
                <button onClick={handlelogout}>log out</button>
            </div>
        </div>
    )
}

export default Navbar