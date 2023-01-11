import './css/NavbarListComponent.css'
import {useState} from "react";
export default function NavbarListComponent(props){
    const [showItems, setShowItems] = useState(true);

    return(
    <div className={'list-container'}>
        <div className={'title'} onClick={() => setShowItems(!showItems) }>
            {props.title}
            {showItems === false ?
                <div className={'title-arrow'}>
                    
                </div>
                :
                <div className={'title-arrow'}>
                    ˅
                </div>
            }
        </div>
        {showItems ? <div className={'boards'}>
            {props.boards.map((board, k) => {return (

                <div key={k} className={board === props.selectedBoard ? 'board-selected-item' : 'board-item'} onClick={() => props.setSelectedBoard(board)}>
                    {board.name}
                </div>)})}

        </div> : null}
    </div>
    )
}