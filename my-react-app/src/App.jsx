import { useState } from 'react';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

  const handleButton = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'originalUrl': inputValue })
    });
    const data = await response.json();
    setShortenedUrl(data.shortUrl);
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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your long URL here..."
          style={{ width: '300px', padding: '8px' }}
          required
        />
        <button style={{ marginLeft: '10px', padding: '6px', color: "green" }}>SEND</button>
      </form>
      {shortenedUrl && (
        <p style={{ marginTop: '30px' }}>
          Your shortened URL is: 
          {' '}
          <a href={shortenedUrl} target="_blank">{shortenedUrl}</a>
        </p>
      )}
    </main>
  );
}