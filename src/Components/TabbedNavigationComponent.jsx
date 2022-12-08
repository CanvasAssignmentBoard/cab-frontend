import CreateAssignmentComponent from "../Components/CreateAssignmentComponent";
import BoardComponent from "../Components/BoardComponent";
import { Tab, Popover, Transition } from '@headlessui/react';
import {TbLayoutList, TbLayoutColumns} from "react-icons/tb";
import {AiOutlineSearch, AiOutlineBell} from "react-icons/ai";
import {TfiAgenda} from "react-icons/tfi";
import {useState, useEffect, useContext} from "react";
import NavbarComponent from "../Components/NavbarComponent";
import {BoardContext} from "../Providers/BoardProvider";
import { Fragment } from 'react'
import {FilterContext} from "../Providers/FilterProvider";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function TabbedNavigationComponent(props) {
    const boards = useContext(BoardContext);
    const filter = useContext(FilterContext);

    const navItems = props.navItems;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [board, setBoard] = useState(null);
    const [boardState, setBoardState] = useState("board");
    const [selectedItem, setSelectedItem] = useState(navItems[0]);
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


    console.log(navItems);
    function onDeadlineFilter(e) {
        filter.setFilter({deadline: e.target.value});
        console.log("deadline filter");
    }

    console.log(filter.deadline);

    if (boards.selectedBoard == null || boards.selectedBoard == undefined) {
        return <></>
    }

    return (
        <div className={"flex"}>
            <div>
                <NavbarComponent/>
            </div>
            <div className="px-2 m-0 Board-view-spacing">
                <div className="flex App-header-spacing" style={{justifyContent: 'space-between'}}>
                    <h2 className="w-3/4 Board-text mb-4"> {capitalizeFirstLetter(boards.selectedBoard.name)} | {capitalizeFirstLetter(selectedItem.name)}</h2>
                    <div className="flex Tab-box-right">
                        <AiOutlineSearch className="Search-icon m-1" size={25}/>
                        <AiOutlineBell className="Bell-icon m-1" size={25}/>
                        <div className="App-calendar"><TfiAgenda className="Agenda-icon m-1" size={25}/></div>
                    </div>
                </div>
                <div className="">
                    <Tab.Group onChange={(index) => {
                        if (index === 0) {
                            setSelectedItem(navItems[index]);
                        } else if (index === 1) {
                            setSelectedItem(navItems[index]);
                        }
                    }}>
                        <Tab.List className="flex p-1 space-x-1" style={{justifyContent: 'space-between'}}>
                            <div>
                                {navItems.map((navItem) => (
                                    <Tab className={({ selected }) => `pl-2 pr-2 tab-text font-medium leading-5 text-center text-gray-500 pb-4 ${(selectedItem === navItem) ? 'border-b border-black' : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100 border-b border-transparent'}`}><TbLayoutColumns className="inline"/>{navItem.name}</Tab>
                                ))}
                            </div>
                            {/* <Tab className={({ selected }) => `pl-2 pr-2 tab-text font-medium leading-5 text-center text-gray-500 pb-4 ${(boardState === "board") ? 'border-b border-black' : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100 border-b border-transparent'}`}><TbLayoutColumns className="inline"/> Board View</Tab>
                            <Tab className={({ selected }) => `pl-2 pr-2 tab-text font-medium leading-5 text-center text-gray-500 pb-4 ${(boardState === "list") ? 'border-b border-black' : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100 border-b border-transparent'}`}><TbLayoutList className="inline"/> List View</Tab> */}

                            <div className="Tab-box-right flex">
                                <Popover className="relative">
                                    {({ open }) => (
                                        <>
                                            <Popover.Button className="Tab-box-right-button pl-2 pr-2 tab-text font-medium leading-5 text-center text-gray-500 pb-4">
                                                <div className="Tab-box-right-button-text">Filter</div>
                                            </Popover.Button>
                                            <Popover.Panel className="mt-min-2 absolute z-10 right-0 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="py-1">
                                                    <Popover.Button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                                                        <span>Deadline</span>
                                                        <input type="date" defaultValue={filter.filter.deadline} className="ml-2" onClick={(event) => event.stopPropagation()} onChange={(event) => onDeadlineFilter(event)}/>
                                                    </Popover.Button>
                                                </div>
                                            </Popover.Panel>
                                        </>
                                    )}
                                </Popover>
                                <Popover className="relative">
                                    {({ open }) => (
                                        <>
                                            <Popover.Button className="Tab-box-right-button pl-2 pr-2 tab-text font-medium leading-5 text-center text-gray-500 pb-4">
                                                <div className="Tab-box-right-button-text">Sort</div>
                                            </Popover.Button>
                                            <Popover.Panel className="mt-min-2 absolute z-10 right-0 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="py-1">
                                                    <Popover.Button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                                                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                        <span>Sort</span>
                                                    </Popover.Button>
                                                </div>
                                            </Popover.Panel>
                                        </>
                                    )}
                                </Popover>
                                <CreateAssignmentComponent/>
                                    </div>
                        </Tab.List>
                        <Tab.Panels>
                            {navItems.map((navItem) => (
                                <Tab.Panel className="p-4">
                                    {navItem.component}
                                </Tab.Panel>
                            ))}
                            {/* <Tab.Panel className="p-4">
                                <BoardComponent />
                            </Tab.Panel>
                            <Tab.Panel className="p-4">
                                <ListComponent />
                            </Tab.Panel> */}
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </div>
    );
}

export default TabbedNavigationComponent;