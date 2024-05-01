import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './Page/SignUp';
import AdminWrapper from './Wrappers/AdminWrapper';
import Login from './Page/Login';

function App() {
  return (
    <div className="App">
    <Router>
        <Routes>
          <Route exact path="/*" element={<AdminWrapper />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp  />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
