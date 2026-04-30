import React from "react";
import "./PlayerList.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//why players = [] because we want to provide a default value for the players prop in case it is not passed from the parent component. By setting players = [], we ensure that the component can still function properly even if no players data is provided, preventing potential errors when trying to access properties of an undefined or null value.

function PlayerList({ players = [] , setPlayers }) {

  const THEMES = [
    { id: "random",    icon: "🔀", label: "Random Words",             desc: "Mix of everyday words" },
    { id: "numspec",   icon: "#!", label: "Numbers + Specials",        desc: "Digits & symbols challenge" },
    { id: "poem",      icon: "🪶", label: "Poem",                     desc: "Lyrical, rhythmic lines" },
    { id: "quote",     icon: "💬", label: "Quote",                    desc: "Famous quotes to type" },
    { id: "story",     icon: "📖", label: "Story",                    desc: "Short narrative passages" },
    { id: "paragraph", icon: "📝", label: "Paragraph",                desc: "Prose & long-form text" },
  ];

  const [selectedPLayer, setSelected] = useState(null);
  const [password, setPassword] = useState("");
  let [addNewPlayer, setAddNew] = useState(false);
  //--THEME SELECTION 
  const [showTheme, setShowTheme]       = useState(false);
  const [pendingKey, setPendingKey]     = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [countdown, setCountdown]       = useState(null); // null | 3 | 2 | 1 | "GO!" | "race"

  let nav = useNavigate();

  let addNew = () => {
    setSelected(null);
    setPassword("");
    return setAddNew(!addNewPlayer);
  };

  let joinClick = () =>{
    if(selectedPLayer === "" || password === ""){
      alert("Please fill the name and password to continue");
      return;
    }

    if(players.filter((player)=>player.name === selectedPLayer).length >0){
      alert("Player name already exists, please choose a different name");
      setSelected(null);
      setPassword("");
      return;
    }

    let pdata = {
      name: selectedPLayer,
      password: password,
      key: players.length + 1 || 1,
      wpm : 0,
    }

    // players.push(pdata);
    setPlayers([...players, pdata]);
    setSelected(null);
    setPassword("");
    setAddNew(false);
  }


  let existingPlayer= (input, password,key) =>{
    if(input === "" || password === "") {
      alert("Please fill the name and password to continue");
      return;
    }
    if(input !== password){
      alert("Incorrect password, please try again");
      setPassword("");
      return;
    }

    // setActivePlayer(selectedPLayer);
    setSelected(null);
    setPassword("");
    setPendingKey(key);
    setShowTheme(true);
    // nav(`/typing/${key}`);
  }

  const handleThemeConfirm = () => {
    if (!selectedTheme) { alert("Please select a theme to continue"); return; }
    setShowTheme(false);
    setCountdown(3);
  };

   /* ── countdown + race logic ── */
  useEffect(() => {
    if (countdown === null) return;
 
    if (typeof countdown === "number" && countdown > 0) {
      const t = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(t);
    }
    if (countdown === 0) {
      const t = setTimeout(() => setCountdown("GO!"), 100);
      return () => clearTimeout(t);
    }
    if (countdown === "GO!") {
      const t = setTimeout(() => setCountdown("race"), 700);
      return () => clearTimeout(t);
    }
    if (countdown === "race") {
      /* car animation runs for 1.2 s then navigate */
      const t = setTimeout(() => {
        nav(`/typing/${pendingKey}`, { state: { theme: selectedTheme } });
      }, 1800);
      return () => clearTimeout(t);
    }
  }, [countdown]);


  return (
    <div className="player-container">
      <h2>Select Player</h2>

      {players.map((player, index) => (
        <div key={index} className="player-card">
          
          {/* Player row */}
          <div
            className="player-row"
            onClick={() => {setSelected(player.name)}}
          >
            <span>{player.name}</span>
            <span>→</span>
          </div>

          {selectedPLayer === player.name && (
            <div className="password-box">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button onClick={()=>{existingPlayer(password, player.password,player.key)}}>Join</button>
            </div>
          )}
        </div>
      ))}

      {/* Add new player */}
      <div className="add-player" onClick={addNew}>+ Add New Player</div>

      {
        addNewPlayer && (
          <div>
            <div className="input-box">
              <input 
                type="text"
                placeholder="Enter name"
                value={selectedPLayer || ""}
                onChange={(e) => setSelected(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={joinClick}>
                Add Player
              </button>
            </div>
          </div>
        )
      }

      {/* ═══════════ THEME MODAL ═══════════ */}
      {showTheme && (
        <div className="st-overlay">
          <div className="st-modal">
            <div className="st-modal-header">
              <div className="st-modal-icon">⌨️</div>
              <h3 className="st-modal-title">Choose Your Theme</h3>
              <p className="st-modal-sub">What would you like to type today?</p>
            </div>
 
            <div className="st-grid">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  className={`st-theme-card ${selectedTheme === t.id ? "st-selected" : ""}`}
                  onClick={() => setSelectedTheme(t.id)}
                >
                  <span className="st-theme-icon">{t.icon}</span>
                  <span className="st-theme-label">{t.label}</span>
                  <span className="st-theme-desc">{t.desc}</span>
                  {selectedTheme === t.id && <span className="st-check">✓</span>}
                </button>
              ))}
            </div>
 
            <div className="st-actions">
              <button className="st-cancel" onClick={() => { setShowTheme(false); setSelectedTheme(null); }}>
                Cancel
              </button>
              <button
                className={`st-confirm ${selectedTheme ? "st-confirm-active" : ""}`}
                onClick={handleThemeConfirm}
              >
                Start Typing →
              </button>
            </div>
          </div>
        </div>
      )}
 
      {/* ═══════════ COUNTDOWN OVERLAY ═══════════ */}
      {countdown !== null && (
        <div className="cd-overlay">
          {countdown !== "race" ? (
            <div className={`cd-circle ${countdown === "GO!" ? "cd-go" : "cd-num"}`}>
              <span className="cd-text">{countdown}</span>
              {typeof countdown === "number" && (
                <svg className="cd-ring" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" className="cd-ring-track" />
                  <circle cx="60" cy="60" r="54" className="cd-ring-fill"
                    style={{ "--n": countdown }} />
                </svg>
              )}
            </div>
          ) : (
            <div className="cd-race-stage">
              <div className="cd-road">
                <div className="cd-stripe"></div>
                <div className="cd-stripe"></div>
                <div className="cd-stripe"></div>
              </div>
              <div className="cd-car">
                {/* SVG racing car */}
                <svg viewBox="0 0 160 70" xmlns="http://www.w3.org/2000/svg" width="160" height="70">
                  {/* body */}
                  <rect x="10" y="28" width="140" height="28" rx="8" fill="#F5C518"/>
                  {/* cabin */}
                  <rect x="38" y="12" width="68" height="22" rx="6" fill="#F5C518"/>
                  {/* windshield */}
                  <rect x="44" y="15" width="28" height="16" rx="4" fill="#1a2a3a" opacity="0.85"/>
                  {/* rear window */}
                  <rect x="78" y="15" width="22" height="14" rx="3" fill="#1a2a3a" opacity="0.7"/>
                  {/* front spoiler */}
                  <rect x="140" y="44" width="14" height="5" rx="2" fill="#c49a00"/>
                  {/* rear spoiler */}
                  <rect x="6" y="22" width="12" height="4" rx="2" fill="#c49a00"/>
                  {/* wheels */}
                  <circle cx="36" cy="56" r="12" fill="#1a1a1a"/>
                  <circle cx="36" cy="56" r="6"  fill="#555"/>
                  <circle cx="120" cy="56" r="12" fill="#1a1a1a"/>
                  <circle cx="120" cy="56" r="6"  fill="#555"/>
                  {/* exhaust flames */}
                  <ellipse cx="5" cy="40" rx="7" ry="4" fill="#ff6a00" opacity="0.9"/>
                  <ellipse cx="2" cy="40" rx="5" ry="3" fill="#ffcc00" opacity="0.8"/>
                  {/* racing stripe */}
                  <rect x="10" y="36" width="140" height="4" rx="2" fill="#c49a00" opacity="0.5"/>
                  {/* number */}
                  <text x="80" y="47" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1a1a1a">01</text>
                </svg>
              </div>
              {/* speed lines */}
              <div className="cd-speed-lines">
                <div className="cd-line"></div>
                <div className="cd-line"></div>
                <div className="cd-line"></div>
                <div className="cd-line"></div>
              </div>
              <p className="cd-race-text">Get Ready!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PlayerList;