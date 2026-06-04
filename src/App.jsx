import { useState, useRef, useEffect } from "react";

const BotIcon = ({ size = 24, color = "#6366F1" }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <ellipse cx="16" cy="19" rx="10" ry="11" fill="white" opacity="0.96"/>
    <ellipse cx="16" cy="12" rx="8" ry="8" fill="white"/>
    <ellipse cx="12.5" cy="11" rx="2.6" ry="2.8" fill={color}/>
    <ellipse cx="19.5" cy="11" rx="2.6" ry="2.8" fill={color}/>
    <ellipse cx="12.5" cy="11" rx="1.3" ry="1.5" fill="#1E1B4B"/>
    <ellipse cx="19.5" cy="11" rx="1.3" ry="1.5" fill="#1E1B4B"/>
    <ellipse cx="13.1" cy="10.3" rx="0.45" ry="0.45" fill="white"/>
    <ellipse cx="20.1" cy="10.3" rx="0.45" ry="0.45" fill="white"/>
    <rect x="13" y="22" width="2.2" height="5" rx="1.1" fill="white" opacity="0.7"/>
    <rect x="16.8" y="22" width="2.2" height="5" rx="1.1" fill="white" opacity="0.7"/>
    <rect x="5.5" y="16" width="2.2" height="6" rx="1.1" fill="white" opacity="0.85"/>
    <rect x="24.3" y="16" width="2.2" height="6" rx="1.1" fill="white" opacity="0.85"/>
    <rect x="14.3" y="3.5" width="1.8" height="3.5" rx="0.9" fill="white" opacity="0.85"/>
    <circle cx="15.2" cy="3" r="1.2" fill="#A5B4FC"/>
    <rect x="12" y="16" width="8" height="1.2" rx="0.6" fill={color} opacity="0.25"/>
  </svg>
);

const PRESETS = [
  { icon: "Shopping", name: "E-Commerce", purpose: "customer support for an online store", color: "#6366F1", desc: "Handle orders, returns, and product questions" },
  { icon: "Hotel", name: "Hotel", purpose: "concierge assistant for a luxury hotel", color: "#0D9488", desc: "Bookings, amenities, local recommendations" },
  { icon: "Food", name: "Restaurant", purpose: "assistant for a restaurant", color: "#DC2626", desc: "Menu, reservations, hours, specials" },
  { icon: "Legal", name: "Law Firm", purpose: "intake assistant for a law firm", color: "#1D4ED8", desc: "Initial consultations, FAQ, appointments" },
  { icon: "Health", name: "Healthcare", purpose: "assistant for a medical clinic", color: "#059669", desc: "Appointments, services, general health FAQ" },
  { icon: "School", name: "Education", purpose: "assistant for an educational platform", color: "#7C3AED", desc: "Courses, enrollment, student support" },
];

const TYPING_SPEED = 18;

function Bubble({ msg, botColor, botName }) {
  const isBot = msg.role === "assistant";
  const [show, setShow] = useState(false);
  const [text, setText] = useState(isBot ? "" : msg.content);
  const [typing, setTyping] = useState(isBot);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isBot || !show) return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setText(msg.content.slice(0, i));
      if (i >= msg.content.length) { clearInterval(iv); setTyping(false); }
    }, TYPING_SPEED);
    return () => clearInterval(iv);
  }, [show, isBot, msg.content]);

  if (!show) return null;

  return (
    <div style={{ display: "flex", flexDirection: isBot ? "row" : "row-reverse", gap: "10px", alignItems: "flex-end", marginBottom: "16px" }}>
      {isBot && (
        <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: botColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <BotIcon size={20} color={botColor} />
        </div>
      )}
      <div style={{ maxWidth: "78%", padding: "12px 16px", borderRadius: isBot ? "4px 16px 16px 16px" : "16px 4px 16px 16px", background: isBot ? "#fff" : botColor, color: isBot ? "#1F2937" : "#fff", fontSize: "14px", lineHeight: "1.6", boxShadow: isBot ? "0 2px 12px rgba(0,0,0,0.08)" : "none", border: isBot ? "1px solid #F3F4F6" : "none", whiteSpace: "pre-wrap" }}>
        {isBot && <div style={{ fontSize: "10px", fontWeight: "700", color: botColor, marginBottom: "4px" }}>{botName}</div>}
        {text}
        {typing && <span style={{ display: "inline-block", width: "8px", height: "14px", background: botColor, borderRadius: "2px", marginLeft: "3px", verticalAlign: "middle", opacity: 0.7 }} />}
      </div>
    </div>
  );
}

