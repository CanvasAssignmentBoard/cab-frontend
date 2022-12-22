import React from 'react';
import {AiOutlineClose} from "react-icons/ai";
import "./css/CreateAssignmentComponent.css";

export default function BoardModalComponent(props) {
    const [showModal, setShowModal] = React.useState(false);

    return (
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
                                {props.boardName}
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-1 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => props.boardModalState(false)}
                            >
                                <AiOutlineClose size={20}/>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="py-6 px-6 lg:px-8">
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="assignmentName" className="block mb-2 text-sm font-medium text-black-900">
                                        Description: {props.boardDescription}
                                    </label>
                                </div>
                                <div>
                                    <label htmlFor="assignmentDescription" className="block mb-2 text-sm font-medium text-black-900">
                                        Courses:
                                    </label>
                                </div>
                                <div className="w-full mr-1">
                                </div>
                                <div
                                    className="flex items-center justify-end pt-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => props.boardModalState(false)}
                                    >
                                        Ok
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}
