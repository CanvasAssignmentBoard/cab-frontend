import React, {useContext, useEffect, useState} from 'react';
import {AiFillPlusCircle, AiOutlineClose} from "react-icons/ai";
import "./css/CreateBoardComponent.css";
import {CourseContext} from "../Providers/CourseProvider";
import {BoardContext} from "../Providers/BoardProvider";

function CoursePill(props) {
    const course = props.course;
    const selectedCards = props.selectedCards;
    const setSelectedCards = props.setSelectedCards;
    const handleRemoveItem = props.handleRemoveItem;

    return (
        <div
            style={{marginLeft: '2rem !important', marginTop: '2rem !important'}}
            className={selectedCards.indexOf(course.name) > -1 ?  "course-card-selected bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                : "course-card bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"}
            onClick={() => {
                selectedCards.indexOf(course) > -1 ?
                    handleRemoveItem(course) :
                    setSelectedCards([...selectedCards, course]);
            }}
        >
            <div>
                <img style={{width: '100%'}} className="course-card-img rounded-t-lg"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlazg9JzvKxwwVUmzc2IQKqGYVJhXZM0-tWW_tzZc&s" alt=""/>
            </div>
            <div className="p-2 max-w-10">
                <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 selected:border-blue-900">{course.name}</h5>
            </div>
        </div>
    );
}
export default function CreateBoardComponent() {
    const [columns, setColumns] = React.useState([]);
    const [columnName, setColumnName] = React.useState("");
    const [showModal, setShowModal] = React.useState(false);
    const [selectedCards, setSelectedCards] = React.useState([]);
    const [board, setBoard] = useState({name: '', description: '', courses: [], columnNames: []})
    const [submit, setSubmit] = useState(false);
    const boardProvider = useContext(BoardContext);
    const host = process.env.REACT_APP_API_HOST;

    useEffect(() => {
        if (submit) {
            fetch(`${host}/board/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(board)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                boardProvider.updateBoards();
            })
            setShowModal(false);
            setSubmit(false);
        }
    }, [board, boardProvider, host, submit])

    const courses = useContext(CourseContext);


    const handleRemoveItem = React.useCallback((name) => {
        setSelectedCards(selectedCards => selectedCards.filter((item, i) => item !== name))
    }, []);

    function onSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        let name = e.target[0].value;
        let description = e.target[1].value;
        let courses = selectedCards.map((course) => course.id);

        const columnNames = jsonToStringArrayColumns(columns);
        setBoard({name, description, courses, columnNames});
        setSubmit(true);
    }

    const createColumn = (columnname) => {
        setColumns([...columns, {columnName: columnname}]);
    }

    const removeColumn = (columnname) => {
        const filtered = columns.filter(function (re) {
            return re.columnName !== columnname;
        });
        setColumns(filtered);
    }

    const jsonToStringArrayColumns = (json) => {
        const a = []
        for (let i = 0; i < json.length; i++) {
            const n = json[i];
            a.push(n.columnName)
        }
        return a;
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setShowModal(true)}
            >
                <AiFillPlusCircle className={"create-board-button"} size={28}/>
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-3/4 my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div
                                className="border-0 w-auto rounded-lg shadow-lg relative flex flex-col w-full bg-white mt-60 outline-none focus:outline-none">
                                {/*header*/}
                                <div
                                    className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Create New Board
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-1 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <AiOutlineClose size={20}/>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="py-6 px-6 lg:px-8">
                                    <form className="space-y-6" onSubmit={(event) => onSubmit(event)}>
                                        <div>
                                            <label htmlFor="boardName"
                                                   className="block mb-2 text-sm font-medium text-black-900 dark:text-gray-300">Board
                                                Name *</label>
                                            <input type="text" name="boardName" id="boardName"
                                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                   placeholder="Board Name" required/>
                                        </div>
                                        <div>
                                            <label htmlFor="boardDescription"
                                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Board Description</label>
                                            <textarea id="boardDescription" name="boardDescription" rows="3"
                                                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                      placeholder="Type your board description here"/>
                                        </div>
                                        <div>
                                            <div style={{display: 'grid', gridTemplateColumns: '165px 165px 165px 165px', height: '300px', overflowY: 'scroll'}} className="bg-gray-50 flex border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                {selectedCards.map((course) => <CoursePill course={course} selectedCards={selectedCards} setSelectedCards={setSelectedCards} handleRemoveItem={handleRemoveItem} />)}
                                            </div>
                                        </div>
                                        <div className={"course-card-div flex space-x-5"} style={{display: 'grid', gridTemplateColumns: '220px 220px 220px', height: '300px', overflowY: 'scroll'}}>
                                            {courses.map((course) => <CoursePill course={course} selectedCards={selectedCards} setSelectedCards={setSelectedCards} handleRemoveItem={handleRemoveItem} />
                                            )}
                                        </div>
                                        <div>
                                            <div id={"allColumns"}>
                                                <input type="text" name="columnID1Name" id="ColumnNameId"
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                       placeholder="Column name" onChange={(e) => {setColumnName(e.target.value)}} required/>
                                                <button
                                                    className="text-black bg-slate-100 font-bold uppercase mb-5 px-6 py-3 rounded shadow hover:shadow-lg text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => createColumn(columnName)}>
                                                    Create Column</button>
                                                {columns.map((e) => {
                                                    return (
                                                        <div className={"flex inline my-4 mr-4"}>
                                                            <button className={"flex inline text-black bg-slate-100 font-bold text-m mr-5 uppercase px-3 py-2 rounded shadow hover:shadow-lg text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "}
                                                                    onClick={() => removeColumn(e.columnName)}>X</button>
                                                            <label htmlFor="column1Name"className="block mb-2 text-sm font-large text-black text-xl flex inline">{e.columnName}</label>
                                                   {/* <input type="text" name="column1Name" id="id"
                                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                           placeholder="Column 1 Name" value={e.columnName} required/>*/}

                                                        </div>
                                                    )
                                                })}


                                            </div>
                                        </div>

                                        <div
                                            className="flex items-center justify-end pt-6 border-t border-solid border-slate-200 rounded-b">
                                            <button
                                                className="text-black bg-slate-100 font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="submit"
                                                onClick={() =>{
                                                    console.log(
                                                        "API Call: " +
                                                        "\n Board Name: " +
                                                        document.getElementById("boardName").value
                                                        + "\n Board Description: " +
                                                        document.getElementById("boardDescription").value
                                                        + "\n Board Courses: " +
                                                        selectedCards
                                                        + "\n created_at: " +
                                                        "22/12/2022"
                                                    );
                                                    // setShowModal(false);
                                                }}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
