import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes, useSearchParams } from "react-router-dom";
import PlayerList from "./components/PlayerList";
import Typing from "./components/Typing";
import { AiFillCamera } from "react-icons/ai";

export default function App() {

  const [players, setPlayers] = useState(
    JSON.parse(localStorage.getItem("players")) || []
  );
  //explanation of the above line: It attempts to retrieve the players data from localStorage by calling localStorage.getItem("players") and parsing it as JSON. If there is no data in localStorage (i.e., it returns null), it defaults to an empty array ([]). 
  //but why json.parse? because localStorage stores data as strings, so when we retrieve the players data, it is in string format. We need to parse it back into a JavaScript object (in this case, an array) to work with it.

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);
  //explanation of the above line: Whenever the players state changes, the useEffect hook is triggered, and it updates the localStorage with the new players data by converting it to a JSON string using JSON.stringify(players). 
  //json.stringify is used to convert the players array into a string format that can be stored in localStorage, as localStorage can only store strings. This way, we ensure that the players data is persisted across page reloads and sessions.

  const [activePlayer, setActivePlayer] = useState([]);
  console.log(activePlayer);

  return (
    <div>
      <BrowserRouter>
        <Navbar activePlayer={activePlayer}/>
        <Routes >
          <Route path="/" element={<Home players={players} />} />
          <Route path="/player" element={<PlayerList players={players} setPlayers={setPlayers} setActivePlayer={setActivePlayer} />} />
          <Route path ="/typing/:playerId" element={<Typing setActivePlayer={setActivePlayer} players={players} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

//players{
//   key: ,
//   name:"",
//   wpm(bestScore):""
//   password:""}