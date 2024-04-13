import React from 'react';
import Sidebar from '../components/Sidebar';
import ChatComponent from '../components/ChatComponent';
import '../styles/Chats.css';
const Chats = () => {
  return (
    <div className='chats-container'>
      <div className='container'>
        <Sidebar/>
        <ChatComponent/>
      </div>
    </div>
  );
};

export default Chats;