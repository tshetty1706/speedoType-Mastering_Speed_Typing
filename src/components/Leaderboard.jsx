import { useEffect, useState } from "react";
import "./Leaderboard.css";

function Leaderboard({ players = [] }) {

  const [topPlayers,setTop] = useState([]);

  useEffect(()=>{
    setTop([...players].filter((player)=>player.wpm >0).sort((a, b) => b.wpm - a.wpm).slice(0,3));
  }, [players]);

  let medals = ["🥇", "🥈", "🥉"]

  if (topPlayers.length === 0) {
    return (
      <div className="leaderboard">
        <h2>Leaderboard</h2>
        <div className="empty">
          <p>No champions yet 👑.</p>
          <span>Be the first to claim the top spot!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>

      <div className="leaderboard-list">
        {topPlayers.map((player, index) => {
          <div key={index} className="leaderboard-item">
          
            <div className="rank">
              {medals[index]}
            </div>

            <div className="player-info">
              <p className="name">{topPlayers[index].name}</p>
              <p className="score">{topPlayers[index].wpm} WPM</p>
            </div>

          </div>
        }
          
        )}
      </div>
    </div>
  );
}

export default Leaderboard;