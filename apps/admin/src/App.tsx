import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Analytics } from './pages/Analytics';
import { Students } from './pages/Students';
import { Categories } from './pages/Categories';
import { Resources } from './pages/Resources';
import { Assessments } from './pages/Assessments';
import { Notifications } from './pages/Notifications';
import { Activity } from './pages/Activity';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { getAdminUser, adminLogout } from './lib/api';

// Protected route wrapper - redirects to login if not authenticated
function ProtectedRoute() {
  const user = getAdminUser();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
}

// Public route wrapper - redirects to dashboard if already authenticated
function PublicRoute() {
  const user = getAdminUser();
  
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes - login */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        
        {/* Protected routes - admin dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="students" element={<Students />} />
            <Route path="assessments" element={<Assessments />} />
            <Route path="categories" element={<Categories />} />
            <Route path="resources" element={<Resources />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="activity" element={<Activity />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
        
        {/* Logout route */}
        <Route path="/logout" element={
          (() => {
            adminLogout();
            return <Navigate to="/login" replace />;
          })()
        } />
        
        {/* Redirect root to login if not authenticated */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;