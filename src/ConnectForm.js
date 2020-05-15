import React from 'react'

function ConnectForm ({ connect }) {
  const startConnect = (evt) => {
    evt.preventDefault()
    const url = evt.target.elements.url.value
    const username = evt.target.elements.username.value
    connect(url, username)
  }

  return (<form onSubmit={startConnect}>
    <div className="field">
      <label className="label">Room</label>
      <div className="control">
        <input
          className="input"
          name="url"
          type="text"
          placeholder="wss://tubes.dev/F3A00E"
          value="wss://tubes.dev/F3A00E"
          onChange={ () => true }
        />
      </div>
    </div>

    <div className="field">
      <label className="label">Username</label>
      <div className="control">
        <input
          className="input"
          name="username"
          type="text"
          placeholder="username"
        />
      </div>
    </div>

    <div className="field">
      <div className="control">
        <button className="button is-link">Connect</button>
      </div>
    </div>
  </form>)
}

export default ConnectForm
