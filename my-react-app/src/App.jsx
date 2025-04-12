import { useState } from 'react';

export default function App() {
  const [raw, setRaw] = useState('');
  const [out, setOut] = useState('');

  const handleButton = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'originalUrl': raw })
    });
    const data = await response.json();
    setOut(data.shortUrl);
  };

  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      width: '100vw' 
    }}>
      <h1>Enter an 🔗URL to be shortened</h1>
      <form onSubmit={handleButton} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <input
          type="text"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder="Enter your long URL here..."
          style={{ width: '300px', padding: '8px' }}
          required
        />
        <button style={{ marginLeft: '10px', padding: '6px', color: "green" }}>SEND</button>
      </form>
      {out && (
        <p style={{ marginTop: '30px' }}>
          Your shortened URL is: 
          {' '}
          <a href={out} target="_blank">{out}</a>
        </p>
      )}
    </main>
  );
}