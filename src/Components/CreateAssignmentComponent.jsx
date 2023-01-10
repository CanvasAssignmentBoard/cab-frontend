import React, {useContext} from 'react';
import {AiOutlineClose} from "react-icons/ai";
import "./css/CreateAssignmentComponent.css";
import {CourseContext} from "../Providers/CourseProvider";
import {BoardContext} from "../Providers/BoardProvider";
import {ColumnContext} from "../Providers/ColumnProvider";

export default function CreateAssignmentComponent() {
    const [showModal, setShowModal] = React.useState(false);
    const courses = useContext(CourseContext);
    const columnContext = useContext(ColumnContext);
    const boardContext = useContext(BoardContext);

    const backendCall = (data) => {
        fetch('http://localhost:3000/assignment/create', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setShowModal(true)}
                className={"flex float-right z-10"}
            >
                <p className={"create-assignment-button"}>Create Assignment</p>
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-3/4 my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div
                                className="border-0 w-auto rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div
                                    className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Create New Assignment
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
                                    <form className="space-y-6">
                                        <div>
                                            <label htmlFor="assignmentName"
                                                   className="block mb-2 text-sm font-medium text-black-900 dark:text-gray-300">Assignment
                                                Name *</label>
                                            <input type="text" name="assignmentName" id="assignmentName"
                                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                   placeholder="Assignment Name" required/>
                                        </div>
                                        <div className="flex">
                                            <div className="w-full ml-1">
                                                <label htmlFor="courseName"
                                                       className="block mb-2 text-sm font-medium text-black-900 dark:text-gray-300">Course Name *</label>
                                                <select id="courseName"
                                                        name="courseName"
                                                        required
                                                        defaultValue="OL-Servi-Huijbregts-I346215"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    {courses.map((a) => {
                                                        console.log(a.name);
                                                        return (
                                                            <option value={a.id}>{a.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="assignmentDescription"
                                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Assignment Description</label>
                                            <textarea id="assignmentDescription" name="assignmentDescription" rows="3"
                                                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                      placeholder="Type your assignment description here"/>
                                        </div>
                                        <div className="w-full mr-1">
                                            <label htmlFor="submissionType"
                                                   className="block mb-2 text-sm font-medium text-black-900 dark:text-gray-300">Submission Type *</label>
                                            <select id="submissionType"
                                                    name="submissionType"
                                                    required
                                                    defaultValue="none"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option value="none">None</option>
                                                <option value="File Upload">File Upload</option>
                                                <option value="Website URL">Website URL</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="dueDate"
                                                   className="block mb-2 text-sm font-medium text-black-900 dark:text-gray-300">Due date (YYYY/MM/DD)*</label>
                                            <input type="text" name="dueDate" id="dueDate"
                                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                   placeholder="Due date" required/>
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
                                                type="button"
                                                onClick={() =>{
                                                    backendCall({
                                                        courseID:  document.getElementById("courseName").value,
                                                        assignment: {
                                                            name: document.getElementById("assignmentName").value,
                                                            description:  document.getElementById("assignmentDescription").value
                                                        }
                                                        }
                                                    );
                                                    boardContext.updateBoards();
                                                    setShowModal(false);
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