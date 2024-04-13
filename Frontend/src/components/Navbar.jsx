import React from 'react'


const Navbar = () => {
    const username = localStorage.getItem('username');
    return (
        <div className='navbar'>
            <span className='logo'>Whatsapp wannabe</span>
            <div className='user'>
                <img src='' alt=''/>
                <span>{username}</span>
                <button>log out</button>
            </div>
        </div>
    )
}

export default Navbar