import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Navigate } from "react-router";
import Travel from '../components/Travel';
import Dashboard from '../components/Dashboard';
import ZeroCard from '../components/Zerocard';
import ZerocardCreateForm from '../components/ZerocardCreateForm';


const App = () => (
  <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/travel" replace />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/zerocard" element={<ZeroCard />} />
        <Route path="/zerocard/create" element={<ZerocardCreateForm />} />
      </Routes>
    </Router>
);

export default App;
