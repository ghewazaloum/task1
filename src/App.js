import { Route, Routes } from 'react-router-dom';
import './App.css';
import { IssueList, SingleIssue } from './components/index';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route exact path="/"element={<IssueList/>} />
          <Route path="/issue/:issueNumber"element={<SingleIssue/>} />
        </Routes>
    </div>
  );
}

export default App;
