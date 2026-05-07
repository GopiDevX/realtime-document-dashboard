import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Uploads from './pages/Uploads';
import Documents from './pages/Documents';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="uploads" element={<Uploads />} />
          <Route path="documents" element={<Documents />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;