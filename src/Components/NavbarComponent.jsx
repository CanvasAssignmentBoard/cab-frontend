import React from 'react';

export default function NavbarComponent(props) {
    return (
        <div>
            <h1>Navbar</h1>
            <ul>
                {props.boards.map(board => {
                    return (
                        <li key={board.id}>
                            <button style={{ background: props.selectedBoard == board ? 'red' : 'blue'}} onClick={() => props.setSelectedBoard(board)}>{board.name}</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}