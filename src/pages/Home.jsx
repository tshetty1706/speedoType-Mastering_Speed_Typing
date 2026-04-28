import React from "react";
import "./Home.css";
import Navbar from "../components/Navbar";
import Leaderboard from "../components/Leaderboard";
import { useNavigate } from "react-router-dom";

function Home({ players }) {

  let nav = useNavigate();

  return (
    <div className="home-container">
      <Leaderboard players={players} />
      <button className="get-started-btn" onClick={()=>nav("/player")}>
        Get Started →
      </button>
    </div>
  );
}

export default Home;