function SetupScreen({ onStart }) {
  const [step, setStep] = useState(1);
  const [botName, setBotName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#6366F1");

  const COLORS = ["#6366F1", "#0D9488", "#DC2626", "#1D4ED8", "#059669", "#7C3AED", "#D97706", "#DB2777"];

  const handlePreset = (p) => {
    setSelectedPreset(p.name);
    setPurpose(p.purpose);
    setSelectedColor(p.color);
  };

  const canProceed = step === 1 ? (selectedPreset || purpose.trim()) : (botName.trim() && businessName.trim());

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#F8F9FF,#EEF2FF)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "560px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "14px", background: "linear-gradient(135deg,#6366F1,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BotIcon size={28} color="#6366F1" />
            </div>
            <span style={{ fontSize: "26px", fontWeight: "800", color: "#111827" }}>BotForge</span>
          </div>
          <p style={{ color: "#6B7280", fontSize: "14px" }}>Build an AI chatbot for any business in seconds</p>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "28px" }}>
          {[1, 2].map(s => (
            <div key={s} style={{ flex: 1, height: "4px", borderRadius: "4px", background: s <= step ? "#6366F1" : "#E5E7EB" }} />
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: "24px", padding: "32px", boxShadow: "0 8px 40px rgba(0,0,0,0.08)", border: "1px solid #F3F4F6" }}>
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#111827", marginBottom: "6px" }}>What type of bot?</h2>
              <p style={{ color: "#6B7280", fontSize: "13px", marginBottom: "24px" }}>Pick a preset or describe your own</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
                {PRESETS.map(p => (
                  <button key={p.name} onClick={() => handlePreset(p)} style={{ padding: "14px", borderRadius: "14px", border: "2px solid " + (selectedPreset === p.name ? p.color : "#E5E7EB"), background: selectedPreset === p.name ? p.color + "10" : "#fff", cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}>
                    <div style={{ fontWeight: "700", fontSize: "13px", color: "#111827", marginBottom: "2px" }}>{p.name}</div>
                    <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{p.desc}</div>
                  </button>
                ))}
              </div>
              <textarea value={selectedPreset ? "" : purpose} onChange={e => { setSelectedPreset(null); setPurpose(e.target.value); }} placeholder="Or describe your own bot..." rows={3} style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: "2px solid #E5E7EB", background: "#F9FAFB", fontSize: "13px", fontFamily: "inherit", outline: "none", resize: "none", color: "#111827", boxSizing: "border-box" }} />
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#111827", marginBottom: "6px" }}>Customise your bot</h2>
              <p style={{ color: "#6B7280", fontSize: "13px", marginBottom: "24px" }}>Name it and pick a brand colour</p>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "11px", fontWeight: "700", color: "#6B7280", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px" }}>Bot Name</div>
                <input value={botName} onChange={e => setBotName(e.target.value)} placeholder="e.g. Aria, Max, Nova..." style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: "2px solid " + (botName ? "#6366F1" : "#E5E7EB"), background: "#F9FAFB", fontSize: "14px", fontFamily: "inherit", outline: "none", color: "#111827", boxSizing: "border-box" }} />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "11px", fontWeight: "700", color: "#6B7280", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px" }}>Business Name</div>
                <input value={businessName} onChange={e => setBusinessName(e.target.value)} placeholder="e.g. Acme Corp, The Grand Hotel..." style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: "2px solid " + (businessName ? "#6366F1" : "#E5E7EB"), background: "#F9FAFB", fontSize: "14px", fontFamily: "inherit", outline: "none", color: "#111827", boxSizing: "border-box" }} />
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: "700", color: "#6B7280", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px" }}>Brand Colour</div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {COLORS.map(c => (
                    <button key={c} onClick={() => setSelectedColor(c)} style={{ width: "32px", height: "32px", borderRadius: "50%", background: c, border: selectedColor === c ? "3px solid #111" : "3px solid transparent", cursor: "pointer", transform: selectedColor === c ? "scale(1.2)" : "scale(1)" }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: "10px", marginTop: "28px" }}>
            {step === 2 && (
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: "13px", borderRadius: "12px", border: "1.5px solid #E5E7EB", background: "#fff", color: "#6B7280", fontWeight: "600", fontSize: "14px", cursor: "pointer", fontFamily: "inherit" }}>Back</button>
            )}
            <button onClick={() => step === 1 ? setStep(2) : onStart({ botName: botName || "Assistant", businessName, purpose: selectedPreset ? PRESETS.find(p => p.name === selectedPreset).purpose : purpose, color: selectedColor })} disabled={!canProceed} style={{ flex: 2, padding: "13px", borderRadius: "12px", border: "none", background: canProceed ? "linear-gradient(135deg,#6366F1,#8B5CF6)" : "#E5E7EB", color: canProceed ? "#fff" : "#9CA3AF", fontWeight: "700", fontSize: "14px", cursor: canProceed ? "pointer" : "not-allowed", fontFamily: "inherit" }}>
              {step === 1 ? "Next" : "Launch Bot"}
            </button>
          </div>
        </div>
        <p style={{ textAlign: "center", fontSize: "12px", color: "#9CA3AF", marginTop: "16px" }}>Powered by Claude AI - Built by Sylvester Francis</p>
      </div>
    </div>
  );
}

