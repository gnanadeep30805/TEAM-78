import { useState, useRef } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [agent, setAgent] = useState("Symptom Analyzer");
  const [language, setLanguage] = useState("en-IN");
  const [loading, setLoading] = useState(false);

  const recognitionRef = useRef(null);


  /* ---------------- VOICE INPUT ---------------- */
  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");

    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setLoading(true);

    try {
      const res = await axios.post(`${API}/agent/chat`, {
        agent,
        query: userMsg,
        language
      });

      setMessages((prev) => [
        ...prev,
        { from: "ai", text: res.data.response }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "⚠️ Doctorly AI backend not reachable" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <h2>Doctorly – Clinical AI Assistant</h2>
      <p style={styles.subtitle}>
        AI-powered medical guidance (Not a medical diagnosis)
      </p>

      {/* LANGUAGE */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={styles.select}
      >
        <option value="en-IN">English</option>
        <option value="te-IN">తెలుగు (Telugu)</option>
        <option value="hi-IN">हिंदी (Hindi)</option>
      </select>

      {/* AGENT */}
      <select
        value={agent}
        onChange={(e) => setAgent(e.target.value)}
        style={styles.select}
      >
        <option>Symptom Analyzer</option>
        <option>Doctor Support</option>
        <option>Medical Learning</option>
        <option>Appointment Assistant</option>
        <option>Health Records Insight</option>
      </select>

      {/* CHAT */}
      <div style={styles.chatArea}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: m.from === "user" ? "flex-end" : "flex-start",
              background: m.from === "user" ? "#2563eb" : "#1f2937"
            }}
          >
            <b>{m.from === "user" ? "You" : "Doctorly AI"}:</b>
            <div>{m.text}</div>
          </div>
        ))}

        {loading && (
          <div style={{ opacity: 0.6 }}>Doctorly AI is thinking…</div>
        )}
      </div>

      {/* INPUT */}
      <div style={styles.inputArea}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Speak or type your symptoms..."
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={startVoiceInput}>🎤</button>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    background: "#0f172a",
    color: "white",
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif"
  },
  subtitle: {
    fontSize: "13px",
    opacity: 0.7,
    marginBottom: "10px"
  },
  select: {
    marginBottom: "8px",
    padding: "6px",
    borderRadius: "5px",
    background: "#020617",
    color: "white",
    border: "1px solid #334155"
  },
  chatArea: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
    background: "#020617",
    marginTop: "10px",
    borderRadius: "6px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  message: {
    maxWidth: "75%",
    padding: "10px",
    borderRadius: "6px",
    fontSize: "14px"
  },
  inputArea: {
    display: "flex",
    gap: "6px",
    marginTop: "10px"
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #334155",
    background: "#020617",
    color: "white"
  }
};
