import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import { Form, Button } from 'react-bootstrap';
import './MessageInput.css'
function MessageInput({handleMsgSend}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');

  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const sendChat = (e)=>{
    e.preventDefault()
    if(msg.length>0){
      handleMsgSend(msg)
      setMsg('')
    }
  }
  return (
   

    <div className='main-Container d-flex '>
      <div className="button-container">
        <div className="emoji">
        <i
                  style={{ cursor: 'pointer' }}
                  onClick={handleEmojiPicker}
                  className="fa-solid fa-face-smile fa-2x text-warning"
                ></i>
          {showEmojiPicker && <Picker className='emoji-picker-react' onEmojiClick={(emojiObject)=>setMsg((prevMsg)=>prevMsg+emojiObject.emoji)} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
      <Form.Control
            className='rounded m-1 msg-input'
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Enter your message here.."
            aria-label="message"
            aria-describedby="basic-addon2"
          />
        <Button type='submit'
            className='btn btn-success text-light m-1 fw-bold rounded'
            variant="outline-secondary"
            id="button-addon2"
          >
            Send
          </Button>
      </form>
    </div>
  );
}

export default MessageInput;
