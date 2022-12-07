import React, {useEffect, useState, createContext} from 'react';

function GetCourses() {
    const [courses, setCourses] = useState([]);
    const host = process.env.REACT_APP_API_HOST
    useEffect(() => {
        fetch(`${host}/course`)
            .then(response => response.json())
            .then(data => setCourses(data));
    }, []);
    return courses;
}

export const CourseContext = createContext();

export default function CourseProvider(props) {

    const courses = GetCourses();
    return (
        <CourseContext.Provider value={courses}>
            {props.children}
        </CourseContext.Provider>
    );
}