function ChatScreen({ config, onReset }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there! I am " + config.botName + ", your AI assistant for " + config.businessName + ". How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const send = async (text) => {
    const q = text || input.trim();
    if (!q || loading) return;
    setInput("");
    const newMessages = [...messages, { role: "user", content: q }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are " + config.botName + ", a helpful AI assistant for " + config.businessName + ". Your role is: " + config.purpose + ". Keep responses concise and helpful. Never reveal you are Claude.",
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content && data.content[0] ? data.content[0].text : "Sorry, I could not process that.";
      setMessages(m => [...m, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages(m => [...m, { role: "assistant", content: "Having trouble connecting. Please try again." }]);
    }
    setLoading(false);
  };

  const SUGGESTIONS = ["What can you help me with?", "Tell me about your services", "How do I get started?"];

  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FC", fontFamily: "Inter, system-ui, sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'); * { box-sizing:border-box; margin:0; padding:0; } @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} } ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:#e0e0e0;border-radius:4px}"}</style>

      <div style={{ background: "#fff", borderBottom: "1px solid #F3F4F6", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: config.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BotIcon size={26} color={config.color} />
          </div>
          <div>
            <div style={{ fontWeight: "700", fontSize: "15px", color: "#111827" }}>{config.botName}</div>
            <div style={{ fontSize: "11px", color: "#6B7280", display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22C55E", display: "inline-block" }} />
              Online - {config.businessName}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => setShowEmbed(!showEmbed)} style={{ padding: "8px 14px", borderRadius: "10px", border: "1.5px solid " + config.color, background: showEmbed ? config.color : "transparent", color: showEmbed ? "#fff" : config.color, fontWeight: "600", fontSize: "12px", cursor: "pointer", fontFamily: "inherit" }}>Embed</button>
          <button onClick={onReset} style={{ padding: "8px 14px", borderRadius: "10px", border: "1.5px solid #E5E7EB", background: "transparent", color: "#6B7280", fontWeight: "600", fontSize: "12px", cursor: "pointer", fontFamily: "inherit" }}>New Bot</button>
        </div>
      </div>

      {showEmbed && (
        <div style={{ background: "#1E1B4B", padding: "20px 24px", borderBottom: "1px solid #312E81" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "#A5B4FC", marginBottom: "8px" }}>EMBED ON ANY WEBSITE</div>
            <div style={{ background: "#312E81", borderRadius: "10px", padding: "14px 16px", fontFamily: "monospace", fontSize: "12px", color: "#C7D2FE", marginBottom: "10px" }}>
              {"<script src=\"https://botforge.vercel.app/embed.js\" data-bot=\"" + config.botName + "\"></script>"}
            </div>
            <div style={{ fontSize: "12px", color: "#6366F1" }}>Paste before closing body tag of any website.</div>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflowY: "auto", padding: "24px", maxWidth: "760px", width: "100%", margin: "0 auto" }}>
        <div style={{ background: "#fff", borderRadius: "20px", padding: "20px 24px", marginBottom: "24px", border: "1px solid #F3F4F6", textAlign: "center" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: config.color, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <BotIcon size={36} color={config.color} />
          </div>
          <div style={{ fontWeight: "800", fontSize: "17px", color: "#111827", marginBottom: "4px" }}>{config.botName}</div>
          <div style={{ fontSize: "13px", color: "#6B7280", marginBottom: "16px" }}>AI Assistant for {config.businessName}</div>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => send(s)} style={{ padding: "7px 14px", borderRadius: "20px", border: "1.5px solid " + config.color + "40", background: config.color + "08", color: config.color, fontSize: "12px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit" }}>{s}</button>
            ))}
          </div>
        </div>

        {messages.map((msg, i) => <Bubble key={i} msg={msg} botColor={config.color} botName={config.botName} />)}

        {loading && (
          <div style={{ display: "flex", gap: "10px", alignItems: "flex-end", marginBottom: "16px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: config.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BotIcon size={20} color={config.color} />
            </div>
            <div style={{ padding: "12px 18px", background: "#fff", borderRadius: "4px 16px 16px 16px", border: "1px solid #F3F4F6", display: "flex", gap: "5px", alignItems: "center" }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: "7px", height: "7px", borderRadius: "50%", background: config.color, opacity: 0.5, animation: "blink 1s " + (i * 0.2) + "s infinite" }} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ background: "#fff", borderTop: "1px solid #F3F4F6", padding: "16px 24px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", gap: "10px" }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()} placeholder={"Message " + config.botName + "..."} style={{ flex: 1, padding: "13px 16px", borderRadius: "14px", border: "2px solid #E5E7EB", background: "#F9FAFB", fontSize: "14px", fontFamily: "inherit", outline: "none", color: "#111827" }} />
          <button onClick={() => send()} disabled={!input.trim() || loading} style={{ width: "48px", height: "48px", borderRadius: "14px", border: "none", background: input.trim() && !loading ? config.color : "#E5E7EB", color: "#fff", fontSize: "20px", cursor: input.trim() && !loading ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>up</button>
        </div>
        <div style={{ textAlign: "center", fontSize: "11px", color: "#D1D5DB", marginTop: "8px" }}>Powered by BotForge - Built by Sylvester Francis</div>
      </div>
    </div>
  );
}

export default function App() {
  const [config, setConfig] = useState(null);
  return config ? <ChatScreen config={config} onReset={() => setConfig(null)} /> : <SetupScreen onStart={setConfig} />;
}
