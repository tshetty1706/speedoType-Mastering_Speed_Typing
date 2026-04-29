import React from "react";
import "./PlayerList.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//why players = [] because we want to provide a default value for the players prop in case it is not passed from the parent component. By setting players = [], we ensure that the component can still function properly even if no players data is provided, preventing potential errors when trying to access properties of an undefined or null value.

function PlayerList({ players = [] , setPlayers }) {
  const [selectedPLayer, setSelected] = useState(null);
  const [password, setPassword] = useState("");
  let [addNewPlayer, setAddNew] = useState(false);

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

    players.push(pdata);
    setPlayers([...players]);
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
    nav(`/typing/${key}`);
  }

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
    </div>
  );
}

export default PlayerList;