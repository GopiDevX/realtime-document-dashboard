import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Uploads from './pages/Uploads';
import Documents from './pages/Documents';

function App() {
  return (
    <Router>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
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