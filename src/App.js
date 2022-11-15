import './App.css';
import CreateAssignmentComponent from "./Components/CreateAssignmentComponent";
import BoardComponent from "./Components/BoardComponent";
import { Tab, Popover } from '@headlessui/react';
import {TbLayoutList, TbLayoutColumns} from "react-icons/tb";
import {AiOutlineSearch, AiOutlineBell} from "react-icons/ai";
import {TfiAgenda} from "react-icons/tfi";
import {useState, useEffect} from "react";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [board, setBoard] = useState(null);
  const [boardState, setBoardState] = useState("board");

  useEffect(() => {
    fetch("http://localhost:3000/board/1/1")
      .then(res => res.json())
      .then(
          (result) => {
              setIsLoaded(true);
              setBoard(result);
          }, 
          (error) => {
              setIsLoaded(true);
              setError(error);
          }
      )
  }, []) 

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

    return (
      <>
      <div className="px-2 m-0">
          <div className="flex App-header-spacing">
            <h2 className="w-3/4 Board-text mb-4"> {capitalizeFirstLetter(board.boardname)} | {capitalizeFirstLetter(boardState)}</h2>
            <div className="flex Tab-box-right">
              <AiOutlineSearch className="Search-icon m-1" size={25}/>
              <AiOutlineBell className="Bell-icon m-1" size={25}/>
              <div className="App-calendar"><TfiAgenda className="Agenda-icon m-1" size={25}/><span className="App-calendar-text">02 November</span></div>
            </div>
          </div>
          <div className="">
            <Tab.Group onChange={(index) => {
              if (index === 0) {
                setBoardState("board");
              } else if (index === 1) {
                setBoardState("list");
              }
            }}>
              <Tab.List className="flex p-1 space-x-1">
                <Tab className={({ selected }) => `pl-2 pr-2 tab-text font-medium leading-5 text-center text-gray-500 pb-4 ${(boardState === "board") ? 'border-b border-black' : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100 border-b border-transparent'}`}><TbLayoutColumns className="inline"/> Board View</Tab>
                <Tab className={({ selected }) => `pl-2 pr-2 tab-text font-medium leading-5 text-center text-gray-500 pb-4 ${(boardState === "list") ? 'border-b border-black' : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100 border-b border-transparent'}`}><TbLayoutList className="inline"/> List View</Tab>
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
                              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                              </svg>
                              <span>Filter</span>
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
                  {/* TODO: Add  modal logic with a CreateTask component */}
                  <Tab className={({ selected }) => `pl-2 pr-2 tab-text font-medium leading-5 text-center text-gray-500 pb-4 ${selected ? 'border-b border-black' : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100 border-b border-transparent'}`}>Create Task</Tab>
                </div>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel className="p-4">
                  <BoardComponent />
                </Tab.Panel>
                <Tab.Panel className="p-4">
                  <CreateAssignmentComponent />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </>
    );
  }
}

export default App;
