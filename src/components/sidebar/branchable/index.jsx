import './branchable.css'
import {useState} from "react";
const Branchable = (props) => {
    const [showItems, setShowItems] = useState(false);
    const [selected, setSelected] = useState(true);
    return <div className={'branchable-container'}>
        <div className={'title'} onClick={() => setShowItems(!showItems)}>
            {props.title}
        </div>
        {showItems ? <div className={'boards'}>
            <div>All {props.title} ({props.boards.length})</div>
            {props.boards.map(item => <div className={selected ? 'board-selected-item' : 'board-item'}>
                {item}
            </div>)}
        </div> : null}
    </div>
}

export default Branchable;
