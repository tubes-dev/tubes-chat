import React, { useState } from 'react'
import TubeSocket from 'tube-socket'
import Chat from './Chat'
import Messages from './Message'
import ConnectForm from './ConnectForm'

function App () {
  const [conn, setConn] = useState(null)
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState({})

  const connect = (room, username) => {
    const conn = new TubeSocket(room)
    conn.addEventListener('open', (evt) => {
      conn.sendJSON({ action: 'username', username })
    })
    conn.addEventListener('message', (evt) => {
      const payload = JSON.parse(evt.data)
      switch (payload.action) {
        case 'connected':
          conn.sendJSONTo(payload.client_id, { action: 'update_username', username })
          break
        case 'disconnected':
          setMessages((messages) => [...messages, { is_system: true, client_id: payload.client_id, text: 'disconnected' }])
          break
        case 'chat_message':
          setMessages((messages) => [...messages, { client_id: payload.client_id, text: payload.text }])
          break
        case 'username':
          setMessages((messages) => [...messages, { is_system: true, client_id: payload.client_id, text: 'connected' }])
          setUsers((users) => ({ ...users, [payload.client_id]: { username: payload.username } }))
          break
        case 'update_username':
          setUsers((users) => ({ ...users, [payload.client_id]: { username: payload.username } }))
          break
        default:
      }
    })
    setConn(conn)
  }

  return (
    <section className="hero is-fullheight">
      <div className="hero-head">
        <header className="hero is-primary is-bold">
          <div className="hero-body">
            <div className="container">
              <p className="title">Messages through the tubes</p>
            </div>
          </div>
        </header>
      </div>
      <div className="hero-body">
        { conn
          ? <Messages client_id={conn.client_id} messages={messages} users={users} />
          : <ConnectForm connect={connect} /> }
      </div>
      <div className="hero-foot">
        <footer className="section is-small">
          { conn ? <Chat conn={conn} /> : '' }
        </footer>
      </div>
    </section>
  )
}

export default App
