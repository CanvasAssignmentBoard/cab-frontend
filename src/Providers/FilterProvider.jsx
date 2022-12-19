import React, {useEffect, useState, createContext} from 'react';

export const FilterContext = createContext();

export default function FilterProvider(props) {
    const [filter, setFilter] = useState({deadline: null});

    console.log(filter);
    function removeFilter() {
        setFilter({deadline: null});
    }

    return (
        <FilterContext.Provider value={{filter: filter, setFilter: setFilter, removeFilter: removeFilter}}>
            {props.children}
        </FilterContext.Provider>
    );
}