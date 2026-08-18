import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
