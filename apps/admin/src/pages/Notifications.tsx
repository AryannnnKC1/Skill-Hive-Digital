import { Send, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export function Notifications() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Notification Center</h2>
          <p className="text-gray-500">Broadcast updates and send announcements to users.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-teal-600" />
              New Announcement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                <select className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-600">
                  <option>All Students</option>
                  <option>Active Students</option>
                  <option>Incomplete Assessments</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <Input placeholder="E.g., New Career Resources Available" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  className="flex w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-600 min-h-[120px]"
                  placeholder="Type your message here..."
                />
              </div>
              <Button type="button" className="w-full">Broadcast Notification</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-teal-600" />
              Recent Broadcasts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'Platform Maintenance', date: 'Oct 12, 2024', audience: 'All Users', status: 'Sent' },
                { title: 'New Tech Careers Added', date: 'Oct 05, 2024', audience: 'Active Students', status: 'Sent' },
                { title: 'Complete your assessment', date: 'Sep 28, 2024', audience: 'Incomplete Assessments', status: 'Sent' },
              ].map((notif, i) => (
                <div key={i} className="flex flex-col gap-1 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-sm">{notif.title}</span>
                    <span className="text-xs text-gray-500">{notif.date}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>To: {notif.audience}</span>
                    <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{notif.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
