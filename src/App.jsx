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
  { icon: "🛍️", name: "E-Commerce", purpose: "customer support for an online store", color: "#6366F1", desc: "Handle orders, returns, and product questions" },
  { icon: "🏨", name: "Hotel", purpose: "concierge assistant for a luxury hotel", color: "#0D9488", desc: "Bookings, amenities, local recommendations" },
  { icon: "🍕", name: "Restaurant", purpose: "assistant for a restaurant", color: "#DC2626", desc: "Menu, reservations, hours, specials" },
  { icon: "⚖️", name: "Law Firm", purpose: "intake assistant for a law firm", color: "#1D4ED8", desc: "Initial consultations, FAQ, appointments" },
  { icon: "🏥", name: "Healthcare", purpose: "assistant for a medical clinic", color: "#059669", desc: "Appointments, services, general health FAQ" },
  { icon: "🎓", name: "Education", purpose: "assistant for an educational platform", color: "#7C3AED", desc: "Courses, enrollment, student support" },
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
    <div style={{ display: "flex", flexDirection: isBot ? "row" : "row-reverse", gap: "10px", alignItems: "flex-end", marginBottom: "16px", animation: "fadeUp 0.25s ease" }}>
      {isBot && (
        <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: botColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 8px " + botColor + "40" }}>
          <BotIcon size={20} color={botColor} />
        </div>
      )}
      <div style={{ maxWidth: "78%", padding: "12px 16px", borderRadius: isBot ? "4px 16px 16px 16px" : "16px 4px 16px 16px", background: isBot ? "#fff" : botColor, color: isBot ? "#1F2937" : "#fff", fontSize: "14px", lineHeight: "1.6", boxShadow: isBot ? "0 2px 12px rgba(0,0,0,0.08)" : "0 2px 12px " + botColor + "40", border: isBot ? "1px solid #F3F4F6" : "none", whiteSpace: "pre-wrap" }}>
        {isBot && <div style={{ fontSize: "10px", fontWeight: "700", color: botColor, marginBottom: "4px", letterSpacing: "0.5px" }}>{botName}</div>}
        {text}
        {typing && <span style={{ display: "inline-block", width: "8px", height: "14px", background: botColor, borderRadius: "2px", marginLeft: "3px", animation: "blink 0.8s infinite", verticalAlign: "middle", opacity: 0.7 }} />}
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
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#F8F9FF 0%,#EEF2FF 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "560px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "14px", background: "linear-gradient(135deg,#6366F1,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(99,102,241,0.3)" }}>
              <BotIcon size={28} color="#6366F1" />
            </div>
            <span style={{ fontSize: "26px", fontWeight: "800", color: "#111827",​​​​​​​​​​​​​​​​
