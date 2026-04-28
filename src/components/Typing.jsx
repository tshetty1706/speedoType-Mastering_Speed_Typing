import React from "react";
import "./Typing.css";
import { useParams } from "react-router-dom";

function Typing() {
    const { playerId } = useParams();
    console.log(playerId); 

    return <div>
        <h1>Typing Game</h1>
    </div>
}

export default Typing;
