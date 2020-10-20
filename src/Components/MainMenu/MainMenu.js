import React from 'react';
import "./MainMenu.scss";



export default function MainMenu(props) {
    function handleStartBtnOnClick() { props.setVisibleComponent("Tetris"); }



    return (
        <div className="MainMenu">
            <button onClick={() => handleStartBtnOnClick()}>Start</button>

            <button>Stats</button>
        </div>
    );
}