import { Fragment  } from 'react';
import './App.css';
import Exam from './Exam';
import { BrowserRouter as Router, Route, Link , Routes} from 'react-router-dom';

function App() {
  
  
  return (
    <Router>
    <Fragment>
      
        <header>
          <h2>Dear student this test to practice categorizing a
          set of words according to their part of speech</h2>
          
          <Link to="/Exam"> 
          <button >Start Test</button>
          </Link>
          
        </header>
        
    </Fragment>
    <Routes>
        <Route path="/Exam" element={<Exam />} />
      </Routes>
    </Router>
    
  );
}



export default App;
