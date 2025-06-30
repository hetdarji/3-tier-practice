import React, { useState, useEffect } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    setText('');
    const res = await fetch('/api/messages');
    const data = await res.json();
    setMessages(data);
  };

  return (
    <div>
      <h1>Guestbook</h1>
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Enter a message" />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {messages.map((m, i) => <li key={i}>{m.text}</li>)}
      </ul>
    </div>
  );
}

export default App;
