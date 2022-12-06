import React from 'react';
import './css/NavbarComponent.css'

export default function NavbarComponent(props) {
    return (
        <div className={'list-container'}>
            <div className={'title'}>

            </div>
            <div className={'boards'}>
                {props.boards.map((board) => {
                    return (
                        <div className={board === props.selectedBoard ? 'board-selected-item' : 'board-item'} onClick={() => props.setSelectedBoard(board)}>
                            {board.name}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}