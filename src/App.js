import logo from './logo.svg';
import './App.css';
import Branchable from "./components/sidebar/branchable";

function App() {
  return (
    <div>
      <Branchable title={'Boards'} boards={['Board 1', 'Board 2', 'Board 3']}/>
    </div>
  );
}

export default App;
