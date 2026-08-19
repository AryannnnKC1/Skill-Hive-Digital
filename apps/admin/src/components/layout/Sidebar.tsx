import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Briefcase, 
  FolderTree, 
  Library, 
  Bell, 
  Activity, 
  Settings,
  LogOut
} from 'lucide-react';
import { cn } from '../ui/Card';
import { getAdminUser, adminLogout } from '../../lib/api';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Users, label: 'Students', href: '/students' },
  { icon: Briefcase, label: 'Assessments', href: '/assessments' },
  { icon: FolderTree, label: 'Categories', href: '/categories' },
  { icon: Library, label: 'Resources', href: '/resources' },
  { icon: Bell, label: 'Notifications', href: '/notifications' },
  { icon: Activity, label: 'Activity Logs', href: '/activity' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function Sidebar() {
  const navigate = useNavigate();
  const adminUser = getAdminUser();

  const handleLogout = () => {
    adminLogout();
    navigate('/login');
  };

  const initials = adminUser?.name 
    ? adminUser.name.substring(0, 2).toUpperCase() 
    : 'A';

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-200 bg-white shadow-sm flex flex-col">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-teal-700">
          <div className="bg-teal-600 rounded-md p-1.5">
            {/* <LayoutDashboard className="w-5 h-5 text-white" /> */}
          </div>
          CareerAdmin
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                isActive 
                  ? 'bg-teal-50 text-teal-700' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">
            {initials}
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-medium text-gray-900 truncate">
              {adminUser?.name || 'Admin User'}
            </span>
            <span className="text-xs text-gray-500 truncate">
              {adminUser?.email || 'admin@careercounsel.com'}
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
