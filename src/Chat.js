import React from 'react'

function Chat ({ conn }) {
  const sendMessage = (evt) => {
    evt.preventDefault()
    const text = evt.target.elements.message.value
    conn.sendJSON({ action: 'chat_message', text })
    evt.target.reset()
  }

  return (
    <form onSubmit={sendMessage}>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input className="input" name="message" type="text" placeholder="Type your message" />
        </div>
        <div className="control">
          <button className="button is-info">
            Send
          </button>
        </div>
      </div>
    </form>
  )
}

export default Chat
