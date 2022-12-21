import './css/NavbarListComponent.css'
import {useState} from "react";
export default function NavbarListComponent(props){
    const [showItems, setShowItems] = useState(true);

    return (
        <div className={'list-container'}>
            <div className={'title'} onClick={() => setShowItems(!showItems)}>
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

            <div className={"flex flex-col"}>
                {showItems ? <div className={'board-items-full-container'}>
                    {props.boards.map((board) => {
                        return (

                            <div className={"board-items-container"}>
                                <div className={board === props.selectedBoard ? 'board-selected-item' : 'board-item'}
                                     onClick={() => props.setSelectedBoard(board)}>
                                    {board.name}
                                </div>
                            </div>
                        )
                    })}

                </div> : null}
            </div>
        </div>
    );
}