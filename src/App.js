import './App.css';
import BoardComponent from './Components/BoardComponent';
import CreateAssignmentComponent from "./Components/CreateAssignmentComponent";
import TestComponent from './Components/TestComponent';
import AssignmentProvider from './Providers/AssignmentProvider';
import CourseProvider from "./Providers/CourseProvider";
import BoardProvider from './Providers/BoardProvider';
import TabbedNavigationComponent from './Components/TabbedNavigationComponent';
import FilterProvider from './Providers/FilterProvider';
import ColumnProvider from './Providers/ColumnProvider';
import { useContext } from 'react';
import {BoardContext} from "./Providers/BoardProvider";


function LoadColumns() {
  const boards = useContext(BoardContext);
  return (
    <ColumnProvider board={boards.selectedBoard}>
      <FilterProvider>
        <TabbedNavigationComponent navItems={[{name: "Board", component: <BoardComponent />}]}/>
      </FilterProvider>
      {/* <BoardComponent/> */}
    </ColumnProvider>
  );
}
function App() {
  return (
    <div data-testid="app-loaded">
        <BoardProvider>
          <CourseProvider>
            <LoadColumns/>
          </CourseProvider>
        </BoardProvider>
    </div>
  );
}

export default App;
