import React, {useEffect, useState, useContext} from 'react';
import AssignmentProvider from '../Providers/AssignmentProvider';
import {BoardContext} from "../Providers/BoardProvider";
import {AssignmentContext} from "../Providers/AssignmentProvider";
import TaskProvider, {TaskContext} from "../Providers/TaskProvider";
import NavbarComponent from './NavbarComponent';
//import HeaderComponent from './HeaderComponentOld';
import ColumnComponent from './ColumnComponent';
import AssignmentComponent from './AssignmentComponent';
import HeaderBoardComponent from "./HeaderBoardComponent";
import {FilterContext} from "../Providers/FilterProvider";
import ColumnProvider, {ColumnContext} from '../Providers/ColumnProvider';
import {DragDropContext, Draggable} from 'react-beautiful-dnd';
import Droppable from "./StrictModeDroppable.tsx";

const grid = 8;
const host = process.env.REACT_APP_API_HOST;
const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    // padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
  
    // change background colour if dragging
    background: isDragging ? "transparent" : "transparent",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "transparent" : "transparent",
    height: "95%",
    // padding: grid,
    // width: 250
  });
  
  // fake data generator
const getItems = (count, offset = 0) =>
Array.from({ length: count }, (v, k) => k).map((k) => ({
  id: `item-${k + offset}-${new Date().getTime()}`,
  content: `item ${k + offset}`
}));

function LoadColumns(props) {
    const columns = useContext(ColumnContext).columns;
    const board = useContext(BoardContext);
    
    const [state, setState] = useState([]);

    if (columns == undefined) {
        return <></>;
    }
    
    const reorder = (list, startIndex, endIndex, updateBoards, sInd) => {

      const result = Array.from(list);
  
      let id = result[startIndex].id;
  
      fetch(`${host}/Row/Reorder/${id}/${endIndex}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      }).then(response => {
        if (response.status === 201) {
          console.log("Reorder successful");
          const [removed] = result.splice(startIndex, 1);
      
          result.splice(endIndex, 0, removed);
      
          result.forEach((item, index) => {
              item.index = index;
          });
    
          const newState = {...state};
          newState[sInd] = result;
          setState(newState);
      
          // updateBoards();
        } else {
          console.log("Reorder failed");
          updateBoards();
        }
      });
  };
  
  /**
  * Moves an item from one list to another list.
  */
  const move = (source, destination, droppableSource, droppableDestination, columns, updateBoards, sInd, dInd) => {
      console.log(columns)
      const sourceClone = Array.from(source);
      const destClone = Array.from(destination);
  
      let index = parseInt(droppableDestination.droppableId.split("-")[1]);
      let id = columns[index].id
      let aid = source[droppableSource.index].id
      
      fetch(`${host}/Row/Move/${aid}/${id}/${droppableDestination.index}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      }).then(response => {
        if (response.status === 201) {
  
          console.log("moved successful");
          // updateBoards();
          const [removed] = sourceClone.splice(droppableSource.index, 1);
  
          destClone.splice(droppableDestination.index, 0, removed);
      
          const result = {};
      
          sourceClone.forEach((item, index) => {
              item.index = index;
          });
      
          destClone.forEach((item, index) => {
              item.index = index;
          });
      
          result[droppableSource.droppableId] = sourceClone;
          result[droppableDestination.droppableId] = destClone;

          const newState = {...state};

          newState[sInd] = result[sInd];
          newState[dInd] = result[dInd];
      
          setState(newState);
      
          return result;
        } else {
          console.log("moved failed");
          // updateBoards();
        }
      });
  };

    let listdata = [];
    columns.forEach((column) => {
        let assignments = [];
        let index = 0;
        column.assignments.forEach((assignment) => {
            assignments.push({...assignment, index: index});
            index++;
        });
        listdata["column-" + columns.findIndex(c => c.id === column.id)] = assignments;
    });

    console.log(listdata)

    if (Object.keys(state).length == 0) {
        if (columns.length != 0) {
            setState(listdata);
        }else {
            return <></>;
        }
    }

    function onDragEnd(result) {
        const { source, destination } = result;
    
        // dropped outside the list
        if (!destination) {
          return;
        }

        const sInd = source.droppableId;
        const dInd = destination.droppableId;
    
        if (sInd === dInd) {
            const items = reorder(state[sInd], source.index, destination.index, board.updateBoards, sInd);
        } else {
            const result = move(state[sInd], state[dInd], source, destination, columns, board.updateBoards, sInd, dInd);
        }
    }

    return (
        <div style={{marginLeft: "2vw"}}>
            {/* <LoadTestDragDrop /> */}
            <div data-testid="required-column-list" className={"board-div grid grid-cols-3 gap-12 items-stretch"}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {columns.map((column, k) => (
                        <ColumnComponent columnName={column.name}>
                            <Droppable key={column.id} droppableId={"column-" + columns.findIndex(c => c.id === column.id)}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        style={getListStyle(snapshot.isDraggingOver)}
                                    >
                                        <AssignmentProvider column={column} board={props.board}>
                                            <LoadAssignments column={column} assignments={state["column-" + columns.findIndex(c => c.id === column.id)]}/>
                                        </AssignmentProvider>
                                        {provided.placeholder}
                                    </div>
                                )}
                                
                            </Droppable>
                        </ColumnComponent>
                    ))}
                </DragDropContext>
            </div>
        </div>
    );
}
function LoadAssignments(props) {
    // const assignments = useContext(AssignmentContext).assignments;

    return (
        <>
            {props.assignments.sort((a, b) => a.index > b.index ? 1 : -1).map(assignment => (
                <TaskProvider assignment={assignment}>
                    <Draggable key={assignment.id} draggableId={assignment.id + ""} index={assignment.index}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                )}
                            >
                                {/* Test */}
                                <AssignmentComponent assignment={assignment}/>
                            </div>
                        )}
                    </Draggable>
                </TaskProvider>                                
            ))}
        </>
    );
}

export default function BoardComponent(props) {

    const boards = useContext(BoardContext);
    const filter = useContext(FilterContext);
    // console.log(filter);
    // const [selectedBoard, setSelectedBoard] = useState(null);
    if (boards.length > 0 && boards.selectedBoard == null) {
        if (boards.boards.length > 0) {
            boards.setSelectedBoard(boards.boards[0]);
        }
    }

    // console.log(boards)
    // console.log(selectedBoard)


    return (
        <div style={{display: "flex"}}>
            {/*<HeaderComponent />*/}
            {/* <NavbarComponent boards={boards.boards} selectedBoard={boards.selectedBoard} setSelectedBoard={boards.setSelectedBoard}/> */}
             <ColumnProvider board={boards.selectedBoard}>
                <LoadColumns board={boards.selectedBoard}/>
             </ColumnProvider>
            {/* <HeaderBoardComponent/> */}


        </div>

    )
}