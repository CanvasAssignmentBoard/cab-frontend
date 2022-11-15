import './css/NavbarListComponent.css'
import {useState} from "react";
export default function NavbarListComponent(props){
    const [showItems, setShowItems] = useState(false);
    const [selectedItem, setSelectedItem] = useState(props.boards[0]);

    return <div className={'list-container'}>
        <div className={'title'} onClick={() => setShowItems(!showItems)}>
            {props.title}
            {setShowItems === true ?
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
            {/*<div>All {props.title} ({props.boards.length})</div>*/}
            {props.boards.map(item => <div className={item === selectedItem ? 'board-selected-item' : 'board-item'} onClick={() => {
            setSelectedItem(item)}
            }>
                {item}
            </div>)}
        </div> : null}
    </div>
}
