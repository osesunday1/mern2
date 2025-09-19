import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  // fetch messages
  useEffect(() => {
    axios.get(`${API_URL}/messages`)
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));
  }, []);

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;

    const res = await axios.post(`${API_URL}/messages`, { text });
    setMessages([...messages, res.data]); // add new message
    setText(""); // reset input
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", textAlign: "center" }}>
      <h1>Simple MERN Messages</h1>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Type a message..."
          style={{ padding: "10px", width: "80%" }}
        />
        <button type="submit" style={{ padding: "10px 20px", marginLeft: "10px" }}>
          Add
        </button>
      </form>

      <ul style={{ textAlign: "left", marginTop: "20px" }}>
        {messages.map((msg, i) => (
          <li key={i}>{msg.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
