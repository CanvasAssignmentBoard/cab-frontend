import React, {useEffect, useState, createContext} from 'react';

export default function HeaderComponent(props) {

    return (
        <div>
            <input type="text" value={props.filter} onChange={e => props.setFilter(e.target.value)}/>
        </div>
    )
}