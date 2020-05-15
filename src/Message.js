import React from 'react'

function Messages ({ client_id, messages, users }) {

  const textAlign = {
    'me': 'right',
    'system': 'center',
    'them': 'left',
  }

  const msgColor = {
    'me': 'is-info',
    'system': '',
    'them': 'is-success',
  }

  const msgCls = (m) => {
    if (m.is_system) {
      return 'system'
    } else if (m.client_id === client_id) {
      return 'me'
    }
    return 'them'
  }

  const username = (m) => {
    return `${users[m.client_id]?.username || 'anon'} : `
  }

  return (
    <div style={{ heigth: '100%', width: '100%' }}>
      {messages.map((m, i) => {
        const cls = msgCls(m)
        return (<p key={i} style={{ padding: '.25em', textAlign: textAlign[cls], overflowWrap: 'normal' }}>
          <span className={`tag is-medium ${msgColor[cls]}`}>
            {username(m)}{m.text}
          </span>
        </p>)
      })}
    </div>
  )
}

export default Messages
