import { Search, Filter, ShieldAlert, UserPlus, Settings, FileEdit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const logs = [
  { id: 1, action: 'Updated Settings', user: 'Admin User', role: 'Superadmin', time: '10 mins ago', type: 'system' },
  { id: 2, action: 'Created new Resource "Tech Resumes"', user: 'Jane Admin', role: 'Editor', time: '2 hours ago', type: 'content' },
  { id: 3, action: 'Suspended user account (ID: 4892)', user: 'Admin User', role: 'Superadmin', time: '5 hours ago', type: 'security' },
  { id: 4, action: 'Modified Assessment scoring criteria', user: 'Mark Tester', role: 'Assessor', time: '1 day ago', type: 'content' },
  { id: 5, action: 'Added new Category "Data Science"', user: 'Jane Admin', role: 'Editor', time: '1 day ago', type: 'content' },
  { id: 6, action: 'Exported User Analytics Report', user: 'Admin User', role: 'Superadmin', time: '2 days ago', type: 'system' },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'security': return <ShieldAlert className="h-4 w-4 text-red-500" />;
    case 'content': return <FileEdit className="h-4 w-4 text-blue-500" />;
    case 'user': return <UserPlus className="h-4 w-4 text-green-500" />;
    default: return <Settings className="h-4 w-4 text-gray-500" />;
  }
};

export function Activity() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Activity Logs</h2>
          <p className="text-gray-500">Audit trail of all administrator actions on the platform.</p>
        </div>
        <Button variant="outline">Export Logs</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>System Timeline</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search logs..." className="pl-8" />
              </div>
              <Button variant="outline" className="px-3">
                <Filter className="h-4 w-4 mr-2" />
                Filter Date
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative border-l border-gray-200 ml-3 space-y-8 pb-4 mt-2">
            {logs.map((log) => (
              <div key={log.id} className="relative pl-6">
                <span className="absolute -left-3 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm">
                  {getIcon(log.type)}
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{log.action}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      By <span className="font-medium text-gray-700">{log.user}</span> ({log.role})
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 mt-2 sm:mt-0 whitespace-nowrap">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Button variant="ghost" size="sm">Load More Logs</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
