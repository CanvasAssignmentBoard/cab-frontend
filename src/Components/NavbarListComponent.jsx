import './css/NavbarListComponent.css'
import {useState} from "react";
export default function NavbarListComponent(props){
    const [showItems, setShowItems] = useState(true);
    const [selectedItem, setSelectedItem] = useState(props.boards[0]);

    return <div className={'list-container'}>
        <div className={'title'} onClick={() => setShowItems(!showItems) }>
            {props.title}
            {showItems === false ?
                <div className={'title-arrow'}>
                    >
                </div>
            :
                <div className={'title-arrow'}>
                    ˅
                </div>
            }
        </div>
        {showItems ? <div className={'boards'}>
            {props.boards.map((board) => {return (
                board.disabled ?  <div className={'board-disabled-item'} >
                    {board.boardName}
                </div>
                    : <div className={board === selectedItem ? 'board-selected-item' : 'board-item'} onClick={() => {setSelectedItem(board)}}>
                    {board.boardName}
                </div>

            )})}

        </div> : null}
    </div>
}