import './App.css';
import BoardComponent from './Components/BoardComponent';
import CreateAssignmentComponent from "./Components/CreateAssignmentComponent";
import TestComponent from './Components/TestComponent';
import AssignmentProvider from './Providers/AssignmentProvider';
import BoardProvider from './Providers/BoardProvider';

function App() {
  return (
    <>
        <BoardProvider>
          <BoardComponent/>
        </BoardProvider>
    </>
  );
}

export default App;
