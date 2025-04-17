import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InputPage() {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleSend = () => {
    if (text.trim()) {
      // Navigate to /display and pass state
      navigate('/display', { state: { text } });
    }
  };

  return (
    <div>
      <h1>Input Page</h1>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter some text"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
