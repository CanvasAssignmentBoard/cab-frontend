import './App.css';
import BoardComponent from './Components/BoardComponent';
import CreateAssignmentComponent from "./Components/CreateAssignmentComponent";
import TestComponent from './Components/TestComponent';
import AssignmentProvider from './Providers/AssignmentProvider';
import CourseProvider from "./Providers/CourseProvider";
import BoardProvider from './Providers/BoardProvider';

function App() {
  return (
    <>
        <BoardProvider>
          <CourseProvider>
            <BoardComponent/>
          </CourseProvider>
        </BoardProvider>
    </>
  );
}

export default App;
