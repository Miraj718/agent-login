import './App.css';
import AgentForm from './Components/AgentForm';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
    <Routes>
    <Route exact path='/' element={<AgentForm/>}></Route>
    
    </Routes>
    </Router>
    </>
  );
}

export default App;
