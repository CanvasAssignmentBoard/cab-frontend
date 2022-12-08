import React, {useState, Fragment} from 'react';
import "./css/AssignmentComponent.css";
import {IoMdArrowDropdown, IoMdArrowDropright} from "react-icons/io";
import ProgressBarComponent from './ProgressBarComponent';
import ChipFieldComponent from './ChipFieldComponent.jsx';
import { useContext } from 'react';
import {CourseContext} from "../Providers/CourseProvider";
import {TaskContext} from "../Providers/TaskProvider";
import ModalComponent from './ModalComponent';
import {Dialog, Transition} from '@headlessui/react';
import AssignmentStatusComponent from './AssignmentStatusComponent';
import TaskComponent from './TaskComponent';


function deadlineColor(date) {
    console.log(date);
    const currentDate = new Date();
    const deadlineDate = new Date(date);
    const difference = deadlineDate - currentDate;
    const differenceInDays = difference / (1000 * 3600 * 24);
    if (differenceInDays < 0) {
        return "#e3432d";
    } else if (differenceInDays < 7) {
        return "#F5761A";
    } else {
        return "#bdbdbd";
    }
}

export default function AssignmentComponent(props) {

    const [showModal, setShowModal] = useState(false);
    const courses = useContext(CourseContext);
    const tasks = useContext(TaskContext);
    
    let [isOpen, setIsOpen] = useState(false)

    if (courses === undefined || tasks === undefined) {
        return <></>;
    }

    function closeModal() {
      setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
    }

    const currentDate = new Date();
    const deadlineDate = new Date(props.assignment.due_at);

    return (
        <>
        <div className={"assignment-div"} onClick={() => setIsOpen(true)}>
            <div className={"assignment-header-div"}>
                <p className={"assignment-header-text"}>
                    {props.assignment.name}
                </p>
                <p className={"assignment-header-subtext"}>
                    {courses.find(course => course.id === props.assignment.course_id).name}
                </p>
            </div>
            <div className={"assignment-body-div"}>
                {tasks.length > 0 ? 
                    <ProgressBarComponent progress={Math.ceil((100 / tasks.length * tasks.filter(task => {
                        return task.status === "checked";
                    }).length))}/> 
                : <></>}
                { props.assignment.due_at != null ? <ChipFieldComponent title={deadlineDate.toISOString().split(/[T ]/i, 1)[0]} color={deadlineColor(props.assignment.dueDate)}/> : <></>}
            </div>
        </div>
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                            <Dialog.Panel style={{margin: '4vw'}} className="w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                {props.assignment.name}
                            </Dialog.Title>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left'}}>
                                <div className="mt-2 p-1" style={{maxHeight: '50vh', overflowY: 'scroll', width: '60%'}}>
                                    <p className="text-sm text-gray-500" dangerouslySetInnerHTML={{__html: props.assignment.description}} />
                                </div>
                                <div style={{paddingLeft: '2vw', display: 'flex', flexDirection: 'column', width: '40%'}}>
                                    <span><b>Course:</b> {courses.find(course => course.id === props.assignment.course_id).name}</span> 
                                    <span><b>Assignment status:</b> <AssignmentStatusComponent assignmentName={props.assignment.name}/></span>
                                    { props.assignment.due_at != null ? <span><b>Deadline:</b> <ChipFieldComponent style={{display: 'inline-block'}} title={deadlineDate.toISOString().split(/[T ]/i, 1)[0]} color={deadlineColor(props.assignment.dueDate)}/></span> : <></>}
                                    <TaskComponent assignment={props.assignment}/>
                                </div>
                            </div>

                            <div className="mt-4" style={{justifyContent: 'right', display: 'flex'}}>
                                <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-blue bg-white-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={closeModal}
                                >
                                Close
                                </button>
                            </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>)
}

