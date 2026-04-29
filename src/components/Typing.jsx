import React, { useEffect } from "react";
import "./Typing.css";
import { useParams } from "react-router-dom";

function Typing({ setActivePlayer , players}) {
    const { playerId } = useParams();
    useEffect(
        ()=>{
            setActivePlayer(players.find((ele)=> ele.key === parseInt(playerId)));

            return () => {
            setActivePlayer([]); // or [] if you prefer
            // how this function works: When the component mounts, it sets the active player based on the playerId from the URL. When the component unmounts (e.g., when navigating away), it clears the active player data by setting it to an empty array. This way, when you navigate back to the typing page, you can set the active player again based on the playerId, ensuring that you have the correct active player data available.

            //but isn't this going to cause a problem? because when we navigate away from the typing page, we want to clear the active player data, but if we set it to null or [], then when we navigate back to the typing page, we won't have the active player data anymore.
        };
        }, [playerId, setActivePlayer, players]
    );
    console.log(playerId)

    return <div>
        <h1>Typing Game</h1>
    </div>
}

export default Typing;
