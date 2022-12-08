import './App.css';
import BoardComponent from './Components/BoardComponent';
import CreateAssignmentComponent from "./Components/CreateAssignmentComponent";
import TestComponent from './Components/TestComponent';
import AssignmentProvider from './Providers/AssignmentProvider';
import CourseProvider from "./Providers/CourseProvider";
import BoardProvider from './Providers/BoardProvider';
import TabbedNavigationComponent from './Components/TabbedNavigationComponent';
import FilterProvider from './Providers/FilterProvider';

function App() {
  return (
    <>
        <BoardProvider>
          <CourseProvider>
            <FilterProvider>
              <TabbedNavigationComponent navItems={[{name: "Board", component: <BoardComponent />}]}/>
            </FilterProvider>
            {/* <BoardComponent/> */}
          </CourseProvider>
        </BoardProvider>
    </>
  );
}

export default App;
